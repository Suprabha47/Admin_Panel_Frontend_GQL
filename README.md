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
REACT_APP_BACKEND_GRAPHQL_URI=your_backend_graphql_url

REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id

```
📝 Note:
You can get these values from your Firebase Console > Project Settings.

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

🔗 Backend
You can connect this frontend to the deployed backend:

Backend API: https://admin-panel-backend-gql.onrender.com
Make sure this backend is running and accessible before using the frontend.

Or clone and run the backend locally from the Admin_Panel_Backend_GQL repository.

