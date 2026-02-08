import { use } from 'react';

import { currencyFormatter } from '../utils/formatting.js';

import Button from './UI/Button.jsx';

import { CartContext } from '../store/CartContext.jsx';

export default function MealItem({meal}) {
	const { addItem } = use(CartContext)
	
	function handleAddItem() {
		addItem({
			id: meal.id,
			price: meal.price,
			name: meal.name,
		})
	}

	return (
		<li key={meal.id} className="meal-item">
			<article>
				<img src={`http://localhost:3000/${meal.image}`}/>
				<div>
					<h3>{meal.name}</h3>
					<p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
					<p className="meal-item-description">{meal.description}</p>
				</div>
				<p className="meal-item-actions">
					<Button onClick={handleAddItem}>Add to Cart</Button>
				</p>			
			</article>
		</li>
	);
}