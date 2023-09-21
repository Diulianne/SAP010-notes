import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import './NoteList.css';



// const NotesList = () => {
//   const [notes, setNotes] = useState([]);
//   const user = auth.currentUser;

//   useEffect(() => {
//     if (user) {
//       const userUID = user.uid;
//       const notesRef = collection(db, 'notes');
//       const userNotesQuery = query(notesRef, where('user', '==', userUID));
        
//       getDocs(userNotesQuery)
//         .then((querySnapshot) => {
//           const notesData = [];
//           querySnapshot.forEach((doc) => {
//             const noteData = doc.data();
//             notesData.push(noteData);
//           });
//           console.log('Notas do usuário:', notesData);
//           setNotes(notesData);
//         })
//         .catch((error) => {
//           console.error('Erro ao recuperar notas:', error);
//         });
//     }
//   }, [user]);

//   return (
//     <div className='note-list'>
//       <h1>Lista de Notas</h1>
//       <div className="notes-container">
//         {notes.map((note) => (
//           <div className="note" key={note.id}>
//             <h2>{note.title}</h2>
//             <p>{note.content}</p>
//             <p>Editada {note.lastModified.toDate().toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NotesList;

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const userUID = user.uid;
      const notesRef = collection(db, 'notes');
      const userNotesQuery = query(notesRef, where('user', '==', userUID));

      // Use onSnapshot para ouvir atualizações em tempo real
      const unsubscribe = onSnapshot(userNotesQuery, (querySnapshot) => {
        const notesData = [];
        querySnapshot.forEach((doc) => {
          const noteData = doc.data();
          notesData.push(noteData);
        });
        console.log('Notas do usuário:', notesData);
        setNotes(notesData);
      });

      return () => {
        // Remova o ouvinte quando o componente for desmontado
        unsubscribe();
      };
    }
  }, [user]);

  return (
    <div className='note-list'>
      <h3>Lista de Notas</h3>
      <div className="notes-container">
        {notes.map((note) => (
          <div className="note" key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>Editada {note.lastModified.toDate().toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesList;

