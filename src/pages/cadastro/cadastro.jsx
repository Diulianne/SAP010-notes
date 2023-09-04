import { useState } from "react";
import { signInWithEmailAndPassword, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';
import "../login/login.css"


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      // Cria o usuário com email e senha
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
    <div className="login-container">
      <img className="logo" src="logo.png" alt="Logo" />
      <h2 className="title">Sign Up LabNotes</h2>
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
      <button className="login-button" onClick={handleSignUp}>Criar Conta</button>
      <p className="create-account">
      Já possui uma conta? <span onClick={() => navigate('/login')}>Login</span>
      </p>
    </div>
  );
};

export default SignUp;
