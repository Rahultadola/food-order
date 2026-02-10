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
				items: state.items.map((itm, index) => index === itemIndex ? {
							...itm, quantity: itm.quantity + 1
						} : itm
					),
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

		if (itemIndex > -1) {
			const existingItem = state.items[itemIndex];
			const updatedItems = [...state.items]; // Create a shallow copy of the array

			if (existingItem.quantity === 1) {
				// Remove the item using filter (non-mutating)
				const filteredItems = state.items.filter(item => item.id !== action.id);
				return { ...state, items: filteredItems };
			} else {
				// Update the quantity by creating a NEW object
				const updatedItem = { 
					...existingItem, 
					quantity: existingItem.quantity - 1 
				};
				updatedItems[itemIndex] = updatedItem;

				return { ...state, items: updatedItems };
			}
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