import React from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Note(props) {
  function deleteNote() {
    return props.onDelete(props.id)
  }
  const date = new Date();
  const dateString = date.toDateString();
  return (
    <div className="note">
      <header>{dateString}</header>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={deleteNote}><DeleteForeverIcon/></button>
    </div>
  );
}

export default Note;
