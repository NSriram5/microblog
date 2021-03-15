import axios from 'axios';
import { ADD, EDIT, REMOVE, LOAD_SUMMARY, LOAD_SPECIFIC, ADD_COMMENT, DELETE_COMMENT } from './actionTypes';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

const API_URL = ''

function loadSummary(posts) {
    return {
        type: LOAD_SUMMARY,
        posts
    };
}
export function fetchSummaryPostsFromAPI() {
    return async function(dispatch) {
        console.log("hello");
        try {
            let posts = await axios.get(`${BASE_URL}/api/posts`);
            dispatch(loadSummary(posts.data));
        } catch (error) {
            dispatch(handleError(error.response.data));
        }
    }
}

function loadSpecific(post) {
    return {
        type: LOAD_SPECIFIC,
        post
    }
}
export function fetchSpecificPostFromAPI({ id }) {
    return async function(dispatch) {
        try {
            let post = await axios.get(`${BASE_URL}/api/posts/${id}`);
            dispatch(loadSpecific(post.data));
        } catch (error) {
            dispatch(handleError(error.response.data));
        }
    }
}

//potentially unnecessary
function add(post) {
    return {
        type: ADD,
        post
    }
}
export function postPostToAPI({ inputPost }) {
    return async function(dispatch) {
        try {
            const data = inputPost;
            let post = await axios.post(`${BASE_URL}/api/posts`, data);
            dispatch(fetchSummaryPostsFromAPI());
            dispatch(fetchSpecificPostFromAPI({ id: post.data.id }));
            //dispatch(add(post.data));
        } catch (error) {
            dispatch(handleError(error.response.data));
        }
    }
}

function edit(post) {
    return {
        type: EDIT,
        post
    }
}
export function updatePostToAPI({ inputPost }) {
    return async function(dispatch) {
        try {
            const data = inputPost;
            debugger;
            let post = await axios.put(`${BASE_URL}/api/posts/${inputPost.id}`, data);
            dispatch(fetchSummaryPostsFromAPI());
            dispatch(fetchSpecificPostFromAPI({ id: post.data.id }));
            //dispatch(edit(post.data));
        } catch (error) {
            dispatch(handleError(error.message));
        }
    }
}

function remove(key) {
    return {
        type: REMOVE,
        key
    }
}
export function deletePostFromAPI({ key }) {
    return async function thunk(dispatch) {
        try {
            let post = await axios.delete(`${BASE_URL}/api/posts/${key}`);
            dispatch(fetchSummaryPostsFromAPI());
            dispatch(remove(key));
        } catch (error) {
            dispatch(handleError(error.response.data));
        }
    }
}

function addComment(key, commentKey, comment) {
    return {
        type: ADD_COMMENT,
        key,
        commentKey,
        comment
    }
}
export function addCommentToAPI({ key, text }) {
    return async function(dispatch) {
        console.log("hello there");
        try {
            let data = { text };
            let comment = await axios.post(`${BASE_URL}/api/posts/${key}/comments/`, data);
            dispatch(fetchSpecificPostFromAPI({ id: key }));
            //dispatch(addComment(key, comment.data.id, comment.data.text))
        } catch (error) {
            dispatch(handleError(error.message));
        }
    }
}

function deleteComment(key, commentKey) {
    return {
        type: DELETE_COMMENT,
        key,
        commentKey
    }
}
export function deleteCommentFromAPI({ key, commentKey }) {
    return async function(dispatch) {
        try {
            let result = await axios.delete(`${BASE_URL}/api/posts/${key}/comments/${commentKey}`);
            dispatch(fetchSpecificPostFromAPI({ id: key }));
            //dispatch(deleteComment(key, commentKey));
        } catch (error) {
            dispatch(handleError(error.message));
        }
    }
}
export function voteWithAPI({ key, direction }) {
    return async function(dispatch) {
        try {
            let result = await axios.post(`${BASE_URL}/api/posts/${key}/vote/${direction}`);
            dispatch(fetchSummaryPostsFromAPI());
            dispatch(fetchSpecificPostFromAPI({ id: key }));
        } catch (error) {
            dispatch(handleError(error.message));
        }
    }
}


function handleError(error) {
    return {
        type: 'ERROR',
        error
    };
}