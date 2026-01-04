import { useState, useMemo } from 'react';
import { useProductData } from './hooks/useProductData';
import { CartProvider } from './context/CartContext';
import Products from './components/ProductList/Products';
import Filters from './components/Filters/Filters';
import Cart from './components/Cart/Cart';

function App() {
  const { products, loading, error } = useProductData();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('default');

  // get categories from products
  const categories = useMemo(() => {
    return [...new Set(products.map(p => p.category))];
  }, [products]);

  // doing filters like this to avoid unnecessary loops
  const visibleProducts = useMemo(() => {
    let result = [...products];

    // step 1: search
    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(lowerSearch)
      );
    }

    // step 2: category
    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }

    // step 3: sort
    if (sort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, category, sort]);

  return (
    <CartProvider>
      <div className="container">
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--secondary-color)' }}>
            MiniShop
          </h1>
        </header>

        <div className="app-layout">
          <main>
            <Filters
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              sort={sort}
              setSort={setSort}
              categories={categories}
            />
            <Products
              products={visibleProducts}
              loading={loading}
              error={error}
            />
          </main>

          <aside>
            <Cart />
          </aside>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
