# Razorpay Payment Testing Guide

## 🚀 Getting Started

Your website is now configured with **TEST** Razorpay keys. You can safely test payments without any real money being charged.

## 📋 Testing Checklist

### 1. **Form Validation Testing**
- [ ] Enter amount less than ₹10 (should show error)
- [ ] Leave name field empty (should show error)
- [ ] Enter invalid phone number (should show error)
- [ ] Enter valid details (should allow payment)

### 2. **Payment Method Testing**

#### **Test Card Numbers (Credit/Debit Cards):**
- **Success Card**: `4111 1111 1111 1111`
- **Failure Card**: `4000 0000 0000 0002`
- **Insufficient Funds**: `4000 0000 0000 9995`
- **CVV**: Any 3-digit number (e.g., 123)
- **Expiry**: Any future date (e.g., 12/25)
- **Name**: Any name

#### **Test UPI IDs:**
- **Success**: `success@razorpay`
- **Failure**: `failure@razorpay`

#### **Test Net Banking:**
- Select any bank
- Use the test login credentials provided by Razorpay in the test environment

#### **Test Wallets:**
- Paytm: Use `9876543210` as mobile number
- Other wallets: Follow the test flow provided

### 3. **Payment Flow Testing**

#### **Successful Payment Test:**
1. Fill form with valid details (amount ≥ ₹10)
2. Click "Donate Now"
3. In Razorpay checkout, select "Card"
4. Use test card: `4111 1111 1111 1111`
5. Enter any CVV and future expiry date
6. Complete payment
7. **Expected**: Redirect to success page with payment details

#### **Failed Payment Test:**
1. Fill form with valid details
2. Click "Donate Now"  
3. Use failure card: `4000 0000 0000 0002`
4. **Expected**: Payment fails, retry button appears

#### **UPI Test:**
1. Fill form with valid details
2. Click "Donate Now"
3. Select "UPI" in Razorpay checkout
4. Enter `success@razorpay` as UPI ID
5. **Expected**: Successful payment

## 📧 Email Receipt Testing

- **Test Mode**: Receipts are sent to the email address you configured in Razorpay
- Check your email after successful test payments
- Receipts will clearly mention "TEST MODE"

## 🔍 Monitoring Payments

1. **Razorpay Dashboard**: Login to your Razorpay account
2. **Go to**: Payments → Test Mode
3. **View**: All test transactions will appear here
4. **Check**: Payment status, amount, customer details

## 📱 Mobile Testing

Test the payment flow on different devices:
- [ ] Mobile phone (iOS/Android)
- [ ] Tablet
- [ ] Desktop browser
- [ ] Different browsers (Chrome, Safari, Firefox)

## 🐛 Common Issues & Solutions

### **Issue**: Payment form not showing
**Solution**: Check browser console for JavaScript errors, ensure Razorpay script is loaded

### **Issue**: "Invalid Key ID" error
**Solution**: Verify the key in `.env` file matches your test key exactly

### **Issue**: Payment succeeds but no redirect
**Solution**: Check browser console, ensure success page route exists

### **Issue**: Email receipts not received
**Solution**: Check spam folder, verify email in Razorpay settings

## 🎯 Testing Scenarios

### **Minimum Donation Test**:
- Amount: ₹10
- **Expected**: Should work successfully

### **Large Donation Test**:
- Amount: ₹50,000
- **Expected**: Should work successfully

### **Invalid Phone Test**:
- Phone: 123456789 (9 digits)
- **Expected**: Should show validation error

### **Empty Name Test**:
- Name: (empty)
- **Expected**: Should show validation error

## 📊 Success Metrics

✅ **Ready for Production When**:
- [ ] All form validations work
- [ ] Successful payments redirect correctly
- [ ] Failed payments show retry option
- [ ] Email receipts are received
- [ ] Mobile experience is smooth
- [ ] No JavaScript errors in console
- [ ] Payment details appear correctly on success page

## 🚀 Next Step: Go Live

Once all tests pass, see `GO_LIVE_INSTRUCTIONS.md` for switching to live keys.

---

## 📞 Support

If you encounter any issues:
1. Check Razorpay dashboard for payment logs
2. Check browser console for JavaScript errors
3. Contact Razorpay support if needed

**Happy Testing! 🎉**