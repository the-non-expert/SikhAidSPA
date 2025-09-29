# Going Live with Razorpay - Production Setup

## 🚨 **IMPORTANT**: Only follow these steps after thorough testing!

Ensure you've completed all tests in `TESTING_GUIDE.md` before proceeding.

## 📋 Pre-Live Checklist

- [ ] All payment flows tested successfully
- [ ] Form validations working correctly
- [ ] Email receipts received for test payments
- [ ] Success/failure pages working properly
- [ ] Mobile experience tested
- [ ] No JavaScript console errors
- [ ] Razorpay account is fully KYC verified
- [ ] Bank account linked and verified

## 🔄 Step 1: Switch to Live Keys

### **Edit your `.env` file:**

**Current (Test Mode):**
```env
# Razorpay Configuration - TEST MODE
VITE_RAZORPAY_KEY_ID=rzp_test_RF4FaYXsabs3TN
```

**Change to (Live Mode):**
```env
# Razorpay Configuration - LIVE MODE
VITE_RAZORPAY_KEY_ID=rzp_live_RF4HCGNHJ3X4n8

# COMMENTED OUT - TEST KEYS (keep for reference)
# VITE_RAZORPAY_KEY_ID=rzp_test_RF4FaYXsabs3TN
# RAZORPAY_KEY_SECRET=ggcBL1RU2yonwz65uHl5k1QH
```

### **Save the file and restart your development server**

## 🧪 Step 2: Verification Test

### **Make a Small Live Transaction:**
1. **Test with ₹10**: Make a real donation of ₹10 to verify everything works
2. **Use your own details**: Name, phone number, and email
3. **Complete the payment**: Use your actual card/UPI
4. **Verify receipt**: Check if you receive email receipt
5. **Check Razorpay dashboard**: Verify payment appears in Live mode

### **Expected Results:**
- ✅ Real money (₹10) is deducted from your account
- ✅ Email receipt received
- ✅ Payment shows in Razorpay Dashboard → Live Payments
- ✅ Success page displays correctly
- ✅ No errors in browser console

## 📊 Step 3: Monitor Your Dashboard

### **Razorpay Dashboard Settings:**
1. **Login** to your Razorpay account
2. **Switch to Live Mode** (toggle in top-right)
3. **Check Settings**:
   - Email notifications enabled
   - Webhook URLs configured (if needed)
   - Settlement preferences set
   - Business details verified

### **Payment Monitoring:**
- **Go to**: Payments → Live
- **Monitor**: All real donations will appear here
- **Download**: Transaction reports as needed
- **Refunds**: Can be processed if needed

## 💰 Step 4: Settlement & Banking

### **Automatic Settlements:**
- **T+2 Days**: Razorpay settles to your bank account
- **Check**: Settlements tab in dashboard
- **Verify**: Bank account details are correct

### **Tax & Compliance:**
- **TDS**: Razorpay handles TDS as per regulations
- **GST**: Configure if applicable to your organization
- **Reports**: Download for accounting purposes

## 🔒 Step 5: Security Best Practices

### **Environment Security:**
```bash
# Add .env to .gitignore (should already be there)
echo ".env" >> .gitignore

# Never commit live keys to version control
git add .
git commit -m "Go live with payment integration"
git push origin main
```

### **Key Management:**
- ✅ **Live Key ID**: Safe to use in frontend (public)
- ❌ **Live Key Secret**: Never expose in frontend (not used anyway)
- 🔒 **Store secrets safely**: Keep .env file secure

## 📧 Step 6: Update Website Content

### **Optional Updates for Live Mode:**
- Update donation success message if needed
- Add any specific live environment messaging
- Ensure all contact details are correct

## 🚨 Emergency Procedures

### **If Something Goes Wrong:**

#### **Immediate Actions:**
1. **Revert to Test Mode**: Change key back to test
2. **Check Logs**: Browser console and Razorpay dashboard
3. **Contact Support**: Razorpay support for urgent issues

#### **Quick Revert:**
```env
# Emergency: Switch back to test mode
VITE_RAZORPAY_KEY_ID=rzp_test_RF4FaYXsabs3TN
# VITE_RAZORPAY_KEY_ID=rzp_live_RF4HCGNHJ3X4n8
```

## 📈 Step 7: Post-Launch Monitoring

### **First 24 Hours:**
- [ ] Monitor all transactions in dashboard
- [ ] Check email receipts are being sent
- [ ] Verify settlement schedule
- [ ] Test from different devices/browsers

### **Ongoing Monitoring:**
- [ ] Daily dashboard checks
- [ ] Weekly settlement verification
- [ ] Monthly reconciliation with bank statements
- [ ] Quarterly review of transaction fees

## ✅ Launch Confirmation

**You're successfully live when:**
- ✅ Real payments are being processed
- ✅ Email receipts are working
- ✅ Settlements arriving in bank account
- ✅ Dashboard shows live transactions
- ✅ No technical errors occurring
- ✅ Donors can complete payments smoothly

## 📞 Support & Resources

### **Razorpay Support:**
- **Dashboard**: Help section in Razorpay account
- **Email**: support@razorpay.com
- **Phone**: Available in your dashboard
- **Documentation**: razorpay.com/docs

### **Website Support:**
- Check browser developer tools for errors
- Review payment logs in Razorpay dashboard
- Monitor server/hosting logs if applicable

---

## 🎉 Congratulations!

Your Punjab Floods Relief Aid website is now accepting real donations! 

**Best of luck with your relief efforts! 💙**

---

## 📝 Quick Reference

**Test Key**: `rzp_test_RF4FaYXsabs3TN`  
**Live Key**: `rzp_live_RF4HCGNHJ3X4n8`

**Switch Command**: Edit `.env` file and restart server