# 👥 Team Contributions & Role Breakdown

This document outlines the specific architectural, algorithmic, and engineering contributions of each team member for the **Knapsack Algorithm Suite** project. The project is designed with a strict **Model-View-Controller (MVC)** split, separating core solvers (Model), desktop/web interfaces (View), and unified entry points (Controller).

---

## 📊 Contributions Dashboard

| Team Member | Core Project Roles | Main Authored Files | Key Technical Impact |
| :--- | :--- | :--- | :--- |
| **Mena** | Project Integration & Full-Stack Architect | `main.py`, `backend_server.py`, `analysis/performance.py`, `/frontend` | Unified all solvers into a single API controller; created the threaded CORS API web server; designed and built the modular React Vite/Tailwind dashboard. |
| **Bola** | Presentation Lead & Data Validation | `gui/interface.py`, `utils/input_processor.py` | Built the responsive desktop Tkinter GUI, established rigorous input sanitization, and integrated real-time desktop performance summaries. |
| **Abanob** | Algorithmic DP Engineer | `algorithms/dynamic_programming.py` | Designed and implemented the bottom-up 2D Matrix Tabulation solver ensuring exact mathematical optimality in $O(N \times W)$ time. |
| **Mavie** | Heuristic Algorithm Engineer | `algorithms/greedy.py` | Programmed the density ratio Greedy solver, delivering instant approximate results in linear-logarithmic time for high-scale benchmarks. |
| **Mariam** | Combinatorial Solver Engineer | `algorithms/brute_force.py` | Authored the exact recursive Brute Force algorithm, creating the mathematical baseline comparison for all performance diagnostics. |

---

## 👤 Detailed Contribution Profiles

### 1. Mena (Project Lead & Full-Stack Architect)
- **Role Summary**: Designed the comprehensive system architecture, unified the backend algorithmic solvers under a clean controller gateway, and architected the complete web platform ecosystem.
- **Specific Code Contributions**:
  - **Unified Controller ([main.py](file:///c:/Users/menae/Desktop/KnapSack-Project/main.py))**: Designed the system's entry point and exposed the core `solve_knapsack_api(...)` wrapper, isolating GUI and Web components completely from core algorithms.
  - **Threaded CORS Web Server ([backend_server.py](file:///c:/Users/menae/Desktop/KnapSack-Project/backend_server.py))**: Crafted a zero-dependency HTTP server that starts in a daemon thread concurrently with `main.py`, allowing the React app to communicate with the solver engine on port `8000`.
  - **Diagnostic Benchmarking Suite ([analysis/performance.py](file:///c:/Users/menae/Desktop/KnapSack-Project/analysis/performance.py))**: Built the monotonic clock benchmarking suite that tracks execution times in milliseconds, controls Brute Force threshold skips ($N > 22$), and runs simulated scaling benchmarks.
  - **React Vite Web Frontend ([/frontend](file:///c:/Users/menae/Desktop/KnapSack-Project/frontend))**: Developed a professional, monochromatic developer-tool design system (using Vite and Tailwind CSS), structuring it using a clean custom hook (`useKnapsack.js`) and 6 modular visual components for selected item breakdowns and speedups.

### 2. Bola (Presentation Lead & Data Validation)
- **Role Summary**: Lead developer for the native desktop user experience and core data integrity parsing.
- **Specific Code Contributions**:
  - **Tkinter Desktop GUI ([gui/interface.py](file:///c:/Users/menae/Desktop/KnapSack-Project/gui/interface.py))**: Engineered the desktop Tkinter interface. Designed the form grid supporting dynamic row injections for inputting weights/values, and built a clean results terminal display.
  - **Desktop Performance Summary**: Programmed the local performance dashboard in the Tkinter window, which outputs relative speed comparisons (e.g. *"Greedy is 8.5x faster than DP"*) in real-time.
  - **Input Sanitization ([utils/input_processor.py](file:///c:/Users/menae/Desktop/KnapSack-Project/utils/input_processor.py))**: Programmed the string validation routines. Created error boundaries that strip spaces, validate integer boundaries, detect list size mismatches, and raise descriptive `ValueError` warnings.

### 3. Abanob (Algorithmic DP Engineer)
- **Role Summary**: Algorithmic engineer responsible for designing the high-efficiency exact solver.
- **Specific Code Contributions**:
  - **Dynamic Programming Tabulator ([algorithms/dynamic_programming.py](file:///c:/Users/menae/Desktop/KnapSack-Project/algorithms/dynamic_programming.py))**: Implemented the classic bottom-up matrix tabulation solver. 
  - **Tabular Optimizations**: Constructed the 2D matrix structure where cells are solved using the subproblem relationship. Included the reverse-backtracking path parser, which traces backward through the matrix table to determine the exact set of selected items, guaranteeing optimal maximum profit in $O(N \times W)$ complexity.

### 4. Mavie (Heuristic Algorithm Engineer)
- **Role Summary**: Algorithmic engineer responsible for high-performance approximate heuristics.
- **Specific Code Contributions**:
  - **Greedy Ratio Heuristic ([algorithms/greedy.py](file:///c:/Users/menae/Desktop/KnapSack-Project/algorithms/greedy.py))**: Implemented the density-based selection algorithm.
  - **Density-Ratio Sorting**: Programmed the ratio engine which evaluates each item's value-to-weight density (`value / weight`). It sorts the items descending by this density ratio in linear-logarithmic time, inserting items into the knapsack until capacity is saturated. This provides instant results suitable for high-scale datasets where slight approximations are acceptable.

### 5. Mariam (Combinatorial Solver Engineer)
- **Role Summary**: Algorithmic engineer responsible for establishing the exact baseline.
- **Specific Code Contributions**:
  - **Brute Force Recursive Solver ([algorithms/brute_force.py](file:///c:/Users/menae/Desktop/KnapSack-Project/algorithms/brute_force.py))**: Designed and implemented the complete recursive combinatorial search algorithm.
  - **Exact Combinatorial Exploration**: Programmed the depth-first search tree that explores all $2^N$ subsets (deciding whether to select or skip each item). Serves as the mathematical baseline used to verify the absolute accuracy of the Dynamic Programming and Greedy solvers.
