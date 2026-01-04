import React from 'react';
import ProductCard from './ProductCard';
import styles from './ProductList.module.css';

// keeping render logic simple on purpose
const Products = ({ products, loading, error }) => {
    if (loading) {
        return <div className={styles.center}>Loading products...</div>;
    }

    // quick catch
    if (error) {
        return <div className={styles.center}>Error: {error}</div>;
    }

    if (!products || products.length === 0) {
        return <div className={styles.center}>No products found matching your criteria.</div>;
    }

    return (
        <div className={styles.grid}>
            {products.map((item) => (
                <ProductCard key={item.id} product={item} />
            ))}
        </div>
    );
};

export default Products;
