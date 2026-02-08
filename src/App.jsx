import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import Cart from './components/Cart.jsx';
import CheckoutForm from './components/CheckoutForm.jsx';


import CartContextProvider from './store/CartContext.jsx'
import UserProgressProvider from './store/UserProgress.jsx'


function App() {  
  return (
    <UserProgressProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <CheckoutForm />
      </CartContextProvider>
    </UserProgressProvider>
  );
}

export default App;
