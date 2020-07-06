import React from 'react'
import './AddFolder.css'
import ValidationError from '../ValidationError';

export default class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          folderName: {
            value: "",
            touched: false
          },
        };
      }
    
      updateFolderName(folderName) {
        this.setState({ folderName: { value: folderName, touched: true } });
      }
    
      handleSubmit(event) {
        event.preventDefault();
        const { folderName } = this.state;
        let API_ENDPOINT = 'http://localhost:9090';

        fetch(`${API_ENDPOINT}/folders`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: {
              name: folderName.value
          }
          })
          .catch(error => {
            console.error({ error })
          })
        }
    
      validateFolderName() {
        const folderName = this.state.folderName.value.trim();
        if (folderName.length === 0) {
          return "Folder name is required";
        }
      }
      render() {
        const folderNameError = this.validateFolderName();
    
        return (
          <form className="registration" onSubmit={e => this.handleSubmit(e)}>
            <h2>Add Folder</h2>
            <div className="form-group">
              <label htmlFor="name">Folder Name </label>
              <input
                type="text"
                className="registration__control"
                name="name"
                id="name"
                onChange={e => this.updateFolderName(e.target.value)}
              />
              {this.state.folderName.touched && <ValidationError message={folderNameError} />}
            </div>
            <button
                type="submit"
                className="registration_button"
                disabled={
                  this.validateFolderName()
                }
              >
                Add
              </button>
          </form>
        );
      }
    }