import UploadDocument from "./fragments/UploadDocument";
import ViewAllDocuments from "./fragments/ViewAllDocuments";
// import "../styles/Home.css";


function Home() {
    return (
        <div>
            <div id="doc-tabs" className="container">
                <ul className="nav nav-pills">
                    <li className="active">
                        <a href="#view-documents" data-toggle="tab">View All Documents</a>
                    </li>
                    <li>
                        <a href="#upload-document" data-toggle="tab">Upload Document</a>
                    </li>
                </ul>
                <div className="tab-content clearfix">
                    <div className="tab-pane active" id="view-documents">
                        <ViewAllDocuments />
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