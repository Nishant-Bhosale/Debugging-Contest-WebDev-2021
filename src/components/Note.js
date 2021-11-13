import { useState } from "react";
import DeleteIcon from "../assets/delete.png";
import EditIcon from "../assets/edit.png";
import CancelIcon from "../assets/cancel.png";

const Note = ({ id, text, date, handleDeleteNote, handleEditNote }) => {
  const [editMode, setEditMode] = useState(false);
  const [noteText, setNoteText] = useState("");
  const characterLimit = 200;

  const handleChange = (event) => {
    setNoteText(event.target.value);
  };

  return (
    <div className="note">
      {!editMode && <span>{text}</span>}
      {editMode && (
        <textarea
          rows="8"
          cols="10"
          value={noteText}
          onChange={handleChange}
        ></textarea>
      )}
      <div className="note-footer">
        <div className="editFoot">
          {editMode && <small>{characterLimit - noteText.length} Remaining</small>}
          {editMode && (
            <button
              className="editBtn"
              onClick={() => {
                handleEditNote(noteText, id);
                setEditMode(false);
              }}
            >
              Edit
            </button>
          )}
        </div>
        <div className="editFoot2">
          <small>{date}</small>
          <img src={DeleteIcon} onClick={() => handleDeleteNote(id)} />
          {editMode ? (
            <img
              src={CancelIcon}
              onClick={() => {
                setNoteText("");
              }}
            />
          ) : (
            <img
              src={EditIcon}
              onClick={() => {
                setEditMode(true);
                setNoteText(text);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Note;
