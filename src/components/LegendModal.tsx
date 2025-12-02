import {Modal, type ModalProps} from "react-bootstrap";
import styled from "@emotion/styled";

const Icon = styled.span`
    width: 1rem;
    margin-right: 0.5rem;
`;

export default function LegendModal(props:ModalProps) {
    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                Legend
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex gap-5 border-bottom mb-1">
                    <div><Icon className="bi-person-fill" /> Employee</div>
                    <div><Icon className="bi-people-fill" /> Rep</div>
                    <div><Icon className="bi-cart-fill" /> B2B Customer</div>
                </div>
                <div>
                    <Icon className="bi-check-circle"/>
                    <span> Cookie Policy Acknowledged</span>
                </div>
                <div>
                    <Icon className="bi-check"/>
                    <span className="ms-1 me-2">Status: </span>
                    <span className="text-success mx-1">Accepted</span>/
                    <span className="text-warning mx-1">Partial</span>/
                    <span className="text-danger ms-1">Rejected</span>
                </div>
                <div><Icon className="bi-incognito text-secondary"/> Global Privacy Control detected</div>
            </Modal.Body>
        </Modal>
    )
}
