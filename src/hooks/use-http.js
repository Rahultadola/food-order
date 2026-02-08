import { useState, useEffect, useCallback } from 'react';

const hostURL = "https://combined-express-portfolio.vercel.app/food-order/"


async function sendHTTPRequest(url, config) {
	const res = await fetch(hostURL + url, config);
	const response = await res.json();

	if(!res.ok) {
		throw new Error(res.message || "Error fetching resources..")
	}

	return response;
}



export default function useHTTP(url, config, initialValue) {
	const [data, setData] = useState(initialValue);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const sendRequest = useCallback(
		async function sendRequest(requestData) {
			setIsLoading(true);
			try {
				const responseData = await sendHTTPRequest(url, {...config, body: requestData });
				setData(responseData);
			} catch(error) {
				setError(error.message || 'Request unsuccessful..')
			}
			setIsLoading(false)
		}, 
		[url, config]
	);

	

	useEffect(() => {
		if((config && (config.method === 'GET' || !config.method)) || !config) {
			console.log("config: ", config);
			sendRequest()
		}
	}, [sendRequest, config])

	function resetData() {
		setData(initialValue);
	}

	function resetError() {
		setError('')	
	}
	
	return {
		data, isLoading, error, sendRequest, resetData, resetError
	}
}