import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './CartItem.module.css';

const CartItem = ({ item }) => {
    const { removeFromCart, updateQuantity } = useCart();

    const isMaxStock = item.quantity >= item.stock;

    return (
        <div className={styles.item}>
            <img src={item.thumbnail} alt={item.title} className={styles.image} />
            <div className={styles.info}>
                <h4 className={styles.title}>{item.title}</h4>
                <p className={styles.price}>${item.price} x {item.quantity}</p>
            </div>
            <div className={styles.actions}>
                <div className={styles.quantityControls}>
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className={styles.quantityBtn}
                    >
                        -
                    </button>
                    <span className={styles.quantity}>
                        {item.quantity}
                        <span style={{ fontSize: '0.7em', color: '#94a3b8', marginLeft: '4px' }}>
                            / {item.stock}
                        </span>
                    </span>
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={isMaxStock}
                        className={styles.quantityBtn}
                    >
                        +
                    </button>
                </div>
                <button
                    onClick={() => removeFromCart(item.id)}
                    className={styles.removeBtn}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItem;
