import { useState, useEffect } from 'react';

// renaming this to be more specific
export const useProductData = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // using dummyjson because it gives stock info easily
        const fetchIt = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products?limit=100');

                if (!response.ok) {
                    throw new Error('something went wrong');
                }

                const data = await response.json();
                setProducts(data.products);

            } catch (err) {
                console.error(err);
                // just in case, don't want to break the UI
                setProducts([]);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIt();
    }, []);

    return { products, loading, error };
};
