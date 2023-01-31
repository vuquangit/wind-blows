import React from 'react'
import { Modal } from 'antd'
import classNames from 'classnames'
import './modal.scss'

const ModalComponent = ({ children, className = '', ...props }) => {
  const styleModal = classNames('modal-modify', className)

  return (
    <Modal {...props} className={styleModal}>
      {children}
    </Modal>
  )
}

export default ModalComponent
