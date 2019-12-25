import React from 'react';
import ReactDOM from 'react-dom';

const root = document.getElementById('root')
const modalRoot = document.getElementById('modal-root')

export default class Modal extends React.Component {
  render() {
    return ReactDOM.createPortal(
      <div
        className='modal align-items-center justify-content-center'
        onClick={this.props.onClose}
      >
        <div className='modal-body text-center'>
          <h5 style={{ color: 'var(--text' }}>Morate uneti šifru</h5>
          <hr />
          {this.props.children}
          <hr />
          <div className="row">
            <div className="col-4"></div>
            <div className="col-4">
              <button className="btn btn-dark-green m-0" onClick={this.props.onClose}>OK</button>
            </div>
          </div>
        </div>
      </div>,
      modalRoot,
    )
  }
}
