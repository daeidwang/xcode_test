"""堆排序实现"""


def heapify(arr, n, i):
    """将索引 i 的节点下沉，构建最大堆"""
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)


def heap_sort(arr):
    """堆排序"""
    n = len(arr)

    # 构建最大堆
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    # 逐个提取元素
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]  # 将最大元素移到末尾
        heapify(arr, i, 0)               # 重新调整堆

    return arr


if __name__ == "__main__":
    # 测试用例
    test_list = [64, 34, 25, 12, 22, 11, 90]
    print(f"排序前: {test_list}")
    heap_sort(test_list)
    print(f"排序后: {test_list}")
