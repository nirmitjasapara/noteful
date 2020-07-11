import React from 'react'
import { Link } from 'react-router-dom'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { getNotesForFolder } from '../notes-helper'
import './NoteListMain.css'

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render() {
    const { folderId } = this.props.match.params
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        <Link
          to='/add-note'
          type='button'
          className='add-note-button'
        >Add Note</Link>
      </section>
    )
  }
}