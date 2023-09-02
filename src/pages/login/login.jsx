import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';
import "../login/login.css"

const LoginWithGoogle = () => {
  const navigate = useNavigate();
  const handleSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // Autenticação bem-sucedida
        const user = result.user;
        console.log('Usuário autenticado com sucesso:', user);

        // Redirecionar para a página principal após o login bem-sucedido
        navigate('/home');
      })
      .catch((error) => {
        // Tratar erros de autenticação
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Erro durante a autenticação:', errorCode, errorMessage);
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
        <input type="email" placeholder="Email" />
      </div>
      <div className="input-container">
        <input type="password" placeholder="Senha" />
      </div>
      <button className="login-button">Login</button>
      <p className="create-account">
        Não tem uma conta? <span onClick={() => navigate('/cadastro')}>Criar uma</span>
      </p>
    </div>
  );
};

export default LoginWithGoogle;


