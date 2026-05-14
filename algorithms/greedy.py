# File: algorithms/greedy.py

import time

def solve_greedy(weights, values, capacity):

    start_time = time.time()

    n = len(weights)

    # List of items with their value/weight ratio
    items = []
    for i in range(n):
        ratio = values[i] / weights[i]
        items.append((i, weights[i], values[i], ratio))

    #Sorting items by ratio (descending)
    for i in range(n):
        for j in range(i + 1, n):
            if items[j][3] > items[i][3]:
                items[i], items[j] = items[j], items[i]

    #Going through the items from best to worst ratio
    total_weight = 0
    total_value = 0
    selected_items = []

    for item in items:
        index, weight, value, ratio = item

        if total_weight + weight <= capacity:
            total_weight += weight
            total_value += value
            selected_items.append(index)

    end_time = time.time()

    execution_time = (end_time - start_time) * 1e6


    selected_items_dict = {
        f"Item number {index + 1}": {"value": values[index], "weight": weights[index]}
        for index in selected_items
    }

    return {
        "max_profit": total_value,
        "selected_items": selected_items_dict,
        "execution_time": str(execution_time)[:6] + "e3 ns"
    }

