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
                    <div className="tab-pane" id="view-documents">
                        <ViewAllDocuments />
                    </div>
                    <div className="tab-pane" id="upload-document">
                        <h3>
                            <form action="upload.php" method="post">
                                Select document to upload:
                                <input type="file" name="fileToUpload" id="fileToUpload" />
                                <input type="submit" defaultValue="Upload File" name="submit" />
                            </form>
                        </h3>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Home;