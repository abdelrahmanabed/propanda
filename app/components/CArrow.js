import React from 'react'

const CArrow =({ direction, onClick, disabled }) => {
    const disabledClass = disabled ? "arrow--disabled" : "";
    const arrowDirectionClass = direction === "left" ? "arrow--left" : "arrow--right";
    return (
      <svg
        onClick={onClick}
        className={`arrow ${arrowDirectionClass} ${disabledClass}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {direction === "left" ? (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        ) : (
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        )}
      </svg>
    );
  };

export default CArrow