
import React, { useState } from 'react';
import { formatAddress } from '@/utils/transactionUtils';
import { fadeIn } from '@/lib/animations';

interface AddressInputProps {
  onAddressChange: (address: string) => void;
  placeholder?: string;
}

const AddressInput: React.FC<AddressInputProps> = ({ 
  onAddressChange, 
  placeholder = "Enter receiver's address" 
}) => {
  const [address, setAddress] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    onAddressChange(newAddress);
  };

  return (
    <div className={fadeIn({ index: 1, className: "mb-4" })}>
      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
        Receiver's Address
      </label>
      <div className={`
        wallet-input flex items-center
        ${isFocused ? 'ring-2 ring-wallet-accent/30' : ''}
      `}>
        <input
          id="address"
          type="text"
          value={address}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none"
        />
        {address && (
          <div className="text-xs text-wallet-muted">
            {formatAddress(address)}
          </div>
        )}
      </div>
      <p className="text-xs text-wallet-muted mt-1">
        Leave empty to generate a new address
      </p>
    </div>
  );
};

export default AddressInput;
