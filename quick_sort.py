def quick_sort(arr):
    """快速排序算法"""
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)


if __name__ == "__main__":
    # 测试
    test_list = [64, 34, 25, 12, 22, 11, 90]
    print(f"原数组: {test_list}")
    sorted_list = quick_sort(test_list)
    print(f"排序后: {sorted_list}")
