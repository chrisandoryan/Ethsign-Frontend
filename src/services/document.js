import axios from 'axios';
import { getBearerTokenFromStorage } from './storage';

export const getAllDocuments = async () => {
    let token = getBearerTokenFromStorage();
    let response = await axios.get('/documents', { 
        headers: { 
            "Authorization": token 
        }
    });
    return response.data;
}

export const getDocumentDetail = async (doc_id) => {
    let token = getBearerTokenFromStorage();
    let response = await axios.get(`/documents/${doc_id}`, { 
        headers: { 
            "Authorization": token 
        }
    });
    return response.data;
}

export const uploadDocument = async (docFormData) => {
    let token = getBearerTokenFromStorage();
    let response = await axios.post('/upload', docFormData, { 
        headers: { 
            "Authorization": token,
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
}

export const signDocument = async (doc_id) => {
    let token = getBearerTokenFromStorage();
    let response = await axios.post(`/sign/${doc_id}`, null, { 
        headers: { 
            "Authorization": token,
        }
    });
    return response.data;
}