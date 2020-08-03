import React from 'react'
import './AddNote.css'
import ValidationError from '../ValidationError';
import ApiContext from '../ApiContext'
import config from '../config'

export default class AddNote extends React.Component {
    static contextType = ApiContext;
    constructor(props) {
        super(props);
        this.state = {
            noteName: {
            value: "",
            touched: false
          },
          noteContent: {
            value: "",
            touched: false
          },
          folderId: {
            value: "",
            touched: false
          },
        };
      }
    
      updateNoteName(name) {
        this.setState({ noteName: { value: name, touched: true } });
      }
      updateNoteContent(content) {
        this.setState({ noteContent: { value: content, touched: true } });
      }
      updateFolder(folderId) {
        this.setState({ folderId: { value: folderId, touched: true } });
      }
    
      handleSubmit(event) {
        event.preventDefault();
        const { noteName, noteContent, folderId } = this.state;
        let modifiedDate = new Date().toISOString();
        let JSONbody = JSON.stringify({
            name: noteName.value,
            content: noteContent.value,
            modified: modifiedDate,
            folderId: folderId.value
        });

        fetch(`${config.API_ENDPOINT}/notes`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${config.API_KEY}`
          },
          body: JSONbody,
          })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(resJSON => {
            this.context.addNote(resJSON);
            this.props.history.goBack();
          })
          .catch(error => {
            console.error({ error })
          })
      }
      validateNoteName() {
        const noteName = this.state.noteName.value.trim();
        if (noteName.length === 0) {
          return "Note Name is required";
        }
      }
      validateFolder() {
        const folder = this.state.folderId.value.trim();
        if (folder.length === 0) {
          return "Folder is required";
        }
      }
      render() {
        const noteNameError = this.validateNoteName();
        const folderError = this.validateFolder();
        const { folders=[]} = this.context;
    
        return (
          <form className="form" onSubmit={e => this.handleSubmit(e)}>
            <fieldset className="form-group">
              <legend>Add Folder</legend>
              <label htmlFor="name">Note Name </label>
              <input
                type="text"
                className="name"
                name="name"
                id="name"
                onChange={e => this.updateNoteName(e.target.value)}
              />
              {this.state.noteName.touched && <ValidationError message={noteNameError} />}
              <label htmlFor="folder">Folder</label>
              <select
                className="folder"
                name="folder"
                id="folder"
                onChange={e => this.updateFolder(e.target.value)}
              >
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
              </select>
              {this.state.folderId.touched && <ValidationError message={folderError} />}
              <label htmlFor="content">Content </label>
              <textarea
                type="text"
                className="content"
                name="content"
                id="content"
                onChange={e => this.updateNoteContent(e.target.value)}
              />
            <button
                type="submit"
                className="button"
                disabled={
                this.validateNoteName() || 
                this.validateFolder()
                }
            >Add</button>
            </fieldset>
          </form>
        );
      }
    }