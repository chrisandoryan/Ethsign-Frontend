import { useState } from "react";
import { useEffect } from "react";
import { Accordion, Badge, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllDocuments, getDocumentDetail } from "../../services/document";
import { getWalletAddressFromStorage } from "../../services/storage";
import { humanFileSize } from "../../utils/fileSize";

function ViewAllDocuments() {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        getAllDocuments()
            .then((data) => {
                setDocuments(data.documents);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const handleViewDocument = async (e, doc_id) => {
        e.preventDefault();
        let document = await getDocumentDetail(doc_id);
        console.log(document);
    }

    return (
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
                                    <Link to={`/document/${document.doc_id}`}><Button variant="primary">View Document</Button></Link>{' '}
                                    <Button variant="success">{
                                        userAlreadySigned ? "Already Signed" : "Sign Document"
                                    }</Button>{' '}
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    );
                })
            }
        </Accordion>
    );
}

export default ViewAllDocuments;
