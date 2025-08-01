// Exercise 5: State and Lifecycle
// State allows components to remember and change information over time

import React from 'react';

// Function component with useState hook
function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}

// Multiple state variables
function UserProfile() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [age, setAge] = React.useState(18);

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '16px',
      margin: '16px',
      borderRadius: '8px'
    }}>
      <h3>User Profile</h3>
      <div>
        <label>
          Name: 
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            style={{marginLeft: '8px'}}
          />
        </label>
      </div>
      <div>
        <label>
          Email: 
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            style={{marginLeft: '8px'}}
          />
        </label>
      </div>
      <div>
        <label>
          Age: 
          <input 
            type="number" 
            value={age} 
            onChange={(e) => setAge(parseInt(e.target.value))}
            style={{marginLeft: '8px'}}
          />
        </label>
      </div>
      <div style={{marginTop: '16px', padding: '8px', backgroundColor: '#f0f0f0'}}>
        <h4>Preview:</h4>
        <p>Name: {name || 'Not provided'}</p>
        <p>Email: {email || 'Not provided'}</p>
        <p>Age: {age}</p>
      </div>
    </div>
  );
}

// useEffect hook for lifecycle events
function Clock() {
  const [time, setTime] = React.useState(new Date());

  // componentDidMount and componentWillUnmount equivalent
  React.useEffect(() => {
    console.log('Clock component mounted');
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup function (componentWillUnmount equivalent)
    return () => {
      console.log('Clock component will unmount');
      clearInterval(timerID);
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      <h2>Current Time</h2>
      <p>{time.toLocaleTimeString()}</p>
    </div>
  );
}

// useEffect with dependencies
function DataFetcher() {
  const [userId, setUserId] = React.useState(1);
  const [userData, setUserData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    // Simulate API call
    const fetchUser = async () => {
      try {
        // Simulated API response
        const fakeUserData = {
          id: userId,
          name: `User ${userId}`,
          email: `user${userId}@example.com`,
          company: `Company ${userId}`
        };
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setUserData(fakeUserData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // This effect runs when userId changes

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '16px',
      margin: '16px',
      borderRadius: '8px'
    }}>
      <h3>User Data Fetcher</h3>
      <div>
        <label>
          User ID: 
          <select 
            value={userId} 
            onChange={(e) => setUserId(parseInt(e.target.value))}
            style={{marginLeft: '8px'}}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
      </div>
      
      {loading ? (
        <p>Loading user data...</p>
      ) : userData ? (
        <div style={{marginTop: '16px', padding: '8px', backgroundColor: '#f0f0f0'}}>
          <h4>User Information:</h4>
          <p>ID: {userData.id}</p>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Company: {userData.company}</p>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}

// Class component example (legacy but still used)
class ClassCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      name: 'Class Component'
    };
  }

  componentDidMount() {
    console.log('ClassCounter mounted');
    document.title = `Count: ${this.state.count}`;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('ClassCounter updated');
    if (prevState.count !== this.state.count) {
      document.title = `Count: ${this.state.count}`;
    }
  }

  componentWillUnmount() {
    console.log('ClassCounter will unmount');
    document.title = 'React App';
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div style={{
        border: '1px solid #ccc',
        padding: '16px',
        margin: '16px',
        borderRadius: '8px'
      }}>
        <h3>{this.state.name}</h3>
        <p>Count: {this.state.count}</p>
        <button onClick={this.incrementCount}>
          Increment
        </button>
      </div>
    );
  }
}

// Exercise: Todo List with state
function TodoList() {
  const [todos, setTodos] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
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

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '16px',
      margin: '16px',
      borderRadius: '8px'
    }}>
      <h3>Todo List</h3>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a todo..."
        />
        <button onClick={addTodo} style={{marginLeft: '8px'}}>
          Add
        </button>
      </div>
      
      <ul style={{listStyle: 'none', padding: 0}}>
        {todos.map(todo => (
          <li 
            key={todo.id} 
            style={{
              padding: '8px',
              margin: '4px 0',
              backgroundColor: todo.completed ? '#e8f5e8' : '#f8f8f8',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button 
              onClick={() => deleteTodo(todo.id)}
              style={{backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px'}}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      <p>Total todos: {todos.length} | Completed: {todos.filter(t => t.completed).length}</p>
    </div>
  );
}

// Main App component
function App() {
  const [showClock, setShowClock] = React.useState(true);

  return (
    <div>
      <h1>State and Lifecycle Examples</h1>
      
      <Counter />
      <UserProfile />
      
      <div>
        <button onClick={() => setShowClock(!showClock)}>
          {showClock ? 'Hide Clock' : 'Show Clock'}
        </button>
        {showClock && <Clock />}
      </div>
      
      <DataFetcher />
      <ClassCounter />
      <TodoList />
    </div>
  );
}

export default App; 