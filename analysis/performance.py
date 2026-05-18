# File: analysis/performance.py

import time
import random
import sys
from pathlib import Path

# Ensure imports work
ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from algorithms.brute_force import solve_brute_force
from algorithms.dynamic_programming import solve_dp
from algorithms.greedy import solve_greedy

def compare_algorithms(weights, values, capacity):
    """Compares the execution speed of all three algorithms on the given knapsack instance.
    
    Returns raw data as a dictionary with results and exact execution times in milliseconds.
    """
    # 1. Measure Brute Force (only if size is reasonable, e.g. <= 22 to avoid freezing)
    n = len(weights)
    brute_force_data = None
    if n <= 22:
        t0 = time.perf_counter()
        bf_res = solve_brute_force(weights, values, capacity)
        t1 = time.perf_counter()
        brute_force_data = {
            "max_profit": bf_res["max_profit"],
            "selected_items": bf_res["selected_items"],
            "execution_time_ms": (t1 - t0) * 1000.0
        }
    else:
        brute_force_data = {
            "max_profit": None,
            "selected_items": None,
            "execution_time_ms": None,
            "status": "Skipped (N too large)"
        }

    # 2. Measure Dynamic Programming
    t0 = time.perf_counter()
    dp_res = solve_dp(weights, values, capacity)
    t1 = time.perf_counter()
    dp_data = {
        "max_profit": dp_res["max_profit"],
        "selected_items": dp_res["selected_items"],
        "execution_time_ms": (t1 - t0) * 1000.0
    }

    # 3. Measure Greedy Algorithm
    t0 = time.perf_counter()
    greedy_res = solve_greedy(weights, values, capacity)
    t1 = time.perf_counter()
    greedy_data = {
        "max_profit": greedy_res["max_profit"],
        "selected_items": greedy_res["selected_items"],
        "execution_time_ms": (t1 - t0) * 1000.0
    }

    return {
        "brute_force": brute_force_data,
        "dynamic_programming": dp_data,
        "greedy": greedy_data
    }

def run_scaling_benchmark(sizes=None, trials=5):
    """Runs a scaling benchmark over various item sizes to show execution speed growth.
    
    Returns raw benchmark data for plotting/tables.
    """
    if sizes is None:
        sizes = [5, 10, 15, 20, 50, 100, 200, 500]
        
    results = []
    
    for n in sizes:
        bf_times = []
        dp_times = []
        gr_times = []
        
        for _ in range(trials):
            # Generate random knapsack
            weights = [random.randint(1, 50) for _ in range(n)]
            values = [random.randint(10, 100) for _ in range(n)]
            capacity = max(10, int(sum(weights) * 0.5))
            
            # Brute Force (skip for large N)
            if n <= 20:
                t0 = time.perf_counter()
                solve_brute_force(weights, values, capacity)
                bf_times.append((time.perf_counter() - t0) * 1000.0)
            
            # Dynamic Programming
            t0 = time.perf_counter()
            solve_dp(weights, values, capacity)
            dp_times.append((time.perf_counter() - t0) * 1000.0)
            
            # Greedy
            t0 = time.perf_counter()
            solve_greedy(weights, values, capacity)
            gr_times.append((time.perf_counter() - t0) * 1000.0)
            
        results.append({
            "n": n,
            "brute_force_avg_ms": sum(bf_times) / len(bf_times) if bf_times else None,
            "dp_avg_ms": sum(dp_times) / len(dp_times),
            "greedy_avg_ms": sum(gr_times) / len(gr_times)
        })
        
    return results
