import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";
import TrashNotesList from "./components/TrashNotesList";
import Note from "./components/Note";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [trashNotes, setTrashNotes] = useState([]);
  const [searchNotes, setSearchNotes] = useState([]);
  const [showTrashNotes, setshowTrashNotes] = useState(false);

  const [searchText, setSearchText] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));
    const savedTrashNotes = JSON.parse(
      localStorage.getItem("react-notes-app-trash-data")
    );

    if (savedNotes) {
      setNotes(savedNotes);
    }
    if (savedTrashNotes) {
      setTrashNotes(savedTrashNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
    localStorage.setItem(
      "react-notes-app-trash-data",
      JSON.stringify(trashNotes)
    );
  }, [notes]);

  const addNote = (text) => {
    const newNote = {
      id: nanoid(),
      text: text,
      date: new Date().toLocaleDateString(),
    };
	 console.log('sdf')
	 setNotes([...notes, newNote])
  };

  const handleEditNote = (newText, id) => {
	  let oldNote = { text: newText, id };
	  const filteredNotes = notes.filter((n) => n.id !== id);
	  const newNotes = [...filteredNotes, oldNote];
     setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);

    const trashNote = notes.filter((note) => note.id === id)[0];
    const newTrashNotes = [...trashNotes];
    newTrashNotes.push(trashNote);
    setTrashNotes(newTrashNotes);
  };

  const restoreNote = (id) => {
    const toBeRestoredNote = trashNotes.filter((note) => note.id === id)[0];
    const newNotes = [...notes, toBeRestoredNote];
    setNotes(newNotes);

    const newTrash = trashNotes.filter((note) => note.id !== id);
    setTrashNotes(newTrash);
  };

  const restoreAll = () => {
    const oldNotes = [...notes];
    trashNotes.map((note) => oldNotes.push(note));
	 setNotes(oldNotes);
    setTrashNotes([]);
  };

  const toggleColorMode = () => {
		setDarkMode((prevMode) => !prevMode)
  }

  const emptyTrashPermanently = () => {
	setTrashNotes([]);
	localStorage.setItem("react-notes-app-trash-data", JSON.stringify([]));
  }

  const searchAndFilterNotes = (text) => {
		if(text !== ""){
			const filteredNotes = notes.filter((note) => {
				const regex = new RegExp(`${text}`, "gi");
				console.log(text)
				console.log(regex)
				return note.text.match(regex);
			})
			console.log(filteredNotes)
			setSearchNotes(filteredNotes);
		}else{
			setSearchNotes([]);
		}
	}

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={toggleColorMode} />
        <button onClick={() => setshowTrashNotes(!showTrashNotes)}>
          {showTrashNotes ? "Show Notes" : "Show Trash Can"}
        </button>
        {showTrashNotes && <button onClick={restoreAll}>Restore All</button>}
        {showTrashNotes && (
          <button onClick={emptyTrashPermanently}>Empty Trash Can</button>
        )}
        <Search handleSearchNote={searchAndFilterNotes} />
        {!showTrashNotes && (
          <NotesList
            notes={notes}
            handleAddNote={addNote}
            handleDeleteNote={deleteNote}
            handleEditNote={handleEditNote}
          />
        )}
        {showTrashNotes && (
          <TrashNotesList
            notes={trashNotes.filter((note) =>
              note.text.toLowerCase().includes(searchText.toLocaleLowerCase())
            )}
            restoreNote={restoreNote}
          />
        )}
      </div>
    </div>
  );
};

export default App;

//Added my branch