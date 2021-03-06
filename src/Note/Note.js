import React from "react";
import { Link } from "react-router-dom";
import ApiContext from "../ApiContext";
import "./Note.css";
import PropTypes from "prop-types";
import config from "../config";

export default class Note extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {}
  };
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    modified: PropTypes.string.isRequired,
    onDeleteNote: PropTypes.func
  };
  static contextType = ApiContext;
  handleClickDelete = e => {
    e.preventDefault();
    const noteId = this.props.id;

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res;
      })
      .then(() => {
        this.context.deleteNote(noteId);
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(noteId);
      })
      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    const { name, id, modified } = this.props;
    return (
      <div className="Note">
        <h2 className="title">
          <Link to={`/note/${id}`}>{name}</Link>
        </h2>
        <button
          className="delete"
          type="button"
          onClick={this.handleClickDelete}
        >
          remove
        </button>
        <div className="dates">
          <div className="dates-modified">
            Modified <span className="Date">{modified}</span>
          </div>
        </div>
      </div>
    );
  }
}
