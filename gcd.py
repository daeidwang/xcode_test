def gcd(a: int, b: int) -> int:
    """计算两个正整数的最大公约数（欧几里得算法）"""
    while b:
        a, b = b, a % b
    return a


if __name__ == "__main__":
    # 示例
    print(gcd(12, 8))   # 输出: 4
    print(gcd(48, 18))  # 输出: 6
    print(gcd(7, 13))   # 输出: 1
