#!/usr/bin/env python3
"""时间戳转换为时间的工具"""

from datetime import datetime


def timestamp_to_datetime(timestamp: float, is_milliseconds: bool = False) -> str:
    """
    将时间戳转换为可读的时间字符串

    Args:
        timestamp: 时间戳（秒或毫秒）
        is_milliseconds: 是否为毫秒级时间戳

    Returns:
        格式化的日期时间字符串
    """
    if is_milliseconds:
        timestamp = timestamp / 1000

    dt = datetime.fromtimestamp(timestamp)
    return dt.strftime("%Y-%m-%d %H:%M:%S")


def timestamp_to_datetime_custom(timestamp: float, fmt: str = "%Y-%m-%d %H:%M:%S",
                                  is_milliseconds: bool = False) -> str:
    """
    将时间戳转换为自定义格式的时间字符串

    Args:
        timestamp: 时间戳（秒或毫秒）
        fmt: 日期时间格式
        is_milliseconds: 是否为毫秒级时间戳

    Returns:
        格式化的时间字符串
    """
    if is_milliseconds:
        timestamp = timestamp / 1000

    dt = datetime.fromtimestamp(timestamp)
    return dt.strftime(fmt)


if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1:
        ts = float(sys.argv[1])
        is_ms = "--ms" in sys.argv
        print(timestamp_to_datetime(ts, is_milliseconds=is_ms))
    else:
        # 示例
        now = datetime.now().timestamp()
        print(f"当前时间戳: {now}")
        print(f"转换后: {timestamp_to_datetime(now)}")
