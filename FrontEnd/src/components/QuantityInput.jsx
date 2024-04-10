import React from "react";
import "./Card.css";

const QuantityInput = ({ value, onChange, min = 1 }) => {
    const handleIncrement = () => {
        onChange(value + 1);
    };

    const handleDecrement = () => {
        onChange(value > min ? value - 1 : min);
    };

    return (
        <div className="quantity-input">
            <div className="input-group">
                <button className="btn qty-btn" onClick={handleDecrement}>
                    -
                </button>
                <input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value) || min)}
                    id="quantity"
                    className="form-control"
                    min={min}
                />
                <button className="btn qty-btn" onClick={handleIncrement}>
                    +
                </button>
            </div>
        </div>
    );
};

export default QuantityInput;
