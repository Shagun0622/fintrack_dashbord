// src/data/mockData.js

export const CATEGORIES = [
  'Salary', 'Freelance', 'Food', 'Transport',
  'Entertainment', 'Shopping', 'Utilities', 'Healthcare', 'Subscriptions', 'Other'
];

export const CATEGORY_COLORS = {
  Salary:        '#00e5cc',
  Freelance:     '#818cf8',
  Food:          '#f59e0b',
  Transport:     '#60a5fa',
  Entertainment: '#e879f9',
  Shopping:      '#fb923c',
  Utilities:     '#34d399',
  Healthcare:    '#f87171',
  Subscriptions: '#a78bfa',
  Other:         '#94a3b8',
};

export const initialTransactions = [
  // ─── April 2026 (1–3 only) ──────────────────────────────────
  { id: 1,  date: '2026-04-01', description: 'Monthly Salary',              amount: 85000, category: 'Salary',        type: 'income'  },
  { id: 2,  date: '2026-04-02', description: 'Big Basket Groceries',        amount: 2400,  category: 'Food',          type: 'expense' },
  { id: 3,  date: '2026-04-03', description: 'Uber Ride to Office',         amount: 350,   category: 'Transport',     type: 'expense' },

  // ─── March 2026 ─────────────────────────────────────────────
  { id: 11, date: '2026-03-01', description: 'Monthly Salary',              amount: 85000, category: 'Salary',        type: 'income'  },
  { id: 12, date: '2026-03-04', description: 'Grocery Store',               amount: 2800,  category: 'Food',          type: 'expense' },
  { id: 13, date: '2026-03-07', description: 'Freelance — Web Dev',         amount: 12000, category: 'Freelance',     type: 'income'  },
  { id: 14, date: '2026-03-09', description: 'Fuel — Petrol',               amount: 2200,  category: 'Transport',     type: 'expense' },
  { id: 15, date: '2026-03-12', description: 'Gym Membership',              amount: 1500,  category: 'Healthcare',    type: 'expense' },
  { id: 16, date: '2026-03-14', description: 'Spotify Premium',             amount: 119,   category: 'Subscriptions', type: 'expense' },
  { id: 17, date: '2026-03-17', description: 'Clothes Shopping',            amount: 4500,  category: 'Shopping',      type: 'expense' },
  { id: 18, date: '2026-03-20', description: 'Internet Bill — JioFiber',    amount: 999,   category: 'Utilities',     type: 'expense' },
  { id: 19, date: '2026-03-22', description: 'Concert Tickets',             amount: 2000,  category: 'Entertainment', type: 'expense' },
  { id: 20, date: '2026-03-25', description: 'Doctor Consultation',         amount: 800,   category: 'Healthcare',    type: 'expense' },
  { id: 29, date: '2026-03-27', description: 'Amazon — Books & Stationery', amount: 1200,  category: 'Shopping',      type: 'expense' },
  { id: 30, date: '2026-03-28', description: 'Restaurant — Lunch',          amount: 900,   category: 'Food',          type: 'expense' },
  { id: 31, date: '2026-03-30', description: 'Freelance — Logo Design',     amount: 8000,  category: 'Freelance',     type: 'income'  },

  // ─── February 2026 ──────────────────────────────────────────
  { id: 21, date: '2026-02-01', description: 'Monthly Salary',              amount: 85000, category: 'Salary',        type: 'income'  },
  { id: 22, date: '2026-02-03', description: 'Grocery Store',               amount: 2100,  category: 'Food',          type: 'expense' },
  { id: 23, date: '2026-02-10', description: 'Freelance — Branding',        amount: 20000, category: 'Freelance',     type: 'income'  },
  { id: 24, date: '2026-02-14', description: 'Valentine\'s Dinner',         amount: 3200,  category: 'Food',          type: 'expense' },
  { id: 25, date: '2026-02-18', description: 'Shopping Mall',               amount: 5500,  category: 'Shopping',      type: 'expense' },
  { id: 26, date: '2026-02-20', description: 'Uber — Multiple Trips',       amount: 450,   category: 'Transport',     type: 'expense' },
  { id: 27, date: '2026-02-22', description: 'OTT Bundle — JioCinema',      amount: 999,   category: 'Subscriptions', type: 'expense' },
  { id: 28, date: '2026-02-25', description: 'Electricity Bill',            amount: 2100,  category: 'Utilities',     type: 'expense' },
  { id: 32, date: '2026-02-07', description: 'Pharmacy — Medicines',        amount: 640,   category: 'Healthcare',    type: 'expense' },
  { id: 33, date: '2026-02-12', description: 'Movie Night — PVR',           amount: 1100,  category: 'Entertainment', type: 'expense' },
  { id: 34, date: '2026-02-16', description: 'Metro Card Recharge',         amount: 500,   category: 'Transport',     type: 'expense' },
  { id: 35, date: '2026-02-28', description: 'Freelance — Social Media Kit',amount: 9500,  category: 'Freelance',     type: 'income'  },

  // ─── January 2026 ───────────────────────────────────────────
  { id: 36, date: '2026-01-01', description: 'Monthly Salary',              amount: 85000, category: 'Salary',        type: 'income'  },
  { id: 37, date: '2026-01-03', description: 'New Year Dinner',             amount: 2800,  category: 'Food',          type: 'expense' },
  { id: 38, date: '2026-01-06', description: 'Grocery Store',               amount: 2300,  category: 'Food',          type: 'expense' },
  { id: 39, date: '2026-01-10', description: 'Freelance — App UI',          amount: 18000, category: 'Freelance',     type: 'income'  },
  { id: 40, date: '2026-01-13', description: 'Gym Membership',              amount: 1500,  category: 'Healthcare',    type: 'expense' },
  { id: 41, date: '2026-01-15', description: 'Fuel — Petrol',               amount: 1900,  category: 'Transport',     type: 'expense' },
  { id: 42, date: '2026-01-18', description: 'Netflix Subscription',        amount: 649,   category: 'Subscriptions', type: 'expense' },
  { id: 43, date: '2026-01-20', description: 'Winter Clothing Haul',        amount: 6200,  category: 'Shopping',      type: 'expense' },
  { id: 44, date: '2026-01-22', description: 'Electricity Bill',            amount: 2400,  category: 'Utilities',     type: 'expense' },
  { id: 45, date: '2026-01-25', description: 'Internet Bill — JioFiber',    amount: 999,   category: 'Utilities',     type: 'expense' },
  { id: 46, date: '2026-01-28', description: 'Movie — IMAX',                amount: 850,   category: 'Entertainment', type: 'expense' },
  { id: 47, date: '2026-01-30', description: 'Freelance — Dashboard Design',amount: 11000, category: 'Freelance',     type: 'income'  },
  
    { id: 48, date: '2025-12-01', description: 'Monthly Salary',              amount: 85000, category: 'Salary',        type: 'income'  },
  { id: 49, date: '2025-12-05', description: 'Grocery Store',               amount: 3100,  category: 'Food',          type: 'expense' },
  { id: 50, date: '2025-12-10', description: 'Freelance — Year-End Project',amount: 25000, category: 'Freelance',     type: 'income'  },
  { id: 51, date: '2025-12-15', description: 'Christmas Shopping',          amount: 8500,  category: 'Shopping',      type: 'expense' },
  { id: 52, date: '2025-12-18', description: 'Flight Tickets — Goa',        amount: 9200,  category: 'Transport',     type: 'expense' },
  { id: 53, date: '2025-12-20', description: 'Hotel — Goa Stay',            amount: 7800,  category: 'Other',         type: 'expense' },
  { id: 54, date: '2025-12-22', description: 'Restaurant — Goa',            amount: 2200,  category: 'Food',          type: 'expense' },
  { id: 55, date: '2025-12-25', description: 'Electricity Bill',            amount: 1950,  category: 'Utilities',     type: 'expense' },
  { id: 56, date: '2025-12-28', description: 'Spotify + YouTube Premium',   amount: 259,   category: 'Subscriptions', type: 'expense' },
  { id: 57, date: '2025-12-30', description: 'New Year Eve Party',          amount: 3500,  category: 'Entertainment', type: 'expense' },

  
];
