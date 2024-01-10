import React, { useEffect, useState } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { useContext } from 'react';
import { AuthContext } from '../Counters/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function App() {

  const authInfo = useContext(AuthContext);
  const URL = `http://localhost:3001/notes/${authInfo.authUser}`
  const [Notes, setNotesArray] = useState([{ "title": "h1", "content": "Note1" }]);

  const navigate = new useNavigate();
  const fetchInfo = () => {
    return axios.get(URL)
      .then((response) => setNotesArray(response.data.notes));
  }

  useEffect(() => {
    fetchInfo();
  }, [])

  function addNote(newNote) {
    setNotesArray((prevValues) => {
      return [...prevValues, newNote]
    });
  }

  async function deleteNote(id) {
    setNotesArray(prevValues => {
      return prevValues.filter((name, index) => {
        return index !== id
      })
    })
  }

    function sendNotes() {
    try {
        const response = axios.post(URL, { notes: Notes });
        console.log("POST Notes response", response)
    } catch (error) {
        if (error.response.status === 401) {
            console.log("Error while Notes post", error)
        }
        console.error("Error creating post:", error);
    }
  };

  function returnToHome() {
    try {
      navigate("/")
    }
    catch (err) {
      console.log(err)
    }
  }


  return (
    <div>
      <Header />
      <button type="submit" onClick={sendNotes} className="btn btn-dark" style={{float: 'right'}}>Save</button>
      <button type="submit" onClick={returnToHome} className="btn btn-dark" style={{float: 'right'}}>Logout</button>
      <CreateArea onAdd={addNote}/>
      {Notes.map((note, index) => {
        return <Note key={index} id={index} title={note.title} content={note.content} onDelete={deleteNote} />
      })}
      <Footer />
    </div>
  );
}

export default App;
