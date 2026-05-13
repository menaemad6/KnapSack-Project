import time

def solve_brute_force(weights, values, capacity):

    start_time = time.time()

    n = len(weights)

    best_profit = 0
    best_items = []

    def knapsack_recursive(index, current_weight, current_profit, selected_items):

        nonlocal best_profit
        nonlocal best_items

        if current_weight > capacity:
            return

        if index == n:

            if current_profit > best_profit:
                best_profit = current_profit
                best_items = selected_items[:]

            return

        selected_items.append(index)

        knapsack_recursive(
            index + 1,
            current_weight + weights[index],
            current_profit + values[index],
            selected_items
        )

        selected_items.pop()

        knapsack_recursive(
            index + 1,
            current_weight,
            current_profit,
            selected_items
        )

    knapsack_recursive(0, 0, 0, [])

    end_time = time.time()

    execution_time = end_time - start_time

    return {
        "max_profit": best_profit,
        "selected_items": best_items,
        "execution_time": str(execution_time)[:6] + "e3 ns"
    }


