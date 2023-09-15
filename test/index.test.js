import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginWithGoogle from '../src/pages/login/login';


// Simula o módulo firebase/auth
jest.mock('firebase/auth', () => ({
    signInWithPopup: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
  }));

  // Mock do useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('LoginWithGoogle', () => {
    it('deve chamar handleSignInWithGoogle ao clicar no botão "Login com o Google"', async () => {
      const { getByText } = render(<LoginWithGoogle />);
  
      const loginWithGoogleButton = getByText('Login com o Google');
      fireEvent.click(loginWithGoogleButton);
  
      // Certifica-se de que signInWithPopup foi chamado
      await waitFor(() => {
        expect(signInWithPopup).toHaveBeenCalled();
      });
  
      // Certifica-se de que navigate foi chamado
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  
    it('deve chamar handleSignInWithEmailPassword com os valores de email e senha ao clicar no botão "Login"', async () => {
      const { getByText, getByPlaceholderText } = render(<LoginWithGoogle />);
  
      const emailInput = getByPlaceholderText('Email');
      const passwordInput = getByPlaceholderText('Senha');
  
      // Preencha os campos de email e senha
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
  
      const loginButton = getByText('Login');
      fireEvent.click(loginButton);
  
      // Certifica-se de que signInWithEmailAndPassword foi chamado com os valores corretos
      await waitFor(() => {
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'test@example.com', 'password123');
      });
  
      // Certifica-se de que navigate foi chamado
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });