# ⚙️ Backend - Digital Udhaar Khata

Node.js + Express backend for Digital Udhaar Khata.

---

# 🚀 Features

* JWT Authentication
* User Registration/Login
* Protected APIs
* Customer APIs
* Ledger APIs
* MongoDB Atlas Integration
* AI Insights Support
* Secure Password Hashing

---

# 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* bcryptjs
* dotenv
* cors

---

# 📂 Backend Structure

```bash
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── .env
│
└── package.json
```

---

# ⚙️ Setup

```bash
cd backend

npm install
```

---

# ▶️ Run Backend

```bash
npm run dev
```

---

# 🌍 Environment Variables

Create `.env`

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

PORT=5000
```

---

# 🔐 Authentication

Uses JWT-based authentication.

Protected routes require:

```bash
Authorization: Bearer token
```

---

# 📌 API Routes

## Auth Routes

```bash
/api/auth/register

/api/auth/login
```

---

## Customer Routes

```bash
/api/customers
```

---

## Ledger Routes

```bash
/api/transactions
```

---

# 🌍 Deployment

Backend deployed using:

* Render

Database:

* MongoDB Atlas

---

# 🔥 Database

MongoDB Atlas Cloud Database.

---

# 👨‍💻 Developer

Mohammad Afthab

GitHub:
https://github.com/theaffu18-lgtm
