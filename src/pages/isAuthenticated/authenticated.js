import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../firebaseConfig";

const Authenticated = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setIsLoggedIn(true);
        console.log('Usuário está logado como', authUser.email);

        const photoURL = authUser.photoURL;
        console.log('URL da imagem do perfil:', photoURL);
      } else {
        setIsLoggedIn(false);
        console.log('Usuário não está logado');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return children(isLoggedIn);
}

export default Authenticated; 