import { useState, createContext } from 'react';

export const UserProgressContext = createContext({
	progress: '', // 'cart', 'checkout'
	showCart: () => {},
	hideCart: () => {},
	showCheckout: () => {},
	hideCheckout: () => {}
})



export default function UserProgressProvider({ children }) {
	const [ userProgress, setUserProgress ] = useState('');
	
	const UserProgressValue = {
		progress: userProgress, // 'cart', 'checkout'
		showCart: () => {
			setUserProgress('cart')
		},
		hideCart: () => {
			setUserProgress('')
		},
		showCheckout: () => {
			console.log("Checkout is clicked!")
			setUserProgress('checkout')
		},
		hideCheckout: () => {
			setUserProgress('')			
		}
	}
	
	return <UserProgressContext.Provider value={UserProgressValue}>{ children }</UserProgressContext.Provider>
}