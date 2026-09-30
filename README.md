# Book Marketplace

Book Marketplace is my first project built with Node.js and Express.js.

This project was created as a learning experience to become familiar with backend development, server-side rendering, databases, authentication, user roles, and real-time communication.

## About the Project

The application represents an online marketplace for buying, selling, and exchanging books.

While working on this project, I focused mainly on functionality and understanding how the different parts of a web application work together. The goal was to build a functional system with separate roles and real user interactions.

## Main Features

- User registration and login
- Different user roles:
  - Admin
  - Buyer
  - Seller
- User profile pages
- Adding, editing, and deleting books
- Book status management
- Searching and filtering books
- Shopping cart functionality
- Buying and exchanging books
- Order management
- Online user list
- Real-time chat using Socket.IO
- Admin live notifications
- Managing genres and languages
- Blocking and activating users
- Responsive user interface

## Technologies Used

- Node.js
- Express.js
- EJS
- JavaScript
- Bootstrap
- jQuery
- Socket.IO
- PostgreSQL
- Knex.js
- Objection.js
- Bcrypt

## Project Structure

```text
book-market/
├── auth/              # Authentication and role protection
├── bin/               # Application startup
├── controllers/       # Request handling
├── db/                # Database configuration, models, and DAOs
├── public/             # CSS and client-side JavaScript
├── routes/             # Application routes
├── services/           # Business logic
├── views/              # EJS templates
├── app.js              # Main Express application
└── package.json        # Project dependencies and scripts
