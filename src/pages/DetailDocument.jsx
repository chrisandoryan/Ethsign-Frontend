import React, { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DocPreview from "../components/DocPreview";
import { getDocumentDetail } from "../services/document";


function DetailDocument(props) {
    const [ docDetail, setDocDetail ] = useState(null);
    let { docId } = useParams();

    useEffect(() => {
        getDocumentDetail(docId)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);
    return (
        <React.Fragment>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Document</Breadcrumb.Item>
            </Breadcrumb>
            <DocPreview />
        </React.Fragment>
    );
}


export default DetailDocument;