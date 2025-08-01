// Exercise 3: Rendering Elements
// Elements are the smallest building blocks of React apps

import React from 'react';
import ReactDOM from 'react-dom';

// Basic element rendering
function BasicElement() {
  const element = <h1>Hello, world</h1>;
  return element;
}

// Updating the rendered element
function UpdatingElement() {
  const [time, setTime] = React.useState(new Date());

  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h2>It is {time.toLocaleTimeString()}.</h2>
    </div>
  );
}

// React only updates what's necessary
function EfficientUpdating() {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState('World');

  return (
    <div>
      <h2>Hello {name}!</h2>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p><small>Notice how only the changing parts update, not the entire component!</small></p>
    </div>
  );
}

// Exercise: Create a live counter
function LiveCounter() {
  const [counter, setCounter] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  React.useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setCounter(counter => counter + 1);
      }, 100);
    } else if (!isRunning && counter !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, counter]);

  return (
    <div>
      <h3>Live Counter: {counter}</h3>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={() => setCounter(0)}>Reset</button>
    </div>
  );
}

// Exercise: Element with conditional styling
function ConditionalStyling() {
  const [isHighlighted, setIsHighlighted] = React.useState(false);
  
  const elementStyle = {
    padding: '20px',
    border: '2px solid',
    borderColor: isHighlighted ? 'red' : 'blue',
    backgroundColor: isHighlighted ? '#ffeeee' : '#eeeeff',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={elementStyle}>
      <p>This element changes style when highlighted!</p>
      <button onClick={() => setIsHighlighted(!isHighlighted)}>
        {isHighlighted ? 'Remove Highlight' : 'Highlight'}
      </button>
    </div>
  );
}

// Main App component
function App() {
  return (
    <div>
      <h1>Rendering Elements Examples</h1>
      <BasicElement />
      <UpdatingElement />
      <EfficientUpdating />
      <LiveCounter />
      <ConditionalStyling />
    </div>
  );
}

export default App;

// Note: In a real app, you would render like this:
// ReactDOM.render(<App />, document.getElementById('root')); 