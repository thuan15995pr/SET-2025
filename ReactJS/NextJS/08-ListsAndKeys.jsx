// Exercise 8: Lists and Keys
// Rendering multiple components and the importance of keys

import React from 'react';

// Basic list rendering
function NumberList({ numbers }) {
  const listItems = numbers.map((number, index) => (
    <li key={index}>{number}</li>
  ));
  return <ul>{listItems}</ul>;
}

// Better list rendering with unique keys
function ImprovedNumberList({ numbers }) {
  return (
    <ul>
      {numbers.map((number, index) => (
        <li key={`number-${index}-${number}`}>
          {number}
        </li>
      ))}
    </ul>
  );
}

// Rendering objects with unique IDs
function UserList({ users }) {
  return (
    <div>
      <h3>User List</h3>
      {users.map(user => (
        <div
          key={user.id}
          style={{
            border: '1px solid #ddd',
            padding: '8px',
            margin: '4px',
            borderRadius: '4px'
          }}
        >
          <h4>{user.name}</h4>
          <p>Email: {user.email}</p>
          <p>Age: {user.age}</p>
        </div>
      ))}
    </div>
  );
}

// Keys with extracting components
function ListItem({ value }) {
  return <li>{value}</li>;
}

function ExtractedList({ numbers }) {
  return (
    <ul>
      {numbers.map((number, index) => (
        <ListItem key={index} value={number} />
      ))}
    </ul>
  );
}

// Exercise: Dynamic Todo List
function TodoList() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false },
    { id: 3, text: 'Deploy to production', completed: false }
  ]);
  const [inputValue, setInputValue] = React.useState('');
  const [filter, setFilter] = React.useState('all'); // all, active, completed

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue,
          completed: false
        }
      ]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '16px',
      margin: '16px',
      borderRadius: '8px'
    }}>
      <h3>Todo List with Keys</h3>
      
      {/* Add new todo */}
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          style={{
            padding: '8px',
            marginRight: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Todo
        </button>
      </div>

      {/* Filter buttons */}
      <div style={{ marginBottom: '16px' }}>
        {['all', 'active', 'completed'].map(filterType => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            style={{
              padding: '6px 12px',
              margin: '0 4px',
              backgroundColor: filter === filterType ? '#2196f3' : '#f0f0f0',
              color: filter === filterType ? 'white' : 'black',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {filterType}
          </button>
        ))}
      </div>

      {/* Todo list */}
      <div>
        {filteredTodos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>
            No todos to show
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px',
                  margin: '4px 0',
                  backgroundColor: todo.completed ? '#e8f5e8' : '#f8f9fa',
                  border: '1px solid #dee2e6',
                  borderRadius: '4px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    style={{ marginRight: '8px' }}
                  />
                  <span
                    style={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? '#666' : 'black'
                    }}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Todo statistics */}
      <div style={{
        marginTop: '16px',
        padding: '8px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px'
      }}>
        <p>
          Total: {todos.length} | 
          Active: {todos.filter(t => !t.completed).length} | 
          Completed: {todos.filter(t => t.completed).length}
        </p>
      </div>
    </div>
  );
}

// Exercise: Product Catalog
function ProductCatalog() {
  const [products, setProducts] = React.useState([
    { id: 1, name: 'Smartphone', category: 'Electronics', price: 699, inStock: true },
    { id: 2, name: 'Laptop', category: 'Electronics', price: 1299, inStock: true },
    { id: 3, name: 'Coffee Mug', category: 'Home', price: 15, inStock: false },
    { id: 4, name: 'Desk Chair', category: 'Furniture', price: 199, inStock: true },
    { id: 5, name: 'Book', category: 'Education', price: 25, inStock: true },
    { id: 6, name: 'Headphones', category: 'Electronics', price: 99, inStock: false }
  ]);

  const [sortBy, setSortBy] = React.useState('name');
  const [filterCategory, setFilterCategory] = React.useState('all');
  const [showInStockOnly, setShowInStockOnly] = React.useState(false);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredAndSortedProducts = products
    .filter(product => {
      if (filterCategory !== 'all' && product.category !== filterCategory) {
        return false;
      }
      if (showInStockOnly && !product.inStock) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return 0;
    });

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '16px',
      margin: '16px',
      borderRadius: '8px'
    }}>
      <h3>Product Catalog</h3>

      {/* Controls */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '16px',
        padding: '16px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px'
      }}>
        <div>
          <label>
            Sort by: 
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ marginLeft: '8px', padding: '4px' }}
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="category">Category</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Category: 
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{ marginLeft: '8px', padding: '4px' }}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={showInStockOnly}
              onChange={(e) => setShowInStockOnly(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            In Stock Only
          </label>
        </div>
      </div>

      {/* Product grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '16px'
      }}>
        {filteredAndSortedProducts.map(product => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ddd',
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: product.inStock ? 'white' : '#f5f5f5'
            }}
          >
            <h4>{product.name}</h4>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p style={{
              color: product.inStock ? '#4caf50' : '#f44336',
              fontWeight: 'bold'
            }}>
              {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
            </p>
            <button
              disabled={!product.inStock}
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: product.inStock ? '#2196f3' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: product.inStock ? 'pointer' : 'not-allowed'
              }}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        ))}
      </div>

      {filteredAndSortedProducts.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
          No products match your filters
        </p>
      )}

      <p style={{ marginTop: '16px', color: '#666' }}>
        Showing {filteredAndSortedProducts.length} of {products.length} products
      </p>
    </div>
  );
}

// Exercise: Key importance demonstration
function KeyImportanceDemo() {
  const [items, setItems] = React.useState([
    { id: 1, name: 'Apple', value: '' },
    { id: 2, name: 'Banana', value: '' },
    { id: 3, name: 'Cherry', value: '' }
  ]);

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: `Item ${items.length + 1}`,
      value: ''
    };
    setItems([newItem, ...items]); // Add to beginning to show key importance
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItemValue = (id, value) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, value } : item
    ));
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '16px',
      margin: '16px',
      borderRadius: '8px'
    }}>
      <h3>Key Importance Demo</h3>
      <p>
        Try typing in the input fields, then add/remove items to see how keys help React 
        identify which items have changed.
      </p>

      <button
        onClick={addItem}
        style={{
          padding: '8px 16px',
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '16px'
        }}
      >
        Add Item (at beginning)
      </button>

      <div>
        <h4>With Proper Keys (using item.id):</h4>
        {items.map(item => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
              padding: '8px',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px'
            }}
          >
            <span style={{ minWidth: '100px' }}>{item.name}:</span>
            <input
              type="text"
              value={item.value}
              onChange={(e) => updateItemValue(item.id, e.target.value)}
              placeholder="Type something..."
              style={{
                padding: '4px',
                marginRight: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                flexGrow: 1
              }}
            />
            <button
              onClick={() => removeItem(item.id)}
              style={{
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer'
              }}
            >
              Remove
            </button>
          </div>
        ))}

        <h4 style={{ marginTop: '24px' }}>With Index as Keys (BAD):</h4>
        <p style={{ color: '#f44336', fontSize: '14px' }}>
          Notice how input values get mixed up when you add/remove items:
        </p>
        {items.map((item, index) => (
          <div
            key={index} // BAD: Using index as key
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
              padding: '8px',
              backgroundColor: '#ffebee',
              borderRadius: '4px'
            }}
          >
            <span style={{ minWidth: '100px' }}>{item.name}:</span>
            <input
              type="text"
              value={item.value}
              onChange={(e) => updateItemValue(item.id, e.target.value)}
              placeholder="Type something..."
              style={{
                padding: '4px',
                marginRight: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                flexGrow: 1
              }}
            />
            <button
              onClick={() => removeItem(item.id)}
              style={{
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer'
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main App component
function App() {
  const numbers = [1, 2, 3, 4, 5];
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', age: 35 }
  ];

  return (
    <div>
      <h1>Lists and Keys Examples</h1>

      {/* Basic examples */}
      <div style={{ margin: '16px', padding: '16px', border: '1px solid #ccc' }}>
        <h3>Basic List Rendering</h3>
        <h4>Using Index as Key (acceptable for static lists):</h4>
        <NumberList numbers={numbers} />
        
        <h4>Improved with Better Keys:</h4>
        <ImprovedNumberList numbers={numbers} />
      </div>

      <div style={{ margin: '16px', padding: '16px', border: '1px solid #ccc' }}>
        <h3>Objects with Unique IDs</h3>
        <UserList users={users} />
      </div>

      <div style={{ margin: '16px', padding: '16px', border: '1px solid #ccc' }}>
        <h3>Extracted Components</h3>
        <ExtractedList numbers={numbers} />
      </div>

      {/* Interactive exercises */}
      <TodoList />
      <ProductCatalog />
      <KeyImportanceDemo />
    </div>
  );
}

export default App; 