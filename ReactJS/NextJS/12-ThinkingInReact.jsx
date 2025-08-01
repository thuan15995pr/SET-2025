// Exercise 12: Thinking in React
// This exercise demonstrates the React thinking process by building a product search app

import React from 'react';

// Step 1: Break the UI into a component hierarchy
// We'll build a filterable product table

// Sample data
const PRODUCTS = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];

// Step 2: Build a static version (no interactivity)
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2" style={{
        backgroundColor: '#f8f9fa',
        padding: '8px',
        textAlign: 'left',
        fontWeight: 'bold'
      }}>
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? 
    product.name : 
    <span style={{ color: 'red' }}>{product.name}</span>;

  return (
    <tr>
      <td style={{ padding: '4px 8px' }}>{name}</td>
      <td style={{ padding: '4px 8px' }}>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    // Filter by search text
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }

    // Filter by stock status
    if (inStockOnly && !product.stocked) {
      return;
    }

    // Add category header if this is a new category
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }

    // Add product row
    rows.push(
      <ProductRow
        product={product}
        key={product.name}
      />
    );

    lastCategory = product.category;
  });

  return (
    <table style={{
      width: '100%',
      borderCollapse: 'collapse',
      border: '1px solid #ddd'
    }}>
      <thead>
        <tr style={{ backgroundColor: '#f8f9fa' }}>
          <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
          <th style={{ padding: '8px', textAlign: 'left' }}>Price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
  return (
    <form style={{ marginBottom: '16px' }}>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginBottom: '8px'
        }}
      />
      <label style={{ display: 'block' }}>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
          style={{ marginRight: '8px' }}
        />
        Only show products in stock
      </label>
    </form>
  );
}

// Step 3: Identify the minimal (but complete) representation of UI state
// Step 4: Identify where your state should live
// Step 5: Add inverse data flow

function FilterableProductTable({ products }) {
  // State: filterText and inStockOnly
  const [filterText, setFilterText] = React.useState('');
  const [inStockOnly, setInStockOnly] = React.useState(false);

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '20px',
      borderRadius: '8px',
      margin: '16px',
      maxWidth: '400px'
    }}>
      <h3>Filterable Product Table</h3>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

// Additional example: Contact List following the same thinking process
const CONTACTS = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '555-0101', category: 'Work' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '555-0102', category: 'Work' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', phone: '555-0103', category: 'Personal' },
  { id: 4, name: 'Diana Ross', email: 'diana@example.com', phone: '555-0104', category: 'Personal' },
  { id: 5, name: 'Edward Davis', email: 'edward@example.com', phone: '555-0105', category: 'Work' },
  { id: 6, name: 'Fiona Green', email: 'fiona@example.com', phone: '555-0106', category: 'Personal' }
];

function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px 0',
      backgroundColor: 'white'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h4 style={{ margin: '0 0 8px 0' }}>{contact.name}</h4>
          <p style={{ margin: '4px 0', color: '#666' }}>📧 {contact.email}</p>
          <p style={{ margin: '4px 0', color: '#666' }}>📞 {contact.phone}</p>
          <span style={{
            display: 'inline-block',
            padding: '2px 8px',
            fontSize: '12px',
            backgroundColor: contact.category === 'Work' ? '#e3f2fd' : '#f3e5f5',
            color: contact.category === 'Work' ? '#1976d2' : '#7b1fa2',
            borderRadius: '12px',
            marginTop: '8px'
          }}>
            {contact.category}
          </span>
        </div>
        <div>
          <button
            onClick={() => onEdit(contact)}
            style={{
              padding: '4px 8px',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '4px',
              fontSize: '12px'
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(contact.id)}
            style={{
              padding: '4px 8px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function ContactList({ contacts, searchTerm, selectedCategory, onEdit, onDelete }) {
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || contact.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (filteredContacts.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
        No contacts found matching your criteria.
      </div>
    );
  }

  return (
    <div>
      {filteredContacts.map(contact => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

function ContactSearch({ searchTerm, selectedCategory, onSearchChange, onCategoryChange }) {
  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '16px'
    }}>
      <div style={{ marginBottom: '12px' }}>
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>
      <div>
        <label style={{ marginRight: '16px' }}>
          <input
            type="radio"
            name="category"
            value="All"
            checked={selectedCategory === 'All'}
            onChange={(e) => onCategoryChange(e.target.value)}
            style={{ marginRight: '4px' }}
          />
          All
        </label>
        <label style={{ marginRight: '16px' }}>
          <input
            type="radio"
            name="category"
            value="Work"
            checked={selectedCategory === 'Work'}
            onChange={(e) => onCategoryChange(e.target.value)}
            style={{ marginRight: '4px' }}
          />
          Work
        </label>
        <label>
          <input
            type="radio"
            name="category"
            value="Personal"
            checked={selectedCategory === 'Personal'}
            onChange={(e) => onCategoryChange(e.target.value)}
            style={{ marginRight: '4px' }}
          />
          Personal
        </label>
      </div>
    </div>
  );
}

function ContactForm({ contact, onSave, onCancel }) {
  const [formData, setFormData] = React.useState(
    contact || { name: '', email: '', phone: '', category: 'Personal' }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      onSave(formData);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        width: '400px',
        maxWidth: '90vw'
      }}>
        <h3>{contact ? 'Edit Contact' : 'Add New Contact'}</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            >
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {contact ? 'Update' : 'Add'} Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ContactManager() {
  const [contacts, setContacts] = React.useState(CONTACTS);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [editingContact, setEditingContact] = React.useState(null);
  const [showForm, setShowForm] = React.useState(false);

  const handleAddContact = () => {
    setEditingContact(null);
    setShowForm(true);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleDeleteContact = (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setContacts(contacts.filter(contact => contact.id !== contactId));
    }
  };

  const handleSaveContact = (contactData) => {
    if (editingContact) {
      // Update existing contact
      setContacts(contacts.map(contact =>
        contact.id === editingContact.id
          ? { ...contactData, id: editingContact.id }
          : contact
      ));
    } else {
      // Add new contact
      const newContact = {
        ...contactData,
        id: Math.max(...contacts.map(c => c.id)) + 1
      };
      setContacts([...contacts, newContact]);
    }
    setShowForm(false);
    setEditingContact(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingContact(null);
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '20px',
      margin: '16px',
      maxWidth: '600px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>Contact Manager</h3>
        <button
          onClick={handleAddContact}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Contact
        </button>
      </div>

      <ContactSearch
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />

      <ContactList
        contacts={contacts}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
      />

      {showForm && (
        <ContactForm
          contact={editingContact}
          onSave={handleSaveContact}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
}

// Main component demonstrating the thinking process
function ThinkingInReactDemo() {
  return (
    <div>
      <h1>Thinking in React</h1>
      <div style={{
        backgroundColor: '#e3f2fd',
        padding: '16px',
        borderRadius: '8px',
        margin: '16px 0',
        border: '1px solid #2196f3'
      }}>
        <h3>The React Thinking Process:</h3>
        <ol>
          <li><strong>Break the UI into a component hierarchy</strong> - Identify components and their relationships</li>
          <li><strong>Build a static version</strong> - Create components that render the UI without interactivity</li>
          <li><strong>Identify the minimal UI state</strong> - Figure out what data changes over time</li>
          <li><strong>Identify where state should live</strong> - Find the common parent component</li>
          <li><strong>Add inverse data flow</strong> - Let child components update parent state</li>
        </ol>
      </div>

      <h2>Example 1: Filterable Product Table</h2>
      <p>This example follows the classic React tutorial pattern:</p>
      <FilterableProductTable products={PRODUCTS} />

      <h2>Example 2: Contact Manager</h2>
      <p>A more complex example that demonstrates the same thinking process:</p>
      <ContactManager />

      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '16px',
        borderRadius: '8px',
        margin: '32px 0',
        border: '1px solid #dee2e6'
      }}>
        <h3>Key Principles Demonstrated:</h3>
        <ul>
          <li><strong>Single Responsibility:</strong> Each component has one clear purpose</li>
          <li><strong>Component Hierarchy:</strong> Components are nested in a logical structure</li>
          <li><strong>Props Down, Events Up:</strong> Data flows down, events bubble up</li>
          <li><strong>State Management:</strong> State lives in the appropriate common ancestor</li>
          <li><strong>Controlled Components:</strong> Form inputs are controlled by React state</li>
          <li><strong>Separation of Concerns:</strong> Presentation and logic are properly separated</li>
        </ul>
      </div>

      <div style={{
        backgroundColor: '#fff3e0',
        padding: '16px',
        borderRadius: '8px',
        margin: '16px 0',
        border: '1px solid #ff9800'
      }}>
        <h3>🎯 Exercise for You:</h3>
        <p>Try building your own app following this process:</p>
        <ol>
          <li>Choose a simple app idea (todo list, expense tracker, etc.)</li>
          <li>Draw out the component hierarchy</li>
          <li>Build the static version first</li>
          <li>Add state and interactivity step by step</li>
        </ol>
      </div>
    </div>
  );
}

export default ThinkingInReactDemo; 