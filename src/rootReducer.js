import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE = { posts: {}, error: false, comments: {} };

function rootReducer(state = INITIAL_STATE, action) {
    const post = action.post
    let key = action.id
    let comments
    switch (action.type) {

        case 'ADD':
            key = uuidv4();
            return {
                posts: {...state.posts, [key]: post },
                error: false,
                comments: {
                    [key]: {},
                    ...state.comments
                }
            };
        case 'EDIT':
            return { posts: {...state.posts, [key]: post }, error: false, comments: state.comments };
        case 'REMOVE':
            let {
                [key]: a, ...rest
            } = state.posts
            return { posts: rest, error: false, comments: state.comments }
        case 'LOAD':
            return state;
        case 'ADD_COMMENT':
            comments = state.comments;
            const existingComments = comments[action.id];
            const newComments = {
                [action.id]: {
                    [action.commentId]: action.comment,
                    ...existingComments
                }
            }
            return { comments: newComments, posts: state.posts, error: false }

        case 'DELETE_COMMENT':
            comments = state.comments[action.id];
            const {
                [action.key]: b, ...commentsrest
            } = comments;
            return {
                posts: state.posts,
                error: false,
                comments: {
                    [action.id]: { commentsrest },
                    ...state.comments
                }
            }
        default:
            return state;
    }
}

export default rootReducer;