import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './LoginModal.scss';
import Image from 'next/image';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import SignupModal from '../SignupModal/SignupModal';
import { useTranslations } from 'next-intl';

interface LoginModalProps {
  show: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  show,
  onClose,
}) => {
  const t = useTranslations();
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
            <Image priority src="/images/logo/dark.svg" width={85} height={20} alt="logo" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <h2 className="title">{t("welcome-back")}</h2>
            <p className="description">{t("enter-credentials")}</p>
          </div>
          <div className="phoneInput">
            <FloatingLabel className="mb-2" controlId="floatingInput" label={usePhone ? t("phone-number") : t("email-address")}>
              <Form.Control
                type={usePhone ? "text" : "email"}
                placeholder={usePhone ? t("phone-number") : t("email-address")}
                value={phoneOrEmail}
                onChange={usePhone ? handlePhoneNumberChange : handleEmailChange}
                maxLength={usePhone ? 12 : undefined}
                isInvalid={!usePhone && emailError && hasAttemptedSubmit} // Show validation error for email field after submit attempt
              />
              {!usePhone && emailError && hasAttemptedSubmit && (
                <Form.Control.Feedback type="invalid">
                  {t("valid-email-error")}
                </Form.Control.Feedback>
              )}
            </FloatingLabel>
            <FloatingLabel className="mb-2" controlId="floatingPassword" label={t("password")}>
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                placeholder={t("password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="show-hide-password" onClick={togglePasswordVisibility}>
                {passwordVisible ? t("hide") : t("show")}
              </div>
            </FloatingLabel>
            <div className="forgotPassword">
              <span>{t("forgot-password")}</span>
            </div>
          </div>
          <button
            className={`get-started ${isFormValid ? 'active' : ''}`}
            disabled={!isFormValid}
            onClick={handleSubmit} // Trigger validation on submit
          >
            {t("log-in")}
          </button>
          <div className="or">
            <p><span>{t("or")}</span></p>
          </div>
          <div className="socialLogin">
            <button onClick={toggleLoginMethod}>
              <Image priority src={usePhone ? "/images/notifications/Mail.svg" : "/images/notifications/phone.svg"} width={20} height={20} alt={usePhone ? "mail" : "phone"} />
              <p>{usePhone ? t("continue-with-email") : t("continue-with-phone")}</p>
            </button>
            <button>
              <Image priority src="/images/notifications/facebook.svg" width={20} height={20} alt="facebook" />
              <p>{t("continue-with-facebook")}</p>
            </button>
            <button>
              <Image priority src="/images/notifications/google.svg" width={20} height={20} alt="google" />
              <p>{t("continue-with-google")}</p>
            </button>
          </div>
          <div className="alreadyAccount">
            <p>{t("no-account-yet")} <span onClick={handleOpenSignupModal}>{t("sign-up")}</span> or <span>{t("continue-as-guest")}</span></p>
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
