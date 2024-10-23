import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './LoginModal.scss';
import Image from 'next/image';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import SignupModal from '../SignupModal/SignupModal';
interface LoginModalProps {
  show: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  show,
  onClose,
}) => {
  const [usePhone, setUsePhone] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);

  // Function to validate email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to check if the form is valid
  const isFormValid = usePhone
    ? phoneOrEmail.length === 12 && password.length > 0
    : validateEmail(phoneOrEmail) && password.length > 0;

  // Function to handle closing modal and resetting all fields
  const handleClose = () => {
    setPhoneOrEmail('');
    setPassword('');
    setEmailError(false);
    setHasAttemptedSubmit(false); // Reset the submit attempt flag
    onClose();
  };

  // Function to handle switching login method (Phone/Email)
  const toggleLoginMethod = () => {
    setUsePhone(!usePhone);
    setPhoneOrEmail(''); // Reset field when switching between phone and email
    setPassword(''); // Reset password as well
    setEmailError(false); // Reset email error state
    setHasAttemptedSubmit(false); // Reset the submit attempt flag
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Function to handle email input and validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setPhoneOrEmail(email);
    // Remove error when the user starts typing again
    if (hasAttemptedSubmit) {
      setEmailError(!validateEmail(email));
    }
  };

  // Function to handle phone number input
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Allow only numeric values and limit to 12 characters
    if (/^\d*$/.test(input) && input.length <= 12) {
      setPhoneOrEmail(input);
    }
  };

  // Function to handle form submission (Log In button click)
  const handleSubmit = () => {
    setHasAttemptedSubmit(true); // Mark that user attempted to submit
    if (!isFormValid) {
      setEmailError(!validateEmail(phoneOrEmail)); // Set email error only if invalid
    } else {
      handleClose(); // Close the modal if form is valid
    }
  };

  const handleOpenSignupModal = () => {
    handleClose();
    setIsSignupModalVisible(true);
  };

  const handleCloseSignupModal = () => {
    setIsSignupModalVisible(false);
  };
  return (
   <React.Fragment>
     <Modal show={show} onHide={handleClose} centered className="LoginModal">
      <Modal.Header closeButton>
        <Modal.Title>
          <Image priority  src="/images/logo/dark.svg" width={85} height={20} alt="logo" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <h2 className="title">Welcome Back to Gondli</h2>
          <p className="description">Enter your credentials to log in</p>
        </div>
        <div className="phoneInput">
          <FloatingLabel className="mb-2" controlId="floatingInput" label={usePhone ? "Phone Number" : "Email Address"}>
            <Form.Control
              type={usePhone ? "text" : "email"}
              placeholder={usePhone ? "Phone Number" : "Email Address"}
              value={phoneOrEmail}
              onChange={usePhone ? handlePhoneNumberChange : handleEmailChange}
              maxLength={usePhone ? 12 : undefined}
              isInvalid={!usePhone && emailError && hasAttemptedSubmit} // Show validation error for email field after submit attempt
            />
            {!usePhone && emailError && hasAttemptedSubmit && (
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address.
              </Form.Control.Feedback>
            )}
          </FloatingLabel>
          <FloatingLabel className="mb-2" controlId="floatingPassword" label="Password">
            <Form.Control
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="show-hide-password" onClick={togglePasswordVisibility}>
              {passwordVisible ? 'Hide' : 'Show'}
            </div>
          </FloatingLabel>
          <div className="forgotPassword">
            <span>Forgot Password?</span>
          </div>
        </div>
        <button
          className={`get-started ${isFormValid ? 'active' : ''}`}
          disabled={!isFormValid}
          onClick={handleSubmit} // Trigger validation on submit
        >
          Log In
        </button>
        <div className="or">
          <p><span>Or</span></p>
        </div>
        <div className="socialLogin">
          <button onClick={toggleLoginMethod}>
            <Image priority  src={usePhone ? "/images/notifications/Mail.svg" : "/images/notifications/phone.svg"} width={20} height={20} alt={usePhone ? "mail" : "phone"} />
            <p>{usePhone ? "Continue with Email" : "Continue with Phone number"}</p>
          </button>
          <button><Image priority  src="/images/notifications/facebook.svg" width={20} height={20} alt="facebook" />
          <p>Continue with Facebook</p></button>
          <button><Image priority  src="/images/notifications/google.svg" width={20} height={20} alt="google" /><p>Continue with Google</p></button>
        </div>
        <div className="alreadyAccount">
          <p>Don’t have an account yet? <span onClick={handleOpenSignupModal}>Sign up</span> or <span>Continue as Guest</span></p>
        </div>
      </Modal.Body>
    </Modal>
    <SignupModal
        show={isSignupModalVisible}
        onClose={handleCloseSignupModal}
      />
   </React.Fragment>
  );
};

export default LoginModal;
