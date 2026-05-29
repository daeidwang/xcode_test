"""冒泡排序实现"""


def bubble_sort(arr):
    """对数组进行冒泡排序（原地排序）"""
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr


if __name__ == "__main__":
    # 测试用例
    test_list = [64, 34, 25, 12, 22, 11, 90]
    print(f"排序前: {test_list}")
    bubble_sort(test_list)
    print(f"排序后: {test_list}")
