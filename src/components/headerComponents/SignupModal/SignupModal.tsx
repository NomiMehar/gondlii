import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './SignupModal.scss';
import Image from 'next/image';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Link from 'next/link';
import LoginModal from '../LoginModal/LoginModal';
import { on } from 'events';
import { useTranslations } from 'next-intl';


interface SignupModalProps {
  show: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ show, onClose }) => {
  const t = useTranslations();
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
              <h2 className="title">{t("join-gondli")}</h2>
              <p className="description">{t("start-path-to-wellness")}</p>
            </div>
            <div className="phoneInput">
              <FloatingLabel controlId="floatingInput" label={t("phone-number")}>
                <Form.Control
                  type="text"
                  maxLength={12}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder={t("phone-number")}
                />
              </FloatingLabel>
            </div>
            <button
              className={`get-started ${phoneNumber.length === 12 ? 'active' : ''}`}
              onClick={nextStep}
              disabled={phoneNumber.length !== 12}
            >
              {t("get-started")}
            </button>
            <div className="termsCondition">
              <p>
              {t("agree")} <Link href="/">{t("terms")}</Link> {t("and")} <Link href="/">{t("privacy")}</Link>
              </p>
            </div>
            <div className="or">
  <p>
    <span>{t("or")}</span>
  </p>
</div>
<div className="socialLogin">
  <button className="facebook">
    <Image priority src="/images/notifications/facebook.svg" width={20} height={20} alt="facebook" />
    <p>{t("continue-with-facebook")}</p>
  </button>
  <button className="google">
    <Image priority src="/images/notifications/google.svg" width={20} height={20} alt="google" />
    <p>{t("continue-with-google")}</p>
  </button>
</div>
<div className="alreadyAccount">
  <p>
    {t("already-have-account")}{" "}
    <span onClick={handleOpenLoginModal}>{t("log-in")}</span> {t("or")}{" "}
    <span>{t("continue-as-guest")}</span>
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
            <h2 className="title">{t("confirm-your-number")}</h2>
            <p className="description">{t("enter-code-sent", { phoneNumber })}</p>
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
                {t("continue")}
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
            <h2 className="title">{t("finish-signing-up")}</h2>
            <p className="description">{t("last-step")}</p>
              <FloatingLabel className='mb-2' controlId="floatingFullName" label={t("full-name")}>
                <Form.Control
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t("full-name")}
                  isInvalid={!!errors.fullName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fullName}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel className='mb-2' controlId="floatingEmail" label={t("email-address")}>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("email-address")}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel controlId="floatingBirthday" label={t("birthday")}>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  placeholder={t("birthday")}
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
                {t("continue")}
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
              <h2 className="title">{t("welcome-to-gondli")}</h2>
              <p className="description mb-0">
                {t("happy-to-see-you")}
              </p>
              <button className="get-started active" onClick={nextStep}>
              {t("get-started")}
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
            <h3 className="title">{t("select-your-interests")}</h3>
            <p className="description">{t("select-up-to-five")}</p>
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
              <p className='noSelected'>{selectedInterests.length} {t("selected-count")}</p>
              <button
                className={`get-started ${isPersonalizationComplete ? 'active' : ''}`}
                disabled={!isPersonalizationComplete}
                onClick={nextStep}
              >
                {t("personalize-my-feed")}
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
              <h2 className="title">{t("setup-complete")}</h2>
              <p className="description mb-0">{t("avail-offer")}</p>
              <button className="get-started active" onClick={onClose}>
              {t("dive")}
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
