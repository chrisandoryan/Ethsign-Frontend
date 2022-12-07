import React, { useState } from "react";
import { useEffect } from "react";
import { Accordion, Badge, Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllDocuments, getDocumentDetail, signDocument } from "../../services/document";
import { getWalletAddressFromStorage } from "../../services/storage";
import { humanFileSize } from "../../utils/fileSize";

function ViewAllDocuments() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeDocument, setActiveDocument] = useState(null);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setLoading(true);
        getAllDocuments()
            .then((data) => {
                setLoading(false);
                setDocuments(data.documents);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const displaySignConfirmation = (doc_id) => {
        handleShow();
        setActiveDocument(doc_id);
    }

    const handleDocumentSigning = async () => {
        let sign = await signDocument(activeDocument);
        console.log(sign);
    }

    return (
        <React.Fragment>
            <Accordion defaultActiveKey="0">
                {
                    documents.map((document, id) => {
                        const userAlreadySigned = document.signed_addresses.includes(getWalletAddressFromStorage()) ? true : false;
                        return (
                            <Accordion.Item eventKey={id} key={id}>
                                <Accordion.Header>
                                    <div>{document.doc_title} | {document.doc_id}</div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="doc-data">
                                        <h4>{document.doc_title}</h4>
                                        <p><Badge bg="secondary">File Size</Badge> {humanFileSize(document.file_size)}</p>
                                        <p><Badge bg="secondary">File Type</Badge> {document.file_type}</p>
                                        <p><Badge bg="secondary">IPFS Hash</Badge> {document.ipfs_hash}</p>
                                        <p><Badge bg="secondary">Lock Status</Badge> {document.is_locked ? "Locked" : "Not Locked"}</p>
                                        <div>
                                            <b>Signers</b>
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Wallet Address</th>
                                                        <th>Has Signed</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        document.signers.map((signer, s_id) => (
                                                            <tr key={s_id}>
                                                                <td>{signer.email}</td>
                                                                <td>{signer.wallet_address}</td>
                                                                <td>{document.signed_addresses.includes(signer.wallet_address) ? "Yes" : "No"}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                    <div className="doc-action">
                                        <Link to={`/document/${document.doc_id}`}><Button variant="primary" className="">View Document</Button></Link>{' '}
                                        <Button variant="success" className="ms-2" disabled={userAlreadySigned} onClick={() => displaySignConfirmation(document.doc_id)}>{
                                            userAlreadySigned ? "Already Signed" : "Sign Document"
                                        }</Button>{' '}
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        );
                    })
                }
            </Accordion>
            <Modal style={{opacity: 1}} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning! Are you sure you want to sign?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Once signed, the document and your signature will be stored permanently in the Ethereum Network blockchain. There will be no way to revert the document.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleDocumentSigning}>
                        Yes, Sign
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

export default ViewAllDocuments;
