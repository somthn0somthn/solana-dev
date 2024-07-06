import React, { useState, ChangeEvent } from 'react';

interface AddressInputProps {
    value: string;
    setValue: (value: string) => void;
}

export const AddressInput: React.FC<AddressInputProps> = ({value, setValue}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputAddress = event.target.value;
        setValue(inputAddress);
    };

    return (
        <div>
            <label>
                Enter an Address:
                <input 
                    type="text"
                    value={value}
                    onChange={handleChange}
                    placeholder="Enter an address"
                />
            </label>
        </div>
    );
}; 
