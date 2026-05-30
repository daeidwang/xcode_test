import math

def gcd(a: int, b: int) -> int:
    """计算两个整数的最大公约数（使用 math.gcd，高速版本）"""
    return math.gcd(a, b)


if __name__ == "__main__":
    # 示例
    print(gcd(12, 8))   # 输出: 4
    print(gcd(48, 18))  # 输出: 6
    print(gcd(7, 13))   # 输出: 1
