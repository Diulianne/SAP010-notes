import '../home/home.css'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebaseConfig";
import { useEffect, useState, } from 'react';
import NoteInput from './noteinput/NoteInput';
import NotesList from './notelist/NoteList';

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);


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
      <header className="header">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <div className="logo-and-title">
          <img className="logo-header" src="logo.png" alt="Logo" />
          <h2 className="title-header">LabNotes</h2>
        </div>
        <div className="search-container">
          <span className="material-symbols-outlined">search</span>
          <input
            type="text"
            className="search-box"
            placeholder="Pesquisar"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        {user && (
          <div className={`user-profile ${showLogoutButton ? 'show-logout-button' : ''}`}>
            <img
              className="user-avatar"
              src={user.photoURL || 'user.png'} // Use uma imagem padrão se a URL não estiver disponível
              alt="User Avatar"
            />
            <div className="user-info">
              <span
                className="user-name"
                onClick={() => setShowLogoutButton(!showLogoutButton)}
              >
                {user.displayName}
              </span>
              {showLogoutButton && (
                <button className="logout-button" onClick={handleSignOut}>Sair</button>
              )}
            </div>
          </div>
        )}
      </header>
      <NoteInput />
      <NotesList searchText={searchText} />
    </div>
  )
}


export default HomePage
