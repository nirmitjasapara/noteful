import React from 'react'
import { Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import './Note.css'

export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = ApiContext;
  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id
    let API_ENDPOINT = 'http://localhost:9090';

    fetch(`${API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteNote(noteId)
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { name, id, modified } = this.props
    return (
      <div className='Note'>
        <h2 className='title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='delete'
          type='button'
          onClick={this.handleClickDelete}
        >remove</button>
        <div className='dates'>
          <div className='dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {modified}
            </span>
          </div>
        </div>
      </div>
    )
  }
}