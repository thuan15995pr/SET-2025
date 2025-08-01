// React Main Concepts - Exercise Navigator
// Complete implementation of all 12 main concepts from React documentation

import React from 'react';

// Import all exercise components
import HelloWorld from './01-HelloWorld';
import IntroducingJSX from './02-IntroducingJSX';
import RenderingElements from './03-RenderingElements';
import ComponentsAndProps from './04-ComponentsAndProps';
import StateAndLifecycle from './05-StateAndLifecycle';
import HandlingEvents from './06-HandlingEvents';
import ConditionalRendering from './07-ConditionalRendering';
import ListsAndKeys from './08-ListsAndKeys';
import Forms from './09-Forms';
import LiftingStateUp from './10-LiftingStateUp';
import CompositionVsInheritance from './11-CompositionVsInheritance';
import ThinkingInReact from './12-ThinkingInReact';

// Exercise metadata
const EXERCISES = [
  {
    id: 1,
    title: 'Hello World',
    description: 'The simplest React example - displaying Hello World',
    component: HelloWorld,
    concepts: ['JSX', 'Components', 'Rendering']
  },
  {
    id: 2,
    title: 'Introducing JSX',
    description: 'JSX syntax, expressions, and safety features',
    component: IntroducingJSX,
    concepts: ['JSX', 'Expressions', 'Attributes', 'Safety']
  },
  {
    id: 3,
    title: 'Rendering Elements',
    description: 'Elements, updating UI, and React DOM efficiency',
    component: RenderingElements,
    concepts: ['Elements', 'DOM Updates', 'Efficiency']
  },
  {
    id: 4,
    title: 'Components and Props',
    description: 'Function/class components, props, and composition',
    component: ComponentsAndProps,
    concepts: ['Function Components', 'Class Components', 'Props', 'Reusability']
  },
  {
    id: 5,
    title: 'State and Lifecycle',
    description: 'State management, lifecycle methods, and hooks',
    component: StateAndLifecycle,
    concepts: ['useState', 'useEffect', 'Lifecycle', 'State Updates']
  },
  {
    id: 6,
    title: 'Handling Events',
    description: 'Event handling, SyntheticEvents, and form interactions',
    component: HandlingEvents,
    concepts: ['Event Handlers', 'SyntheticEvent', 'Forms', 'Keyboard Events']
  },
  {
    id: 7,
    title: 'Conditional Rendering',
    description: 'Rendering components conditionally based on state',
    component: ConditionalRendering,
    concepts: ['Conditional Logic', 'Ternary Operators', 'Logical &&', 'Early Returns']
  },
  {
    id: 8,
    title: 'Lists and Keys',
    description: 'Rendering lists, importance of keys, and dynamic content',
    component: ListsAndKeys,
    concepts: ['Lists', 'Keys', 'map()', 'Dynamic Rendering']
  },
  {
    id: 9,
    title: 'Forms',
    description: 'Controlled components, form validation, and input handling',
    component: Forms,
    concepts: ['Controlled Components', 'Form Validation', 'Input Types', 'File Upload']
  },
  {
    id: 10,
    title: 'Lifting State Up',
    description: 'Shared state management and component communication',
    component: LiftingStateUp,
    concepts: ['Shared State', 'Common Ancestor', 'Data Flow', 'Component Communication']
  },
  {
    id: 11,
    title: 'Composition vs Inheritance',
    description: 'React composition patterns and code reuse strategies',
    component: CompositionVsInheritance,
    concepts: ['Composition', 'Children Prop', 'HOCs', 'Render Props', 'Compound Components']
  },
  {
    id: 12,
    title: 'Thinking in React',
    description: 'The React mindset and development process',
    component: ThinkingInReact,
    concepts: ['Component Hierarchy', 'Static Version', 'State Identification', 'Data Flow']
  }
];

function ExerciseCard({ exercise, onClick, isActive }) {
  return (
    <div
      onClick={() => onClick(exercise)}
      style={{
        border: `2px solid ${isActive ? '#2196f3' : '#ddd'}`,
        borderRadius: '8px',
        padding: '16px',
        margin: '8px',
        cursor: 'pointer',
        backgroundColor: isActive ? '#e3f2fd' : 'white',
        transition: 'all 0.2s ease',
        ':hover': {
          borderColor: '#2196f3'
        }
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{
          backgroundColor: isActive ? '#2196f3' : '#f0f0f0',
          color: isActive ? 'white' : '#666',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: 'bold',
          marginRight: '12px'
        }}>
          {exercise.id}
        </div>
        <h3 style={{ margin: 0, color: isActive ? '#1976d2' : '#333' }}>
          {exercise.title}
        </h3>
      </div>
      
      <p style={{ 
        margin: '8px 0', 
        color: '#666', 
        fontSize: '14px',
        lineHeight: '1.4'
      }}>
        {exercise.description}
      </p>
      
      <div style={{ marginTop: '12px' }}>
        {exercise.concepts.map((concept, index) => (
          <span
            key={index}
            style={{
              display: 'inline-block',
              backgroundColor: isActive ? '#bbdefb' : '#f5f5f5',
              color: isActive ? '#0d47a1' : '#666',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              marginRight: '4px',
              marginBottom: '4px'
            }}
          >
            {concept}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProgressBar({ completed, total }) {
  const percentage = (completed / total) * 100;
  
  return (
    <div style={{
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
      overflow: 'hidden',
      height: '8px',
      margin: '16px 0'
    }}>
      <div
        style={{
          backgroundColor: '#4caf50',
          height: '100%',
          width: `${percentage}%`,
          transition: 'width 0.3s ease'
        }}
      />
    </div>
  );
}

function NavigationButton({ onClick, disabled, children, variant = 'primary' }) {
  const variants = {
    primary: {
      backgroundColor: disabled ? '#ccc' : '#2196f3',
      color: 'white'
    },
    secondary: {
      backgroundColor: disabled ? '#f5f5f5' : '#f0f0f0',
      color: disabled ? '#ccc' : '#666'
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variants[variant],
        border: 'none',
        borderRadius: '4px',
        padding: '8px 16px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '14px',
        fontWeight: '500'
      }}
    >
      {children}
    </button>
  );
}

function ReactMainConceptsIndex() {
  const [currentExercise, setCurrentExercise] = React.useState(null);
  const [completedExercises, setCompletedExercises] = React.useState(new Set());
  const [showOverview, setShowOverview] = React.useState(true);

  const handleExerciseSelect = (exercise) => {
    setCurrentExercise(exercise);
    setShowOverview(false);
  };

  const handleBackToOverview = () => {
    setShowOverview(true);
    setCurrentExercise(null);
  };

  const handleMarkComplete = () => {
    if (currentExercise) {
      setCompletedExercises(prev => new Set(prev).add(currentExercise.id));
    }
  };

  const handlePrevious = () => {
    if (currentExercise && currentExercise.id > 1) {
      const prevExercise = EXERCISES.find(ex => ex.id === currentExercise.id - 1);
      setCurrentExercise(prevExercise);
    }
  };

  const handleNext = () => {
    if (currentExercise && currentExercise.id < EXERCISES.length) {
      const nextExercise = EXERCISES.find(ex => ex.id === currentExercise.id + 1);
      setCurrentExercise(nextExercise);
    }
  };

  if (showOverview) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <header style={{
          textAlign: 'center',
          marginBottom: '32px',
          padding: '32px',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}>
          <h1 style={{ fontSize: '2.5em', margin: '0 0 16px 0' }}>
            React Main Concepts
          </h1>
          <p style={{ fontSize: '1.2em', margin: 0, opacity: 0.9 }}>
            Complete hands-on exercises covering all 12 main concepts from the React documentation
          </p>
          
          <div style={{ marginTop: '24px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap'
            }}>
              <div>
                <div style={{ fontSize: '2em', fontWeight: 'bold' }}>
                  {completedExercises.size}
                </div>
                <div style={{ fontSize: '0.9em', opacity: 0.8 }}>
                  Completed
                </div>
              </div>
              <div>
                <div style={{ fontSize: '2em', fontWeight: 'bold' }}>
                  {EXERCISES.length}
                </div>
                <div style={{ fontSize: '0.9em', opacity: 0.8 }}>
                  Total Exercises
                </div>
              </div>
            </div>
            <ProgressBar completed={completedExercises.size} total={EXERCISES.length} />
          </div>
        </header>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '16px'
        }}>
          {EXERCISES.map(exercise => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onClick={handleExerciseSelect}
              isActive={completedExercises.has(exercise.id)}
            />
          ))}
        </div>

        <footer style={{
          marginTop: '48px',
          padding: '24px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3>About This Project</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            This project provides comprehensive, hands-on exercises for all 12 main concepts 
            from the official React documentation. Each exercise includes practical examples, 
            interactive components, and real-world applications to help you master React development.
          </p>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '16px' }}>
            Based on{' '}
            <a 
              href="https://17.reactjs.org/docs/getting-started.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#2196f3', textDecoration: 'none' }}
            >
              React 17 Documentation
            </a>
          </p>
        </footer>
      </div>
    );
  }

  // Render individual exercise
  const CurrentComponent = currentExercise.component;
  
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Exercise Header */}
      <header style={{
        marginBottom: '24px',
        padding: '16px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h1 style={{ margin: '0 0 8px 0' }}>
              {currentExercise.id}. {currentExercise.title}
            </h1>
            <p style={{ margin: 0, color: '#666' }}>
              {currentExercise.description}
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {completedExercises.has(currentExercise.id) ? (
              <span style={{
                backgroundColor: '#4caf50',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                ✓ Completed
              </span>
            ) : (
              <button
                onClick={handleMarkComplete}
                style={{
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Mark Complete
              </button>
            )}
          </div>
        </div>

        {/* Concepts Tags */}
        <div>
          <strong style={{ fontSize: '14px', color: '#666' }}>Concepts: </strong>
          {currentExercise.concepts.map((concept, index) => (
            <span
              key={index}
              style={{
                display: 'inline-block',
                backgroundColor: '#e3f2fd',
                color: '#1976d2',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                marginRight: '4px',
                marginLeft: '4px'
              }}
            >
              {concept}
            </span>
          ))}
        </div>
      </header>

      {/* Navigation Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        padding: '12px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <NavigationButton onClick={handleBackToOverview} variant="secondary">
            ← Back to Overview
          </NavigationButton>
          <NavigationButton
            onClick={handlePrevious}
            disabled={currentExercise.id === 1}
            variant="secondary"
          >
            ← Previous
          </NavigationButton>
        </div>

        <div style={{ fontSize: '14px', color: '#666' }}>
          {currentExercise.id} of {EXERCISES.length}
        </div>

        <NavigationButton
          onClick={handleNext}
          disabled={currentExercise.id === EXERCISES.length}
        >
          Next →
        </NavigationButton>
      </div>

      {/* Exercise Content */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #dee2e6',
        minHeight: '500px'
      }}>
        <CurrentComponent />
      </div>

      {/* Bottom Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '24px',
        gap: '8px'
      }}>
        <NavigationButton
          onClick={handlePrevious}
          disabled={currentExercise.id === 1}
          variant="secondary"
        >
          ← Previous Exercise
        </NavigationButton>
        <NavigationButton onClick={handleBackToOverview} variant="secondary">
          Overview
        </NavigationButton>
        <NavigationButton
          onClick={handleNext}
          disabled={currentExercise.id === EXERCISES.length}
        >
          Next Exercise →
        </NavigationButton>
      </div>
    </div>
  );
}

export default ReactMainConceptsIndex; 