import {Button, Modal} from "react-bootstrap";
import {useRef, useState} from "react";
import canvasState from "../store/canvasState.js";


const ModalComponents = () => {

    const userNameRef = useRef(null)
    const [ showModal, setShowModal ] = useState(true)
    const connectionHandler = () => {
        canvasState.setUserName(userNameRef.current.value)
        setShowModal(false)
    }

    return (
        <>
            <Modal
                show={showModal}
                onHide={() => {}}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Введите ваше имя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input ref={userNameRef} type="text"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => connectionHandler()}>
                        Войти
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalComponents