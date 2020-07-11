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
      >Go Back</Link>
    </div>
  )
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}