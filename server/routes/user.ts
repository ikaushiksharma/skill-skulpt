const express = require('express');
const {
  create,
  deleteUser,
  verifyEmail,
  resendEmailVerificationToken,
  forgetPassword,
  sendResetPasswordTokenStatus,
  resetPassword,
  signIn,
} = require('../controllers/user');
const { isAuth } = require('../middlewares/auth');
const { isValidPassResetToken } = require('../middlewares/user');
const {
  userValidator,
  validate,
  validatePassword,
  signInValidator,
} = require('../middlewares/validator');

const router = express.Router();
// @ts-ignore
router.delete('/', deleteUser);
router.post('/create', userValidator, validate, create);
router.post('/sign-in', signInValidator, validate, signIn);
router.get('/is-auth', isAuth, (req: any, res: any) => {
  const { user } = req;
  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      role: user.role,
    },
  });
});
router.post('/verify-email', verifyEmail);
router.post('/resend-email-verification-token', resendEmailVerificationToken);
router.post('/forget-password', forgetPassword);
router.post(
  '/verify-pass-reset-token',
  isValidPassResetToken,
  sendResetPasswordTokenStatus
);
router.post(
  '/reset-password',
  validatePassword,
  validate,
  isValidPassResetToken,
  resetPassword
);

module.exports = router;
