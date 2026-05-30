/**
 * 最长回文子串
 * 使用中心扩展法，时间复杂度 O(n²)，空间复杂度 O(1)
 */

function longestPalindrome(s: string): string {
  if (s.length < 2) return s;

  let start = 0;
  let maxLen = 1;

  const expandAroundCenter = (left: number, right: number): void => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const currentLen = right - left + 1;
      if (currentLen > maxLen) {
        start = left;
        maxLen = currentLen;
      }
      left--;
      right++;
    }
  };

  for (let i = 0; i < s.length; i++) {
    // 奇数长度回文，以 s[i] 为中心
    expandAroundCenter(i, i);
    // 偶数长度回文，以 s[i] 和 s[i+1] 之间的空隙为中心
    expandAroundCenter(i, i + 1);
  }

  return s.substring(start, start + maxLen);
}

// 测试用例
console.log(longestPalindrome("babad"));   // "bab" 或 "aba"
console.log(longestPalindrome("cbbd"));    // "bb"
console.log(longestPalindrome("a"));       // "a"
console.log(longestPalindrome("ac"));      // "a" 或 "c"
console.log(longestPalindrome("racecar")); // "racecar"
