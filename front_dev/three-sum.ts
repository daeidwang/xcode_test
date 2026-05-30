/**
 * 三数之和 (3Sum)
 * 
 * 题目：给你一个整数数组 nums，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k，
 * 同时满足 nums[i] + nums[j] + nums[k] == 0 。
 * 你可以按任意顺序返回答案，答案中不能包含重复的三元组。
 * 
 * 示例：
 * 输入：nums = [-1, 0, 1, 2, -1, -4]
 * 输出：[[-1, -1, 2], [-1, 0, 1]]
 */

function threeSum(nums: number[]): number[][] {
  const result: number[][] = [];
  const n = nums.length;
  
  if (n < 3) return result;
  
  // 先对数组排序
  nums.sort((a, b) => a - b);
  
  for (let i = 0; i < n - 2; i++) {
    // 如果第一个数大于0，则后面不可能有和为0的三元组
    if (nums[i] > 0) break;
    
    // 跳过重复元素
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    
    let left = i + 1;
    let right = n - 1;
    
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        
        // 跳过重复元素
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  
  return result;
}

// 测试用例
