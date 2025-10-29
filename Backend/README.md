This backend powers the **Restaurant Dashboard** and **User Application** for your final MERN evaluation project.  
It is built with **Node.js**, **Express**, and **MongoDB (Mongoose)** and handles all core operations:  
menu management, order tracking, chef assignment, table reservations, and seed data initialization.

---

## Tech Stack

- **Backend:** Node.js + Express  
- **Database:** MongoDB (Mongoose ODM)  
- **Environment:** dotenv  
- **Middleware:** CORS, Body-Parser  
- **Dev Tools:** Nodemon  
- **API Testing:** Postman  
- **Architecture:** RESTful services with modular routes


## Setup Instructions

### 1️⃣ Clone or Copy the Project
```bash
git clone https://github.com/arya8855/Restaurant-App.git
cd Final Evaluation-backend
```

### 2️⃣ Install Dependencies
```bash
npm install
```
### 4️⃣ Start the Server
Development mode (auto reload):
```bash
npm run dev
```
Production mode:
```bash
npm start
```

Server runs on **http://localhost:5000**

---

**Option 1: API route**
```http
POST /api/seed/run
```

**Option 2: CLI script**
```bash
npm run seed
```

---

## API Endpoints Overview

| Category | Method | Endpoint | Description |
|-----------|---------|-----------|-------------|
| **Menu** | GET | `/api/menu` | Fetch all menu items (supports pagination & category filters) |
|  | POST | `/api/menu` | Add a new dish |
|  | PUT | `/api/menu/:id` | Update menu item |
|  | DELETE | `/api/menu/:id` | Delete menu item |
| **Orders** | GET | `/api/orders` | Get all orders (auto-updates expired ones) |
|  | POST | `/api/orders` | Create new order |
|  | PUT | `/api/orders/:id/done` | Mark an order as completed |
| **Tables** | GET | `/api/tables` | List all tables |
|  | POST | `/api/tables` | Create new table |
|  | PUT | `/api/tables/:id` | Update table (reserve/unreserve) |
|  | DELETE | `/api/tables/:id` | Delete table (auto-renumbering enabled) |
| **Chefs** | GET | `/api/chefs` | Fetch all chefs |
|  | PUT | `/api/chefs/assign` | Assign order to least busy chef |
| **Seed (dev-only)** | POST | `/api/seed/run` | Reinitialize sample data |

---

## Developer Notes

- Controllers follow **inline export style**:  
  ```js
  exports.functionName = async (req, res) => { ... }
  ```
  (as per your project standard)
  
- The backend can be integrated directly with the **Restaurant Dashboard frontend** (React app).  

- Cross-origin requests are allowed by default (`cors` enabled).

---

## Testing (Postman)
- Seed data
- Menu CRUD
- Table management
- Order creation / completion
- Chef load balancing

```
base_url = http://localhost:5000
```
