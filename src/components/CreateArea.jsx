import React, { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Counters/AuthContext";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  })

  const authInfo = useContext(AuthContext);

  const [isExpanded, setExpanded] = useState(false);

  const [data, setData] = useState(null);

  const URL = `http://localhost:3001/notes/${authInfo.authUser}`
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/data');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote, [name]: value
      }
    })

  }

  async function submitNote(event) {
    event.preventDefault();
    props.onAdd(note)
    setNote({
      title: "",
      content: ""
    })
  }
  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && <input onChange={handleChange} name="title" placeholder="Title" value={note.title} />}
        <textarea
          onChange={handleChange}
          onClick={expand}
          name="content"
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
        />
        {isExpanded && <Fab onClick={submitNote}>
          <AddIcon />
        </Fab>}
        {/* <Fab onClick={submitNote}>
          <AddIcon />
        </Fab> */}
      </form>
    </div>
  );
}

export default CreateArea;
