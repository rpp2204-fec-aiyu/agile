const React = require('react')
import ReactDOM from 'react-dom';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var isOpen = this.props.isOpen;
    var closeModal = this.props.closeModal;
    var modalContent = this.props.modalContent;
    var renderModal;
    const modalRoot = document.getElementById('modal-root');

    if (isOpen) {
      renderModal = ReactDOM.createPortal(modalContent, modalRoot);
    }

    return (
      <div>
        {renderModal}
      </div>
    )
  }
}