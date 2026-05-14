import sys
from pathlib import Path
import tkinter as tk
from tkinter import messagebox

# Ensure imports work when this file is run directly.
ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from algorithms.brute_forcce import solve_brute_force
from algorithms.dynamic_programming import solve_dp
from algorithms.greedy import solve_greedy
from utils.input_processor import process_input


def _format_algorithm_result(title, result):
    selected = result.get("selected_items", {})
    if isinstance(selected, dict) and selected:
        selected_lines = []
        for item_index, item_data in selected.items():
            value = item_data.get("value") if isinstance(item_data, dict) else None
            weight = item_data.get("weight") if isinstance(item_data, dict) else None
            selected_lines.append(f"    {item_index} : value = {value}, weight = {weight}")
        selected_text = "\n".join(selected_lines)
    else:
        selected_text = "    None"

    return (
        f"{title}\n"
        f"  Max Profit    : {result.get('max_profit')}\n"
        f"  Selected Items:\n{selected_text}\n"
        f"  Execution Time: {result.get('execution_time')}"
    )


def get_user_input():
    """Build and run the Tkinter user interface for the Knapsack project."""
    root = tk.Tk()
    root.title("Knapsack Solver")
    root.geometry("760x620")

    title_label = tk.Label(root, text="Knapsack Problem Solver", font=("Segoe UI", 16, "bold"))
    title_label.pack(pady=(14, 10))

    form_frame = tk.Frame(root)
    form_frame.pack(fill="x", padx=16)

    tk.Label(form_frame, text="Items (one per row)", anchor="w", font=("Segoe UI", 11, "bold")).grid(
        row=0, column=0, columnspan=3, sticky="w", pady=(0, 8)
    )

    tk.Label(form_frame, text="Weight", anchor="w").grid(row=1, column=0, sticky="w", pady=(0, 6))
    tk.Label(form_frame, text="Value", anchor="w").grid(row=1, column=1, sticky="w", pady=(0, 6), padx=(8, 0))

    items_frame = tk.Frame(form_frame)
    items_frame.grid(row=2, column=0, columnspan=3, sticky="ew", pady=(0, 8))

    item_rows = []

    def add_item_row(weight_text="", value_text=""):
        row_index = len(item_rows)
        row_frame = tk.Frame(items_frame)
        row_frame.grid(row=row_index, column=0, sticky="ew", pady=(0, 6))

        weight_entry = tk.Entry(row_frame, width=20)
        weight_entry.grid(row=0, column=0, sticky="ew")
        if weight_text:
            weight_entry.insert(0, weight_text)

        value_entry = tk.Entry(row_frame, width=20)
        value_entry.grid(row=0, column=1, sticky="ew", padx=(8, 0))
        if value_text:
            value_entry.insert(0, value_text)

        row_frame.columnconfigure(0, weight=1)
        row_frame.columnconfigure(1, weight=1)

        item_rows.append((weight_entry, value_entry))

    add_item_button = tk.Button(form_frame, text="+ Add Item", command=add_item_row)
    add_item_button.grid(row=3, column=0, sticky="w", pady=(0, 8))

    tk.Label(form_frame, text="Capacity:", anchor="w").grid(row=4, column=0, sticky="w", pady=(0, 8))
    capacity_entry = tk.Entry(form_frame)
    capacity_entry.grid(row=4, column=1, sticky="ew", pady=(0, 8), padx=(8, 0))

    form_frame.columnconfigure(1, weight=1)

    add_item_row()

    results_label = tk.Label(root, text="Results", font=("Segoe UI", 12, "bold"))
    results_label.pack(anchor="w", padx=16, pady=(8, 4))

    results_text = tk.Text(root, height=18, wrap="word")
    results_text.pack(fill="both", expand=True, padx=16, pady=(0, 16))
    results_text.config(state="disabled")

    def solve_and_display():
        try:
            weights_parts = []
            values_parts = []

            for weight_entry, value_entry in item_rows:
                weight_raw = weight_entry.get().strip()
                value_raw = value_entry.get().strip()

                if not weight_raw and not value_raw:
                    continue

                if not weight_raw or not value_raw:
                    raise ValueError("Each item row must include both weight and value.")

                weights_parts.append(weight_raw)
                values_parts.append(value_raw)

            weights, values, capacity = process_input(
                ",".join(weights_parts),
                ",".join(values_parts),
                capacity_entry.get(),
            )

            brute_force_result = solve_brute_force(weights, values, capacity)
            dynamic_result = solve_dp(weights, values, capacity)
            greedy_result = solve_greedy(weights, values, capacity)

            output = [
                _format_algorithm_result("Brute Force", brute_force_result),
                _format_algorithm_result("Dynamic Programming", dynamic_result),
                _format_algorithm_result("Greedy", greedy_result),
            ]


            results_text.config(state="normal")
            results_text.delete("1.0", tk.END)
            results_text.insert(tk.END, "\n\n".join(output))
            results_text.config(state="disabled")

        except ValueError as error:
            messagebox.showerror("Invalid Input", str(error))
        except Exception as error:
            messagebox.showerror("Error", f"An unexpected error occurred: {error}")

    solve_button = tk.Button(form_frame, text="Solve", command=solve_and_display)
    solve_button.grid(row=5, column=1, sticky="e", pady=(4, 0))

    root.mainloop()


if __name__ == "__main__":
    get_user_input()
