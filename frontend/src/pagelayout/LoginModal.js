import React from 'react'
import LoginForm from '../containers/Login'
import { Modal } from 'antd';

function LoginModal(props) {
    return (
        <div>
            <Modal
            visible={props.visible}
            title="Sign in"
            onCancel={() => props.closeModal()}
            footer={[
            ]}
            >
            <LoginForm />
            </Modal>
        </div>
    )
}

export default LoginModal