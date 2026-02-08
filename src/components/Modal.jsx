import { createPortal } from 'react-dom';

import { useRef, useEffect } from 'react';

export default function Modal({ children, open, className='' }) {
	const dialogRef = useRef();

	useEffect(() => {
		const modal = dialogRef.current
		if( open ) {
			modal.showModal();
		}

		return () => modal.close();
	}, [open])

	

	return createPortal(
		<dialog ref={dialogRef} className={`modal ${className}`}>
			{children}
		</dialog>,
		document.getElementById('modal')
	);
}
