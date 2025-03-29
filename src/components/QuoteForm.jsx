import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../styles/QuoteForm.css";
import DimensionsGuide from "./DimensionsGuide";

const steps = {
  LANDING: "LANDING",
  CONTAINER_SIZE: "CONTAINER_SIZE",
  CONTAINER_CONDITION: "CONTAINER_CONDITION",
  DELIVERY_METHOD: "DELIVERY_METHOD",
  ZIP_CODE: "ZIP_CODE",
  CONTACT_INFO: "CONTACT_INFO",
  THANK_YOU: "THANK_YOU",
};

const containerSizes = [
  { id: "20ft", label: "20ft Standard", image: "/images/20ft.png" },
  { id: "40ft", label: "40ft Standard", image: "/images/40ft.png" },
  { id: "40ft-hc", label: "40ft High Cube", image: "/images/40ft-hc.png" },
];

const containerConditions = [
  { id: "new", label: "New", image: "/images/new-container.png" },
  { id: "used", label: "Used", image: "/images/used-container.png" },
];

const deliveryMethods = [
  { id: "tilt-bed", label: "Tilt Bed Delivery", image: "/images/tilt-bed.png" },
  {
    id: "self-pickup",
    label: "Self Pick Up",
    image: "/images/self-pickup.png",
  },
];

const QuoteForm = () => {
  const [currentStep, setCurrentStep] = useState(steps.LANDING);
  const [formData, setFormData] = useState({
    containerSize: "",
    condition: "",
    deliveryMethod: "",
    zipCode: "",
    fullName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [isDimensionsGuideOpen, setIsDimensionsGuideOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const validateStep = () => {
    const newErrors = {};

    switch (currentStep) {
      case steps.CONTAINER_SIZE:
        if (!formData.containerSize) {
          newErrors.containerSize = "Please select a container size";
        }
        break;

      case steps.CONTAINER_CONDITION:
        if (!formData.condition) {
          newErrors.condition = "Please select a container condition";
        }
        break;

      case steps.DELIVERY_METHOD:
        if (!formData.deliveryMethod) {
          newErrors.deliveryMethod = "Please select a delivery method";
        }
        break;

      case steps.ZIP_CODE:
        if (!formData.zipCode) {
          newErrors.zipCode = "Please enter your ZIP code";
        } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
          newErrors.zipCode = "Please enter a valid ZIP code";
        }
        break;

      case steps.CONTACT_INFO:
        if (!formData.fullName) {
          newErrors.fullName = "Please enter your full name";
        }
        if (!formData.email) {
          newErrors.email = "Please enter your email";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        }
        if (!formData.phone) {
          newErrors.phone = "Please enter your phone number";
        } else if (formData.phone.length < 10) {
          newErrors.phone = "Please enter a valid phone number";
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOptionSelect = (field, value) => {
    setFormData({ ...formData, [field]: value });

    setTimeout(() => {
      switch (field) {
        case "containerSize":
          setCurrentStep(steps.CONTAINER_CONDITION);
          break;
        case "condition":
          setCurrentStep(steps.DELIVERY_METHOD);
          break;
        case "deliveryMethod":
          setCurrentStep(steps.ZIP_CODE);
          break;
      }
      setTimeout(scrollToTop, 100);
    }, 300);
  };

  const handleNext = async () => {
    if (!validateStep()) return;
    setShouldAnimate(false);

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
    setTimeout(scrollToTop, 100);
    setTimeout(() => setShouldAnimate(true), 50);
  };

  const handleBack = () => {
    setShouldAnimate(false);
    setErrors({});
    switch (currentStep) {
      case steps.CONTAINER_SIZE:
        setCurrentStep(steps.LANDING);
        break;
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
    setTimeout(scrollToTop, 100);
    setTimeout(() => setShouldAnimate(true), 50);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // const response = await fetch('https://your-api-endpoint.com/quotes', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to submit quote');
      // }
      setTimeout(() => {
        setCurrentStep(steps.THANK_YOU);
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("Error submitting quote:", error);
      setErrors({ submit: "Failed to submit quote. Please try again." });
    } finally {
      // setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      containerSize: "",
      condition: "",
      deliveryMethod: "",
      zipCode: "",
      fullName: "",
      email: "",
      phone: "",
    });
    setCurrentStep(steps.CONTAINER_SIZE);
  };

  const renderProgressBar = () => {
    const stepOrder = [
      steps.CONTAINER_SIZE,
      steps.CONTAINER_CONDITION,
      steps.DELIVERY_METHOD,
      steps.ZIP_CODE,
      steps.CONTACT_INFO,
    ];

    const currentIndex = stepOrder.indexOf(currentStep);

    return (
      <div className="progress-bar">
        {stepOrder.map((step, index) => (
          <div
            key={step}
            className={`progress-step ${index <= currentIndex ? "active" : ""}`}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-label">
              {step.replace(/_/g, " ").toLowerCase()}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case steps.CONTAINER_SIZE:
        return (
          <div className="step-main-content">
            <h2 className="step-title">
              What size container are you looking for?
            </h2>
            <div className="options-grid">
              {containerSizes.map((size, index) => (
                <div className="main-card" key={size.id}>
                  <div
                    className={`option-card container-size-card ${
                      formData.containerSize === size.id ? "selected" : ""
                    }`}
                    onClick={() => handleOptionSelect("containerSize", size.id)}
                    style={{ "--animation-order": index }}
                  >
                    <img src={size.image} alt={size.label} />
                  </div>
                  <span className="container-label">{size.label}</span>
                </div>
              ))}
            </div>
            {errors.containerSize && (
              <div className="error-message">{errors.containerSize}</div>
            )}
            <DimensionsGuide
              isOpen={isDimensionsGuideOpen}
              onClose={() => setIsDimensionsGuideOpen(false)}
            />
          </div>
        );

      case steps.CONTAINER_CONDITION:
        return (
          <div className="step-main-content">
            <h2 className="step-title">
              What condition container are you interested in?
            </h2>
            <div className="options-grid">
              {containerConditions.map((condition, index) => (
                <div
                  className={`main-card ${shouldAnimate ? "animate-in" : ""}`}
                  key={condition.id}
                  style={{ "--animation-order": index }}
                >
                  <div
                    className={`option-card ${
                      formData.condition === condition.id ? "selected" : ""
                    }`}
                    onClick={() =>
                      handleOptionSelect("condition", condition.id)
                    }
                  >
                    <img src={condition.image} alt={condition.label} />
                  </div>
                  <span className="container-label">{condition.label}</span>
                </div>
              ))}
            </div>
            {errors.condition && (
              <div className="error-message">{errors.condition}</div>
            )}
          </div>
        );

      case steps.DELIVERY_METHOD:
        return (
          <div className="step-main-content">
            <h2 className="step-title">
              How would you like to receive your container?
            </h2>
            <div className="options-grid">
              {deliveryMethods.map((method) => (
                <div className="main-card">
                  <div
                    key={method.id}
                    className={`option-card ${
                      formData.deliveryMethod === method.id ? "selected" : ""
                    }`}
                    onClick={() =>
                      handleOptionSelect("deliveryMethod", method.id)
                    }
                  >
                    <img src={method.image} alt={method.label} />
                  </div>
                  <span className="container-label">{method.label}</span>
                </div>
              ))}
            </div>
            {errors.deliveryMethod && (
              <div className="error-message">{errors.deliveryMethod}</div>
            )}
          </div>
        );

      case steps.ZIP_CODE:
        return (
          <div className="step-main-content">
            <h2 className="step-title">What is your delivery zip code?</h2>
            <div className="input-group">
              <div className="zip-input">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 10.8333C11.3807 10.8333 12.5 9.71404 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71404 8.61929 10.8333 10 10.8333Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 17.5C12.5 14.1667 15 11.0153 15 8.33333C15 5.65139 12.7614 3.33333 10 3.33333C7.23858 3.33333 5 5.65139 5 8.33333C5 11.0153 7.5 14.1667 10 17.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Enter your zip code here..."
                  value={formData.zipCode}
                  onChange={(e) =>
                    setFormData({ ...formData, zipCode: e.target.value })
                  }
                  maxLength="5"
                />
              </div>
              {errors.zipCode && (
                <div className="error-message">{errors.zipCode}</div>
              )}
            </div>
          </div>
        );

      case steps.CONTACT_INFO:
        return (
          <div className="step-main-content">
            <h2 className="step-title almost-done">Almost Done!</h2>
            <p className="step-description">
              Please provide your name and email for a personalized quote
            </p>
            <div className="contact-form">
              <div className="input-group" style={{ "--animation-order": 0 }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
                {errors.fullName && (
                  <div className="error-message">{errors.fullName}</div>
                )}
              </div>
              <div className="input-group" style={{ "--animation-order": 1 }}>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>
              <div className="input-group" style={{ "--animation-order": 2 }}>
                <PhoneInput
                  country={"us"}
                  value={formData.phone}
                  onChange={(phone) => setFormData({ ...formData, phone })}
                  containerClass="phone-input-container"
                  inputClass="phone-input-field"
                  enableSearch={true}
                  disableSearchIcon={true}
                  countryCodeEditable={false}
                  placeholder="(000) 000-0000"
                  specialLabel=""
                  inputProps={{
                    required: true,
                    autoFocus: false,
                  }}
                />
                {errors.phone && (
                  <div className="error-message">{errors.phone}</div>
                )}
              </div>
            </div>
            {errors.submit && (
              <div className="error-message">{errors.submit}</div>
            )}
          </div>
        );

      case steps.THANK_YOU:
        return (
          <div className="thank-you">
            <div className="success-icon">✓</div>
            <h2 className="thank-you-title">Thank you, {formData.fullName}!</h2>
            <p className="thank-you-description">
              One of our dedicated Sales Representatives will reach out to you
              shortly!
            </p>
            <button className="new-quote-button" onClick={() => resetForm()}>
              Get Another Quote
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  if (currentStep === steps.LANDING) {
    return (
      <div className="landing-page">
        <div className="landing-content">
          <div className="landing-image">
            <img src="/images/container-crane.png" alt="Container with crane" />
          </div>
          <div className="landing-text">
            <h1 className="landing-title">Ready For a Quote?</h1>
            <p className="landing-description">
              We Make It Easy and Effortless! Simple. Quick. Free. Get Your
              Quote Now!
            </p>
            <button
              onClick={() => {
                setCurrentStep(steps.CONTAINER_SIZE);
                setTimeout(scrollToTop, 100);
              }}
              className="get-started-button"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quote-form-container">
      <div className="step-content">
        {currentStep !== steps.THANK_YOU && renderProgressBar()}
        {renderStep()}
        {currentStep !== steps.THANK_YOU && (
          <div className="form-actions">
            <button onClick={handleBack} className="back-button">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back
            </button>

            {currentStep === steps.CONTAINER_SIZE && (
              <div
                className="dimensions-button"
                onClick={() => setIsDimensionsGuideOpen(true)}
              >
                <img
                  src="/images/dimensions-guide.png"
                  alt="Dimensions Guide"
                />
                Dimensions Guide
              </div>
            )}

            <button
              onClick={handleNext}
              className="next-button"
              disabled={isSubmitting}
            >
              {currentStep === steps.CONTACT_INFO ? (
                isSubmitting ? (
                  "Submitting..."
                ) : (
                  "Submit"
                )
              ) : (
                <>
                  Next
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteForm;
