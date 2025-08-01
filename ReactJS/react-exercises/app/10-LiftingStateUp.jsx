// Exercise 10: Lifting State Up
// When several components need to reflect the same changing data, 
// lift the shared state up to their closest common ancestor

import React from 'react';

// Example 1: Temperature Calculator
function BoilingVerdict({ celsius }) {
  if (celsius >= 100) {
    return <p style={{color: 'red'}}>The water would boil.</p>;
  }
  return <p style={{color: 'blue'}}>The water would not boil.</p>;
}

function TemperatureInput({ scale, temperature, onTemperatureChange }) {
  const handleChange = (e) => {
    onTemperatureChange(e.target.value);
  };

  const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
  };

  return (
    <fieldset style={{ margin: '8px', padding: '16px', border: '1px solid #ccc' }}>
      <legend>Enter temperature in {scaleNames[scale]}:</legend>
      <input 
        value={temperature}
        onChange={handleChange}
        style={{ padding: '8px', width: '100px' }}
      />
    </fieldset>
  );
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function TemperatureCalculator() {
  const [temperature, setTemperature] = React.useState('');
  const [scale, setScale] = React.useState('c');

  const handleCelsiusChange = (temperature) => {
    setScale('c');
    setTemperature(temperature);
  };

  const handleFahrenheitChange = (temperature) => {
    setScale('f');
    setTemperature(temperature);
  };

  const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '20px',
      margin: '16px',
      borderRadius: '8px'
    }}>
      <h3>Temperature Calculator</h3>
      <p>This example shows how state is lifted up to synchronize two inputs.</p>
      
      <TemperatureInput
        scale="c"
        temperature={celsius}
        onTemperatureChange={handleCelsiusChange}
      />
      
      <TemperatureInput
        scale="f"
        temperature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange}
      />
      
      <BoilingVerdict celsius={parseFloat(celsius)} />
    </div>
  );
}

// Example 2: Shopping Cart System
function Product({ product, onAddToCart }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '16px',
      margin: '8px',
      borderRadius: '8px',
      width: '200px'
    }}>
      <h4>{product.name}</h4>
      <p>${product.price}</p>
      <p>Stock: {product.stock}</p>
      <button
        onClick={() => onAddToCart(product)}
        disabled={product.stock === 0}
        style={{
          padding: '8px 16px',
          backgroundColor: product.stock > 0 ? '#4caf50' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: product.stock > 0 ? 'pointer' : 'not-allowed'
        }}
      >
        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
}

function Cart({ items, onUpdateQuantity, onRemoveItem }) {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div style={{
        border: '1px solid #ccc',
        padding: '20px',
        margin: '16px',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h3>Shopping Cart</h3>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '20px',
      margin: '16px',
      borderRadius: '8px'
    }}>
      <h3>Shopping Cart ({items.length} items)</h3>
      
      {items.map(item => (
        <div
          key={item.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px',
            borderBottom: '1px solid #eee'
          }}
        >
          <div>
            <h4>{item.name}</h4>
            <p>${item.price} each</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              style={{
                padding: '4px 8px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              -
            </button>
            
            <span>Qty: {item.quantity}</span>
            
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              style={{
                padding: '4px 8px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              +
            </button>
            
            <button
              onClick={() => onRemoveItem(item.id)}
              style={{
                padding: '4px 8px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginLeft: '8px'
              }}
            >
              Remove
            </button>
          </div>
          
          <div>
            <strong>${(item.price * item.quantity).toFixed(2)}</strong>
          </div>
        </div>
      ))}
      
      <div style={{
        marginTop: '16px',
        padding: '16px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px',
        textAlign: 'right'
      }}>
        <h3>Total: ${total.toFixed(2)}</h3>
        <button
          style={{
            padding: '12px 24px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

function ShoppingApp() {
  const [products, setProducts] = React.useState([
    { id: 1, name: 'Laptop', price: 999, stock: 5 },
    { id: 2, name: 'Phone', price: 599, stock: 10 },
    { id: 3, name: 'Tablet', price: 399, stock: 0 },
    { id: 4, name: 'Headphones', price: 99, stock: 15 }
  ]);

  const [cartItems, setCartItems] = React.useState([]);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    // Update product stock
    setProducts(products.map(p =>
      p.id === product.id
        ? { ...p, stock: p.stock - 1 }
        : p
    ));
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveItem(itemId);
      return;
    }

    const currentItem = cartItems.find(item => item.id === itemId);
    const quantityDiff = newQuantity - currentItem.quantity;

    setCartItems(cartItems.map(item =>
      item.id === itemId
        ? { ...item, quantity: newQuantity }
        : item
    ));

    // Update product stock
    setProducts(products.map(p =>
      p.id === itemId
        ? { ...p, stock: p.stock - quantityDiff }
        : p
    ));
  };

  const handleRemoveItem = (itemId) => {
    const itemToRemove = cartItems.find(item => item.id === itemId);
    
    setCartItems(cartItems.filter(item => item.id !== itemId));
    
    // Return stock to product
    setProducts(products.map(p =>
      p.id === itemId
        ? { ...p, stock: p.stock + itemToRemove.quantity }
        : p
    ));
  };

  return (
    <div>
      <h3>Shopping System with Lifted State</h3>
      <p>State is lifted up to coordinate between products and cart.</p>
      
      <div>
        <h4>Products</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {products.map(product => (
            <Product
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      <Cart
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

// Example 3: Multi-step Form
function PersonalInfo({ data, onChange, errors }) {
  return (
    <div>
      <h4>Personal Information</h4>
      <div style={{ marginBottom: '12px' }}>
        <label>
          First Name:
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            style={{
              marginLeft: '8px',
              padding: '8px',
              border: `1px solid ${errors.firstName ? 'red' : '#ccc'}`,
              borderRadius: '4px'
            }}
          />
        </label>
        {errors.firstName && <p style={{color: 'red', fontSize: '14px'}}>{errors.firstName}</p>}
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label>
          Last Name:
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            style={{
              marginLeft: '8px',
              padding: '8px',
              border: `1px solid ${errors.lastName ? 'red' : '#ccc'}`,
              borderRadius: '4px'
            }}
          />
        </label>
        {errors.lastName && <p style={{color: 'red', fontSize: '14px'}}>{errors.lastName}</p>}
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label>
          Email:
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            style={{
              marginLeft: '8px',
              padding: '8px',
              border: `1px solid ${errors.email ? 'red' : '#ccc'}`,
              borderRadius: '4px'
            }}
          />
        </label>
        {errors.email && <p style={{color: 'red', fontSize: '14px'}}>{errors.email}</p>}
      </div>
    </div>
  );
}

function AddressInfo({ data, onChange, errors }) {
  return (
    <div>
      <h4>Address Information</h4>
      <div style={{ marginBottom: '12px' }}>
        <label>
          Street Address:
          <input
            type="text"
            value={data.street}
            onChange={(e) => onChange('street', e.target.value)}
            style={{
              marginLeft: '8px',
              padding: '8px',
              border: `1px solid ${errors.street ? 'red' : '#ccc'}`,
              borderRadius: '4px',
              width: '200px'
            }}
          />
        </label>
        {errors.street && <p style={{color: 'red', fontSize: '14px'}}>{errors.street}</p>}
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label>
          City:
          <input
            type="text"
            value={data.city}
            onChange={(e) => onChange('city', e.target.value)}
            style={{
              marginLeft: '8px',
              padding: '8px',
              border: `1px solid ${errors.city ? 'red' : '#ccc'}`,
              borderRadius: '4px'
            }}
          />
        </label>
        {errors.city && <p style={{color: 'red', fontSize: '14px'}}>{errors.city}</p>}
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label>
          ZIP Code:
          <input
            type="text"
            value={data.zipCode}
            onChange={(e) => onChange('zipCode', e.target.value)}
            style={{
              marginLeft: '8px',
              padding: '8px',
              border: `1px solid ${errors.zipCode ? 'red' : '#ccc'}`,
              borderRadius: '4px',
              width: '100px'
            }}
          />
        </label>
        {errors.zipCode && <p style={{color: 'red', fontSize: '14px'}}>{errors.zipCode}</p>}
      </div>
    </div>
  );
}

function FormSummary({ data }) {
  return (
    <div>
      <h4>Review Your Information</h4>
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '16px',
        borderRadius: '4px',
        border: '1px solid #dee2e6'
      }}>
        <h5>Personal Information:</h5>
        <p><strong>Name:</strong> {data.firstName} {data.lastName}</p>
        <p><strong>Email:</strong> {data.email}</p>
        
        <h5>Address:</h5>
        <p><strong>Street:</strong> {data.street}</p>
        <p><strong>City:</strong> {data.city}</p>
        <p><strong>ZIP:</strong> {data.zipCode}</p>
      </div>
    </div>
  );
}

function MultiStepForm() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    zipCode: ''
  });
  const [errors, setErrors] = React.useState({});

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    }

    if (step === 2) {
      if (!formData.street.trim()) newErrors.street = 'Street address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    if (validateStep(2)) {
      alert('Form submitted successfully!');
      console.log('Form data:', formData);
    }
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '20px',
      margin: '16px',
      borderRadius: '8px'
    }}>
      <h3>Multi-Step Form with Lifted State</h3>
      
      {/* Progress indicator */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <span style={{
            color: currentStep >= 1 ? '#4caf50' : '#ccc',
            fontWeight: currentStep === 1 ? 'bold' : 'normal'
          }}>
            1. Personal Info
          </span>
          <span style={{
            color: currentStep >= 2 ? '#4caf50' : '#ccc',
            fontWeight: currentStep === 2 ? 'bold' : 'normal'
          }}>
            2. Address
          </span>
          <span style={{
            color: currentStep >= 3 ? '#4caf50' : '#ccc',
            fontWeight: currentStep === 3 ? 'bold' : 'normal'
          }}>
            3. Review
          </span>
        </div>
        <div style={{
          width: '100%',
          height: '4px',
          backgroundColor: '#e0e0e0',
          borderRadius: '2px'
        }}>
          <div style={{
            width: `${((currentStep - 1) / 2) * 100}%`,
            height: '100%',
            backgroundColor: '#4caf50',
            borderRadius: '2px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Form steps */}
      {currentStep === 1 && (
        <PersonalInfo
          data={formData}
          onChange={handleFieldChange}
          errors={errors}
        />
      )}

      {currentStep === 2 && (
        <AddressInfo
          data={formData}
          onChange={handleFieldChange}
          errors={errors}
        />
      )}

      {currentStep === 3 && <FormSummary data={formData} />}

      {/* Navigation buttons */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          style={{
            padding: '10px 20px',
            backgroundColor: currentStep === 1 ? '#ccc' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: currentStep === 1 ? 'not-allowed' : 'pointer'
          }}
        >
          Previous
        </button>

        {currentStep < 3 ? (
          <button
            onClick={handleNext}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

// Main App component
function App() {
  return (
    <div>
      <h1>Lifting State Up Examples</h1>
      <p>
        These examples demonstrate how to lift state up to the closest common ancestor 
        when multiple components need to share the same changing data.
      </p>

      <TemperatureCalculator />
      <ShoppingApp />
      <MultiStepForm />
    </div>
  );
}

export default App; 