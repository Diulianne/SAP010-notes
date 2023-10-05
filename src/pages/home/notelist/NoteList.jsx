import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import './NoteList.css';

const NotesList = (props) => {
  const [notes, setNotes] = useState([]);
  const user = auth.currentUser;
  // eslint-disable-next-line react/prop-types
  const searchText = props.searchText || ''; // Definindo como string vazia caso seja nulo

  useEffect(() => {
    if (user) {
      const userUID = user.uid;
      const notesRef = collection(db, 'notes');
      const userNotesQuery = query(notesRef, where('user', '==', userUID));
      // onSnapshot para ouvir atualizações em tempo real
      const unsubscribe = onSnapshot(userNotesQuery, (querySnapshot) => {
        const notesData = [];
        querySnapshot.forEach((doc) => {
          const noteData = { id: doc.id, ...doc.data() };
          notesData.push(noteData);
        });
        console.log('Notas do usuário:', notesData);
        setNotes(notesData);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  // Filtra as notas com base no searchText
  const filteredNotes = notes.filter((note) => {
    const title = (note.title || '').toLowerCase(); // Validando title como string e transformando em minúsculas
    const content = (note.content || '').toLowerCase(); // Validando content como string e transformando em minúsculas

    return title.includes(searchText.toLowerCase()) || content.includes(searchText.toLowerCase());
  });

  const handleDeleteNote = async (noteId) => {
    try {
      const noteRef = doc(db, 'notes', noteId);
      await deleteDoc(noteRef);

      // Atualize o estado para refletir a exclusão da nota
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      console.log("nota excluída com sucesso");
    } catch (error) {
      console.error('Erro ao excluir a nota:', error);
    }
  };

  const handleNoteContentChange = async (noteId, newContent) => {
    try {
      const noteRef = doc(db, 'notes', noteId);
      await updateDoc(noteRef, {
        content: newContent,
        lastModified: new Date(),
      });
    } catch (error) {
      console.error('Erro ao atualizar a nota:', error);
    }
  };

  return (
    <div className='note-list'>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <h3>Lista de Notas</h3>
      <div className="notes-container">
        {filteredNotes.map((note) => (
          <div className="note" key={note.id}>
            <div className="header2">
              <h2>{note.title}</h2>
              <button className="material-symbols-outlined pin">push_pin</button>
            </div>
            <p
              contentEditable={true}
              onBlur={(e) => {
                const newContent = e.target.textContent;
                handleNoteContentChange(note.id, newContent);
              }}
              suppressContentEditableWarning={true}
            >
              {note.content}
            </p>

            {/* <p>{note.content}</p> */}
            <div className="footer">
              <p>Editada {note.lastModified.toDate().toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</p>
              <button
                className='material-symbols-outlined trash'
                onClick={() => handleDeleteNote(note.id)}
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesList;
