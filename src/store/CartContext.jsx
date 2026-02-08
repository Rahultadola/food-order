import { useReducer, createContext } from 'react';


export const CartContext = createContext({	
	items: [], 
	addItem: (item) => {},
	removeItem: (id) => {}
})


function cartReducer(state, action) {
	
	if( action.type === 'ADD_ITEM') {
		const itemIndex = state.items.findIndex((item) => item.id === action.item.id);

		if( itemIndex > -1) {
			return { 
				...state, 
				items: [ 
					...state.items.filter((itm) => itm.id !== action.item.id), 
					{ ...state.items[itemIndex], quantity: state.items[itemIndex].quantity + 1 } ]
			}

		} else {
			return {
				...state,
				items: [...state.items, { ...action.item, quantity: 1 }]
			}
		}
	}

	if( action.type === 'REMOVE_ITEM' ) {
		const itemIndex = state.items.findIndex(item => item.id === action.id)

		console.log(itemIndex, action.id, state.items)
		if (itemIndex >= 0) {
			if ( state.items[itemIndex].quantity === 1 ) {
				return {
					...state,
					items: state.items.splice(itemIndex, 1)
				}
			} else {
				return { 
					...state, 
					items: [ 
						...state.items.filter((itm, i) => i !== itemIndex), 
						{ 
							...state.items[itemIndex], 
							quantity: state.items[itemIndex].quantity - 1 
						} 
					]
				}	
			}
		} else {
			return { ...state }
		}
	}


	if( action.type === 'CLEAR_CART') {
		return { ...state, items: [] }
	}

	return state;
}

export default function CartContextProvider({ children }) {
	const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] })

	const cartContextValue = {
		cart,
		addItem(item) {
			dispatchCartAction({ type: 'ADD_ITEM', item })
		},

		removeItem(id) {
			dispatchCartAction({ type: 'REMOVE_ITEM', id })
		},

		clearCart() {
			dispatchCartAction({ type: 'CLEAR_CART' })
		}
	}

	return <CartContext.Provider value={cartContextValue}>{ children }</CartContext.Provider>
}