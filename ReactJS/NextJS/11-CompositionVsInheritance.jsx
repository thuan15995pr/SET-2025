// Exercise 11: Composition vs Inheritance
// React has a powerful composition model, and we recommend using composition 
// instead of inheritance to reuse code between components

import React from 'react';

// Example 1: Basic Composition with children prop
function FancyBorder({ children, color }) {
  return (
    <div style={{
      border: `3px solid ${color}`,
      borderRadius: '8px',
      padding: '16px',
      margin: '8px'
    }}>
      {children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1>Welcome</h1>
      <p>Thank you for visiting our spacecraft!</p>
    </FancyBorder>
  );
}

// Example 2: Multiple "holes" in components
function SplitPane({ left, right }) {
  return (
    <div style={{
      display: 'flex',
      height: '200px',
      border: '1px solid #ccc',
      borderRadius: '4px'
    }}>
      <div style={{
        flex: 1,
        padding: '16px',
        borderRight: '1px solid #ccc'
      }}>
        {left}
      </div>
      <div style={{
        flex: 1,
        padding: '16px'
      }}>
        {right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <div>
          <h3>Left Panel</h3>
          <p>This is the left content</p>
        </div>
      }
      right={
        <div>
          <h3>Right Panel</h3>
          <p>This is the right content</p>
        </div>
      }
    />
  );
}

// Example 3: Specialization through composition
function Dialog({ title, message, children }) {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      minWidth: '300px'
    }}>
      <h2>{title}</h2>
      <p>{message}</p>
      {children}
    </div>
  );
}

function WelcomeDialogSpecialized() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!"
    >
      <button style={{
        padding: '8px 16px',
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        OK
      </button>
    </Dialog>
  );
}

function SignUpDialog() {
  const [login, setLogin] = React.useState('');

  const handleChange = (e) => {
    setLogin(e.target.value);
  };

  const handleSignUp = () => {
    alert(`Welcome aboard, ${login}!`);
  };

  return (
    <Dialog
      title="Mars Exploration Program"
      message="How should we refer to you?"
    >
      <input
        value={login}
        onChange={handleChange}
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginBottom: '16px'
        }}
      />
      <button
        onClick={handleSignUp}
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
        Sign Me Up!
      </button>
    </Dialog>
  );
}

// Example 4: Higher-Order Components (HOC) - Composition Pattern
function withLoading(WrappedComponent) {
  return function WithLoadingComponent(props) {
    if (props.isLoading) {
      return (
        <div style={{
          textAlign: 'center',
          padding: '20px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
          <p>Loading...</p>
        </div>
      );
    }
    return <WrappedComponent {...props} />;
  };
}

function UserList({ users }) {
  return (
    <div>
      <h3>User List</h3>
      {users.map(user => (
        <div key={user.id} style={{
          padding: '8px',
          border: '1px solid #ddd',
          margin: '4px',
          borderRadius: '4px'
        }}>
          <h4>{user.name}</h4>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

const UserListWithLoading = withLoading(UserList);

// Example 5: Render Props Pattern - Another Composition Technique
function DataFetcher({ render }) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setData([
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return render({ data, loading });
}

// Example 6: Card Layout Component with Composition
function Card({ header, children, footer, variant = 'default' }) {
  const cardStyles = {
    default: {
      border: '1px solid #ddd',
      backgroundColor: 'white'
    },
    success: {
      border: '1px solid #4caf50',
      backgroundColor: '#e8f5e8'
    },
    warning: {
      border: '1px solid #ff9800',
      backgroundColor: '#fff3e0'
    },
    error: {
      border: '1px solid #f44336',
      backgroundColor: '#ffebee'
    }
  };

  return (
    <div style={{
      ...cardStyles[variant],
      borderRadius: '8px',
      padding: '0',
      margin: '16px',
      overflow: 'hidden'
    }}>
      {header && (
        <div style={{
          padding: '16px',
          borderBottom: '1px solid #eee',
          fontWeight: 'bold'
        }}>
          {header}
        </div>
      )}
      <div style={{ padding: '16px' }}>
        {children}
      </div>
      {footer && (
        <div style={{
          padding: '16px',
          borderTop: '1px solid #eee',
          backgroundColor: 'rgba(0,0,0,0.03)'
        }}>
          {footer}
        </div>
      )}
    </div>
  );
}

// Example 7: Layout Components
function Page({ sidebar, content }) {
  return (
    <div style={{
      display: 'flex',
      minHeight: '400px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      overflow: 'hidden',
      margin: '16px'
    }}>
      <div style={{
        width: '200px',
        backgroundColor: '#f8f9fa',
        padding: '16px',
        borderRight: '1px solid #dee2e6'
      }}>
        {sidebar}
      </div>
      <div style={{
        flex: 1,
        padding: '16px'
      }}>
        {content}
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <nav>
      <h4>Navigation</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ padding: '8px', cursor: 'pointer' }}>Home</li>
        <li style={{ padding: '8px', cursor: 'pointer' }}>About</li>
        <li style={{ padding: '8px', cursor: 'pointer' }}>Contact</li>
        <li style={{ padding: '8px', cursor: 'pointer' }}>Services</li>
      </ul>
    </nav>
  );
}

function MainContent() {
  return (
    <main>
      <h2>Welcome to Our Site</h2>
      <p>This is the main content area.</p>
      <p>
        Notice how we're using composition to combine different components
        together rather than using inheritance.
      </p>
    </main>
  );
}

// Example 8: Advanced Composition - Compound Components
function Tabs({ children, defaultActiveTab = 0 }) {
  const [activeTab, setActiveTab] = React.useState(defaultActiveTab);

  const tabs = React.Children.toArray(children);

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      margin: '16px'
    }}>
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #ccc',
        backgroundColor: '#f8f9fa'
      }}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              padding: '12px 24px',
              border: 'none',
              backgroundColor: activeTab === index ? 'white' : 'transparent',
              borderBottom: activeTab === index ? '2px solid #2196f3' : '2px solid transparent',
              cursor: 'pointer',
              fontWeight: activeTab === index ? 'bold' : 'normal'
            }}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div style={{ padding: '16px' }}>
        {tabs[activeTab]}
      </div>
    </div>
  );
}

function Tab({ label, children }) {
  return <div>{children}</div>;
}

// Main demonstration component
function CompositionDemo() {
  const [showWelcomeDialog, setShowWelcomeDialog] = React.useState(false);
  const [showSignUpDialog, setShowSignUpDialog] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' }
  ];

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <div>
      <h1>Composition vs Inheritance Examples</h1>
      <p>
        React uses composition instead of inheritance. Here are various composition patterns:
      </p>

      {/* Basic Composition */}
      <h2>1. Basic Composition with Children</h2>
      <WelcomeDialog />

      {/* Split Pane */}
      <h2>2. Multiple Content Areas</h2>
      <App />

      {/* Specialized Dialogs */}
      <h2>3. Specialized Components</h2>
      <div>
        <button
          onClick={() => setShowWelcomeDialog(true)}
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
          Show Welcome Dialog
        </button>
        <button
          onClick={() => setShowSignUpDialog(true)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Show Sign Up Dialog
        </button>
      </div>

      {showWelcomeDialog && (
        <div>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 999
            }}
            onClick={() => setShowWelcomeDialog(false)}
          />
          <WelcomeDialogSpecialized />
        </div>
      )}

      {showSignUpDialog && (
        <div>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 999
            }}
            onClick={() => setShowSignUpDialog(false)}
          />
          <SignUpDialog />
        </div>
      )}

      {/* Higher-Order Components */}
      <h2>4. Higher-Order Components (HOC)</h2>
      <button
        onClick={simulateLoading}
        style={{
          padding: '8px 16px',
          backgroundColor: '#ff9800',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '16px'
        }}
      >
        Simulate Loading
      </button>
      <UserListWithLoading users={users} isLoading={isLoading} />

      {/* Render Props */}
      <h2>5. Render Props Pattern</h2>
      <DataFetcher
        render={({ data, loading }) => (
          <div>
            {loading ? (
              <p>Fetching users...</p>
            ) : (
              <div>
                <h3>Fetched Users:</h3>
                {data.map(user => (
                  <div key={user.id} style={{
                    padding: '8px',
                    border: '1px solid #ddd',
                    margin: '4px',
                    borderRadius: '4px'
                  }}>
                    {user.name} - {user.email}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      />

      {/* Card Components */}
      <h2>6. Card Layout Composition</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Card
          header="Default Card"
          footer={<button>Action</button>}
        >
          <p>This is a default card with header and footer.</p>
        </Card>

        <Card
          variant="success"
          header="Success Card"
        >
          <p>This is a success card variant.</p>
        </Card>

        <Card
          variant="warning"
          header="Warning Card"
        >
          <p>This is a warning card variant.</p>
        </Card>

        <Card
          variant="error"
          header="Error Card"
        >
          <p>This is an error card variant.</p>
        </Card>
      </div>

      {/* Page Layout */}
      <h2>7. Page Layout Composition</h2>
      <Page
        sidebar={<Sidebar />}
        content={<MainContent />}
      />

      {/* Compound Components */}
      <h2>8. Compound Components (Tabs)</h2>
      <Tabs defaultActiveTab={0}>
        <Tab label="Tab 1">
          <h3>Content for Tab 1</h3>
          <p>This is the content for the first tab.</p>
        </Tab>
        <Tab label="Tab 2">
          <h3>Content for Tab 2</h3>
          <p>This is the content for the second tab.</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </Tab>
        <Tab label="Tab 3">
          <h3>Content for Tab 3</h3>
          <p>This is the content for the third tab.</p>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Action Button
          </button>
        </Tab>
      </Tabs>

      <div style={{
        marginTop: '32px',
        padding: '16px',
        backgroundColor: '#e3f2fd',
        borderRadius: '8px',
        border: '1px solid #2196f3'
      }}>
        <h3>Key Takeaways:</h3>
        <ul>
          <li><strong>Composition over Inheritance:</strong> React favors composition patterns</li>
          <li><strong>Children Prop:</strong> Use children to pass JSX into components</li>
          <li><strong>Multiple Slots:</strong> Use named props for multiple content areas</li>
          <li><strong>Specialization:</strong> Create specific components by composing generic ones</li>
          <li><strong>HOCs:</strong> Wrap components to add functionality</li>
          <li><strong>Render Props:</strong> Share code using props whose value is a function</li>
          <li><strong>Compound Components:</strong> Create families of components that work together</li>
        </ul>
      </div>
    </div>
  );
}

export default CompositionDemo; 