# Full Stack Developer Assignment

This project is a full stack web application built as part of the Orufy Technologies Pvt. Ltd. assignment.

## Tech Stack

- Frontend: React.js, Vite, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: OTP-based login with JWT

## Project Structure

```bash
client/
server/
Getting Started
1. Clone the Repository
git clone [https://github.com/Jainmanan1/Orufy_Assignment.git]
cd YOUR_REPOSITORY
2. Install Dependencies
Install frontend dependencies:

cd client
npm install
Install backend dependencies:

cd ../server
npm install
Environment Variables
Create a .env file inside the server folder and add the following:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run the Application
Start Backend
From the server folder:

npm run dev
Backend will run on:

http://localhost:5000
Start Frontend
From the client folder:

npm run dev
Frontend will run on:

http://localhost:5173
Features
OTP login using email or phone
JWT-based authentication
Product creation
Product editing
Publish and unpublish products
Delete products
Dashboard and product listing UI based on the provided Figma design
Notes
OTP is shown for demo/testing purposes.
MongoDB Atlas or local MongoDB can be used.
Make sure the backend server is running before starting the frontend.
