# GlossBox - Skincare E-Commerce Project
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)

## Table of Contents

- [Introduction](#introduction)
  - [Problem Statement](#problem-statement)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Features](#features)
- [Application Data Flow Schema](#application-data-flow-schema)

---

## Introduction
GlossBox is an online platform designed to sell skincare products to customers. It provides features for users to browse products, add them to their shopping basket, make purchases, and view their order history. The project includes both frontend and backend components, built with modern web technologies.

### Problem Statement
In today's fast-paced world, finding the right skincare products can be a daunting task. Customers often encounter challenges such as:

- **Product Overload**: The abundance of skincare options available in the market can overwhelm customers, making it difficult to choose the right products.
  
- **Lack of Information**: Limited product information and misleading claims make it challenging for customers to make informed decisions about their skincare routine.

- **Inconvenient Shopping Experience**: Cumbersome shopping processes and lack of user-friendly interfaces discourage customers from exploring and purchasing skincare products online.

Our website addresses these challenges by curating a carefully selected collection of high-quality skincare products, providing comprehensive product information, and offering a seamless shopping experience tailored to meet the needs of modern consumers.

## Technologies Used
- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Real-time Communication:** Socket.io
- **Payment Processing:** Stripe

## Getting Started
#### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB installed locally or a MongoDB Atlas account for cloud-hosted database storage.

To run GlossBox locally, follow these steps:
1. Clone the repository:
 ```sh
git clone https://github.com/agh911/glossbox-eshop
 ```

2. Navigate to the project directory:
 ```sh
cd glossbox-eshop
 ```
3. Install dependencies:
- For BackEnd:
 ```sh
cd BackEnd
npm install
```
- For FrontEnd:
```sh
cd FrontEnd
npm install
 ```

4. Set Up Environment Variables:
- Create a .env.dev file in the BackEnd directory.
- Define the following environment variables:

 ```sh
 PORT=5000
 HOST=127.0.0.1
 DB_URI=your_mongodb_connection_string
 SECRET_KEY=your_secret_key_for_jwt
 STRIPE_SECRET_KEY=your_stripe_secret_key
 WEB_APP_URL=link_where_your_app_is_running

 ```

 - Create a .env file in the FrontEnd directory.
 -Define the following environment variables:

 ```sh
 VITE_GLOSSBOXURL=base_URL_of_backend_API
 VITE_STRIPE_KEY=your_stripe_public_key
```

5. Start the development servers:
 ```sh
# In the BackEnd(server) directory
npm start

# In the FrontEnd(client) directory
npm run dev
```
6. Open your browser and navigate to the indicated URL to access the GlossBox application.

## Features

Our Skincare E-Commerce platform offers a wide range of features to enhance the shopping experience:

- **User Authentication**: Secure user authentication system allowing users to sign up, sign in, and manage their accounts securely.
  
- **Product Catalog**: Extensive product catalog featuring skincare products from leading brands, complete with detailed descriptions, ingredients and images.
  
- **Shopping Basket**: Convenient shopping basket functionality enabling users to add, update, and remove items with ease, providing a seamless checkout experience.
  
- **Checkout Process**: Streamlined checkout process with secure payment processing, ensuring a hassle-free transaction for customers.
  
- **Order Management**: Comprehensive order management system allowing users to view their order history and track shipment status effortlessly.
  
- **Real-time Updates**: Real-time updates and notifications leveraging Socket.IO for instant feedback on basket changes (adding products, updating item quantity and item removal).

## Application Data Flow Schema

| Description                   | Method | Route                 | Data Response               |
|-------------------------------|--------|-----------------------|-----------------------------|
| Retrieve all products         | GET    | /products             | List of Product objects     |
| Add a new product             | POST   | /products             | Newly added Product object  |
| Retrieve a product by ID      | GET    | /products/{id}        | Product object              |
| Update a product by ID (TBA)  | PUT    | /products/{id}        | Updated Product object      |
| Delete a product by ID (TBA)  | DELETE | /products/{id}        | -                           |
|                               |        |                       |                             |
| Retrieve all users            | GET    | /users                | List of User objects        |
| Retrieve a user by ID         | GET    | /users/{id}           | User object                 |
| Update a user by ID (TBA)     | PUT    | /users/{id}           | Updated User object         |
| Delete a user by ID (TBA)     | DELETE | /users/{id}           | -                           |
|                               |        |                       |                             |
| Retrieve all orders           | GET    | /orders               | List of Order objects       |
| Retrieve orders by user ID    | GET    | /orders/user/{userId} | List of Order objects       |
| Create a new order            | POST   | /orders               | Newly added Order object    |
| Update an order by ID (TBA)   | PUT    | /orders/{id}          | Updated Order object        |
| Delete an order by ID (TBA)   | DELETE | /orders/{id}          | -                           |
