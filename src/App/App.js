import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import ApiContext from '../ApiContext';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import './App.css'
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import config from '../config'

class App extends Component {
  state = {
    notes: [],
    folders: []
  };
  componentDidMount() {
    Promise.all([
        fetch(`${config.API_ENDPOINT}/notes`),
        fetch(`${config.API_ENDPOINT}/folders`)
    ])
        .then(([notesRes, foldersRes]) => {
            if (!notesRes.ok)
                return notesRes.json().then(e => Promise.reject(e));
            if (!foldersRes.ok)
                return foldersRes.json().then(e => Promise.reject(e));

            return Promise.all([notesRes.json(), foldersRes.json()]);
        })
        .then(([notes, folders]) => {
            this.setState({notes, folders});
        })
        .catch(error => {
            console.error({error});
        });
  }
  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };
  handleAddNote = note => {
    this.setState({
      notes: [...this.state.notes,note]
    });
  };
  handleAddFolder = folder => {
    this.setState({
      folders: [...this.state.folders,folder]
    });
  };
  renderNavRoutes() {
    return (
        <>
            {['/', '/folder/:folderId'].map(path => (
                <Route
                    exact
                    key={path}
                    path={path}
                    component={NoteListNav}
                />
            ))}
            <Route path="/note/:noteId" component={NotePageNav} />
            <Route path="/add-folder" component={NotePageNav} />
            <Route path="/add-note" component={NotePageNav} />
        </>
    );
  }
  renderMainRoutes() {
    return (
        <>
            {['/', '/folder/:folderId'].map(path => (
                <Route
                    exact
                    key={path}
                    path={path}
                    component={NoteListMain}
                />
            ))}
            <Route path="/note/:noteId" component={NotePageMain} />
            <Route path="/add-folder" component={AddFolder} />
            <Route path="/add-note" component={AddNote} />
        </>
    );
  }
  render() {
    const value = {
        notes: this.state.notes,
        folders: this.state.folders,
        deleteNote: this.handleDeleteNote,
        addFolder: this.handleAddFolder,
        addNote: this.handleAddNote
    };
    return (
        <ApiContext.Provider value={value}>
            <div className="App">
                <header className="App_header">
                    <h1>
                      <Link to="/">Noteful</Link>
                    </h1>
                </header>
                <nav className="App_nav">{this.renderNavRoutes()}</nav>
                <main className="App_main">{this.renderMainRoutes()}</main>
            </div>
        </ApiContext.Provider>
    );
  }
}

export default App;
