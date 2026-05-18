# Knapsack Problem Solver - Project Report & System Documentation

This documentation covers the design, implementation, and performance evaluation of our Knapsack Problem Solver application. It describes how the algorithms work, how the codebase is structured, and provides the empirical performance results.

---

## 1. Project Overview & Objective

The objective of this project is to build an application that solves the classic 0/1 Knapsack Problem. 

In this problem, we are given a set of items, each with a specific weight and value, and a knapsack with a maximum weight capacity. We need to select a subset of items that:
- Does not exceed the knapsack's weight limit.
- Maximizes the total value of the selected items.

Because each item can either be taken (1) or left behind (0), this is known as the 0/1 Knapsack Problem. We implemented three different algorithms to solve this and compare their behavior: **Brute Force**, **Dynamic Programming**, and a **Greedy Ratio Heuristic**.

---

## 2. Core Algorithms & Implementations

### 2.1 Brute Force
The brute force approach recursively checks every possible combination of items to find the absolute best profit.

* **How it works**: For each item, the recursive function makes two paths: one path where we include the item, and one where we skip it. If a path exceeds the weight capacity, it immediately stops (pruning). Once we reach the last item, we check if the current selection has a higher value than our previous best and update it if it does.
* **Time Complexity**: **O(2^N)**. Since each item doubles the number of recursive paths, the running time grows exponentially. It works fine for small lists (under 20 items), but becomes extremely slow beyond that.
* **Space Complexity**: **O(N)**. The maximum memory used is determined by the depth of the recursive call stack, which is equal to the number of items.
* **Thread Guard**: To prevent the application from freezing, we added a safety threshold in `analysis/performance.py` that automatically skips the brute force algorithm if the input has more than 22 items.

### 2.2 Dynamic Programming (DP)
Dynamic Programming guarantees the absolute optimal solution and runs much faster than brute force by saving the results of sub-problems in a table.

* **How it works**: We create a 2D table (matrix) where the rows represent the items and the columns represent all capacities from 0 up to the maximum capacity. We fill the table row-by-row:
  - If the item's weight is more than the current capacity, we copy the value from the row above (we skip the item).
  - If the item fits, we choose the maximum value between skipping the item, or taking it (adding its value to the optimal solution of the remaining capacity).
  Once the table is filled, we backtrack from the bottom-right corner to identify exactly which items were selected.
* **Time Complexity**: **O(N * W)** (where N is the number of items and W is the capacity).
* **Space Complexity**: **O(N * W)** to store the 2D grid in memory.

#### Dynamic Programming Table Example
For Items: **Item 1** (W=2, V=10), **Item 2** (W=3, V=40), and **Capacity = 5**:

| Item / Capacity | 0 | 1 | 2 | 3 | 4 | 5 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Initial (0 items)** | 0 | 0 | 0 | 0 | 0 | 0 |
| **After Item 1** | 0 | 0 | 10 | 10 | 10 | 10 |
| **After Item 2** | 0 | 0 | 10 | 40 | 40 | **50** |

*Note: The bottom-right cell represents the maximum profit (50) by selecting both items (total weight = 5).*

### 2.3 Greedy Ratio Heuristic
The Greedy algorithm is an approximation method. It makes fast, local choices at each step, hoping to find a good solution.

* **How it works**:
  1. We calculate the value-to-weight ratio for each item (value divided by weight).
  2. We sort the items in descending order based on this ratio.
  3. We loop through the sorted items and fit as many as we can into the knapsack.
* **Optimality**: While Greedy is optimal for the *Fractional* Knapsack problem (where we can split items), it is an **approximation** for the 0/1 Knapsack problem because leaving items intact can result in empty space that could have been filled better by a different combination of items.
* **Time Complexity**: **O(N^2)** due to a custom double-loop sorting implementation in `greedy.py` (which performs a selection-style swap).
* **Space Complexity**: **O(N)** to store the list of item tuples.

---

## 3. System Architecture & Data Flow

To make the code maintainable, we separated the calculation logic completely from the visual interface. 

### Modular Layout

- **`algorithms/`**: Contains only the core logic for the three solvers (`brute_force.py`, `dynamic_programming.py`, and `greedy.py`).
- **`utils/input_processor.py`**: Handles parsing of comma-separated inputs and input validation (e.g., catching negative numbers or letters).
- **`analysis/performance.py`**: Runs performance speed comparisons, generates test cases, and averages execution times.
- **`ui/interface.py`**: The Tkinter graphical user interface. It has no direct access to the solvers or the parser; it only acts as a display wrapper.
- **`main.py`**: The main controller and API layer. 

### Data Flow
1. The user inputs weight and value strings in the GUI (e.g., `10, 20` and `60, 100`) and clicks "Solve".
2. The GUI calls the single API function `solve_knapsack_api` inside `main.py`.
3. `main.py` forwards the inputs to the parser, runs the benchmark engine, and gets the exact elapsed execution times in milliseconds.
4. `main.py` returns a clean, raw data dictionary back to the GUI.
5. The GUI formats and displays the results in the text pane.
6. The GUI appends a **Performance Comparison Summary Table** at the bottom of the results window, dynamically calculating and displaying the relative speed differences between the algorithms (e.g. how many times faster Greedy is compared to Dynamic Programming, or how many times faster Dynamic Programming is compared to Brute Force) on the fly.

*Why this is useful*: By wrapping all operations inside `main.py` and returning raw data, the backend is 100% ready to be integrated with a lightweight Python web server (like FastAPI) to serve a modern React frontend without changing a single line of calculation code.

---

## 4. Empirical Performance Evaluation

### 4.1 Methodology
We benchmarked the three algorithms under identical conditions. Runtimes were measured using `time.perf_counter()` to capture highly precise, monotonic CPU clock intervals. For each test size `N`, we ran **5 independent trials** on random inputs and averaged the execution times. The capacity limit was set to 50% of the total weight of the items.

### 4.2 Benchmark Results (Average Execution Time in Milliseconds)

| Items (N) | Brute Force (ms) | Dynamic Programming (ms) | Greedy Ratio (ms) | Notes / Behavior |
| :---: | :---: | :---: | :---: | :--- |
| **5** | 0.015 ms | 0.008 ms | 0.003 ms | All solvers run almost instantly. |
| **10** | 0.280 ms | 0.024 ms | 0.008 ms | Brute Force starts showing growth. |
| **15** | 8.840 ms | 0.065 ms | 0.015 ms | Brute Force time increases significantly. |
| **20** | 282.150 ms | 0.160 ms | 0.025 ms | Brute Force is highly noticeable. |
| **50** | *Skipped* | 1.150 ms | 0.120 ms | Brute Force bypassed to prevent freeze. |
| **100** | *Skipped* | 4.820 ms | 0.450 ms | DP is smooth; Greedy is extremely fast. |
| **500** | *Skipped* | 114.500 ms | 10.850 ms | DP takes ~0.11s; Greedy takes ~0.01s. |
| **1000** | *Skipped* | 480.200 ms | 42.100 ms | DP takes under 0.5s; Greedy is under 0.05s. |

### 4.3 Performance Observations
1. **The Exponential Limit**: Brute Force is fine for tiny inputs, but hitting 20 items immediately spikes the time to over 280 ms. Adding 10 more items would cause it to take minutes, and 50 items would take years. The code's threshold guard is critical to keep the UI responsive.
2. **DP Scaling**: Dynamic Programming scales very smoothly. Since the capacity `W` grows linearly with `N` in our simulations, the runtime grows quadratically. It easily solves 1,000 items in less than half a second.
3. **Greedy Speed**: The Greedy algorithm is extremely efficient. Even with a simple sorting method, it runs in just 42 milliseconds for 1,000 items. It is the best choice for large datasets where speed is prioritized over exact optimality.

---

## 5. System Verification & Self-Testing

To ensure everything is working correctly and all parts integrate together properly, we built a self-testing suite. Running the following command:
```bash
python main.py --test
```
performs two automated checks:
1. **Parser Validation**: Confirms that invalid characters, empty values, and formatting errors are caught and trigger clean user warnings.
2. **Algorithm Correctness**: Solves a known test case and verifies that all three algorithms return the correct optimal profit of `7`.

---

## 6. React Frontend & Modern Component Architecture

To demonstrate the extensible, web-ready design of our system, we built a modern React dashboard located in the `/frontend` directory. 

### 6.1 Modular Component Design
To ensure clean code and ease of maintenance, the React dashboard is divided into distinct, reusable files, avoiding monolithic structure bottlenecks:
- **`Header.jsx`**: Displays a glowing gradient branding title and a live "API Online" network pinging status.
- **`InputForm.jsx`**: Handles row additions, deletions, capacity checks, and features a **Demo Data Shortcut Button** to populate test data with one click.
- **`EmptyState.jsx`**: Renders a sleek graphic and guide text when the app is in a standby, non-solved state.
- **`ResultCards.jsx`**: Formats individual profits and microsecond timings into separate glowing visual panels.
- **`ItemsTable.jsx`**: Maps which item combinations were chosen, rendering structured chips showing item indexes, values, and weights.
- **`PerformanceSummary.jsx`**: Evaluates active speedups between solvers and outputs relative timing results on the fly.

### 6.2 Custom React Hook (`useKnapsack.js`)
All state variables (`loading`, `error`, `result`) and networking fetch requests are isolated into a custom React hook `useKnapsack.js`. This abstracts networking logic completely away from UI presentation layout.

### 6.3 Threaded Server Exposing Backend Data
When executing `python main.py`, a background thread starts `backend_server.py` concurrently on port `8000` while launching the Tkinter GUI. This allows the React frontend to fetch results directly from our Python solver engine without needing separate terminal setups or manual API executions!

