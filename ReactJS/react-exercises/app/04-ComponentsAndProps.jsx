// Exercise 4: Components and Props
// Components let you split the UI into independent, reusable pieces

import React from 'react';

// Function component
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

class WelcomeClass extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

// Component with multiple props
function UserCard(props) {
  return (
    <div className="user-card" style={{
      border: '1px solid #ccc',
      padding: '16px',
      margin: '8px',
      borderRadius: '8px'
    }}>
      <img 
        src={props.avatar} 
        alt={props.name}
        style={{width: '50px', height: '50px', borderRadius: '50%'}}
      />
      <h3>{props.name}</h3>
      <p>Email: {props.email}</p>
      <p>Age: {props.age}</p>
    </div>
  );
}

// Component with default props
function Button(props) {
  return (
    <button 
      style={{
        backgroundColor: props.color || 'blue',
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
      onClick={props.onClick}
    >
      {props.children || 'Click me'}
    </button>
  );
}

// Using defaultProps
Button.defaultProps = {
  color: 'blue'
};

// Component composition
function App() {
  const users = [
    {
      id: 1,
      name: 'Sara',
      email: 'sara@example.com',
      age: 25,
      avatar: 'https://via.placeholder.com/50'
    },
    {
      id: 2,
      name: 'Cahal',
      email: 'cahal@example.com',
      age: 30,
      avatar: 'https://via.placeholder.com/50'
    },
    {
      id: 3,
      name: 'Edite',
      email: 'edite@example.com',
      age: 28,
      avatar: 'https://via.placeholder.com/50'
    }
  ];

  const handleButtonClick = (buttonName) => {
    alert(`${buttonName} button clicked!`);
  };

  return (
    <div>
      <h1>Components and Props Examples</h1>
      
      {/* Using function component */}
      <Welcome name="Sara" />
      
      {/* Using class component */}
      <WelcomeClass name="Cahal" />
      
      {/* Multiple components */}
      <div>
        <Welcome name="Sara" />
        <Welcome name="Cahal" />
        <Welcome name="Edite" />
      </div>

      {/* Components with multiple props */}
      <h2>User Cards</h2>
      {users.map(user => (
        <UserCard
          key={user.id}
          name={user.name}
          email={user.email}
          age={user.age}
          avatar={user.avatar}
        />
      ))}

      {/* Button components with different props */}
      <h2>Button Examples</h2>
      <Button onClick={() => handleButtonClick('Default')}>
        Default Button
      </Button>
      <Button 
        color="green" 
        onClick={() => handleButtonClick('Green')}
      >
        Green Button
      </Button>
      <Button 
        color="red" 
        onClick={() => handleButtonClick('Red')}
      >
        Red Button
      </Button>
      <Button onClick={() => handleButtonClick('No Text')} />
    </div>
  );
}

// Exercise: Create your own components
function ProductCard({ name, price, image, onAddToCart }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '16px',
      margin: '8px',
      borderRadius: '8px',
      maxWidth: '200px'
    }}>
      <img 
        src={image} 
        alt={name}
        style={{width: '100%', height: '150px', objectFit: 'cover'}}
      />
      <h3>{name}</h3>
      <p>${price}</p>
      <Button 
        color="green" 
        onClick={() => onAddToCart(name)}
      >
        Add to Cart
      </Button>
    </div>
  );
}

// Exercise component
function ShoppingExample() {
  const products = [
    { id: 1, name: 'Laptop', price: 999, image: 'https://via.placeholder.com/200' },
    { id: 2, name: 'Phone', price: 599, image: 'https://via.placeholder.com/200' },
    { id: 3, name: 'Tablet', price: 399, image: 'https://via.placeholder.com/200' }
  ];

  const handleAddToCart = (productName) => {
    alert(`${productName} added to cart!`);
  };

  return (
    <div>
      <h2>Shopping Exercise</h2>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

// Main component that includes everything
function MainApp() {
  return (
    <div>
      <App />
      <ShoppingExample />
    </div>
  );
}

export default MainApp; 