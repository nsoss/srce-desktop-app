import React from 'react';
import ReactDOM from 'react-dom';

const root = document.getElementById('root')
const modalRoot = document.getElementById('modal-root')

export default class Modal extends React.Component {
  render() {
    return ReactDOM.createPortal(
      <div
        style={{
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          display: 'grid',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.9)',
        }}
        onClick={this.props.onClose}
      >
        <div
          style={{
            padding: 20,
            background: '#fff',
            borderRadius: '2px',
            display: 'inline-block',
            minHeight: '250px',
            margin: '1rem',
            position: 'relative',
            minWidth: '300px',
            boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
            justifySelf: 'center',
          }}
        >
          <h5>Morate uneti šifru</h5>
          <hr />
          {this.props.children}
          <hr />
          <button className="btn btn-dark-green m-0" onClick={this.props.onClose}>Enter</button>
        </div>
      </div>,
      modalRoot,
    )
  }
}