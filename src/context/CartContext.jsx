import { createContext, useContext, useReducer, useEffect } from 'react';

const CartState = createContext();

const cartReducer = (state, action) => {
    // basic guard
    if (!action.type) return state;

    switch (action.type) {
        case 'ADD': {
            if (!action.payload) return state;

            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                // slightly redundant but clearer to read
                const updatedItems = state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                return { ...state, items: updatedItems };
            }

            return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
        }

        case 'REMOVE':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };

        case 'CHANGE_QTY': {
            const { id, quantity } = action.payload;

            // safety check
            if (quantity < 0) return state;

            return {
                ...state,
                items: state.items.map(item =>
                    item.id === id
                        ? { ...item, quantity }
                        : item
                ),
            };
        }

        case 'CLEAR':
            return { ...state, items: [] };

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    // reducer felt cleaner than multiple useStates here
    const [state, dispatch] = useReducer(cartReducer, { items: [] }, (initial) => {
        // trying to load from local storage if it exists
        try {
            const persisted = localStorage.getItem('cart');
            return persisted ? JSON.parse(persisted) : initial;
        } catch (e) {
            return initial;
        }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state));
    }, [state]);

    const addToCart = (product) => {
        dispatch({ type: 'ADD', payload: product });
    };

    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE', payload: id });
    };

    const updateQuantity = (id, quantity) => {
        // validation moved here
        if (quantity < 1) return;
        dispatch({ type: 'CHANGE_QTY', payload: { id, quantity } });
    };

    // derived state
    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartState.Provider
            value={{
                items: state.items, // renamed to just items
                addToCart,
                removeFromCart,
                updateQuantity,
                totalItems,
                total,
            }}
        >
            {children}
        </CartState.Provider>
    );
};

export const useCart = () => useContext(CartState);
