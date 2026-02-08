import { currencyFormatter } from '../utils/formatting.js';

export default function CartItem({id, name, quantity, price, decreaseItem, increaseItem}) {

	function handleIncreaseItem() {
		increaseItem({
			id: id,
			price: price,
			name: name,
		})
	}


	function handleDecreaseItem() {
		decreaseItem(id)
	}



	return (
		<li className="cart-item">
			<p>{id} {name} - {quantity} x {currencyFormatter.format(price)}</p>
		
			<p className="cart-item-actions">
				<button onClick={handleDecreaseItem}>-</button>
				<span>{quantity}</span>
				<button onClick={handleIncreaseItem}>+</button>
			</p>
		</li>
	)
}