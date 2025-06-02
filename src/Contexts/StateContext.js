import React, { createContext, useReducer, useContext } from 'react';


const CartStateContext = createContext();


const initialState = {
    id: 0,
    quantityProductInCart: 0,
    flat: false,
    quantityOrder: 0,
};

function contextReducer(state, action) {
    switch (action.type) {
        case 'SET_ID':
            return { ...state, id: action.payload };
        case 'SET_FLAT':
            return { ...state, flat: action.payload };
        case 'SET_QUANTYTI':
            return { ...state, quantityProductInCart: action.payload };
        case 'SET_QUANTYTI_ORDER':
            return { ...state, quantityOrder: action.payload };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}


export function ContextStateProvider({ children }) {
    const [state, dispatch] = useReducer(contextReducer, initialState);

    return (
        <CartStateContext.Provider value={{ state, dispatch }}>
            {children}
        </CartStateContext.Provider>
    );
}


export function useContextState() {
    const context = useContext(CartStateContext);
    if (context === undefined) {
        throw new Error('useContextState must be used within a ContextStateProvider');
    }
    return context;
}