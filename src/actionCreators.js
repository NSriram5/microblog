import axios from 'axios';

const API_URL = ''

function fetchPosts() {
    return {
        type: 'GET'
    };
}

function handleError(error) {
    return {
        type: 'ERROR'
    };
}

export function fetchPostsFromAPI() {
    return async function thunk(dispatch) {
        try {
            let posts = await axios.get(`${API_URL}`);
            dispatch(fetchPosts());
        } catch (error) {
            dispatch(handleError(error.response.data));
        }
    }
}