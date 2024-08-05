import React from 'react';
import { ButtonProps } from '../../types/common';

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
  className = ""
}) => {
  return (
    <button type={type} className={`btn-${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;