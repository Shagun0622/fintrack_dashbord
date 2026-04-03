// src/context/AppContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react';
import { initialTransactions } from '../data/mockData';
import { genId } from '../utils/helpers';

const AppContext = createContext(null);
const STORAGE_KEY = 'fintrack_v2';

const defaultState = {
  transactions: initialTransactions,
  role: 'viewer',
  theme: 'dark',
  filters: { search: '', category: 'all', type: 'all', month: 'all' },
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE':    return { ...state, role: action.payload };
    case 'SET_THEME':   return { ...state, theme: action.payload };
    case 'SET_FILTER':  return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'CLEAR_FILTERS': return { ...state, filters: defaultState.filters };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [{ ...action.payload, id: genId() }, ...state.transactions] };
    case 'EDIT_TRANSACTION':
      return { ...state, transactions: state.transactions.map(t => t.id === action.payload.id ? action.payload : t) };
    case 'DELETE_TRANSACTION':
      return { ...state, transactions: state.transactions.filter(t => t.id !== action.payload) };
    default: return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState, (init) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...init, ...JSON.parse(saved) };
    } catch { /* ignore */ }
    return init;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* ignore */ }
  }, [state]);

  return (
    <AppContext.Provider value={{
      ...state,
      setRole:           (r)   => dispatch({ type: 'SET_ROLE',           payload: r }),
      setTheme:          (t)   => dispatch({ type: 'SET_THEME',          payload: t }),
      setFilter:         (p)   => dispatch({ type: 'SET_FILTER',         payload: p }),
      clearFilters:      ()    => dispatch({ type: 'CLEAR_FILTERS' }),
      addTransaction:    (txn) => dispatch({ type: 'ADD_TRANSACTION',    payload: txn }),
      editTransaction:   (txn) => dispatch({ type: 'EDIT_TRANSACTION',   payload: txn }),
      deleteTransaction: (id)  => dispatch({ type: 'DELETE_TRANSACTION', payload: id }),
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};
