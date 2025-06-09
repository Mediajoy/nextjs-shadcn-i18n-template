import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Create a mock version of the login form component for testing
// This allows us to test the form logic in isolation
const LoginForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Form is valid, proceed with submission
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    setIsLoading(false);
    // In a real component, we would handle the response here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            aria-invalid="false"
            aria-describedby={errors.email ? 'email-error' : undefined}
            data-testid="email-input"
          />
          {errors.email && (
            <span id="email-error" className="error">
              {errors.email}
            </span>
          )}
        </div>
        
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            aria-invalid="false"
            aria-describedby={errors.password ? 'password-error' : undefined}
            data-testid="password-input"
          />
          {errors.password && (
            <span id="password-error" className="error">
              {errors.password}
            </span>
          )}
        </div>
        
        <div>
          <label>
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              data-testid="remember-checkbox"
            />
            Remember me
          </label>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          data-testid="login-button"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

describe('LoginForm', () => {
  test('renders the login form with email and password inputs', () => {
    render(<LoginForm />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /remember me/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows validation errors when submitting empty form', async () => {
    render(<LoginForm />);
    
    // Submit the form without filling any fields
    fireEvent.click(screen.getByTestId('login-button'));
    
    // Check that validation errors are displayed
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  test('shows validation error for invalid email format', async () => {
    render(<LoginForm />);
    
    // Enter invalid email
    await userEvent.type(screen.getByTestId('email-input'), 'invalid-email');
    
    // Enter valid password
    await userEvent.type(screen.getByTestId('password-input'), 'Password123!');
    
    // Submit the form
    fireEvent.click(screen.getByTestId('login-button'));
    
    // Check that only email validation error is displayed
    expect(await screen.findByText(/email is not valid/i)).toBeInTheDocument();
    expect(screen.queryByText(/password is required/i)).not.toBeInTheDocument();
  });

  test('shows validation error for short password', async () => {
    render(<LoginForm />);
    
    // Enter valid email
    await userEvent.type(screen.getByTestId('email-input'), 'test@example.com');
    
    // Enter short password
    await userEvent.type(screen.getByTestId('password-input'), 'short');
    
    // Submit the form
    fireEvent.click(screen.getByTestId('login-button'));
    
    // Check that only password validation error is displayed
    expect(await screen.findByText(/password must be at least 8 characters/i)).toBeInTheDocument();
    expect(screen.queryByText(/email is not valid/i)).not.toBeInTheDocument();
  });

  test('submits the form with valid data and shows loading state', async () => {
    render(<LoginForm />);
    
    // Enter valid email
    await userEvent.type(screen.getByTestId('email-input'), 'test@example.com');
    
    // Enter valid password
    await userEvent.type(screen.getByTestId('password-input'), 'Password123!');
    
    // Check the remember me checkbox
    await userEvent.click(screen.getByTestId('remember-checkbox'));
    
    // Submit the form
    fireEvent.click(screen.getByTestId('login-button'));
    
    // Check that the button shows loading state
    expect(screen.getByText(/logging in/i)).toBeInTheDocument();
    
    // Wait for the submission to complete
    await waitFor(() => {
      expect(screen.getByText(/login/i)).toBeInTheDocument();
    });
    
    // Check that no validation errors are displayed
    expect(screen.queryByText(/email is not valid/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/password must be at least 8 characters/i)).not.toBeInTheDocument();
  });
});
