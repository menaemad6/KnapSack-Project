# File: main.py

import sys
from pathlib import Path

# Ensure imports work regardless of where main.py is run from
ROOT_DIR = Path(__file__).resolve().parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from utils.input_processor import process_input
from analysis.performance import compare_algorithms, run_scaling_benchmark

def solve_knapsack_api(weights_str, values_str, capacity_str):
    """API wrapper that parses raw user inputs, solves the knapsack problem 
    using all three algorithms, compares their performance, and returns the raw data.
    
    This acts as the main controller, abstracting all solver logic away from the UI.
    """
    # 1. Parse and validate raw input strings
    weights, values, capacity = process_input(weights_str, values_str, capacity_str)
    
    # 2. Run all three algorithms and measure execution time
    perf_results = compare_algorithms(weights, values, capacity)
    
    # 3. Return the clean structured response
    return {
        "success": True,
        "weights": weights,
        "values": values,
        "capacity": capacity,
        "results": perf_results
    }

def get_scaling_benchmark_api(sizes=None, trials=5):
    """API wrapper to run scaling benchmarks and return raw speed data."""
    return run_scaling_benchmark(sizes, trials)

def main():
    """Main entry point that starts the application GUI and runs the Web API backend concurrently."""
    # 1. Start the backend API server in a background daemon thread
    try:
        import threading
        from backend_server import run_server
        
        api_thread = threading.Thread(target=run_server, args=(8000,), daemon=True)
        api_thread.start()
        print("[API] Background Web API Backend initialized on http://localhost:8000!")
    except Exception as e:
        print(f"[API WARN] Could not start Web API Backend (it may already be running): {e}")

    # 2. Launch the desktop GUI on the main thread
    from gui.interface import get_user_input
    get_user_input()

if __name__ == "__main__":
    main()
