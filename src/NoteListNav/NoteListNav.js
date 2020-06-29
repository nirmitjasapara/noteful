import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import { countNotesForFolder } from '../notes-helper'
import './NoteListNav.css'

export default class NoteListNav extends React.Component {
  static contextType = ApiContext;

  render() {
    const { folders=[], notes=[] } = this.context
    return (
      <div className='NoteListNav'>
        <ul className='Nav_list'>
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink
                className='Nav-list-item'
                to={`/folder/${folder.id}`}
              >
                <span className='num-notes'>
                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.name}
              </NavLink>
            </li>
          )}
        </ul>
        <Link
          to='/add-folder'
          type='button'
          className='add_button'
        >Add Folder</Link>
      </div>
    )
  }
}