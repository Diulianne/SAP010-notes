import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';
import "../login/login.css"

const LoginWithGoogle = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(null);

  const handleSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // Autenticação bem-sucedida
        const user = result.user;
        console.log('Usuário autenticado com sucesso:', user);

        navigate('/home');
      })
      .catch((error) => {
        // Tratar erros de autenticação
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Erro durante a autenticação:', errorCode, errorMessage);
      });
  };

  const handleSignInWithEmailPassword = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuário autenticado com sucesso:', user);

        navigate('/home');
      })
      .catch((error) => {
        // Tratar erros de autenticação com email e senha
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/invalid-email') {
          setError('Email e/ou senha incorretos');
        } else {
          setError(errorMessage); // Outros erros
        }

        console.error('Erro durante a autenticação com email e senha:', errorCode, errorMessage);
      });
  };


  return (
    <div className="login-container">
      <img className="logo" src="logo.png" alt="Logo" />
      <h2 className="title">Login LabNotes</h2>
      <button className="google-button" onClick={handleSignInWithGoogle}>
        <img className="google-logo" src="Google.png" alt="Google Logo" />
        Login com o Google
      </button>
      <p className="or-text">ou</p>
      <div className="input-container">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button className="login-button" onClick={handleSignInWithEmailPassword}>
        Login
      </button>
      <p className="create-account">
        Não tem uma conta? <span onClick={() => navigate('/cadastro')}>Criar uma</span>
      </p>
    </div>
  );
};

export default LoginWithGoogle;


