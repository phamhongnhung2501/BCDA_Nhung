import React from "react";
import Webcam from "react-webcam";

const ModalCamera = props => {
    // const webcamRef = React.useRef(null);
    // const capture = React.useCallback(() => {
    //     const imageSrc = webcamRef.current.getScreenshot();
    //     props.handleShooting(imageSrc);
    //     props.toggle();
    // }, [webcamRef]);

    return (
        // <Modal isOpen={props.isOpen} centered className="modal-camera" size="lg">
        //     <ModalHeader toggle={props.toggle}>{"Chụp ảnh - " + props.label}</ModalHeader>
        //     <ModalBody className="text-center">
        <iframe
            src='http://192.168.1.132/doc/page/login.asp?_1572732244396'
            allow='camera; microphone;'
            width='100%'
            height={700}
        />

        //     </ModalBody>
        //     <ModalFooter className="text-center">
        //         <Button onClick={capture}>Chụp ảnh</Button>
        //     </ModalFooter>
        // </Modal>
    );
};

export default ModalCamera;
