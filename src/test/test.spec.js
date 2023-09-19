import { render, screen, fireEvent } from '@testing-library/react';
import LoginWithGoogle from "../pages/login/login";
import { BrowserRouter as Router } from 'react-router-dom'; 

// Mock para as funções console
console.error = jest.fn();
console.log = jest.fn();

test('renders login form', () => {
  render(
    <Router>
      <LoginWithGoogle />
    </Router>
  );
  

  expect(screen.getByText('Login LabNotes'))
  expect(screen.getByText('Login com o Google'))
  expect(screen.getByPlaceholderText('Email'))
  expect(screen.getByPlaceholderText('Senha'))
  expect(screen.getByText('Login'))
}); 

test('handles Google login button click', () => {
  render(
    <Router>
      <LoginWithGoogle />
    </Router>
  );
  const googleButton = screen.getByText('Login com o Google');
  
  fireEvent.click(googleButton);
  
  //pode adicionar asserções aqui para verificar se a função `signInWithPopup` é chamada corretamente.
});



// jest.mock('react-router-dom', () => ({
//   useNavigate: () => jest.fn(),
// }));

// // Mock das funções Firebase Auth
// jest.mock('firebase/auth', () => ({
//   signInWithPopup: jest.fn(),
//   GoogleAuthProvider: jest.fn(),
//   signInWithEmailAndPassword: jest.fn(),
//   auth: {
//     createUserWithEmailAndPassword: jest.fn(),
//   },
// }));

// // Mock para as funções console
// console.error = jest.fn();
// console.log = jest.fn();

// test('renders login form elements', () => {
//   render(<LoginWithGoogle />);
  
//   // Verifique se os elementos do formulário são renderizados
//   expect(screen.getByText('Login LabNotes'))
//   expect(screen.getByText('Login com o Google'))
//   expect(screen.getByPlaceholderText('Email'))
//   expect(screen.getByPlaceholderText('Senha'))
//   expect(screen.getByText('Login'))
// });

// test('handles Google login button click', () => {
//   render(<LoginWithGoogle />);
//   const googleButton = screen.getByText('Login com o Google');
  
//   // Simule o clique no botão do Google
//   fireEvent.click(googleButton);
  
//   // Verifique se a função signInWithPopup é chamada corretamente
//   expect(signInWithPopup).toHaveBeenCalled();
//   // Você pode adicionar asserções adicionais para verificar argumentos e outros comportamentos, se necessário.
// });

// test('handles email/password login', () => {
//   render(<LoginWithGoogle />);
//   const emailInput = screen.getByPlaceholderText('Email');
//   const passwordInput = screen.getByPlaceholderText('Senha');
//   const loginButton = screen.getByText('Login');
  
//   // Simule a inserção de email e senha
//   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//   fireEvent.change(passwordInput, { target: { value: 'password123' } });
  
//   // Simule o clique no botão de login
//   fireEvent.click(loginButton);
  
//   // Verifique se a função signInWithEmailAndPassword é chamada corretamente
//   expect(signInWithEmailAndPassword).toHaveBeenCalled();
//   // Você pode adicionar asserções adicionais para verificar argumentos e outros comportamentos, se necessário.
// });