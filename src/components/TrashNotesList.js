import TrashNote from "./TrashNote";

const TrashNotesList = ({ notes, restoreNote }) => {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <TrashNote
          id={note.id}
          text={note.text}
          date={note.date}
          restoreNote={restoreNote}
        />
      ))}
    </div>
  );
};

export default TrashNotesList;
