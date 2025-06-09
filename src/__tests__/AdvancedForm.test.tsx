import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdvancedForm from '@/components/AdvancedForm';
import { toast } from 'sonner';

// Mock the toast function
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true, formId: '12345' }),
  })
) as jest.Mock;

describe('AdvancedForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(<AdvancedForm />);
    
    // Check that important form elements are rendered
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/preferred contact method/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByText(/attachments/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit form/i })).toBeInTheDocument();
  });

  it('displays phone input when "phone" contact method is selected', async () => {
    render(<AdvancedForm />);
    
    // Phone field should not be visible initially
    expect(screen.queryByLabelText(/phone number/i)).not.toBeInTheDocument();
    
    // Select phone as contact method
    const phoneRadio = screen.getByLabelText(/phone/i);
    await userEvent.click(phoneRadio);
    
    // Phone field should now be visible
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
  });

  it('validates form inputs', async () => {
    render(<AdvancedForm />);
    
    // Try to submit an empty form
    const submitButton = screen.getByRole('button', { name: /submit form/i });
    await userEvent.click(submitButton);
    
    // Expect validation errors
    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('submits the form successfully', async () => {
    render(<AdvancedForm />);
    
    // Fill out the form
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    
    // Select a subject
    const subjectSelect = screen.getByRole('combobox');
    await userEvent.click(subjectSelect);
    await userEvent.click(screen.getByText(/general inquiry/i));
    
    // Add a message
    await userEvent.type(screen.getByLabelText(/message/i), 'This is a test message for the form submission.');
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /submit form/i });
    await userEvent.click(submitButton);
    
    // Check that fetch was called with the right URL and data
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/forms/submit',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.any(String),
        })
      );
      
      // Check that toast success was called
      expect(toast.success).toHaveBeenCalledWith('Form submitted successfully!');
    });
  });

  it('handles form submission errors', async () => {
    // Mock fetch to return an error
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Server error' }),
      })
    );
    
    render(<AdvancedForm />);
    
    // Fill out the form minimally
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/message/i), 'This is a test message for the form submission.');
    
    // Select a subject
    const subjectSelect = screen.getByRole('combobox');
    await userEvent.click(subjectSelect);
    await userEvent.click(screen.getByText(/general inquiry/i));
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /submit form/i });
    await userEvent.click(submitButton);
    
    // Check that error toast was shown
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to submit form. Please try again.');
    });
  });
});
