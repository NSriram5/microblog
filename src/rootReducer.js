const INITIAL_STATE = { posts: {}, error: false };

function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'ADD':
            return state;
        case 'EDIT':
            return state;
        case 'REMOVE':
            return state;
            // case "ADD":
            //     if (targetId in cart) {
            //         const updatedCartItem = {...cart[targetId], count: cart[targetId].count + 1 }
            //         return {...state, cart: {...cart, [targetId]: updatedCartItem } }
            //     }
            //     return { offerings: state.offerings, cart: {...cart, [targetId]: { price: 0, count: 1, discount: 1 } } };

            // case "REMOVE":
            //     if (!(targetId in cart)) {
            //         return state;
            //     }
            //     if (cart[targetId].count === 1) {
            //         const {
            //             [targetId]: a, ...theRest
            //         } = cart
            //         return { offerings: state.offerings, cart: theRest };
            //     }
            //     const updatedCartItem = {...cart[targetId], count: cart[targetId].count - 1 }
            //     return {...state, cart: {...cart, [targetId]: updatedCartItem } }
            // case "EDIT":
            //     if (!(targetId in cart)) {
            //         return state;
            //     }
            //     const {
            //         [targetId]: a, ...theRest
            //     } = cart
            //     return { offerings: state.offerings, cart: theRest };

        default:
            return state;
    }
}

export default rootReducer;