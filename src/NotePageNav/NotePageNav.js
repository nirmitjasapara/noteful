import React from 'react'
import './NotePageNav.css'
import { Link } from 'react-router-dom'

export default function NotePageNav(props) {
  return (
    <div className='NotePageNav'>
      <Link
        tag='button'
        role='link'
        onClick={() => props.history.goBack()}
        className='back-button'
      >Back</Link>
      {props.folder && (
        <h3 className='folder-name'>
          {props.folder.name}
        </h3>
      )}
    </div>
  )
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}