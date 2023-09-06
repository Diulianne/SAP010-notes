import "../home/home.css"
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebaseConfig";

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

  return (
    <div className="container">
      <button onClick={handleSignOut}>Logout</button>
    </div>
  )
}

export default HomePage