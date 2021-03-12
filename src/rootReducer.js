const importedInventory = require('./data.json');

const INITIAL_STATE = { offerings: importedInventory.products, cart: {} };

function rootReducer(state = INITIAL_STATE, action) {
    const cart = state.cart;
    const targetId = action.id
    switch (action.type) {
        case "ADD":
            if (targetId in cart) {
                const updatedCartItem = {...cart[targetId], count: cart[targetId].count + 1 }
                return {...state, cart: {...cart, [targetId]: updatedCartItem } }
            }
            return { offerings: state.offerings, cart: {...cart, [targetId]: { price: 0, count: 1, discount: 1 } } };

        case "REDUCE":
            if (!(targetId in cart)) {
                return state;
            }
            if (cart[targetId].count === 1) {
                const {
                    [targetId]: a, ...theRest
                } = cart
                return { offerings: state.offerings, cart: theRest };
            }
            const updatedCartItem = {...cart[targetId], count: cart[targetId].count - 1 }
            return {...state, cart: {...cart, [targetId]: updatedCartItem } }
        case "REMOVE":
            if (!(targetId in cart)) {
                return state;
            }
            const {
                [targetId]: a, ...theRest
            } = cart
            return { offerings: state.offerings, cart: theRest };

        default:
            return state;
    }
}

export default rootReducer;