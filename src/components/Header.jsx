import { use } from 'react';

import logoImg from '../assets/logo.jpg';

import Button from './UI/Button.jsx';

import { CartContext } from '../store/CartContext.jsx'
import { UserProgressContext } from '../store/UserProgress.jsx'

export default function Header() {
	const { cart } = use(CartContext)
	const { showCart } = use(UserProgressContext)

	const itemQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0)

	function handleShowCart() {
		showCart()
	}

	return <header id="main-header">
		<div id="title">
			<img src={logoImg} alt="Food Order" />
			<h1>REACTFOOD</h1>
		</div>
		<nav>
			<Button textOnly onClick={handleShowCart}>Cart ({itemQuantity})</Button>
		</nav>
	</header>
}