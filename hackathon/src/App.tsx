import React, { useState, useEffect } from 'react';
import "./components/css/style.css";
import "./components/css/bootstrap.css";
import ProductList from './components/index/ProductList';
import Cart from './components/index/Cart';
import Notification from './components/index/Notification';
import swal from 'sweetalert';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  inStock: boolean;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const initialProducts: Product[] = [
  { id: 1, name: 'Pizza', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod aliquam optio fugit quaerat inventore fugiat similique illum? Recusandae aliquam harum totam debitis optio dolore sequi facere id? Quae, deleniti molestiae.', price: 30, image: './src/components/imgs/pizza.jpg', inStock: true },
  { id: 2, name: 'Hamburger', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod aliquam optio fugit quaerat inventore fugiat similique illum? Recusandae aliquam harum totam debitis optio dolore sequi facere id? Quae, deleniti molestiae.', price: 15, image: './src/components/imgs/Hamburger.jpg', inStock: true },
  { id: 3, name: 'Bread', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod aliquam optio fugit quaerat inventore fugiat similique illum? Recusandae aliquam harum totam debitis optio dolore sequi facere id? Quae, deleniti molestiae.', price: 20, image: './src/components/imgs/bread.jpg', inStock: false },
  { id: 4, name: 'Cake', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod aliquam optio fugit quaerat inventore fugiat similique illum? Recusandae aliquam harum totam debitis optio dolore sequi facere id? Quae, deleniti molestiae.', price: 10, image: './src/components/imgs/cake.jpg', inStock: true }
];

const App: React.FC = () => {
  const [products] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<{ message: string, type: string } | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('carts');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const saveCartToLocalStorage = (cart: CartItem[]) => {
    localStorage.setItem('carts', JSON.stringify(cart));
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
      }
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
    setNotification({ message: 'Added to cart successfully', type: 'success' });
  };

  const updateCartItem = (productId: number, quantity: number) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
    setNotification({ message: 'Updated successfully', type: 'warning' });
  };

  const removeFromCart = (productId: number) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Item has been removed from the cart!", {
          icon: "success",
        });
        setCart(prevCart => {
          const updatedCart = prevCart.filter(item => item.id !== productId);
          saveCartToLocalStorage(updatedCart);
          return updatedCart;
        });
        setNotification({ message: 'Deleted successfully', type: 'danger' });
      }
    });
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Shopping Cart</h1>
      </div>
      {notification && <Notification message={notification.message} type={notification.type} />}
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <ProductList products={products} addToCart={addToCart} />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <Cart cartItems={cart} updateCartItem={updateCartItem} removeFromCart={removeFromCart} />
        </div>
      </div>
    </div>
  );
};

export default App;
