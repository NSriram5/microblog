import { v4 as uuidv4 } from 'uuid';
import { ADD, EDIT, REMOVE, LOAD_SUMMARY, LOAD_SPECIFIC, ADD_COMMENT, DELETE_COMMENT, UPVOTE, DOWNVOTE } from './actionTypes';

const INITIAL_STATE = { summaryPosts: [], detailPosts: {} };

function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOAD_SUMMARY:
            return { summaryPosts: action.posts, detailPosts: state.detailPosts };
        case LOAD_SPECIFIC:
            return {
                ...state,
                detailPosts: {
                    ...state.detailPosts,
                    [action.post.id]: action.post
                }
            };

        case ADD:
            //add the new post to the detailed posts so that it can be retrieved from memory quickly without an api request
            return {
                summaryPosts: {
                    [action.post.id]: {
                        id: action.post.id,
                        title: action.post.title,
                        description: action.post.description,
                        votes: action.post.votes
                    }
                },
                detailPosts: {
                    [action.post.id]: {
                        id: action.post.id,
                        title: action.post.title,
                        description: action.post.description,
                        body: action.post.body,
                        votes: action.post.votes,
                        comments: action.post.comments
                    }
                }
            };
        case EDIT:
            //add the editted post to the detailed posts so that it can be retrieved from memory quickly without an api request
            return {
                summaryPosts: {
                    [action.post.id]: {
                        id: action.post.id,
                        title: action.post.title,
                        description: action.post.description,
                        votes: action.post.votes
                    }
                },
                detailPosts: {
                    [action.post.id]: {
                        id: action.post.id,
                        title: action.post.title,
                        description: action.post.description,
                        body: action.post.body,
                        votes: action.post.votes,
                        comments: action.post.comments
                    }
                }
            };
        case REMOVE:
            let {
                [action.key]: deletedb, ...detailPosts
            } = state.detailPosts;
            return {
                ...state,
                detailPosts: detailPosts
            };

        case ADD_COMMENT:
            return {
                summaryPosts: state.summaryPosts,
                detailPosts: {
                    [action.key]: {
                        comments: {
                            [action.commentKey]: action.comment,
                            ...state.detailPosts[action.key].comments
                        }
                    },
                    ...state.detailPosts
                }
            };

        case DELETE_COMMENT:
            let {
                [action.commentKey]: ditchComment, ...filteredComments
            } = state.detailPosts[action.key].comments
            return {
                summaryPosts: state.summaryPosts,
                detailPosts: {
                    [action.key]: {
                        comments: filteredComments,
                        ...state.detailPosts[action.key]
                    }
                }
            }
        case UPVOTE:
            //Not needed here
            return {
                summaryPosts: {
                    ...state.summaryPosts,
                    [action.key]: {...state.summaryPosts[action.key], votes: state.summaryPosts[action.key].votes + 1 }
                },
                detailPosts: state.detailPosts
            }
        case DOWNVOTE:
            //Not needed here
            return {
                summaryPosts: {
                    ...state.summaryPosts,
                    [action.key]: {...state.summaryPosts[action.key], votes: state.summaryPosts[action.key].votes - 1 }
                },
                detailPosts: state.detailPosts
            }
        default:
            return state;
    }
}

export
default rootReducer;