import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
import './noteinput.css'

const NoteInput = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verifique se o título e o conteúdo não estão em branco
    if (!title.trim() || !content.trim()) {
      // Exiba uma mensagem de erro ao usuário, se desejar
      console.error('Título e conteúdo são obrigatórios.');
      return;
    }
    // Obtém o ID do usuário autenticado
    const userId = auth.currentUser.uid;

    // Obtém uma referência para a coleção "users" e "notes" no Firestore
    const usersRef = collection(db, 'users');
    const notesRef = collection(db, 'notes');

    // Crie um documento na coleção "users" se ele ainda não existir
    addDoc(usersRef, {
      uid: userId,
      email: auth.currentUser.email,
      displayName: auth.currentUser.displayName,
    })
      .then(() => {
        // Crie um documento na coleção "notes" com os dados da nota
        return addDoc(notesRef, {
          title,
          content,
          user: userId,
          lastModified: new Date(),
        });
      })
      .then(() => {
        // Limpe o formulário após o envio
        setTitle('');
        setContent('');
      })
      .catch((error) => {
        // Lide com erros aqui, por exemplo, exibindo uma mensagem de erro ao usuário
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
