
import React, { useState, useEffect } from 'react';
import { formatAddress, isValidAddress } from '@/utils/transactionUtils';
import { fadeIn } from '@/lib/animations';
import { AlertTriangle, Check } from 'lucide-react';

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
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    // Only validate when there's an address
    if (address) {
      setIsValid(isValidAddress(address));
    } else {
      setIsValid(null); // null means no validation (empty field)
    }
  }, [address]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    onAddressChange(newAddress);
  };

  const getBorderClasses = () => {
    if (isValid === true) return "ring-2 ring-green-500";
    if (isValid === false) return "ring-2 ring-red-500";
    if (isFocused) return "ring-2 ring-wallet-accent/30";
    return "";
  };

  return (
    <div className={fadeIn({ index: 1, className: "mb-4" })}>
      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
        Receiver's Address
      </label>
      <div className={`
        wallet-input flex items-center
        ${getBorderClasses()}
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
        {address && isValid !== null && (
          <div className="flex items-center ml-2">
            {isValid ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <AlertTriangle size={16} className="text-red-500" />
            )}
          </div>
        )}
        {address && (
          <div className="text-xs text-wallet-muted">
            {formatAddress(address)}
          </div>
        )}
      </div>
      {isValid === false && (
        <p className="text-xs text-red-500 mt-1">
          Invalid address format
        </p>
      )}
      <p className="text-xs text-wallet-muted mt-1">
        Leave empty to generate a new address
      </p>
    </div>
  );
};

export default AddressInput;
