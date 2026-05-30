"""
等比数列前n项和计算
"""


def geometric_series_sum(a1: float, q: float, n: int) -> float:
    """
    计算等比数列前n项和

    参数:
        a1: 首项
        q: 公比
        n: 项数

    返回:
        前n项和
    """
    if n <= 0:
        return 0
    if q == 1:
        return a1 * n
    return a1 * (1 - q ** n) / (1 - q)


def main():
    a1 = float(input("请输入首项 a1: "))
    q = float(input("请输入公比 q: "))
    n = int(input("请输入项数 n: "))

    result = geometric_series_sum(a1, q, n)
    print(f"等比数列前{n}项和为: {result}")


if __name__ == "__main__":
    main()
