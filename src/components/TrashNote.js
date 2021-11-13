import { useState } from "react";
import RestoreIcon from "../assets/restore.png";

const TrashNote = ({ id, text, date, restoreNote }) => {
  return (
    <div className="note">
      <span>{text}</span>
      <div className="note-footer" style={{ flexDirection: "row" }}>
        <small>{date}</small>
        <img src={RestoreIcon} onClick={() => restoreNote(id)} />
      </div>
    </div>
  );
};

export default TrashNote;
