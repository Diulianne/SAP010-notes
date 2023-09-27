import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
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
          const noteData = doc.data();
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

  return (
    <div className='note-list'>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <h3>Lista de Notas</h3>
      <div className="notes-container">
        {notes.map((note) => (
          // <div className="note" key={note.id}>
          //   <h2>{note.title}</h2>
          //   <p>{note.content}</p>
          //   <p>Editada {note.lastModified.toDate().toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</p>
          //   {/* <button onClick={() => handleDeleteNote(note.id)}> */}
          //   <div className="button-container">
          //     <button className="material-symbols-outlined pin">push_pin</button>
          //     <button className="material-symbols-outlined pin">delete</button>
          //   </div>
          // </div>
          <div className="note" key={note.id}>
            <div className="header2">
              <h2>{note.title}</h2>
              <button className="material-symbols-outlined pin">push_pin</button>
            </div>
            <p>{note.content}</p>
            <div className="footer">
              <p>Editada {note.lastModified.toDate().toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</p>
              <button className="material-symbols-outlined trash">delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesList;

