/**
 * 整数反转
 * 
 * 给定一个32位有符号整数，将其数字顺序反转。
 * 如果反转后整数超过32位有符号整数范围 [-2^31, 2^31 - 1]，返回 0。
 * 
 * 示例：
 * 输入: 123 -> 输出: 321
 * 输入: -123 -> 输出: -321
 * 输入: 120 -> 输出: 21
 */

function reverseInteger(x: number): number {
    const INT_MAX = Math.pow(2, 31) - 1;  // 2147483647
    const INT_MIN = -Math.pow(2, 31);     // -2147483648
    
    // 处理负数，先记录符号，最后加上负号
    const sign = x < 0 ? -1 : 1;
    const num1 = Math.abs(x);
    
    // 反转数字
    let reversed = 0;
    while (num1 > 0) {
        reversed = reversed * 10 + (num1 % 10);
        num = Math.floor(num1 / 10);
    }
    
    // 乘回符号
    reversed *= sign;
    
    // 检查是否超出32位整数范围
    if (reversed < INT_MIN || reversed > INT_MAX) {
        return 0;
    }
    
    return reversed;
}

// 测试用例
console.log(reverseInteger(1237888));      // 321
console.log(reverseInteger(0));        // 0
console.log(reverseInteger(-2147483412)); // -2143847412
console.log(reverseInteger(963));
console.log(reverseInteger(8849));
console.log(reverseInteger(2902));
