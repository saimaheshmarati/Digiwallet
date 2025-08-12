# 🚀 Digital Wallet - Deployment Guide

## 📋 **Prerequisites**
- GitHub account with repository access
- Render.com account (free)
- Vercel.com account (free)
- MongoDB Atlas account (free)

## 🔧 **Backend Deployment (Render.com)**

### **Step 1: Render.com Setup**
1. Visit [https://render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"

### **Step 2: Connect Repository**
1. Connect to GitHub repository: `saimaheshmarati/Digiwallet`
2. Select the repository
3. Choose "payment-wallet-backend" as root directory

### **Step 3: Configure Service**
- **Name**: `digital-wallet-backend`
- **Environment**: `Node`
- **Region**: Choose closest to you
- **Branch**: `main`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Free

### **Step 4: Environment Variables**
Add these environment variables:
```
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/digital-wallet
JWT_SECRET=your-super-secret-jwt-key-2024-production
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### **Step 5: Deploy**
Click "Create Web Service" and wait for deployment.

## 🌐 **Frontend Deployment (Vercel)**

### **Step 1: Vercel Setup**
1. Visit [https://vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"

### **Step 2: Import Repository**
1. Import GitHub repository: `saimaheshmarati/Digiwallet`
2. Select "frontend" as root directory
3. Framework preset: Vite

### **Step 3: Configure Project**
- **Project Name**: `digiwallet-frontend`
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### **Step 4: Environment Variables**
Add this environment variable:
```
VITE_BACKEND_URL=https://your-backend-url.onrender.com/api
```

### **Step 5: Deploy**
Click "Deploy" and wait for completion.

## 🗄️ **Database Setup (MongoDB Atlas)**

### **Step 1: MongoDB Atlas**
1. Visit [https://mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free account
3. Create new cluster (free tier)

### **Step 2: Database Setup**
1. Create database: `digital-wallet`
2. Create user with read/write permissions
3. Get connection string

### **Step 3: Update Backend**
1. Copy connection string
2. Update MONGO_URI in Render environment variables
3. Replace `username`, `password`, and `cluster` with your values

## 🔗 **Live URLs**

After deployment, you'll have:

### **Frontend**: `https://digiwallet-frontend.vercel.app`
### **Backend**: `https://digital-wallet-backend.onrender.com`
### **GitHub**: `https://github.com/saimaheshmarati/Digiwallet`

## 📝 **Resume Entry**

```
Digital Wallet Application (Full-Stack)
• Built a complete digital wallet platform using React.js, Node.js, and MongoDB
• Implemented secure user authentication with JWT tokens and bcrypt password hashing
• Developed real-time money transfer, bill payment, and transaction management systems
• Integrated payment gateways (Razorpay, Stripe) for secure financial transactions
• Deployed frontend to Vercel and backend to Render with MongoDB Atlas database
• Live Demo: https://digiwallet-frontend.vercel.app
• GitHub: https://github.com/saimaheshmarati/Digiwallet
```

## 🧪 **Testing After Deployment**

1. **Test Frontend**: Visit your Vercel URL
2. **Test Backend**: Test API endpoints with Postman
3. **Test Database**: Verify data persistence
4. **Test Authentication**: Try login/signup
5. **Test Features**: Test all wallet functionality

## 🚨 **Important Notes**

- **Free Tier Limits**: Both Render and Vercel have usage limits
- **Database**: MongoDB Atlas free tier has 512MB storage
- **Environment Variables**: Keep sensitive data secure
- **Custom Domain**: Can be added later if needed

## 🆘 **Troubleshooting**

### **Backend Issues**
- Check environment variables in Render
- Verify MongoDB connection string
- Check build logs for errors

### **Frontend Issues**
- Verify backend URL in environment variables
- Check build logs in Vercel
- Ensure API endpoints are accessible

### **Database Issues**
- Verify MongoDB Atlas connection
- Check user permissions
- Ensure network access is configured

## 🎉 **Success Indicators**

✅ Frontend loads without errors
✅ Backend API responds to requests
✅ Database connections work
✅ User registration/login works
✅ All wallet features function
✅ No console errors in browser

---

**Your Digital Wallet will be live and ready for your resume! 🚀**
