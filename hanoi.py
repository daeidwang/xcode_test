"""汉诺塔问题的递归解法"""


def hanoi(n, source, target, auxiliary):
    """
    递归解决汉诺塔问题

    Args:
        n: 盘子的数量
        source: 起始柱子
        target: 目标柱子
        auxiliary: 辅助柱子
    """
    if n == 1:
        print(f"将盘子 1 从 {source} 移动到 {target}")
        return

    # 将 n-1 个盘子从 source 移动到 auxiliary
    hanoi(n - 1, source, auxiliary, target)

    # 将最大的盘子从 source 移动到 target
    print(f"将盘子 {n} 从 {source} 移动到 {target}")

    # 将 n-1 个盘子从 auxiliary 移动到 target
    hanoi(n - 1, auxiliary, target, source)


if __name__ == "__main__":
    n = 3
    print(f"使用 {n} 个盘子解决汉诺塔问题:\n")
    hanoi(n, 'A', 'C', 'B')
