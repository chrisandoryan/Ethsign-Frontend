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
