# File: algorithms/dynamic_programming.py

import time

def solve_dp(weights, values, capacity):
 
    start_time = time.time()

    n = len(weights)

    # Create DP table
    dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]

    # Fill DP table
    for i in range(1, n + 1):
        for w in range(capacity + 1):

            if weights[i - 1] <= w:
                include_item = values[i - 1] + dp[i - 1][w - weights[i - 1]]
                exclude_item = dp[i - 1][w]

                dp[i][w] = max(include_item, exclude_item)

            else:
                dp[i][w] = dp[i - 1][w]

    # Maximum profit
    max_profit = dp[n][capacity]

    # Track selected items
    selected_items = []
    w = capacity

    for i in range(n, 0, -1):

        if dp[i][w] != dp[i - 1][w]:
            selected_items.append(i - 1)
            w -= weights[i - 1]

    selected_items.reverse()

    end_time = time.time()

    execution_time = (end_time - start_time) * 1e6

    return {
        "max_profit": max_profit,
        "selected_items": selected_items,
        "execution_time": str(execution_time)[:6] + "e3 ns"
    }


