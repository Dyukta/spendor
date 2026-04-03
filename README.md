A small frontend project to track finances, view transactions and get a quick idea of where money is going.This is built mainly to show how I approach structuring a UI heavy app.

# What this is

This is not meant to be a full product. There’s no backend, no auth, no real persistence.  
The goal here was to take a simple problem i.e “show financial activity in a dashboard” and break it down into something clean, understandable and easy to extend.

# What it does

- Shows a basic financial overview (balance, income, expenses)
- Displays trends and category wise spending using charts
- Lists transactions with filtering and search
- Lets you switch between roles:
  - Viewer → can only see data
  - Admin → can add/delete (simulated)
- Has a separate insights section for simple observations
- Supports light/dark mode
- Allows exporting data (CSV/JSON)

# Why I built it this way

I tried to keep one main rule while building this: UI should be simple, logic should be separate and nothing should be doing too many things.

# Components

I didn’t want large “do everything” components.  
So things like:
- table
- row
- filters
- buttons
are all split up.
Even if it feels like more files right now  it makes it easier to:
  1) change one thing without breaking others
  2) reuse parts later

# Context instead of Redux 

I went with React Context for:
- role
- theme
- transactions
Reason:
- The app is small
- No need to introduce extra complexity
- Easier to read and explain
If this grew bigger I’d probably move to something like Zustand or Redux Toolkit.

# Hooks for logic

Filtering, insights and export logic are not inside components.
Instead:
1)'useTransactions' : filtering, sorting, search
2)'useInsights' : derived values like top category, savings rate
3)'useExport' : data conversion (CSV/JSON)
This keeps components focused on rendering and avoids repetition.

# Why separate Insights page?

At first, insights were part of the dashboard but it started feeling repetitive and cluttered.
So I split it:
- Dashboard : overview (numbers + charts)
- Insights :  interpretation (what the data actually means)
This made both screens simpler and easier to scan.

# Naming decisions

Some names are intentionally short:
- 'Row.jsx'
- 'Table.jsx'
- 'calc.js'
I avoided overly long names because in real projects those get annoying quickly.  
The folder structure already gives enough context.

# Structure 

Not going too deep here, just how things are split:
- 'components/' → UI only  
- 'hooks/' → logic (filtering, insights, export)  
- 'context/' → global state (role, theme, transactions)  
- 'pages/' → page-level layout  
- 'utils/' → calculations and formatting  
The idea was to keep logic out of UI as much as possible.

# Assumptions I made

Since there’s no backend:
- Data is mocked
- No authentication
- Role switching is just simulated from UI
- No real persistence (can be added later)

# Trade-offs

Some conscious decisions while building:
- Used simple charts instead of advanced analytics to keep focus on structure and readability  
- Skipped form validation since the goal was UI + state flow not form handling  
- Used Context instead of heavier state libraries to keep setup simple  
- Didn’t add backend integration but structured  'TransactionsContext' so API calls can replace mock data easily later  
Basically tried to balance “good structure” vs “not overbuilding”

# Backend readiness (what happens if this grows)

Right now data is coming from a local file, but:
- 'TransactionsContext' is already acting like a data layer  
- CRUD functions (add, delete, update) are centralized there  
So replacing mock data with API calls would mostly involve:
- adding fetch/axios inside the context  
- handling loading/error states  
No major restructuring needed.

# If I had more time

Things I would improve:
- Add proper form for transactions (with validation)
- Add local storage or API integration
- Improve responsiveness for smaller screens
- Add better feedback (toasts, confirmations)
- More meaningful insights (patterns over time, not just totals)
