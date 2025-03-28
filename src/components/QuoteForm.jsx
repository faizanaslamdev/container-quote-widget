import React, { useState } from 'react';
import '../styles/QuoteForm.css';

const steps = {
  CONTAINER_SIZE: 'CONTAINER_SIZE',
  CONTAINER_CONDITION: 'CONTAINER_CONDITION',
  DELIVERY_METHOD: 'DELIVERY_METHOD',
  ZIP_CODE: 'ZIP_CODE',
  CONTACT_INFO: 'CONTACT_INFO',
  THANK_YOU: 'THANK_YOU'
};

const containerSizes = [
  { id: '20ft', label: '20ft Standard', image: '/images/20ft.png' },
  { id: '40ft', label: '40ft Standard', image: '/images/40ft.png' },
  { id: '40ft-hc', label: '40ft High Cube', image: '/images/40ft-hc.png' }
];

const containerConditions = [
  { id: 'new', label: 'New', image: '/images/new-container.png' },
  { id: 'used', label: 'Used', image: '/images/used-container.png' }
];

const deliveryMethods = [
  { id: 'tilt-bed', label: 'Tilt Bed Delivery', image: '/images/tilt-bed.png' },
  { id: 'self-pickup', label: 'Self Pick Up', image: '/images/self-pickup.png' }
];

const QuoteForm = () => {
  const [currentStep, setCurrentStep] = useState(steps.CONTAINER_SIZE);
  const [formData, setFormData] = useState({
    containerSize: '',
    condition: '',
    deliveryMethod: '',
    zipCode: '',
    fullName: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep = () => {
    const newErrors = {};

    switch (currentStep) {
      case steps.CONTAINER_SIZE:
        if (!formData.containerSize) {
          newErrors.containerSize = 'Please select a container size';
        }
        break;

      case steps.CONTAINER_CONDITION:
        if (!formData.condition) {
          newErrors.condition = 'Please select a container condition';
        }
        break;

      case steps.DELIVERY_METHOD:
        if (!formData.deliveryMethod) {
          newErrors.deliveryMethod = 'Please select a delivery method';
        }
        break;

      case steps.ZIP_CODE:
        if (!formData.zipCode) {
          newErrors.zipCode = 'Please enter your ZIP code';
        } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
          newErrors.zipCode = 'Please enter a valid ZIP code';
        }
        break;

      case steps.CONTACT_INFO:
        if (!formData.fullName) {
          newErrors.fullName = 'Please enter your full name';
        }
        if (!formData.email) {
          newErrors.email = 'Please enter your email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.phone) {
          newErrors.phone = 'Please enter your phone number';
        } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) {
          newErrors.phone = 'Please enter a valid phone number';
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (currentStep === steps.CONTACT_INFO) {
      await handleSubmit();
    } else {
      switch (currentStep) {
        case steps.CONTAINER_SIZE:
          setCurrentStep(steps.CONTAINER_CONDITION);
          break;
        case steps.CONTAINER_CONDITION:
          setCurrentStep(steps.DELIVERY_METHOD);
          break;
        case steps.DELIVERY_METHOD:
          setCurrentStep(steps.ZIP_CODE);
          break;
        case steps.ZIP_CODE:
          setCurrentStep(steps.CONTACT_INFO);
          break;
        default:
          break;
      }
    }
  };

  const handleBack = () => {
    setErrors({});
    switch (currentStep) {
      case steps.CONTAINER_CONDITION:
        setCurrentStep(steps.CONTAINER_SIZE);
        break;
      case steps.DELIVERY_METHOD:
        setCurrentStep(steps.CONTAINER_CONDITION);
        break;
      case steps.ZIP_CODE:
        setCurrentStep(steps.DELIVERY_METHOD);
        break;
      case steps.CONTACT_INFO:
        setCurrentStep(steps.ZIP_CODE);
        break;
      default:
        break;
    }
  };

  const formatPhoneNumber = (value) => {
    const phone = value.replace(/\D/g, '');
    if (phone.length < 4) return phone;
    if (phone.length < 7) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('https://your-api-endpoint.com/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit quote');
      }
      setCurrentStep(steps.THANK_YOU);
    } catch (error) {
      console.error('Error submitting quote:', error);
      setErrors({ submit: 'Failed to submit quote. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderProgressBar = () => {
    const stepOrder = [
      steps.CONTAINER_SIZE,
      steps.CONTAINER_CONDITION,
      steps.DELIVERY_METHOD,
      steps.ZIP_CODE,
      steps.CONTACT_INFO
    ];

    const currentIndex = stepOrder.indexOf(currentStep);

    return (
      <div className="progress-bar">
        {stepOrder.map((step, index) => (
          <div
            key={step}
            className={`progress-step ${index <= currentIndex ? 'active' : ''}`}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-label">{step.replace(/_/g, ' ').toLowerCase()}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case steps.CONTAINER_SIZE:
        return (
          <div className="step-content">
            <h2>What size container are you looking for?</h2>
            <div className="options-grid">
              {containerSizes.map((size) => (
                <div
                  key={size.id}
                  className={`option-card ${formData.containerSize === size.id ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, containerSize: size.id })}
                >
                  <img src={size.image} alt={size.label} />
                  <span>{size.label}</span>
                </div>
              ))}
            </div>
            {errors.containerSize && <div className="error-message">{errors.containerSize}</div>}
          </div>
        );

      case steps.CONTAINER_CONDITION:
        return (
          <div className="step-content">
            <h2>What condition container are you interested in?</h2>
            <div className="options-grid">
              {containerConditions.map((condition) => (
                <div
                  key={condition.id}
                  className={`option-card ${formData.condition === condition.id ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, condition: condition.id })}
                >
                  <img src={condition.image} alt={condition.label} />
                  <span>{condition.label}</span>
                </div>
              ))}
            </div>
            {errors.condition && <div className="error-message">{errors.condition}</div>}
          </div>
        );

      case steps.DELIVERY_METHOD:
        return (
          <div className="step-content">
            <h2>How would you like to receive your container?</h2>
            <div className="options-grid">
              {deliveryMethods.map((method) => (
                <div
                  key={method.id}
                  className={`option-card ${formData.deliveryMethod === method.id ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, deliveryMethod: method.id })}
                >
                  <img src={method.image} alt={method.label} />
                  <span>{method.label}</span>
                </div>
              ))}
            </div>
            {errors.deliveryMethod && <div className="error-message">{errors.deliveryMethod}</div>}
          </div>
        );

      case steps.ZIP_CODE:
        return (
          <div className="step-content">
            <h2>What is your delivery zip code?</h2>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter your zip code"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                maxLength="5"
              />
              {errors.zipCode && <div className="error-message">{errors.zipCode}</div>}
            </div>
          </div>
        );

      case steps.CONTACT_INFO:
        return (
          <div className="step-content">
            <h2>Almost Done!</h2>
            <p>Please provide your name and email for a personalized quote</p>
            <div className="contact-form">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
                {errors.fullName && <div className="error-message">{errors.fullName}</div>}
              </div>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>
              <div className="input-group">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                />
                {errors.phone && <div className="error-message">{errors.phone}</div>}
              </div>
            </div>
            {errors.submit && <div className="error-message">{errors.submit}</div>}
          </div>
        );

      case steps.THANK_YOU:
        return (
          <div className="step-content thank-you">
            <div className="success-icon">✓</div>
            <h2>Thank you, {formData.fullName}!</h2>
            <p>One of our dedicated Sales Representatives will reach out to you shortly!</p>
            <button
              className="new-quote-button"
              onClick={() => window.location.reload()}
            >
              Get Another Quote
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="quote-form-container">
      {currentStep !== steps.THANK_YOU && renderProgressBar()}
      
      {renderStep()}
      
      {currentStep !== steps.THANK_YOU && (
        <div className="form-actions">
          {currentStep !== steps.CONTAINER_SIZE && (
            <button onClick={handleBack} className="back-button">
              Back
            </button>
          )}
          
          <button
            onClick={handleNext}
            className="next-button"
            disabled={isSubmitting}
          >
            {currentStep === steps.CONTACT_INFO ? (
              isSubmitting ? 'Submitting...' : 'Submit'
            ) : (
              'Next'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuoteForm; 