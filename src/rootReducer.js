import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE = { posts: {}, error: false, comments: {} };

function rootReducer(state = INITIAL_STATE, action) {
    const post = action.post
    let key = action.id
    switch (action.type) {

        case 'ADD':
            key = uuidv4();
            return { posts: {...state.posts, [key]: post }, error: false, comments: state.comments };
        case 'EDIT':
            return { posts: {...state.posts, [key]: post }, error: false, comments: state.comments };
        case 'REMOVE':
            const {
                [key]: a, ...rest
            } = state.posts
            return { posts: rest, error: false, comments: state.comments }
        case 'LOAD':
            return state;

        default:
            return state;
    }
}

export default rootReducer;