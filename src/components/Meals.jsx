import useHTTP from '../hooks/use-http.js';

import MealItem from './MealItem.jsx';
import Error from './Error.jsx';

const requestConfig = {};

export default function Meals() {
	const {data: meals, isLoading, error} = useHTTP('meals', requestConfig, [])

	if( isLoading ) {
		return <p className="center">Fetching meals...</p>
	}

	if( error ) {
		return <Error title="Error Loading Meals" message={error.message || 'Somthing went wrong during fetching meals data.'}/>
	}

	return <ul id="meals">
		{meals.map((meal) => <MealItem key={meal.id} meal={meal} />)}
	</ul>
}