import React, { useState, ChangeEvent } from 'react';

interface IntegerInputProps {
    value: number;
    setValue: (value: number) => void;
}

export const IntegerInput: React.FC<IntegerInputProps> = ({value, setValue}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        if (inputValue === '') {
            setValue(0);
        } else {
            setValue(parseInt(inputValue, 10));
        }
    };

    return (
        <div>
            <label>
                Enter an integer:
                <input 
                    type="number"
                    value={value}
                    onChange={handleChange}
                    placeholder="Enter amount in Lamports"
                    min="0"
                    step="1"
                />
            </label>
        </div>
    )
} 
