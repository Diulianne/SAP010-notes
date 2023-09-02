import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Login com o Google</h2>
      <button onClick={handleSignInWithGoogle}>Login com o Google</button>
      <p onClick={() => navigate('/cadastro')}>Ainda não tem conta? Criar uma</p>
    </div>
  );
};

export default LoginWithGoogle;


