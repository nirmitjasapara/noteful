import React from 'react'
import { Link } from 'react-router-dom'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { getNotesForFolder } from '../notes-helper'
import './NoteListMain.css'
import NoteError from '../NoteError';

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
    const notesForFolder = getNotesForFolder(notes, Number(folderId))
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <NoteError>
                <Note
                  id={note.id}
                  name={note.name}
                  modified={note.modified}
                />
              </NoteError>
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