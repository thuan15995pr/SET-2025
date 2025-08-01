// Exercise 1: Hello World
// This demonstrates the most basic React example

import React from 'react';
import ReactDOM from 'react-dom';

// The simplest React component
function HelloWorld() {
  return <h1>Hello, world!</h1>;
}

// Alternative: using a const with arrow function
const HelloWorldArrow = () => {
  return <h1>Hello, world with arrow function!</h1>;
};

// Exercise: Create your own greeting component
function PersonalGreeting() {
  const name = "Your Name"; // Change this to your name
  return <h1>Hello, {name}!</h1>;
}

// Exercise: Component with current time
function CurrentTime() {
  const now = new Date().toLocaleTimeString();
  return <h2>Current time: {now}</h2>;
}

// Main App component combining all examples
function App() {
  return (
    <div>
      <HelloWorld />
      <HelloWorldArrow />
      <PersonalGreeting />
      <CurrentTime />
    </div>
  );
}

export default App;

// To run: ReactDOM.render(<App />, document.getElementById('root')); 