# Digital Wallet Backend

A Node.js backend for the Digital Payment Wallet application.

## Features

- User authentication with JWT
- Transaction management (deposit, withdrawal, transfer)
- Bill payment system
- Rewards system
- User search functionality
- Payment gateway integration (Razorpay)

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   # MongoDB Connection
   MONGO_URI=mongodb://localhost:27017/digital-wallet
   
   # JWT Secret for authentication
   JWT_SECRET=your-super-secret-jwt-key-2024
   
   # Server Configuration
   PORT=5001
   NODE_ENV=development
   
   # Razorpay Configuration (for payments)
   RAZORPAY_KEY_ID=rzp_test_your_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret_key
   
   # Stripe Configuration (alternative payment)
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   ```

3. **MongoDB Setup:**
   - Make sure MongoDB is running on your system
   - Create a database named `digital-wallet` (or update MONGO_URI)
   - The application will automatically create the required collections

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on port 5001 (or the port specified in your .env file).

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/users/balance` - Get user balance
- `GET /api/users/search` - Search users
- `GET /api/users/profile` - Get user profile

### Transactions
- `POST /api/transactions/create` - Create transaction (deposit/withdrawal)
- `POST /api/transactions/transfer` - Transfer money
- `GET /api/transactions/history` - Get transaction history

### Bill Payments
- `POST /api/bills/pay` - Pay a bill
- `GET /api/bills` - Get bill payment history

### Payments
- `POST /api/payments/create-order` - Create payment order
- `POST /api/payments/verify-payment` - Verify payment

### Rewards
- `POST /api/rewards/add` - Add reward
- `GET /api/rewards` - Get user rewards

## Database Models

- **User**: User information and balance
- **Transaction**: Transaction records
- **BillPayment**: Bill payment records
- **Reward**: User rewards

## Authentication

The application uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Error Handling

All API endpoints return consistent error responses:

```json
{
  "message": "Error description",
  "error": "Detailed error message (in development)"
}
```

## Development

- The application uses ES6 modules
- MongoDB with Mongoose ODM
- Express.js framework
- JWT for authentication
- CORS enabled for frontend integration

## Troubleshooting

1. **MongoDB Connection Issues:**
   - Ensure MongoDB is running
   - Check your MONGO_URI in .env file
   - Verify network connectivity

2. **JWT Issues:**
   - Ensure JWT_SECRET is set in .env
   - Check token expiration

3. **Port Issues:**
   - Ensure port 5001 is available
   - Update PORT in .env if needed

## Testing

You can test the API endpoints using tools like:
- Postman
- Insomnia
- curl commands
- Frontend application

## License

ISC License

