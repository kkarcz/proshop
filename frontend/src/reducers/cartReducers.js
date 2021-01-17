import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const newProduct = action.payload;

            const existItem = state.cartItems.find(oldProduct => oldProduct.productId === newProduct.productId)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(oldProduct => oldProduct.productId === existItem.productId ? newProduct : oldProduct)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, newProduct]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.productId !== action.payload)
            }
        default:
            return state
    }
}