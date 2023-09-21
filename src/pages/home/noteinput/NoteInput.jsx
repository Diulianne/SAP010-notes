import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
import './noteinput.css'

const NoteInput = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const user = auth.currentUser; // Obtenha o usuário autenticado


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      console.error('Título e conteúdo são obrigatórios.');
      return;
    }
    const userId = user.uid; // Use o ID do usuário autenticado

    const usersRef = collection(db, 'users');
    const notesRef = collection(db, 'notes');

    addDoc(usersRef, {
      uid: userId,
      email: user.email,
      displayName: user.displayName,
    })
      .then(() => {
        return addDoc(notesRef, {
          title,
          content,
          user: userId, 
          lastModified: new Date(),
        });
      })
      .then((docRef) => {
        console.log('ID da nova nota:', docRef.id);
        setTitle('');
        setContent('');
      })
      .catch((error) => {
        console.error('Erro ao adicionar nota:', error);
      });
  };

  return (
    <div className='new-note'>
      <form onSubmit={handleSubmit}>
        <input className='title-new-note'
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea className='input-new-note'
          placeholder="Criar uma nota..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className='submit' type="submit">Anotar</button>
      </form>
    </div>
  );
};

export default NoteInput;
