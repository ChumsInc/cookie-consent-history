import {Modal, type ModalProps} from "react-bootstrap";
import type {CookieConsentHistoryRecord} from "chums-types";

export interface ConsentInfoModalProps extends ModalProps {
    consent: CookieConsentHistoryRecord;
}
export default function ConsentInfoModal({consent, ...props}: ModalProps) {
    return (
        <Modal {...props}>
            <Modal.Header closeButton>Cookie Consent Record</Modal.Header>
            <Modal.Body>
                <pre>{JSON.stringify(consent, null, 2)}</pre>
            </Modal.Body>
        </Modal>
    )
}
