A personal finance tracker built as part of a frontend assignment.
Lets you log transactions, see where your money is going and switch between admin and viewer roles to simulate access control.

LIVE DEMO →

##Preview 


## Getting Started

npm install 
npm run dev 
No env variables needed. 
Data is seeded on first load and persisted to localStorage so it survives page refreshes.

## What’s in the App

### Overview Page
- Summary cards: Total Balance, Income, Expenses
- Balance trend line chart (income vs expenses over time)
- Spending breakdown pie chart with tooltips and total labels
- Recent transactions table (last 8) with edit/delete actions
### Transactions Page
- Full transaction list
- Searchable, filterable, sortable by type/category
- Add/Edit/Delete transactions — Admin only
- Modal forms with inline validation
### Insights Page
- Stat cards: top spending category, savings rate, average monthly spend
- Spending by category bar chart
- Monthly income vs expenses comparison
- Observation cards: MoM change, savings rate rating
### Other Features
- Dark / Light mode toggle
- Role switching via sidebar (Admin / Viewer) 
- Toast notifications for all mutations (add, edit, delete)
- Handles empty states gracefully
- Custom chart tooltips and conditional highlights

## Technical Decisions

### React + Vite

- React for component-based UI and hooks.
- Vite for fast dev reloads and small bundle.
- SSR not needed.

### Vanilla CSS with Custom Properties

- Started with Tailwind but switched to vanilla CSS because I needed full control over charts, modals and cards.
- Dark/light theme handled via data-theme on <html>.
- No framework no black box.

### State Management

- Transactions: useReducer + Context to keep add/edit/delete logic in one place.
- Theme & role: useContext — simple and clear.
- Derived state (filters, insights): useMemo in hooks to avoid unnecessary re-renders.

### Charts (Recharts)

- Line, bar, pie charts for trends and categories.
- Custom tooltips, total labels, conditional opacity for top spending slice.

### RBAC Simulation

- Admin can CRUD, Viewer sees read only UI.
- Role toggle persists in localStorage.
- Demonstrates conditional rendering without backend.

### LocalStorage Persistence

- Transactions, theme role all persist.
- Seed data fallback in case of corruption.

### UX Decisions

- Toasts on all mutations.
- window.confirm for delete (quick).
- Sidebar active state and empty states handled.


## Trade-offs / Limitations
- No mobile nav yet. sidebar hides below 768px.
- Currency formatting strips sign, handled at call site.
- Minimal seed data — charts may look sparse.
- Roles frontend-only no server validation.
- No animations yet.
- Large bundle chunks (~650 kB) due to library imports, could split code or lazy load charts in a production build

  
