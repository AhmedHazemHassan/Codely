import { expect, describe, it } from 'vitest';  // For testing with Vitest
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom for custom matchers like toBeInTheDocument
import { BrowserRouter } from 'react-router-dom'; // For routing
import LoginPage from './LoginPage'; // Adjust import path if necessary

// Utility to wrap the component with necessary context providers (like Router)
const renderLoginPage = () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );
};

describe('LoginPage', () => {
  it('renders the login form with username and password fields', () => {
    renderLoginPage();

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows error message when incorrect username is entered', async () => {
    renderLoginPage();

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wrongUser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password1' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/username does not exist/i)).toBeInTheDocument();
    });
  });

  it('shows error message when incorrect password is entered', async () => {
    renderLoginPage();

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'user1' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongPassword' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/incorrect password/i)).toBeInTheDocument();
    });
  });

  it('navigates to the home page on successful login', async () => {
    renderLoginPage();

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'user1' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password1' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(window.location.pathname).toBe('/home');
    });
  });

  it('displays error message when fields are empty and form is submitted', async () => {
    renderLoginPage();

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/username does not exist/i)).toBeInTheDocument();
    });
  });
});
