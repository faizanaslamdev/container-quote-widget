import React from "react";

const DimensionsGuide = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="dimensions-guide-overlay">
      <div className="dimensions-guide-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Dimensions Guide</h2>

        <div className="container-specs">
          <div className="spec-column">
            <h3>20' STD</h3>
            <div className="spec-details">
              <p>
                Exterior
                <br />
                20' x 8' x 8'6"
              </p>
              <p>
                Interior
                <br />
                19'6" x 7'9" x 8'6"
              </p>
              <p>
                Max Payload
                <br />
                52,813 lbs
              </p>
              <p>
                Weight
                <br />
                5,000 lbs
              </p>
            </div>
          </div>

          <div className="spec-column">
            <h3>40' STD</h3>
            <div className="spec-details">
              <p>
                Exterior
                <br />
                40' x 8' x 8'6"
              </p>
              <p>
                Interior
                <br />
                39'6" x 7'9" x 7'10"
              </p>
              <p>
                Max Payload
                <br />
                61,200 lbs
              </p>
              <p>
                Weight
                <br />
                8,000 lbs
              </p>
            </div>
          </div>

          <div className="spec-column">
            <h3>40' HC</h3>
            <div className="spec-details">
              <p>
                Exterior
                <br />
                40' x 8' x 9'6"
              </p>
              <p>
                Interior
                <br />
                39'6" x 7'9" x 8'10"
              </p>
              <p>
                Max Payload
                <br />
                62,974 lbs
              </p>
              <p>
                Weight
                <br />
                8,800 lbs
              </p>
            </div>
          </div>
        </div>

        <div className="container-images">
          <div className="container-image-wrapper">
            <img
              src="./images/container-20.png"
              alt="20ft container"
              className="container"
            />
            <img
              src="./images/arrow-20.png"
              alt="20ft dimension"
              className="dimension-arrow length-20"
            />
          </div>

          <div className="container-image-wrapper">
            <img
              src="./images/container-40.png"
              alt="40ft container"
              className="container"
            />
            <img
              src="./images/arrow-40.png"
              alt="40ft dimension"
              className="dimension-arrow length-40"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DimensionsGuide;
