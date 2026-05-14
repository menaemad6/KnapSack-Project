import re


def _parse_int_list(input_str, field_name, allow_zero=False):
    if not input_str or not input_str.strip():
        raise ValueError(f"{field_name} cannot be empty.")

    parts = [part for part in re.split(r"[,\s]+", input_str.strip()) if part]
    if not parts:
        raise ValueError(f"{field_name} cannot be empty.")

    values = []
    for raw in parts:
        try:
            number = int(raw)
        except ValueError as exc:
            raise ValueError(
                f"{field_name} must contain integers only. Invalid value: '{raw}'."
            ) from exc

        if allow_zero:
            if number < 0:
                raise ValueError(f"{field_name} must contain non-negative integers.")
        else:
            if number <= 0:
                raise ValueError(f"{field_name} must contain positive integers.")

        values.append(number)

    return values


def process_input(weights_str, values_str, capacity_str):
    """Parse and validate raw user input strings.

    Returns:
        tuple[list[int], list[int], int]: (weights, values, capacity)

    Raises:
        ValueError: If any input value is invalid.
    """
    weights = _parse_int_list(weights_str, "Weights", allow_zero=False)
    values = _parse_int_list(values_str, "Values", allow_zero=True)

    if len(weights) != len(values):
        raise ValueError("Weights and values must have the same number of items.")

    if not capacity_str or not capacity_str.strip():
        raise ValueError("Capacity cannot be empty.")

    try:
        capacity = int(capacity_str.strip())
    except ValueError as exc:
        raise ValueError("Capacity must be an integer.") from exc

    if capacity <= 0:
        raise ValueError("Capacity must be a positive integer.")

    return weights, values, capacity
