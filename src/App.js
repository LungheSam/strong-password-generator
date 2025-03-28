import React, { useState } from 'react';
import './App.css';
import { sendEmail, sendSMS } from './components/sendPrivately';

export default function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const [sendVia, setSendVia] = useState(''); // Can be 'email' or 'sms'
  const [contactInfo, setContactInfo] = useState(''); // Email or phone number
  const [isPrivate, setIsPrivate] = useState(false); // Private option (password not displayed)

  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let availableChars = '';

    if (includeUppercase) availableChars += uppercaseChars;
    if (includeLowercase) availableChars += lowercaseChars;
    if (includeNumbers) availableChars += numberChars;
    if (includeSymbols) availableChars += symbolChars;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      generatedPassword += availableChars[randomIndex];
    }

    setPassword(generatedPassword);
    if (sendVia && contactInfo) {
      sendPassword(generatedPassword);
      setPassword('');
    }
  };

  const sendPassword = (password_) => {
    if (!sendVia || !contactInfo) {
      alert("Please select a method and provide contact information.");
      return;
    }
  
    if (sendVia === "email") {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(contactInfo)) {
        alert("❌ Invalid email address. Please provide a valid email.");
        return;
      }
      sendEmail(contactInfo, password_);
    } else if (sendVia === "sms") {
      sendSMS(contactInfo, password_);
    }
  };
  

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  return (
    <div className="app-container">
      <h1>Strong Password Generator</h1>
      <p>Generate secure, random passwords easily!</p>

      <div className="password-display">
        <input
          type="text"
          value={isPrivate ? '' : password} // If private, don't display password
          readOnly
          placeholder="Your secure password"
        />
        <button onClick={copyToClipboard}>
          <i className="fas fa-copy"></i>
        </button>
      </div>

      <div className="password-options">
        <label>Password Length: {length}</label>
        <input
          type="range"
          min="8"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>

      <div className="checkbox-options">
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />{' '}
          Include Uppercase
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />{' '}
          Include Lowercase
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />{' '}
          Include Numbers
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />{' '}
          Include Symbols
        </label>
      </div>

      <div className="private-option">
        <label>
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={() => setIsPrivate(!isPrivate)} // Toggle the private option
          />{' '}
          Send password privately (via Email or SMS)
        </label>

        {isPrivate && (
          <div className='private-options'>
            <label>
              <input
                type="radio"
                name="sendMethod"
                value="email"
                checked={sendVia === 'email'}
                onChange={() => setSendVia('email')}
              />{' '}
              Send via Email
            </label>
            <label>
              <input
                type="radio"
                name="sendMethod"
                value="sms"
                checked={sendVia === 'sms'}
                onChange={() => setSendVia('sms')}
              />{' '}
              Send via SMS
            </label>

            {sendVia && (
              <div className='private-options-send-via'>
                <label>
                  {sendVia === 'email' ? 'Email Address' : 'Phone Number'}:
                </label>
                <input
                  type="text"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder={`Enter ${sendVia === 'email' ? 'email' : 'phone number (+2567XXXXXXXX)'}`}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <button className="generate-btn" onClick={generatePassword}>
        Generate Password
      </button>
      <p className="note">* Ensure your passwords are stored securely.</p>
    </div>
  );
}
