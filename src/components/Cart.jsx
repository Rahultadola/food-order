import { use } from 'react';

import Modal from './Modal.jsx';
import Button from './UI/Button.jsx';
import { currencyFormatter } from '../utils/formatting.js';

import { UserProgressContext } from '../store/UserProgress.jsx';
import { CartContext } from '../store/CartContext.jsx';

import CartItem from './CartItem.jsx';


export default function Cart() {
	const { cart, addItem, removeItem } = use(CartContext)
	const { progress, showCheckout, hideCart } = use(UserProgressContext)

	const itemQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0)
	const totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.price , 0)
	
	console.log("Quantity: ", itemQuantity)
	return <Modal className="cart" open={progress === 'cart'} onClose={progress === 'cart'? hideCart : null}>
		<h1>Your Cart</h1>
		{itemQuantity === 0 && <p>Add items to cart...</p>}
		<ul>
			{ cart.items.map((item) => (
				<CartItem 
					key={item.id}
					id={item.id}
					name={item.name}
					price={item.price}
					quantity={item.quantity}
					decreaseItem={removeItem}
					increaseItem={addItem}
				/>
			))}
		</ul>
		<p className="cart-total">{currencyFormatter.format(totalPrice)}</p>

		<p className="modal-actions">
			<Button textOnly onClick={hideCart}>Close</Button>
			{ itemQuantity > 0 && <Button onClick={showCheckout}>Checkout</Button> }
		</p>
		
	</Modal>
}