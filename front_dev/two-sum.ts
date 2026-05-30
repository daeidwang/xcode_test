/**
 * 两数之和
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值 target 的那两个整数，并返回它们的数组下标。
 * 你可以假设每种输入只会对应一个答案，且同样的元素不能被重复利用。
 */

/**
 * 两数之和 - 暴力解法 O(n²)
 * @param nums 整数数组
 * @param target 目标值
 * @returns 两个数的下标
 */
export function twoSumBruteForce(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}

/**
 * 两数之和 - 哈希表解法 O(n)
 * @param nums 整数数组
 * @param target 目标值
 * @returns 两个数的下标
 */
export function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }

  return [];
}

// 使用示例
if (require.main === module) {
  const nums = [2, 7, 11, 15];
  const target = 9;

  console.log('暴力解法:', twoSumBruteForce(nums, target)); // [0, 1]
  console.log('哈希表解法:', twoSum(nums, target)); // [0, 1]

  const nums2 = [3, 2, 4];
  const target2 = 6;
  console.log('哈希表解法:', twoSum(nums2, target2)); // [1, 2]
}
