// const NotesList = () => {
//   const [notes, setNotes] = useState([]);
//   const user = auth.currentUser;

//   useEffect(() => {
//     if (user) {
//       const userUID = user.uid;
//       const notesRef = collection(db, 'notes');
//       const userNotesQuery = query(notesRef, where('user', '==', userUID));
//       // onSnapshot para ouvir atualizações em tempo real
//       const unsubscribe = onSnapshot(userNotesQuery, (querySnapshot) => {
//         const notesData = [];
//         querySnapshot.forEach((doc) => {
//           const noteData = doc.data();
//           notesData.push(noteData);
//         });
//         console.log('Notas do usuário:', notesData);
//         setNotes(notesData);
//       });

//       return () => {
//         unsubscribe();
//       };
//     }


//   }, [user]);

//   const handleDeleteNote = (postId, userId) => {
//     deleteUserPost(postId, userId);
//   };


//   return (
//     <div className='note-list'>
//       <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
//       <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
//       <h3>Lista de Notas</h3>
//       <div className="notes-container">
//         {notes.map((note) => (
//           <div className="note" key={note.id}>
//             <div className="header2">
//               <h2>{note.title}</h2>
//               <button className="material-symbols-outlined pin">push_pin</button>
//             </div>
//             <p>{note.content}</p>
//             <div className="footer">
//               <p>Editada {note.lastModified.toDate().toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</p>
//               <button className="material-symbols-outlined trash" onClick={() => handleDeleteNote(note.id, user.uid)}>delete</button>

//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import './NoteList.css';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const user = auth.currentUser;

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

  const handleDeleteNote = async (noteId) => {
    try {
      const noteRef = doc(db, 'notes', noteId);
      await deleteDoc(noteRef);

      // Atualize o estado para refletir a exclusão da nota
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      console.log("nota excluida com sucesso");
    } catch (error) {
      console.error('Erro ao excluir a nota:', error);
    }
  };


  return (
    <div className='note-list'>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <h3>Lista de Notas</h3>
      <div className="notes-container">
        {notes.map((note) => (
          <div className="note" key={note.id}>
            <div className="header2">
              <h2>{note.title}</h2>
              <button className="material-symbols-outlined pin">push_pin</button>
            </div>
            <p>{note.content}</p>
            <div className="footer">
              <p>Editada {note.lastModified.toDate().toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</p>
              <button
                className='material-symbols-outlined trash'
                onClick={() => handleDeleteNote(note.id)}
              >
                delete
              </button >

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesList;