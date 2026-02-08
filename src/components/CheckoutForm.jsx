import { use, useActionState } from 'react';

import { currencyFormatter } from '../utils/formatting.js';
import { UserProgressContext } from '../store/UserProgress.jsx';
import { CartContext } from '../store/CartContext.jsx';

import useHTTP from '../hooks/use-http.js';


import Input from './UI/Input.jsx';
import Button from './UI/Button.jsx';
import Modal from './Modal.jsx';
import Error from './Error.jsx';


const requestConfig = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	}
}




export default function CheckoutForm() {
	const {progress, hideCheckout} = use(UserProgressContext)
	const { cart, clearCart } = use(CartContext)

	const { data, isLoading, error, sendRequest, resetData, resetError } = useHTTP('orders', requestConfig);

	const totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.price , 0)


	async function handleOrderSubmit(prevState, formData) {
		const enteredValues = Object.fromEntries(formData.entries())
		console.log("submitting form :", enteredValues)
		sendRequest(JSON.stringify({
			order: {
				items: cart,
				customer: enteredValues
			}
		}));
	}

	const [formState, formAction, pending] = useActionState(handleOrderSubmit, null)

	function handleFinalClose() {
		resetData()
		clearCart()
		hideCheckout()
	}
	
	if( data && !error ) {
		console.log("Data init: ", data)
		return (
			<Modal open={progress === 'checkout'} onClose={hideCheckout}>
				<h4>Order Placed Successfully!</h4>
				<p>We will connect through e-mail.</p>
				<p className="modal-actions">
					<Button onClick={handleFinalClose}>Okay</Button>
				</p>
			</Modal>
		);
	}

	return (
		<Modal open={progress === 'checkout'} onClose={hideCheckout}>
			<form action={formAction}>
				<h2>Checkout</h2>
				<p>Total Amount: {currencyFormatter.format(totalPrice)}</p>
				<Input id="full-name" label="Full Name" type="text" name="name" resetError={resetError}/>
				<Input id="email" label="E-mail Address" type="email" name="email" resetError={resetError}/>
				<Input id="street" label="Street" type="text" name="street" resetError={resetError} />
				<div className="control-row">
					<Input id="postal-code" label="Postal Code" name="postal-code" type="number" resetError={resetError}/>
					<Input id="city" label="City" name="city" type="text" resetError={resetError}/>
				</div>

				{error && <Error title="Error Submitting data" message="An error occurred during placing an order." />}

				<p className="modal-actions">
					{pending ? 'Submitting data...' : (<>
						<Button type="button" textOnly onClick={hideCheckout}>Close</Button>
						<Button type="submit" >Submit Order</Button>
					</>)}
				</p>
			</form>
		</Modal>
	)
}