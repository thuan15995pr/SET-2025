// Exercise 7: Conditional Rendering
// In React, you can render different elements based on conditions

import React from 'react';

// Basic conditional rendering with if statements
function WelcomeMessage({ isLoggedIn, username }) {
  if (isLoggedIn) {
    return <h1>Welcome back, {username}!</h1>;
  }
  return <h1>Please sign up.</h1>;
}

// Using ternary operator
function LoginStatus({ isLoggedIn }) {
  return (
    <div>
      <p>
        The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
      </p>
    </div>
  );
}

// Using logical && operator
function Mailbox({ unreadMessages }) {
  return (
    <div>
      <h2>Hello!</h2>
      {unreadMessages.length > 0 && (
        <p>You have {unreadMessages.length} unread messages.</p>
      )}
    </div>
  );
}

// Preventing component from rendering
function WarningBanner({ warn }) {
  if (!warn) {
    return null;
  }

  return (
    <div style={{
      backgroundColor: '#ffebee',
      color: '#c62828',
      padding: '16px',
      border: '1px solid #e57373',
      borderRadius: '4px',
      margin: '8px 0'
    }}>
      Warning!
    </div>
  );
}

// Complex conditional rendering example
function UserDashboard({ user, isLoading, error }) {
  // Loading state
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p>Loading...</p>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }}></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{
        backgroundColor: '#ffebee',
        color: '#c62828',
        padding: '16px',
        border: '1px solid #e57373',
        borderRadius: '4px',
        textAlign: 'center'
      }}>
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  // Success state
  if (user) {
    return (
      <div style={{
        backgroundColor: '#e8f5e8',
        padding: '16px',
        border: '1px solid #4caf50',
        borderRadius: '4px'
      }}>
        <h3>Welcome, {user.name}!</h3>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        {user.role === 'admin' && (
          <button style={{
            backgroundColor: '#ff9800',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Admin Panel
          </button>
        )}
      </div>
    );
  }

  // Default state
  return (
    <div>
      <p>No user data available</p>
    </div>
  );
}

// Exercise: Weather App with conditional rendering
function WeatherApp() {
  const [weather, setWeather] = React.useState(null);
  const [city, setCity] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const weatherData = {
        city: city,
        temperature: Math.floor(Math.random() * 30) + 10,
        condition: ['Sunny', 'Cloudy', 'Rainy', 'Snowy'][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 100),
        windSpeed: Math.floor(Math.random() * 50)
      };
      setWeather(weatherData);
      setLoading(false);
    }, 1500);
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Sunny': return '☀️';
      case 'Cloudy': return '☁️';
      case 'Rainy': return '🌧️';
      case 'Snowy': return '❄️';
      default: return '🌤️';
    }
  };

  const getWeatherColor = (condition) => {
    switch (condition) {
      case 'Sunny': return '#ffeb3b';
      case 'Cloudy': return '#9e9e9e';
      case 'Rainy': return '#2196f3';
      case 'Snowy': return '#e1f5fe';
      default: return '#fff';
    }
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '20px',
      margin: '16px',
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <h3>Weather App</h3>
      
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          style={{
            padding: '8px',
            marginRight: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={fetchWeather}
          disabled={!city.trim() || loading}
          style={{
            padding: '8px 16px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Get Weather
        </button>
      </div>

      {loading && (
        <div>
          <p>Fetching weather data...</p>
          <div style={{
            width: '30px',
            height: '30px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #2196f3',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
        </div>
      )}

      {!loading && weather && (
        <div
          style={{
            backgroundColor: getWeatherColor(weather.condition),
            padding: '20px',
            borderRadius: '8px',
            color: weather.condition === 'Sunny' ? '#333' : '#000'
          }}
        >
          <h2>{getWeatherIcon(weather.condition)} {weather.city}</h2>
          <p style={{ fontSize: '24px', margin: '8px 0' }}>
            {weather.temperature}°C
          </p>
          <p style={{ fontSize: '18px', margin: '8px 0' }}>
            {weather.condition}
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '16px' }}>
            <div>
              <p><strong>Humidity</strong></p>
              <p>{weather.humidity}%</p>
            </div>
            <div>
              <p><strong>Wind Speed</strong></p>
              <p>{weather.windSpeed} km/h</p>
            </div>
          </div>
        </div>
      )}

      {!loading && !weather && (
        <p style={{ color: '#666' }}>
          Enter a city name and click "Get Weather" to see the forecast
        </p>
      )}
    </div>
  );
}

// Exercise: Shopping Cart with conditional rendering
function ShoppingCart() {
  const [items, setItems] = React.useState([]);
  const [showCart, setShowCart] = React.useState(false);

  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 599 },
    { id: 3, name: 'Headphones', price: 199 },
    { id: 4, name: 'Tablet', price: 399 }
  ];

  const addToCart = (product) => {
    const existingItem = items.find(item => item.id === product.id);
    if (existingItem) {
      setItems(items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setItems([...items, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setItems(items.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '20px',
      margin: '16px',
      borderRadius: '8px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Shopping Store</h3>
        <button
          onClick={() => setShowCart(!showCart)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cart ({getTotalItems()})
        </button>
      </div>

      {!showCart ? (
        // Product List View
        <div>
          <h4>Products</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {products.map(product => (
              <div
                key={product.id}
                style={{
                  border: '1px solid #ddd',
                  padding: '16px',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}
              >
                <h4>{product.name}</h4>
                <p>${product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#2196f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Cart View
        <div>
          <h4>Shopping Cart</h4>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>Your cart is empty</p>
              <button
                onClick={() => setShowCart(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#2196f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div>
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
                    <p>Quantity: {item.quantity} × ${item.price} = ${item.quantity * item.price}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              <div style={{
                marginTop: '16px',
                padding: '16px',
                backgroundColor: '#f0f0f0',
                borderRadius: '8px'
              }}>
                <h3>Total: ${getTotalPrice()}</h3>
                <button
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    marginRight: '8px'
                  }}
                >
                  Checkout
                </button>
                <button
                  onClick={() => setItems([])}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Main App component
function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [showWarning, setShowWarning] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const messages = ['React', 'Re: React', 'Re:Re: React'];

  const simulateLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setUser({
        name: 'John Doe',
        email: 'john@example.com',
        role: Math.random() > 0.5 ? 'admin' : 'user'
      });
      setIsLoggedIn(true);
      setLoading(false);
    }, 2000);
  };

  const simulateError = () => {
    setLoading(true);
    setTimeout(() => {
      setError('Failed to load user data. Please try again.');
      setLoading(false);
    }, 2000);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setError(null);
  };

  return (
    <div>
      <h1>Conditional Rendering Examples</h1>
      
      {/* Basic conditional rendering */}
      <div style={{ margin: '16px', padding: '16px', border: '1px solid #ccc' }}>
        <h3>Basic Conditional Rendering</h3>
        <WelcomeMessage isLoggedIn={isLoggedIn} username="John" />
        <LoginStatus isLoggedIn={isLoggedIn} />
        
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '8px'
          }}
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>

      {/* Logical && operator */}
      <div style={{ margin: '16px', padding: '16px', border: '1px solid #ccc' }}>
        <h3>Logical && Operator</h3>
        <Mailbox unreadMessages={messages} />
      </div>

      {/* Preventing rendering */}
      <div style={{ margin: '16px', padding: '16px', border: '1px solid #ccc' }}>
        <h3>Preventing Component Rendering</h3>
        <WarningBanner warn={showWarning} />
        <button
          onClick={() => setShowWarning(!showWarning)}
          style={{
            padding: '8px 16px',
            backgroundColor: showWarning ? '#f44336' : '#ff9800',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {showWarning ? 'Hide Warning' : 'Show Warning'}
        </button>
      </div>

      {/* Complex conditional rendering */}
      <div style={{ margin: '16px', padding: '16px', border: '1px solid #ccc' }}>
        <h3>Complex Conditional Rendering</h3>
        <UserDashboard user={user} isLoading={loading} error={error} />
        
        <div style={{ marginTop: '16px' }}>
          <button
            onClick={simulateLogin}
            disabled={loading}
            style={{
              padding: '8px 16px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '8px'
            }}
          >
            Simulate Login
          </button>
          <button
            onClick={simulateError}
            disabled={loading}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '8px'
            }}
          >
            Simulate Error
          </button>
          <button
            onClick={logout}
            style={{
              padding: '8px 16px',
              backgroundColor: '#9e9e9e',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Weather App Exercise */}
      <WeatherApp />

      {/* Shopping Cart Exercise */}
      <ShoppingCart />
    </div>
  );
}

export default App; 