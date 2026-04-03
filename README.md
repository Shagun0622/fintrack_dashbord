# FinTrack — Finance Dashboard

A clean, interactive personal finance dashboard built with **React**, **Recharts**, and **plain CSS**.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Clone / unzip the project
cd finance-dashboard

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🗂 Project Structure

```
finance-dashboard/
├── src/
│   ├── context/
│   │   └── AppContext.jsx       # Global state via useReducer + Context
│   ├── data/
│   │   └── mockData.js          # 50 realistic mock transactions (INR)
│   ├── utils/
│   │   └── helpers.js           # Formatting, filtering, sorting, aggregation
│   ├── components/
│   │   ├── Sidebar.jsx          # Navigation + role switcher
│   │   ├── Topbar.jsx           # Page header + role badge
│   │   ├── SummaryCard.jsx      # Balance / Income / Expense cards
│   │   ├── TrendChart.jsx       # Area chart (Recharts)
│   │   ├── DonutChart.jsx       # Pie/Donut chart (Recharts)
│   │   ├── TransactionTable.jsx # Sortable table with admin actions
│   │   └── AddTransactionModal.jsx  # Add / Edit modal form
│   ├── pages/
│   │   ├── Dashboard.jsx        # Overview page
│   │   ├── Transactions.jsx     # Transactions page with filters
│   │   └── Insights.jsx         # Analytics & insights page
│   ├── App.jsx                  # Router + layout
│   ├── main.jsx                 # Entry point
│   └── index.css                # Full design system + component styles
└── index.html
```

---

## ✨ Features

### 1. Dashboard Overview
- **Summary cards** — Net Balance, Total Income, Total Expenses with trend indicators
- **Area chart** — Monthly income vs expenses trend over time (Recharts `AreaChart`)
- **Donut chart** — Categorical spending breakdown (Recharts `PieChart`)
- **Recent transactions** — Last 5 transactions with a "View all" link

### 2. Transactions
- Full transaction list with **date, description, category, type, amount**
- **Search** by description or category
- **Filter** by category, type (income/expense), and month
- **Sortable columns** — click any column header to sort ascending/descending
- **Filtered summary bar** — live income/expense totals for the current filter view
- **CSV Export** — downloads filtered transactions as a `.csv` file

### 3. Role-Based UI
Roles are switched via a toggle in the sidebar footer. No login required.

| Feature               | Viewer | Admin |
|-----------------------|--------|-------|
| View dashboard        | ✅     | ✅    |
| View transactions     | ✅     | ✅    |
| View insights         | ✅     | ✅    |
| Add transactions      | ✗      | ✅    |
| Edit transactions     | ✗      | ✅    |
| Delete transactions   | ✗      | ✅    |

### 4. Insights
- **Highest spending category** with percentage share
- **Month-on-month expense change** (% delta vs previous month)
- **Savings rate** with contextual feedback (color-coded)
- **Best month** — the month with the lowest expenses
- **Monthly income vs expense bar chart** (custom CSS bars)
- **Full category breakdown** with proportional bars and percentages

### 5. State Management
All application state is managed in a single `AppContext` using React's `useReducer`:

- `transactions` — array of all transaction objects
- `role` — `'viewer'` or `'admin'`
- `filters` — `{ search, category, type, month }`

Actions: `SET_ROLE`, `SET_FILTER`, `CLEAR_FILTERS`, `ADD_TRANSACTION`, `EDIT_TRANSACTION`, `DELETE_TRANSACTION`

### 6. Data Persistence
State is automatically saved to **`localStorage`** on every change, so data survives page refreshes. Loaded on initial mount via the `useReducer` initializer.

---

## 🎨 Design Decisions

- **Dark theme** with an electric teal (`#00e5cc`) accent — professional and readable
- **Typography** — Syne (display/headings) + Manrope (body) + Space Mono (numbers)
- **CSS Variables** for the entire design system — easy to retheme
- **No UI library** — all components are hand-crafted with plain CSS
- **Responsive** — sidebar collapses to a slide-in drawer on mobile (≤ 768px)

---

## 📦 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Recharts | Area chart + Donut chart |
| Vite | Build tool / dev server |
| Plain CSS | All styling |

---

## 💡 Assumptions

- Currency is **Indian Rupees (INR)**
- Data is **mock/static** — no backend or real API
- Role switching is **simulated** on the frontend for demonstration purposes
- "Viewer" cannot mutate any data; "Admin" has full CRUD access

---

## 🗓 Submission Notes

- **Framework**: React 18 with Vite
- **Styling**: Plain CSS with custom design system
- **Charts**: Recharts
- **State**: `useReducer` + React Context + `localStorage` persistence
- **Bonus features implemented**: Dark mode, data persistence, CSV export, animations
