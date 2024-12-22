import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Required for handling routing in tests
import LoginPage from '../LoginPage'; // Adjust the path if necessary

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

    // Assuming that the page redirects, we can check if the "home" page is visited.
    // If using something like `react-router`, you can spy on the navigate function.
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
