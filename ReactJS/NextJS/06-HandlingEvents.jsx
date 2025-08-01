// Exercise 6: Handling Events
// React events are SyntheticEvents - cross-browser wrappers around native events

import React from 'react';

// Basic event handling
function BasicEvents() {
  const [message, setMessage] = React.useState('No button clicked yet');

  const handleClick = (e) => {
    console.log('Button clicked!', e);
    setMessage('Button was clicked!');
  };

  const handleDoubleClick = () => {
    setMessage('Button was double-clicked!');
  };

  const handleMouseEnter = () => {
    setMessage('Mouse entered the button!');
  };

  const handleMouseLeave = () => {
    setMessage('Mouse left the button!');
  };

  return (
    <div style={{ margin: '16px', padding: '16px', border: '1px solid #ccc' }}>
      <h3>Basic Event Handling</h3>
      <p>Status: {message}</p>
      <button
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Interactive Button
      </button>
    </div>
  );
}

// Passing arguments to event handlers
function EventArguments() {
  const [lastClicked, setLastClicked] = React.useState('');

  const handleButtonClick = (buttonName, e) => {
    console.log(`${buttonName} button clicked`, e);
    setLastClicked(buttonName);
  };

  const buttons = ['Home', 'About', 'Contact', 'Services'];

  return (
    <div style={{ margin: '16px', padding: '16px', border: '1px solid #ccc' }}>
      <h3>Passing Arguments to Event Handlers</h3>
      <p>Last clicked: {lastClicked || 'None'}</p>
      <div>
        {buttons.map(buttonName => (
          <button
            key={buttonName}
            onClick={(e) => handleButtonClick(buttonName, e)}
            style={{
              margin: '4px',
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {buttonName}
          </button>
        ))}
      </div>
    </div>
  );
}

// Form events
function FormEvents() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
    subscribe: false,
    country: 'usa'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Form submitted:', formData);
    alert(`Form submitted!\nName: ${formData.name}\nEmail: ${formData.email}`);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
      subscribe: false,
      country: 'usa'
    });
  };

  return (
    <div style={{ margin: '16px', padding: '16px', border: '1px solid #ccc' }}>
      <h3>Form Event Handling</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '8px' }}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={{ marginLeft: '8px', padding: '4px' }}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: '8px' }}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{ marginLeft: '8px', padding: '4px' }}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: '8px' }}>
          <label>
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              style={{ marginLeft: '8px', padding: '4px', width: '200px', height: '60px' }}
              placeholder="Enter your message..."
            />
          </label>
        </div>

        <div style={{ marginBottom: '8px' }}>
          <label>
            <input
              type="checkbox"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleInputChange}
              style={{ marginRight: '8px' }}
            />
            Subscribe to newsletter
          </label>
        </div>

        <div style={{ marginBottom: '8px' }}>
          <label>
            Country:
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              style={{ marginLeft: '8px', padding: '4px' }}
            >
              <option value="usa">USA</option>
              <option value="canada">Canada</option>
              <option value="uk">UK</option>
              <option value="australia">Australia</option>
            </select>
          </label>
        </div>

        <div>
          <button type="submit" style={{ marginRight: '8px', padding: '8px 16px' }}>
            Submit
          </button>
          <button type="button" onClick={handleReset} style={{ padding: '8px 16px' }}>
            Reset
          </button>
        </div>
      </form>

      <div style={{ marginTop: '16px', padding: '8px', backgroundColor: '#f8f9fa' }}>
        <h4>Current Form Data:</h4>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
}

// Keyboard events
function KeyboardEvents() {
  const [keyInfo, setKeyInfo] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  const handleKeyDown = (e) => {
    setKeyInfo(`Key Down: ${e.key} (Code: ${e.keyCode})`);
  };

  const handleKeyPress = (e) => {
    console.log('Key pressed:', e.key);
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      alert(`You pressed Enter! Input value: ${inputValue}`);
    }
  };

  return (
    <div style={{ margin: '16px', padding: '16px', border: '1px solid #ccc' }}>
      <h3>Keyboard Event Handling</h3>
      <p>Key Info: {keyInfo}</p>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onKeyPress={handleKeyPress}
        onKeyUp={handleKeyUp}
        placeholder="Type something... (Press Enter to see alert)"
        style={{ padding: '8px', width: '300px' }}
      />
      <p>Current input: {inputValue}</p>
    </div>
  );
}

// Event object properties
function EventProperties() {
  const [eventDetails, setEventDetails] = React.useState({});

  const handleEvent = (e) => {
    setEventDetails({
      type: e.type,
      target: e.target.tagName,
      clientX: e.clientX,
      clientY: e.clientY,
      button: e.button,
      altKey: e.altKey,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey
    });
  };

  return (
    <div style={{ margin: '16px', padding: '16px', border: '1px solid #ccc' }}>
      <h3>Event Object Properties</h3>
      <div
        onClick={handleEvent}
        onMouseMove={handleEvent}
        style={{
          width: '300px',
          height: '100px',
          backgroundColor: '#e9ecef',
          border: '2px dashed #adb5bd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'crosshair'
        }}
      >
        Click or move mouse over this area
      </div>
      
      <div style={{ marginTop: '8px', fontSize: '14px' }}>
        <strong>Event Details:</strong>
        <pre style={{ fontSize: '12px' }}>
          {JSON.stringify(eventDetails, null, 2)}
        </pre>
      </div>
    </div>
  );
}

// Exercise: Interactive Calculator
function Calculator() {
  const [display, setDisplay] = React.useState('0');
  const [previousValue, setPreviousValue] = React.useState(null);
  const [operation, setOperation] = React.useState(null);
  const [waitingForOperand, setWaitingForOperand] = React.useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const buttonStyle = {
    width: '60px',
    height: '60px',
    fontSize: '18px',
    margin: '2px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  return (
    <div style={{ margin: '16px', padding: '16px', border: '1px solid #ccc' }}>
      <h3>Interactive Calculator</h3>
      <div style={{ width: '250px', margin: '0 auto' }}>
        <div style={{
          width: '100%',
          height: '60px',
          fontSize: '24px',
          textAlign: 'right',
          paddingRight: '10px',
          lineHeight: '60px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          marginBottom: '8px'
        }}>
          {display}
        </div>
        
        <div>
          <button onClick={clear} style={{...buttonStyle, backgroundColor: '#dc3545', color: 'white'}}>
            C
          </button>
          <button onClick={() => inputOperation('/')} style={{...buttonStyle, backgroundColor: '#6c757d', color: 'white'}}>
            ÷
          </button>
          <button onClick={() => inputOperation('*')} style={{...buttonStyle, backgroundColor: '#6c757d', color: 'white'}}>
            ×
          </button>
          <button onClick={() => inputOperation('-')} style={{...buttonStyle, backgroundColor: '#6c757d', color: 'white'}}>
            -
          </button>
        </div>
        
        <div>
          <button onClick={() => inputNumber(7)} style={{...buttonStyle, backgroundColor: '#e9ecef'}}>7</button>
          <button onClick={() => inputNumber(8)} style={{...buttonStyle, backgroundColor: '#e9ecef'}}>8</button>
          <button onClick={() => inputNumber(9)} style={{...buttonStyle, backgroundColor: '#e9ecef'}}>9</button>
          <button onClick={() => inputOperation('+')} style={{...buttonStyle, backgroundColor: '#6c757d', color: 'white'}}>
            +
          </button>
        </div>
        
        <div>
          <button onClick={() => inputNumber(4)} style={{...buttonStyle, backgroundColor: '#e9ecef'}}>4</button>
          <button onClick={() => inputNumber(5)} style={{...buttonStyle, backgroundColor: '#e9ecef'}}>5</button>
          <button onClick={() => inputNumber(6)} style={{...buttonStyle, backgroundColor: '#e9ecef'}}>6</button>
          <button onClick={performCalculation} style={{...buttonStyle, backgroundColor: '#007bff', color: 'white', gridRow: 'span 2'}}>
            =
          </button>
        </div>
        
        <div>
          <button onClick={() => inputNumber(1)} style={{...buttonStyle, backgroundColor: '#e9ecef'}}>1</button>
          <button onClick={() => inputNumber(2)} style={{...buttonStyle, backgroundColor: '#e9ecef'}}>2</button>
          <button onClick={() => inputNumber(3)} style={{...buttonStyle, backgroundColor: '#e9ecef'}}>3</button>
        </div>
        
        <div>
          <button onClick={() => inputNumber(0)} style={{...buttonStyle, backgroundColor: '#e9ecef', width: '124px'}}>
            0
          </button>
          <button onClick={() => setDisplay(display + '.')} style={{...buttonStyle, backgroundColor: '#e9ecef'}}>
            .
          </button>
        </div>
      </div>
    </div>
  );
}

// Main App component
function App() {
  return (
    <div>
      <h1>Handling Events Examples</h1>
      <BasicEvents />
      <EventArguments />
      <FormEvents />
      <KeyboardEvents />
      <EventProperties />
      <Calculator />
    </div>
  );
}

export default App; 