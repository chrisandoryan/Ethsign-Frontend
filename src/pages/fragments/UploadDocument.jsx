import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { uploadDocument } from "../../services/document";
import { getUserDataFromStorage } from "../../services/storage";
import { getAllUsers } from "../../services/user";


function UploadDocument() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [users, setUsers] = useState([
        { value: 'no_data', label: 'No Data' },
    ]);

    const handleDocumentSubmission = async (e) => {
        e.preventDefault();
        setLoading(true);

        var bodyFormData = new FormData();
        let doc_title = e.target.doc_title.value;
        let doc_file = e.target.doc_file.files[0];
        let doc_signers = Array.from(e.target.doc_signers).map((s, i) => s.value);

        bodyFormData.append('user_doc', doc_file);
        bodyFormData.append('document_title', doc_title);
        doc_signers.forEach(ds => {
            bodyFormData.append('signer_ids[]', ds);
        });

        let upload = await uploadDocument(bodyFormData);
        if (upload.success) {
            toast(`Document successfully uploaded with ID: ${upload.doc_id}!`);
        }
        else {
            toast('Document upload failed, please try again.');
        }

        setLoading(false);
        navigate('/', { replace: true });
    }

    useEffect(() => {
        getAllUsers()
            .then((data) => {
                let thisUser = getUserDataFromStorage();
                console.log(thisUser);
                let users = data.users.map((user, index) => {
                    if (user._id == thisUser.id) {
                        return ({
                            value: user.wallet_address,
                            label: `${user.email} (You)`,
                        })
                    }
                    else {
                        return ({
                            value: user.wallet_address,
                            label: user.email,
                        })
                    }
                });
                setUsers(users);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <div>
            {
                loading ? (
                    <Loading />
                ) : (
                    <div className="doc-upload-form">
                        <Form onSubmit={handleDocumentSubmission}>
                            <Form.Group className="mb-3">
                                <Form.Label>1. Set Document Title</Form.Label>
                                <Form.Control type="text" name="doc_title" placeholder="The Hitchhiker's Guide to Proposal Skripsi" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>2. Upload Your Document</Form.Label>
                                <Form.Control type="file" name="doc_file" accept="application/pdf" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>3. Configure Signers</Form.Label>
                                <Select
                                    defaultValue={[users[2], users[3]]}
                                    isMulti
                                    name="doc_signers"
                                    options={users}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Upload
                            </Button>
                        </Form>
                    </div>
                )
            }
        </div>
    );
}

export default UploadDocument;