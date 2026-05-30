"""
等差数列前 n 项和计算
公式: S_n = n * (a_1 + a_n) / 2 = n * (2*a_1 + (n-1)*d) / 2

参数说明:
- a_1: 首项
- d: 公差
- n: 项数
- a_n: 末项 (a_n = a_1 + (n-1)*d)
"""


def arithmetic_series_sum(a1: float, d: float, n: int) -> float:
    """
    计算等差数列前 n 项和
    
    Args:
        a1: 首项
        d: 公差
        n: 项数
    
    Returns:
        前 n 项和
    """
    return n * (2 * a1 + (n - 1) * d) / 2


def arithmetic_series_sum_by_last(a1: float, an: float, n: int) -> float:
    """
    通过首项和末项计算等差数列前 n 项和
    
    Args:
        a1: 首项
        an: 末项
        n: 项数
    
    Returns:
        前 n 项和
    """
    return n * (a1 + an) / 2


if __name__ == "__main__":
    # 示例: 首项为 1, 公差为 2, 求前 5 项和
    # 数列: 1, 3, 5, 7, 9
    a1, d, n = 1, 2, 5
    result = arithmetic_series_sum(a1, d, n)
    print(f"等差数列: 首项={a1}, 公差={d}, 项数={n}")
    print(f"数列: {', '.join(str(a1 + i * d) for i in range(n))}")
    print(f"前 {n} 项和 = {result}")
    
    print()
    
    # 另一种用法: 通过首项和末项计算
    a1, an, n = 1, 9, 5
    result2 = arithmetic_series_sum_by_last(a1, an, n)
    print(f"前 {n} 项和 (通过首项和末项) = {result2}")
