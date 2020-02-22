import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

export default class Modal extends React.Component {
    render() {
        return ReactDOM.createPortal(
            <div
                className="modal align-items-center justify-content-center"
                onClick={this.props.onClose}
            >
                <div className="modal-body text-center">
                    <h5 style={{ color: 'var(--text)' }}>Morate uneti šifru</h5>
                    <hr />
                    {this.props.children}
                    <hr />
                    <button className="btn-srce" onClick={this.props.onClose}>
                        Enter
                    </button>
                    <button
                        className="btn-srce"
                        style={{ marginLeft: 'auto' }}
                        onClick={this.props.onCancel}
                    >
                        Povratak
                    </button>
                </div>
            </div>,
            modalRoot
        );
    }
}
