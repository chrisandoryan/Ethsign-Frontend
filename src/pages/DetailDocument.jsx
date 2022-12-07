import React, { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DocPreview from "../components/DocPreview";
import Loading from "../components/Loading";
import { getDocumentDetail } from "../services/document";


function DetailDocument(props) {
    const [ docDetail, setDocDetail ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    let { docId } = useParams();

    useEffect(() => {
        setLoading(true);
        getDocumentDetail(docId)
            .then((data) => {
                setLoading(false);
                setDocDetail(data.document);
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
            {
                loading ? (
                    <Loading />
                ) : (
                    <DocPreview doc_file={docDetail?.file_buffer} />
                )
            }
        </React.Fragment>
    );
}


export default DetailDocument;