import  { useState } from "react";
import { signInWithEmailAndPassword, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';


// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const handleSignIn = async () => {
//     try {
//       // login do usuário com email e senha
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);

//       // Se o login for bem-sucedido, você pode acessar o usuário assim:
//       const user = userCredential.user;
//       console.log("Usuário logado com sucesso: ", user);
      
//       navigate('/home');
//     } catch (error) {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.error("Erro ao fazer login: ", errorCode, errorMessage);
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Senha"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleSignIn}>Entrar</button>
//     </div>
//   );
// };

// export default SignIn;


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      // Crie o usuário com email e senha
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
      console.log(userCredential.user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Erro ao criar o usuário: ", errorCode, errorMessage);
    }
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Criar Conta</button>
    </div>
  );
};

export default SignUp;
