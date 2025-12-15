# 🩸 **Blood Bank Management System**
### **DBMS Mini Project (College Academic Project)**

A full-stack **Blood Bank Management System** developed as a **DBMS mini project** for college coursework.  
The project demonstrates core **Database Management System concepts** using a real-world healthcare application.

---

## 🎓 **Academic Details**

- **Project Type:** DBMS Mini Project  
- **Course:** Database Management Systems  
- **Purpose:** College academic submission  
- **Focus:** ER Modeling, Schema Design, SQL Queries, and CRUD Operations  

---

## 🚀 **Features**

### 🔐 **Authentication**
- System Admin Login  
- Camp Admin Login  
- Secure password hashing  

### 🩸 **Blood Bank Management**
- Donor Management  
- Recipient Management  
- Blood Stock Tracking  
- Blood Request Handling  
- Blood Donation Records  

### 🏕 **Camp Management**
- Blood Donation Camps  
- Camp Admin Assignment  

### 🌐 **Frontend**
- React (Vite) based UI  
- Normal CSS (No Tailwind / No UI frameworks)  
- React Router for navigation  
- Backend integration using Fetch API  

---

## 🛠 **Tech Stack**

### **Backend**
- Flask  
- Flask-CORS  
- MySQL  
- mysql-connector-python  

### **Frontend**
- React (Vite)  
- React Router DOM  
- HTML, CSS, JavaScript  

### **Database**
- MySQL  

---

## 📁 **Project Structure**

```bash
blood-bank/
│
├── backend/
│ ├── app.py
│ ├── config.py
│ ├── requirements.txt
│ └── venv/
│
├── blood-bank-frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Login.jsx
│ │ │ ├── CampAdminLogin.jsx
│ │ │ ├── DonorList.jsx
│ │ ├── App.jsx
│ │ ├── api.js
│ │ ├── style.css
│ │ └── main.jsx
│ └── package.json
│
└── README.md
```


---

## 🗄 **Database Schema (DBMS Concepts Used)**

- Donor  
- Recipient  
- Blood_Stock  
- Camp  
- Camp_Admin  
- Donation  
- Blood_Request  
- System_Admin  

✔ Primary Keys  
✔ Foreign Keys  
✔ One-to-Many Relationships  
✔ Referential Integrity  

---

## ⚙️ **Backend Setup**

### **1️⃣ Create Virtual Environment**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
Install Dependencies
pip install flask flask-cors mysql-connector-python

Configure Database

Edit config.py:

db_config = {
    "host": "localhost",
    "user": "root",
    "password": "YOUR_MYSQL_PASSWORD",
    "database": "blood_bank"
}

4️⃣ Run Backend
python app.py


Backend runs on:
http://127.0.0.1:5000
```

🎨 Frontend Setup (Vite + React)
```bash
cd blood-bank-frontend
npm install
npm run dev


Frontend runs on:
http://localhost:5173
```

### **🔑 API Endpoints**
Authentication

POST /system-admin

POST /login

POST /camp-admin

POST /camp-admin/login

Data Management

GET /donors

POST /donors

GET /recipients

POST /recipients

GET /stock

GET /camps

POST /camps

GET /donations

POST /donations

GET /requests

POST /requests

###**🧪 Testing**

Backend APIs tested using Postman
SQL queries executed using MySQL Workbench
Frontend tested in browser

### **🧑‍💻 Author**

Spoorthi B M
DBMS Mini Project – College Academic Work

📌 Note
This project is developed strictly for academic learning purposes to demonstrate practical implementation of DBMS concepts using a real-world application.
