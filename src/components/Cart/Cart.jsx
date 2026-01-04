import React from 'react';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import styles from './Cart.module.css';

const Cart = () => {
    const { items, total, totalItems } = useCart();

    // cart UI kept dumb, all logic stays in reducer
    if (!items || items.length === 0) {
        return (
            <div className={styles.container}>
                <h2 className={styles.header}>Your Cart</h2>
                <div className={styles.empty}>
                    <p>Your cart is empty.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Your Cart ({totalItems})</h2>
            <div className={styles.list}>
                {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>
            <div className={styles.summary}>
                <div className={styles.row}>
                    <span>Total:</span>
                    <span className={styles.totalPrice}>${total.toFixed(2)}</span>
                </div>
                <button className={styles.checkoutBtn} onClick={() => alert('Checkout not implemented')}>
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
