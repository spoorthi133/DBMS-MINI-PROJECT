import mysql.connector

try:
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",  # no password
        database="blood_bank"
    )
    print("✅ Connected successfully!")
except mysql.connector.Error as e:
    print("❌ Error:", e)
