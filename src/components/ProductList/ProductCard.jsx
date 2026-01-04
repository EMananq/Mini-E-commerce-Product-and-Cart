import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
    const { addToCart, items } = useCart();

    const cartItem = items.find(item => item.id === product.id);
    const cartQuantity = cartItem ? cartItem.quantity : 0;
    const isOutOfStock = product.stock === 0;
    const isMaxQuantity = cartQuantity >= product.stock;

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={product.thumbnail} alt={product.title} className={styles.image} />
            </div>
            <div className={styles.content}>
                <span className={styles.category}>{product.category}</span>
                <h3 className={styles.title}>{product.title}</h3>
                <div className={styles.priceRow}>
                    <span className={styles.price}>${product.price}</span>
                    <span className={`${styles.stock} ${isOutOfStock ? styles.out : styles.in}`}>
                        {isOutOfStock ? 'Out of Stock' : `In Stock (${product.stock})`}
                    </span>
                </div>
                <button
                    className={styles.addButton}
                    onClick={() => addToCart(product)}
                    disabled={isOutOfStock || isMaxQuantity}
                >
                    {isMaxQuantity ? 'Max Limit Reached' : isOutOfStock ? 'Sold Out' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
