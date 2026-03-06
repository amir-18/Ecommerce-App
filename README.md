# Ecommerce Application

A fully featured RESTful ecommerce backend built with Node.js, Express, MongoDB, and Stripe — supporting user authentication, product management, cart functionality, and real-time payment processing.

---

## Tech Stack

- **Runtime** — Node.js
- **Framework** — Express.js v5
- **Database** — MongoDB + Mongoose
- **Authentication** — JWT + HTTP-only Cookies
- **Validation** — Joi
- **Payments** — Stripe (with Webhook support)
- **Security** — Bcrypt password hashing, Cookie Parser

---

## Features

- User registration and login with JWT authentication
- Secure HTTP-only cookie session management
- Full product CRUD (Create, Read, Update, Delete)
- Cart management (add, update, remove items)
- Stripe payment integration with webhook handling
- Centralized error handling middleware
- Request validation with Joi schemas
- Modular folder structure (feature-based architecture)

---

## Project Structure

```
ecommerce-application/
├── config/
│   └── db.js                  # MongoDB connection
├── middlewares/
│   └── errorHandler.js        # Global error handler
├── modules/
│   ├── user/
│   │   └── userRoutes.js
│   ├── product/
│   │   └── productRoutes.js
│   ├── cart/
│   │   └── cartRoutes.js
│   └── payment/
│       ├── paymentRoutes.js
│       └── paymentController.js
├── app.js                     # Express app setup
├── server.js                  # Entry point
├── .env                       # Environment variables
└── package.json
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas cloud)
- [Git](https://git-scm.com/)
- [Postman](https://www.postman.com/) (for testing APIs)

---

### 1. Clone the Repository

```bash
git clone https://github.com/amirabid/ecommerce-application.git
cd ecommerce-application
```

---

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json` including Express, Mongoose, Stripe, Joi, JWT, Bcrypt and others.

---

### 3. Setup Environment Variables

Create a `.env` file in the root of the project:

```bash
touch .env
```

Add the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

- `MONGO_URI` — Get this from [MongoDB Atlas](https://cloud.mongodb.com) or use `mongodb://localhost:27017/ecommerce` for local
- `JWT_SECRET` — Any long random string
- `STRIPE_SECRET_KEY` — Get from your [Stripe Dashboard](https://dashboard.stripe.com)
- `STRIPE_WEBHOOK_SECRET` — Generated when you set up a Stripe webhook endpoint

---

### 4. Run the Server

```bash
node server.js
```

The server will start on:

```
http://localhost:5000
```

You should see `SERVER IS RUNNING` in the terminal confirming the server and database are connected.

---

## Testing the APIs with Postman

### Setup

1. Download and open [Postman](https://www.postman.com/)
2. Create a new Collection called `Ecommerce API`
3. Set the base URL as `http://localhost:5000`
4. Go to Postman Settings and enable "Send cookies" so JWT cookies are handled automatically

---

## API Endpoints

### Users — `/api/users`

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/users/register` | No | Register a new user |
| POST | `/api/users/login` | No | Login and receive JWT cookie |
| POST | `/api/users/logout` | Yes | Clear auth cookie |

**Register — POST** `/api/users/register`

Body (JSON):
```json
{
  "name": "Amir Abid",
  "email": "amir@example.com",
  "password": "yourpassword"
}
```

**Login — POST** `/api/users/login`

Body (JSON):
```json
{
  "email": "amir@example.com",
  "password": "yourpassword"
}
```

---

### Products — `/api/product`

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/product` | No | Get all products |
| GET | `/api/product/:id` | No | Get single product |
| POST | `/api/product` | Yes (Admin) | Create a product |
| PUT | `/api/product/:id` | Yes (Admin) | Update a product |
| DELETE | `/api/product/:id` | Yes (Admin) | Delete a product |

**Create Product — POST** `/api/product`

Body (JSON):
```json
{
  "name": "Wireless Headphones",
  "price": 99.99,
  "description": "High quality wireless headphones",
  "stock": 50
}
```

---

### Cart — `/api/cart`

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/cart` | Yes | Get current user cart |
| POST | `/api/cart` | Yes | Add item to cart |
| PUT | `/api/cart/:itemId` | Yes | Update cart item quantity |
| DELETE | `/api/cart/:itemId` | Yes | Remove item from cart |

**Add to Cart — POST** `/api/cart`

Body (JSON):
```json
{
  "productId": "product_id_here",
  "quantity": 2
}
```

---

### Payment — `/api/payment`

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/payment/checkout` | Yes | Create Stripe checkout session |
| POST | `/webhook` | No (Stripe only) | Stripe webhook handler |

---

## Authentication Notes

- After login, a JWT token is automatically stored in an HTTP-only cookie
- In Postman, cookies are sent automatically after login — no need to manually set headers
- All protected routes will read the cookie on every request

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2.1 | Web framework |
| mongoose | ^9.1.6 | MongoDB ODM |
| jsonwebtoken | ^9.0.3 | JWT authentication |
| bcrypt | ^6.0.0 | Password hashing |
| joi | ^18.0.2 | Request validation |
| stripe | ^20.3.1 | Payment processing |
| cookie-parser | ^1.4.7 | Cookie handling |
| dotenv | ^17.2.4 | Environment variables |

---

## Author

**Amir Abid**
- GitHub: [github.com/amirabid](https://github.com/amir-18)
- LinkedIn: [linkedin.com/in/amirabid](https://www.linkedin.com/in/amir-abid-b54aa8361/)

---

## License

ISC
