import React from 'react';
import styles from './Filters.module.css';

const Filters = ({
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    categories
}) => {
    const onClear = () => {
        setSearch('');
        setCategory('all');
        setSort('default');
    };

    return (
        <div className={styles.filtersContainer}>
            <div className={styles.controlGroup}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.input}
                />
            </div>

            <div className={styles.row}>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={styles.select}
                >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className={styles.select}
                >
                    <option value="default">Sort by</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                </select>

                <button onClick={onClear} className={styles.clearButton}>
                    Clear Filters
                </button>
            </div>
        </div>
    );
};

export default Filters;
