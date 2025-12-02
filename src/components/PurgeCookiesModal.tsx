import {Modal, type ModalProps} from "react-bootstrap";

export interface PurgeCookiesModalProps extends ModalProps {
    onPurgeCookies: () => void;
}

export default function PurgeCookiesModal({onPurgeCookies, ...props}: PurgeCookiesModalProps) {
    return (
        <Modal  {...props}>
            <Modal.Header closeButton>
                Purge Expired Cookies?
            </Modal.Header>
            <Modal.Body>
                <div>
                    This will remove expired cookies that are more than 24 months old.
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-danger" onClick={onPurgeCookies}>Purge</button>
            </Modal.Footer>
        </Modal>
    )
}
