import "../home/home.css"
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebaseConfig";

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';


const HomePage = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Erro durante o logout:', error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // Usuário autenticado
        console.log('Usuário está logado como', authUser.email);
      } else {
        // Usuário não autenticado
        console.log('Usuário não está logado');
      }
    });
  
    return () => {
      // Remover o observador quando o componente se desmontar
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  )
}

export default HomePage