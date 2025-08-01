// Exercise 2: Introducing JSX
// JSX is a syntax extension to JavaScript that lets you write HTML-like code in React

import React from 'react';

// Basic JSX examples
function JSXBasics() {
  const name = 'Josh Perez';
  const user = {
    firstName: 'Harper',
    lastName: 'Perez'
  };

  // Function to format user name
  function formatName(user) {
    return user.firstName + ' ' + user.lastName;
  }

  // JSX can embed expressions
  const element1 = <h1>Hello, {name}!</h1>;
  
  // JSX with function calls
  const element2 = <h1>Hello, {formatName(user)}!</h1>;
  
  // JSX with attributes
  const element3 = <div tabIndex="0">Focusable div</div>;
  
  // JSX with expressions in attributes
  const avatarUrl = 'https://via.placeholder.com/100';
  const element4 = <img src={avatarUrl} alt="Avatar" />;

  return (
    <div>
      {element1}
      {element2}
      {element3}
      {element4}
    </div>
  );
}

// JSX prevents injection attacks
function JSXSafety() {
  const userInput = '<script>alert("XSS Attack!")</script>';
  // This is safe - React escapes values embedded in JSX
  return <p>User input: {userInput}</p>;
}

// JSX represents objects
function JSXObjects() {
  // These two examples are identical:
  const element1 = (
    <h1 className="greeting">
      Hello, world!
    </h1>
  );

  // Babel compiles JSX to React.createElement() calls
  const element2 = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
  );

  return (
    <div>
      <h2>JSX Compilation Examples:</h2>
      {element1}
      {element2}
    </div>
  );
}

// Exercise: Practice JSX
function JSXExercise() {
  const product = {
    name: 'Laptop',
    price: 999,
    inStock: true,
    image: 'https://via.placeholder.com/150'
  };

  const discount = 0.1;
  const finalPrice = product.price * (1 - discount);

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <img src={product.image} alt={product.name} />
      <p>Original Price: ${product.price}</p>
      <p>Discounted Price: ${finalPrice.toFixed(2)}</p>
      <p>Status: {product.inStock ? 'In Stock' : 'Out of Stock'}</p>
      <button disabled={!product.inStock}>
        {product.inStock ? 'Add to Cart' : 'Notify When Available'}
      </button>
    </div>
  );
}

// Main component
function App() {
  return (
    <div>
      <h1>JSX Examples</h1>
      <JSXBasics />
      <JSXSafety />
      <JSXObjects />
      <JSXExercise />
    </div>
  );
}

export default App; 