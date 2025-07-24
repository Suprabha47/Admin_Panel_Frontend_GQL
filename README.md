🛠️ Admin Panel (Frontend) – React + Apollo Client + Firebase
This is the frontend for the Admin Panel built with React, Apollo Client, Firebase Authentication, and styled using Bootstrap. It connects to a GraphQL backend and provides routes for managing products, categories, orders, customers, and more.

🚀 Getting Started
1. Clone the Repository
   
```
git clone https://github.com/your-username/admin-panel-frontend.git
cd admin-panel-frontend
```
2. Install Dependencies
   
```
npm install
```
3. Create a .env File
Create a .env file in the root of the project and add the following environment variables:
```
REACT_APP_BACKEND_GRAPHQL_URI=https://admin-panel-backend-gql.onrender.com

REACT_APP_FIREBASE_API_KEY=AIzaSyD0gFafCskkvtD6_5hjPpYmKMtpCaKvY2Y
REACT_APP_FIREBASE_AUTH_DOMAIN=admin-panel-gql.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=admin-panel-gql
REACT_APP_FIREBASE_APP_ID=1:128882507263:web:8a1a0021f7b822de5d7bca
REACT_APP_FIREBASE_STORAGE_BUCKET=admin-panel-gql.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=128882507263
```

4. Start the App
```
npm start
```
The app will start in development mode on:
📍 http://localhost:3000

📦 Features
Admin authentication (manual + Google sign-in)

Product management (add, update)

Categories, orders, customers listing

Protected dashboard routes

Apollo Client for GraphQL queries/mutations

Redux Toolkit with redux-persist for auth state

✅ Sample Admin Credentials for Testing
Email	admin@test.com
Password	12345678

📄 Backend
You can connect the frontend to the deployed backend:

🔗 https://admin-panel-backend-gql.onrender.com

Make sure this backend is running and accessible before using the frontend.

Or you can clone the Backend code from Admin_Panel_Backend_GQL repo and run it in your environment.
