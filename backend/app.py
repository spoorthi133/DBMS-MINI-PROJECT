from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
from config import db_config
from werkzeug.security import generate_password_hash, check_password_hash

# Initialize app
app = Flask(__name__)
CORS(app)

# ✅ Function to ensure MySQL connection is always alive
def get_connection():
    try:
        conn = mysql.connector.connect(**db_config)
        if conn.is_connected():
            return conn
    except Error as e:
        print(f"MySQL connection error: {e}")
        return None


# ------------------ ROUTES ------------------

@app.route('/')
def home():
    return jsonify({"message": "Blood Bank API is running!"})


# 🩸 GET all donors
@app.route('/donors', methods=['GET'])
def get_donors():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Donor")
    donors = cursor.fetchall()
    conn.close()
    return jsonify(donors)


# ➕ ADD new donor
@app.route('/donors', methods=['POST'])
def add_donor():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    query = """
        INSERT INTO Donor (Name, Gender, Age, Blood_Group, Contact_No, Address, Last_Donation_Date)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    values = (
        data['Name'], data['Gender'], data['Age'],
        data['Blood_Group'], data['Contact_No'],
        data['Address'], data['Last_Donation_Date']
    )
    cursor.execute(query, values)
    conn.commit()
    conn.close()
    return jsonify({"message": "Donor added successfully!"}), 201


# 🧾 GET blood stock
@app.route('/stock', methods=['GET'])
def get_stock():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Blood_Stock")
    stock = cursor.fetchall()
    conn.close()
    return jsonify(stock)


# ---------------- RECIPIENTS ----------------

@app.route('/recipients', methods=['GET'])
def get_recipients():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Recipient")
    recipients = cursor.fetchall()
    conn.close()
    return jsonify(recipients)


@app.route('/recipients', methods=['POST'])
def add_recipient():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    query = """
        INSERT INTO Recipient (Name, Gender, Age, Blood_Group, Contact_No, Address, Request_Date, Required_Units)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """
    values = (
        data['Name'], data['Gender'], data['Age'],
        data['Blood_Group'], data['Contact_No'],
        data['Address'], data['Request_Date'], data['Required_Units']
    )
    cursor.execute(query, values)
    conn.commit()
    conn.close()
    return jsonify({
        "message": "Recipient added successfully!",
     "Recipient_ID": cursor.lastrowid
    }), 201



# ---------------- BLOOD REQUESTS ----------------


@app.route('/requests', methods=['POST'])
def add_request():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        query = """
            INSERT INTO Blood_Request 
            (Recipient_ID, Blood_Group, Units_Requested, Status, Request_Date, Camp_ID)
            VALUES (%s, %s, %s, 'Pending', CURDATE(), %s)
        """
        values = (
            data['Recipient_ID'],
            data['Blood_Group'],
            data['Units_Requested'],
            data['Camp_ID']    # <-- IMPORTANT!
        )

        cursor.execute(query, values)
        conn.commit()

        return jsonify({"message": "Blood request added successfully!"}), 201

    except Exception as e:
        conn.rollback()
        print("Add Request Error:", e)
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()



@app.route('/requests', methods=['GET'])
def get_requests():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT 
            req.Request_ID,
            req.Recipient_ID,
            req.Blood_Group,
            req.Units_Requested,
            req.Status,
            req.Request_Date,
            rec.Name,
            rec.Contact_No
        FROM Blood_Request req
        JOIN Recipient rec ON req.Recipient_ID = rec.Recipient_ID
        ORDER BY req.Request_ID DESC
    """

    cursor.execute(query)
    requests_data = cursor.fetchall()
    conn.close()
    return jsonify(requests_data), 200


@app.route('/requests/camp/<int:camp_id>', methods=['GET'])
def get_requests_by_camp(camp_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT 
            req.Request_ID,
            req.Blood_Group,
            req.Units_Requested,
            req.Status,
            req.Request_Date,
            rec.Name,
            rec.Contact_No
        FROM Blood_Request req
        JOIN Recipient rec ON req.Recipient_ID = rec.Recipient_ID
        WHERE req.Camp_ID = %s
        ORDER BY req.Request_ID DESC
    """, (camp_id,))

    data = cursor.fetchall()
    conn.close()
    return jsonify(data), 200


@app.route('/request-blood', methods=['POST'])
def request_blood():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        # Insert Recipient
        cursor.execute("""
            INSERT INTO Recipient 
            (Name, Gender, Age, Blood_Group, Contact_No, Address, Request_Date, Required_Units)
            VALUES (%s, %s, %s, %s, %s, %s, CURDATE(), %s)
        """, (
            data['Name'], data['Gender'], data['Age'],
            data['Blood_Group'], data['Contact_No'],
            data['Address'], data['Units_Requested']
        ))

        recipient_id = cursor.lastrowid

        # Insert Request INCLUDING CAMP_ID
        cursor.execute("""
            INSERT INTO Blood_Request
            (Recipient_ID, Blood_Group, Units_Requested, Status, Request_Date, Camp_ID)
            VALUES (%s, %s, %s, 'Pending', CURDATE(), %s)
        """, (
            recipient_id,
            data['Blood_Group'],
            data['Units_Requested'],
            data['Camp_ID']
        ))

        conn.commit()
        return jsonify({"message": "Blood request submitted", "Recipient_ID": recipient_id}), 201

    except Exception as e:
        print("Request Error:", e)
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()


@app.route('/requests/<int:request_id>/approve', methods=['PUT'])
def approve_request(request_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        # Fetch request
        cursor.execute("""
            SELECT Blood_Group, Units_Requested FROM Blood_Request
            WHERE Request_ID = %s
        """, (request_id,))
        req = cursor.fetchone()

        if not req:
            return jsonify({"error": "Request not found"}), 404

        bg = req['Blood_Group']
        units = req['Units_Requested']

        # Check stock
        cursor.execute("""
            SELECT Units_Available FROM Blood_Stock WHERE Blood_Group = %s
        """, (bg,))
        stock = cursor.fetchone()

        if not stock or stock['Units_Available'] < units:
            return jsonify({"error": "Insufficient stock"}), 400

        # Reduce stock
        cursor.execute("""
            UPDATE Blood_Stock 
            SET Units_Available = Units_Available - %s
            WHERE Blood_Group = %s
        """, (units, bg))

        # Update request status
        cursor.execute("""
            UPDATE Blood_Request SET Status='Approved'
            WHERE Request_ID = %s
        """, (request_id,))

        conn.commit()
        return jsonify({"message": "Request approved"}), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()

@app.route('/requests/<int:request_id>/reject', methods=['PUT'])
def reject_request(request_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("""
            UPDATE Blood_Request SET Status='Rejected'
            WHERE Request_ID = %s
        """, (request_id,))
        conn.commit()
        return jsonify({"message": "Request rejected"}), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()


# ---------------- DONATIONS ----------------

@app.route('/donations', methods=['GET'])
def get_donations():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT Donation.Donation_ID, Donor.Name AS Donor_Name, Camp.Camp_Name, Donation.Date, Donation.Units_Donated
        FROM Donation
        JOIN Donor ON Donation.Donor_ID = Donor.Donor_ID
        JOIN Camp ON Donation.Camp_ID = Camp.Camp_ID
    """)
    donations = cursor.fetchall()
    conn.close()
    return jsonify(donations)


@app.route('/donations', methods=['POST'])
def add_donation():
    data = request.json
    print("Received donation POST:", data)
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        # Insert donation row
        query = """
            INSERT INTO Donation (Donor_ID, Camp_ID, Date, Units_Donated)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(query, (data['Donor_ID'], data['Camp_ID'], data['Date'], data['Units_Donated']))
        # Update stock (and set expiry if you already implemented)
        update_stock = """
            UPDATE Blood_Stock
            SET Units_Available = Units_Available + %s
            WHERE Blood_Group = (SELECT Blood_Group FROM Donor WHERE Donor_ID = %s)
        """
        cursor.execute(update_stock, (data['Units_Donated'], data['Donor_ID']))
        conn.commit()
    except Exception as e:
        conn.rollback()
        print("Error in add_donation:", e)
        conn.close()
        return jsonify({"error": str(e)}), 500

    conn.close()
    return jsonify({"message": "Donation added"}), 201


# ---------------- CAMPS ----------------

@app.route('/camps', methods=['GET'])
def get_camps():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Camp")
    camps = cursor.fetchall()
    conn.close()
    return jsonify(camps)


@app.route('/camps', methods=['POST'])
def add_camp():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    query = """
        INSERT INTO Camp (Camp_Name, Location, Date, Organizer)
        VALUES (%s, %s, %s, %s)
    """
    values = (data['Camp_Name'], data['Location'], data['Date'], data['Organizer'])
    cursor.execute(query, values)
    conn.commit()
    conn.close()
    return jsonify({"message": "Camp added successfully!"}), 201


# ------------------- CAMP ADMIN -------------------

@app.route('/camp-admin', methods=['GET'])
def get_camp_admins():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT Admin_ID, Name, Username, Contact_No, Email, Camp_ID FROM Camp_Admin")
    admins = cursor.fetchall()
    conn.close()
    return jsonify(admins)


@app.route('/camp-admin', methods=['POST'])
def add_camp_admin():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    hashed_pw = generate_password_hash(data['Password'])
    query = """
        INSERT INTO Camp_Admin (Name, Username, Password, Contact_No, Email, Camp_ID)
        VALUES (%s, %s, %s, %s, %s, %s)
    """
    values = (data['Name'], data['Username'], hashed_pw, data['Contact_No'], data['Email'], data['Camp_ID'])
    cursor.execute(query, values)
    conn.commit()
    conn.close()
    return jsonify({"message": "Camp admin added successfully!"}), 201


@app.route('/camp-donors/<int:camp_id>', methods=['GET'])
def get_camp_donors(camp_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    query = """
        SELECT 
            Donation.Donation_ID,
            Donation.Donor_ID,
            Donation.Camp_ID,
            Donation.Units_Donated,
            Donation.Date,
            Donor.Name,
            Donor.Blood_Group,
            Donor.Contact_No
        FROM Donation
        JOIN Donor ON Donation.Donor_ID = Donor.Donor_ID
        WHERE Donation.Camp_ID = %s
        ORDER BY Donation.Date DESC, Donation.Donation_ID DESC
    """
    try:
        cursor.execute(query, (camp_id,))
        rows = cursor.fetchall()
    except Exception as e:
        print("Error in get_camp_donors:", e)
        conn.close()
        return jsonify({"error": str(e)}), 500

    conn.close()
    return jsonify(rows), 200

@app.route('/camp-admin/login', methods=['POST'])
def camp_admin_login():
    data = request.json
    username = data['Username']
    password = data['Password']

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Camp_Admin WHERE Username = %s", (username,))
    admin = cursor.fetchone()
    conn.close()

    if admin and check_password_hash(admin['Password'], password):
        return jsonify({
    "message": "Login successful!",
    "Admin_ID": admin['Admin_ID'],
    "Camp_ID": admin['Camp_ID']
}), 200

    else:
        return jsonify({"error": "Invalid username or password"}), 401


# ------------------- SYSTEM ADMIN -------------------
@app.route('/system-admin', methods=['GET'])
def get_system_admins():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT SysAdmin_ID, Username FROM System_Admin")
    admins = cursor.fetchall()
    conn.close()
    return jsonify(admins)

@app.route('/system-admin', methods=['POST'])
def add_system_admin():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    hashed_pw = generate_password_hash(data['Password'])
    query = "INSERT INTO System_Admin (Username, Password) VALUES (%s, %s)"
    cursor.execute(query, (data['Username'], hashed_pw))
    conn.commit()
    conn.close()
    return jsonify({"message": "System admin created!"}), 201


@app.route('/login', methods=['POST'])
def system_admin_login():
    data = request.json
    username = data['Username']
    password = data['Password']

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM System_Admin WHERE Username = %s", (username,))
    admin = cursor.fetchone()
    conn.close()

    if admin and check_password_hash(admin['Password'], password):
        return jsonify({"message": "System admin login successful!"}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401

print("\nRegistered routes:")
for rule in app.url_map.iter_rules():
    print(rule)

@app.route('/login', methods=['GET'])
def login_test():
    return "System Admin Login Endpoint - Use POST in Postman"

@app.route('/camp-admin/login', methods=['GET'])
def camp_login_test():
    return "Camp Admin Login Endpoint - Use POST in Postman"


# GET donor details and donation history
@app.route('/donor/<int:donor_id>/details', methods=['GET'])
def get_donor_details(donor_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        # 1) donor basic info
        cursor.execute("SELECT Donor_ID, Name, Gender, Age, Blood_Group, Contact_No, Address, Last_Donation_Date FROM Donor WHERE Donor_ID = %s", (donor_id,))
        donor = cursor.fetchone()
        if not donor:
            conn.close()
            return jsonify({"error":"Donor not found"}), 404

        # 2) donation history (latest first)
        query_history = """
            SELECT Donation_ID, Donor_ID, Camp_ID, Date, Units_Donated
            FROM Donation
            WHERE Donor_ID = %s
            ORDER BY Date DESC, Donation_ID DESC
        """
        cursor.execute(query_history, (donor_id,))
        history = cursor.fetchall()

        # 3) aggregate totals (total units, count, last donation date)
        query_agg = """
            SELECT
                IFNULL(SUM(Units_Donated), 0) AS total_units,
                COUNT(*) AS donations_count,
                MAX(Date) AS last_donation_date
            FROM Donation
            WHERE Donor_ID = %s
        """
        cursor.execute(query_agg, (donor_id,))
        agg = cursor.fetchone()

        # Build response
        response = {
            "donor": donor,
            "history": history,
            "aggregates": {
                "total_units": agg['total_units'],
                "donations_count": agg['donations_count'],
                "last_donation_date": agg['last_donation_date']
            }
        }
        conn.close()
        return jsonify(response), 200

    except Exception as e:
        conn.rollback()
        print("Error in get_donor_details:", e)
        conn.close()
        return jsonify({"error": str(e)}), 500


@app.route('/camp/<int:camp_id>/stats', methods=['GET'])
def get_camp_stats(camp_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        # Total donations count
        cursor.execute("""
            SELECT COUNT(*) AS total_donations
            FROM Donation
            WHERE Camp_ID = %s
        """, (camp_id,))
        total_donations = cursor.fetchone()['total_donations']

        # Total units collected
        cursor.execute("""
            SELECT IFNULL(SUM(Units_Donated), 0) AS total_units
            FROM Donation
            WHERE Camp_ID = %s
        """, (camp_id,))
        total_units = cursor.fetchone()['total_units']

        # Today's donations count
        cursor.execute("""
            SELECT COUNT(*) AS today_count
            FROM Donation
            WHERE Camp_ID = %s AND Date = CURDATE()
        """, (camp_id,))
        today_count = cursor.fetchone()['today_count']

        # This month's donations
        cursor.execute("""
            SELECT COUNT(*) AS month_count
            FROM Donation
            WHERE Camp_ID = %s 
            AND MONTH(Date) = MONTH(CURDATE())
            AND YEAR(Date) = YEAR(CURDATE())
        """, (camp_id,))
        month_count = cursor.fetchone()['month_count']

        # Latest 5 donors at this camp
        cursor.execute("""
            SELECT d.Donation_ID, d.Date, d.Units_Donated,
                   o.Name AS Donor_Name, o.Blood_Group, o.Contact_No
            FROM Donation d
            JOIN Donor o ON d.Donor_ID = o.Donor_ID
            WHERE d.Camp_ID = %s
            ORDER BY d.Date DESC, d.Donation_ID DESC
            LIMIT 5
        """, (camp_id,))
        latest = cursor.fetchall()

        return jsonify({
            "total_donations": total_donations,
            "total_units": total_units,
            "today": today_count,
            "this_month": month_count,
            "latest_donors": latest
        }), 200

    except Exception as e:
        print("Camp Stats Error:", e)
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()

# DELETE donor



@app.route('/donors/<int:donor_id>', methods=['DELETE'])
def delete_donor(donor_id):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM Donation WHERE Donor_ID = %s", (donor_id,))
        cursor.execute("DELETE FROM Donor WHERE Donor_ID = %s", (donor_id,))
       
        conn.commit()
        return jsonify({"message": "Donor deleted"}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

# UPDATE donor
@app.route('/donors/<int:donor_id>', methods=['PUT'])
def update_donor(donor_id):
    data = request.json

    # Fix date format: convert ISO → YYYY-MM-DD
    if data.get("Last_Donation_Date"):
        date_value = data["Last_Donation_Date"]
    if "T" in date_value:  
        data["Last_Donation_Date"] = date_value.split("T")[0]
    else:
        data["Last_Donation_Date"] = None  # allow NULL

    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            UPDATE Donor
            SET Name=%s, Gender=%s, Age=%s, Blood_Group=%s,
                Contact_No=%s, Address=%s, Last_Donation_Date=%s
            WHERE Donor_ID=%s
        """, (data.get('Name'), data.get('Gender'), data.get('Age'),
              data.get('Blood_Group'), data.get('Contact_No'),
              data.get('Address'), data.get('Last_Donation_Date'), donor_id))
        conn.commit()
        return jsonify({"message":"Updated"}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"error":str(e)}), 500
    finally:
        conn.close()


@app.route('/recipients/<int:recipient_id>', methods=['PUT'])
def update_recipient(recipient_id):
    data = request.json
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        UPDATE Recipient
        SET Name=%s, Gender=%s, Age=%s, Blood_Group=%s,
            Contact_No=%s, Address=%s, Request_Date=%s, Required_Units=%s
        WHERE Recipient_ID=%s
    """
    values = (
        data['Name'], data['Gender'], data['Age'], data['Blood_Group'],
        data['Contact_No'], data['Address'], data['Request_Date'],
        data['Required_Units'], recipient_id
    )

    try:
        cursor.execute(query, values)
        conn.commit()
        return jsonify({"message": "Recipient updated successfully!"}), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

@app.route('/recipients/<int:recipient_id>', methods=['DELETE'])
def delete_recipient(recipient_id):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("DELETE FROM Recipient WHERE Recipient_ID = %s", (recipient_id,))
        conn.commit()
        return jsonify({"message": "Recipient deleted successfully"}), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)


