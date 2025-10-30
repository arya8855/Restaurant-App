📌 Overview

This is a full-stack Restaurant Management Application that allows users to browse and place food orders online while enabling restaurant staff to manage tables, chefs, and orders efficiently.
The project includes a Node.js + Express backend and two separate React frontends — one for User and another for restaurant management.

🚀 Live Links
Backend (API Server): https://restaurant-app-tv2z.onrender.com

Restaurant Dashboard : https://restaurant-app-a2jd.vercel.app

User Frontend : https://restaurant-app-oela.vercel.app/

🧩 Features
User Frontend

View menu categories like Burgers, Pizzas, Drinks, etc.

Search and filter dishes in real-time.

Add items to cart and place an order.

Provide delivery details before checkout.

Restaurant (Admin) Frontend

Manage tables, chefs, and incoming orders.

Track order status (pending, preparing, completed).

View analytics dashboard for tables and chef performance.

Assign chefs dynamically to new orders.

🖥️ Backend (API)

RESTful APIs built using Express.js and MongoDB.

Models for Dishes, Tables, Chefs, and Orders.

Secure CRUD operations with validation.

Deployed on Render with CORS configured for both frontends.

⚙️ Tech Stack

Frontend (User & Admin)

React.js

React Router

Context API / Hooks

CSS Modules

Backend

Node.js

Express.js

MongoDB + Mongoose

CORS, dotenv, cloudinary, multer

 Installation & Setup (Local)
1️⃣ Clone the repository
git clone https://github.com/arya8855/Restaurant-App.git
cd restaurant-app

2️⃣ Setup Backend
cd backend
npm install

PORT=5000

Start the server:

npm start

3️⃣ Setup Frontend (User or Restaurant)
cd ../user-frontend    # or ../restaurant-frontend
npm install
npm run dev

🔗 API Endpoints
Method	Endpoint	Description
GET	/api/dishes	Get all dishes
POST	/api/dishes	Add a new dish
GET	/api/orders	Get all orders
POST	/api/orders	Create new order
GET	/api/tables	Get all tables
PUT	/api/tables/:id/status	Update table status
GET	/api/chefs	Get all chefs

Key Learnings

Built multi-frontend integration with a single backend.

Managed CORS for multiple origins on a live server.

Used lazy loading, state management, and conditional rendering in React.

Designed scalable backend API using Express and Mongoose models.
