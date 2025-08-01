// Exercise 9: Forms
// Controlled components and form handling in React

import React from 'react';

// Basic controlled component
function ControlledInput() {
  const [value, setValue] = React.useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted value: ${value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input 
          type="text" 
          value={value} 
          onChange={handleChange}
          style={{ marginLeft: '8px', padding: '4px' }}
        />
      </label>
      <button 
        type="submit"
        style={{
          marginLeft: '8px',
          padding: '4px 8px',
          backgroundColor: '#2196f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Submit
      </button>
      <p>Current value: {value}</p>
    </form>
  );
}

// Textarea controlled component
function TextareaForm() {
  const [value, setValue] = React.useState('Please write an essay about your favorite DOM element.');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Essay submitted: ${value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Essay:
        <textarea 
          value={value} 
          onChange={handleChange}
          style={{
            marginLeft: '8px',
            padding: '4px',
            width: '300px',
            height: '100px',
            display: 'block',
            marginTop: '8px'
          }}
        />
      </label>
      <button 
        type="submit"
        style={{
          marginTop: '8px',
          padding: '8px 16px',
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Submit Essay
      </button>
    </form>
  );
}

// Select controlled component
function SelectForm() {
  const [value, setValue] = React.useState('coconut');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Your favorite flavor is: ${value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Pick your favorite flavor:
        <select value={value} onChange={handleChange} style={{ marginLeft: '8px', padding: '4px' }}>
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
      </label>
      <button 
        type="submit"
        style={{
          marginLeft: '8px',
          padding: '4px 8px',
          backgroundColor: '#ff9800',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Submit
      </button>
    </form>
  );
}

// Multiple inputs form
function MultipleInputsForm() {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    age: 18,
    gender: 'other',
    newsletter: false,
    comments: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(`Welcome ${formData.firstName} ${formData.lastName}!\nForm data logged to console.`);
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      age: 18,
      gender: 'other',
      newsletter: false,
      comments: ''
    });
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '20px',
      margin: '16px',
      borderRadius: '8px'
    }}>
      <h3>User Registration Form</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              style={{
                marginLeft: '8px',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              style={{
                marginLeft: '8px',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                marginLeft: '8px',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="1"
              max="120"
              style={{
                marginLeft: '8px',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                width: '80px'
              }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label>
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              style={{
                marginLeft: '8px',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label>
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              style={{ marginRight: '8px' }}
            />
            Subscribe to newsletter
          </label>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label>
            Comments:
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              placeholder="Any additional comments..."
              style={{
                marginLeft: '8px',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                width: '300px',
                height: '80px',
                display: 'block',
                marginTop: '4px'
              }}
            />
          </label>
        </div>

        <div>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '8px'
            }}
          >
            Register
          </button>
          <button
            type="button"
            onClick={handleReset}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        </div>
      </form>

      {/* Form Preview */}
      <div style={{
        marginTop: '20px',
        padding: '16px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px'
      }}>
        <h4>Form Preview:</h4>
        <pre style={{ fontSize: '14px' }}>
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  );
}

// File input form
function FileUploadForm() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Create preview for images
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      alert(`File selected: ${selectedFile.name}\nSize: ${selectedFile.size} bytes\nType: ${selectedFile.type}`);
    } else {
      alert('Please select a file first!');
    }
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '20px',
      margin: '16px',
      borderRadius: '8px'
    }}>
      <h3>File Upload Form</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label>
            Choose a file:
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*,.pdf,.doc,.docx"
              style={{
                marginLeft: '8px',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </label>
        </div>

        {selectedFile && (
          <div style={{ marginBottom: '16px' }}>
            <h4>File Info:</h4>
            <p><strong>Name:</strong> {selectedFile.name}</p>
            <p><strong>Size:</strong> {(selectedFile.size / 1024).toFixed(2)} KB</p>
            <p><strong>Type:</strong> {selectedFile.type}</p>
            <p><strong>Last Modified:</strong> {new Date(selectedFile.lastModified).toLocaleString()}</p>
          </div>
        )}

        {preview && (
          <div style={{ marginBottom: '16px' }}>
            <h4>Preview:</h4>
            <img
              src={preview}
              alt="Preview"
              style={{
                maxWidth: '200px',
                maxHeight: '200px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </div>
        )}

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Upload File
        </button>
      </form>
    </div>
  );
}

// Form validation example
function ValidationForm() {
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  });

  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    }

    // Password validation
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Form is valid! Account created successfully.');
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '20px',
      margin: '16px',
      borderRadius: '8px'
    }}>
      <h3>Form with Validation</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={{
                marginLeft: '8px',
                padding: '8px',
                border: `1px solid ${errors.username ? '#f44336' : '#ccc'}`,
                borderRadius: '4px',
                width: '200px'
              }}
            />
          </label>
          {errors.username && (
            <p style={{ color: '#f44336', fontSize: '14px', margin: '4px 0 0 0' }}>
              {errors.username}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                marginLeft: '8px',
                padding: '8px',
                border: `1px solid ${errors.email ? '#f44336' : '#ccc'}`,
                borderRadius: '4px',
                width: '200px'
              }}
            />
          </label>
          {errors.email && (
            <p style={{ color: '#f44336', fontSize: '14px', margin: '4px 0 0 0' }}>
              {errors.email}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                marginLeft: '8px',
                padding: '8px',
                border: `1px solid ${errors.password ? '#f44336' : '#ccc'}`,
                borderRadius: '4px',
                width: '200px'
              }}
            />
          </label>
          {errors.password && (
            <p style={{ color: '#f44336', fontSize: '14px', margin: '4px 0 0 0' }}>
              {errors.password}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                marginLeft: '8px',
                padding: '8px',
                border: `1px solid ${errors.confirmPassword ? '#f44336' : '#ccc'}`,
                borderRadius: '4px',
                width: '200px'
              }}
            />
          </label>
          {errors.confirmPassword && (
            <p style={{ color: '#f44336', fontSize: '14px', margin: '4px 0 0 0' }}>
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Create Account
        </button>
      </form>

      {/* Validation Status */}
      <div style={{
        marginTop: '16px',
        padding: '12px',
        backgroundColor: Object.keys(errors).length === 0 ? '#e8f5e8' : '#ffebee',
        borderRadius: '4px'
      }}>
        <h4>Validation Status:</h4>
        {Object.keys(errors).length === 0 ? (
          <p style={{ color: '#4caf50' }}>✓ All fields are valid</p>
        ) : (
          <ul style={{ color: '#f44336', margin: 0 }}>
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Main App component
function App() {
  return (
    <div>
      <h1>Forms in React Examples</h1>

      {/* Basic examples */}
      <div style={{ margin: '16px', padding: '16px', border: '1px solid #ccc' }}>
        <h3>Basic Controlled Input</h3>
        <ControlledInput />
      </div>

      <div style={{ margin: '16px', padding: '16px', border: '1px solid #ccc' }}>
        <h3>Textarea Example</h3>
        <TextareaForm />
      </div>

      <div style={{ margin: '16px', padding: '16px', border: '1px solid #ccc' }}>
        <h3>Select Example</h3>
        <SelectForm />
      </div>

      {/* Complex examples */}
      <MultipleInputsForm />
      <FileUploadForm />
      <ValidationForm />
    </div>
  );
}

export default App; 