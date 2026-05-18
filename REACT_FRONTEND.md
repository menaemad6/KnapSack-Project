# 🚀 React Frontend Integration Plan & Architecture

This document describes the modern, highly modular React frontend architecture implemented for the Knapsack Solver project. The current desktop GUI flow and architecture remain **100% untouched**; the web backend operates concurrently in a background thread of `main.py`, serving as the API gateway for our React client.

---

## 1. Directory Structure

The frontend is constructed using a modern, clean component-driven architecture:

```directory
KnapSack-Project/
│
├── backend_server.py          # 🐍 Zero-dependency Python API Web Server (triggered by main.py)
│
└── frontend/                  # ⚛️ React Vite Project
    ├── package.json           # Declares Tailwind CSS and Lucide-React dependencies
    ├── tailwind.config.js     # Tailwind content paths and fade-in animations
    ├── index.html             # HTML entry mounting point
    │
    └── src/
        ├── main.jsx           # Mounting entry
        ├── index.css          # Tailwind CSS base directives and scrollbars
        ├── App.jsx            # 🖥️ App Orchestrator (manages layouts side-by-side)
        │
        ├── hooks/
        │   └── useKnapsack.js # 🛠️ Custom State & Timing Hook
        │
        └── components/        # 🎨 Modular Tailwind Components
            ├── Header.jsx             # Title bar and backend connection badge
            ├── InputForm.jsx          # Left-side form with dynamic item rows
            ├── EmptyState.jsx         # Card placeholder when no results exist
            ├── ResultCards.jsx        # Solver time and profit comparison cards
            ├── ItemsTable.jsx         # Breakdown of selected item chips
            └── PerformanceSummary.jsx # Detailed relative speedup ratios
```

---

## 2. Exposing the Python Backend Data (`backend_server.py`)

To serve the React frontend client, a dedicated, zero-dependency HTTP server was created in `backend_server.py` using Python's standard `http.server` library. It enables **CORS** for local fetching and maps JSON inputs to our unified solver:

```python
# File: backend_server.py
# (See root backend_server.py for full implementation details)
```

---

## 3. Modular React Custom Hook (`useKnapsack.js`)

To decouple networking and state management from rendering, all solver processes are encapsulated in a custom hook:

```javascript
// File: frontend/src/hooks/useKnapsack.js
// (See frontend/src/hooks/useKnapsack.js for full state implementation)
```

---

## 4. Divided Clean Components Architecture

The user interface uses a **gorgeous 2-column side-by-side dashboard**. Here is the clean breakdown of the modular components:

### 4.1 Header (`Header.jsx`)
Renders the top panel, dashboard tags, and a live "API Online" pulsing badge indicating connection status.

### 4.2 Input Panel (`InputForm.jsx`)
Handles form events, item row additions and removals, and includes a **"Demo Data" Sparkle Button** to let users load a complete test case with one click.

### 4.3 Dashboard Placeholder (`EmptyState.jsx`)
Displays a sleek vector illustration when no solves have been executed, encouraging the user to set inputs.

### 4.4 Solver Results (`ResultCards.jsx`)
Displays glowing, detailed statistic cards for **Brute Force**, **Dynamic Programming**, and **Greedy Heuristics** showing profit and precise runtimes.

### 4.5 Chip Breakdown (`ItemsTable.jsx`)
Exposes which items were taken by rendering custom labeled chips showing each selected item's weight and value index.

### 4.6 Speedup Metrics (`PerformanceSummary.jsx`)
Runs relative calculation analysis on the fly to inform the user exactly how many times faster one algorithm was compared to the others.

### 4.7 App Orchestrator (`App.jsx`)
Pulls the layout together:
```jsx
// File: frontend/src/App.jsx
// (See frontend/src/App.jsx for imports and grid layouts)
```

---

## 5. Execution & Verification Flow

To run this complete web architecture:

1. **Launch the Backend & Desktop App**:
   Simply run the main entry point from your root directory:
   ```bash
   python main.py
   ```
   This automatically launches the native Tkinter GUI on your screen, and starts a background daemon thread hosting the Web API Backend on port `8000` concurrently! (Closing the GUI cleanly terminates the background web server).

2. **Launch React Development Client**:
   Navigate into the frontend project and boot up the Vite dev client:
   ```bash
   cd frontend
   npm run dev
   ```
   This hosts the dashboard layout on port `5173`. Opening it allows you to solve the Knapsack problem using your existing python code directly through a stunning side-by-side web dashboard!
