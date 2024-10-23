import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './SignupModal.scss';
import Image from 'next/image';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Link from 'next/link';
import LoginModal from '../LoginModal/LoginModal';
import { on } from 'events';

interface SignupModalProps {
  show: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ show, onClose }) => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [errors, setErrors] = useState({ fullName: '', email: '', birthday: '' });
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const handleOpenLoginModal = () => {
    onClose();
    setIsLoginModalVisible(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalVisible(false);
  };
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateDetails = () => {
    const newErrors = {
      fullName: fullName.trim() === '' ? 'Full Name is required' : '',
      email: !emailRegex.test(email) ? 'Invalid Email Address' : '',
      birthday: birthday === '' ? 'Birthday is required' : '',
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  // Handle OTP input change and focus shift
  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value)) || value.length > 1) return; // Allow only digits and max length of 1
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input field if the current input is filled
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle interest selection
  const handleInterestSelection = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== '');
  const isPersonalizationComplete = selectedInterests.length === 5;

  const nextStep = () => {
    if (step === 1 && phoneNumber.length === 12) {
      setStep(step + 1); // Ensure phone number has exactly 12 digits before moving forward
    } else if (step === 3 && validateDetails()) {
      setStep(step + 1);
    } else if (step !== 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const isDetailsComplete = fullName && emailRegex.test(email) && birthday;

  return (
    <React.Fragment>
    <Modal show={show} onHide={onClose} centered className="SignupModal">
      {step === 1 && (
        <React.Fragment>
          <Modal.Header closeButton>
            <Modal.Title>
              <Image priority className='logo' src="/images/logo/dark.svg" width={85} height={20} alt="logo" />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h2 className="title">Join Gondli</h2>
              <p className="description">Start your path to wellness here</p>
            </div>
            <div className="phoneInput">
              <FloatingLabel controlId="floatingInput" label="Phone Number">
                <Form.Control
                  type="text"
                  maxLength={12}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                />
              </FloatingLabel>
            </div>
            <button
              className={`get-started ${phoneNumber.length === 12 ? 'active' : ''}`}
              onClick={nextStep}
              disabled={phoneNumber.length !== 12}
            >
              Get Started
            </button>
            <div className="termsCondition">
              <p>
                By clicking Continue, you agree to <Link href="/">Gondli Terms & Conditions</Link> and <Link href="/">Privacy Policy</Link>
              </p>
            </div>
            <div className="or">
              <p>
                <span>Or</span>
              </p>
            </div>
            <div className="socialLogin">
              <button className="facebook">
                <Image priority  src="/images/notifications/facebook.svg" width={20} height={20} alt="facebook" />
                <p>Continue with Facebook</p>
              </button>
              <button className="google">
                <Image priority  src="/images/notifications/google.svg" width={20} height={20} alt="google" />
                <p>Continue with Google</p>
              </button>
            </div>
            <div className="alreadyAccount">
              <p>
                Already have an account? <span onClick={handleOpenLoginModal}>Log in</span> or <span>Continue as Guest</span>
              </p>
            </div>
          </Modal.Body>
        </React.Fragment>
      )}
      {step === 2 && (
        <React.Fragment>
          <Modal.Header closeButton>
              <Image priority className='back' onClick={prevStep} src="/images/notifications/back.svg" width={7} height={10} alt="back" />
            <Modal.Title>
              <div className="flex justify-content-center">
              <Image priority className='logo' src="/images/logo/dark.svg" width={85} height={20} alt="logo" />
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h2 className="title">Confirm Your Number</h2>
              <p className="description">Enter the code sent to {phoneNumber}</p>
              <div className="otp-input">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    placeholder="-"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                  />
                ))}
              </div>
              <button
                className={`get-started ${isOtpComplete ? 'active' : ''}`}
                disabled={!isOtpComplete}
                onClick={nextStep}
              >
                Continue
              </button>
            </div>
          </Modal.Body>
        </React.Fragment>
      )}
      {step === 3 && (
        <React.Fragment>
          <Modal.Header closeButton>
              <Image priority className='back' onClick={prevStep} src="/images/notifications/back.svg" width={7} height={10} alt="back" />
            <Modal.Title>
              <div className="flex justify-content-center">
              <Image priority className='logo' src="/images/logo/dark.svg" width={85} height={20} alt="logo" />
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h2 className="title">Finish Signing Up</h2>
              <p className="description">One last step and you are all good to go</p>
              <FloatingLabel className='mb-2' controlId="floatingFullName" label="Full Name">
                <Form.Control
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  isInvalid={!!errors.fullName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fullName}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel className='mb-2' controlId="floatingEmail" label="Email Address">
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel controlId="floatingBirthday" label="Birthday">
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  placeholder="Birthday"
                  isInvalid={!!errors.birthday}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.birthday}
                </Form.Control.Feedback>
              </FloatingLabel>
              <button
                className={`get-started ${isDetailsComplete ? 'active' : ''}`}
                onClick={nextStep}
                disabled={!isDetailsComplete}
              >
                Continue
              </button>
            </div>
          </Modal.Body>
        </React.Fragment>
      )}
      {step === 4 && (
        <React.Fragment>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
            <Image priority className='setup' src="/images/notifications/gondli.svg" width={60} height={60} alt="gondli" />
              <h2 className="title">Welcome to Gondli</h2>
              <p className="description mb-0">
                We are happy to see you here. Let’s make the wellness tailored for you.
              </p>
              <button className="get-started active" onClick={nextStep}>
                Get Started
              </button>
            </div>
          </Modal.Body>
        </React.Fragment>
      )}
      {step === 5 && (
        <React.Fragment>
          <Modal.Header closeButton>
              <Image priority className='back' onClick={prevStep} src="/images/notifications/back.svg" width={7} height={10} alt="back" />
            <Modal.Title>
              <div className="flex justify-content-center">
              <Image priority className='logo' src="/images/logo/dark.svg" width={85} height={20} alt="logo" />
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h2 className="title">Select Your Interests</h2>
              <p className="description">Select up to 5 categories that interest you to get more tailored offers</p>
              <div className="interests-grid">
                {['Yoga', 'Fitness', 'Massage', 'Sauna', 'Spa', 'Reiki', 'Chiropractic', 'Pilates', 'Meditation', 'Nutrition', 'Ayurveda', 'Acupuncture', 'Aromatherapy', 'Counseling', 'Detox', 'Mindfulness', 'Retreats', 'Coaching', 'Tai Chi'].map((interest) => (
                  <button
                    key={interest}
                    className={`interest-button ${selectedInterests.includes(interest) ? 'selected' : ''}`}
                    onClick={() => handleInterestSelection(interest)}
                  >
                    {interest}
                  </button>
                ))}
              </div>
              <p className='noSelected'>{selectedInterests.length} Selected</p>
              <button
                className={`get-started ${isPersonalizationComplete ? 'active' : ''}`}
                disabled={!isPersonalizationComplete}
                onClick={nextStep}
              >
                Personalize My Feed
              </button>
            </div>
          </Modal.Body>
        </React.Fragment>
      )}
      {step === 6 && (
        <React.Fragment>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
            <Image priority className='setup' src="/images/notifications/setup.svg" width={60} height={60} alt="setup" />
              <h2 className="title">You are all set up!</h2>
              <p className="description mb-0">Now you can check all the available offers tailored only for you</p>
              <button className="get-started active" onClick={onClose}>
                Dive into Gondli
              </button>
            </div>
          </Modal.Body>
        </React.Fragment>
      )}
    </Modal>
    {isLoginModalVisible && (
      <LoginModal show={isLoginModalVisible} onClose={handleCloseLoginModal} />
    )}
    </React.Fragment>
  );
};

export default SignupModal;
