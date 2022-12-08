import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser } from "../services/auth";
import UploadDocument from "./fragments/UploadDocument";
import ViewAllDocuments from "./fragments/ViewAllDocuments";


function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/login', { replace: true });
    }

    return (
        <div>
            <div id="doc-tabs" className="container">
                <ul className="nav nav-pills">
                    <li className="active">
                        <a href="#view-documents" data-toggle="tab" className="tab-control">View All Documents</a>
                    </li>
                    <li>
                        <a href="#upload-document" data-toggle="tab" className="tab-control">Upload Document</a>
                    </li>
                    <li>
                        <a href="#logout" data-toggle="tab" className="tab-control" onClick={handleLogout}>Logout</a>
                    </li>
                </ul>
                <div className="tab-content clearfix">
                    <div className="tab-pane active" id="view-documents">
                        <ViewAllDocuments refresh={Math.random()}/>
                    </div>
                    <div className="tab-pane" id="upload-document">
                        <UploadDocument />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Home;