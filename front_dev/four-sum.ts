/**
 * 四数之合 (4Sum)
 * 给定一个数组 nums 和目标值 target，找出所有唯一四元组 [a, b, c, d]，
 * 使得 a + b + c + d = target
 * 
 * 示例：
 * 输入: nums = [1, 0, -1, 0, -2, 2], target = 0
 * 输出: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]
 */

function fourSum(nums: number[], target: number): number[][] {
    const result: number[][] = [];
    const n = nums.length;
    
    if (n < 4) return result;
    
    // 排序
    nums.sort((a, b) => a - b);
    
    for (let i = 0; i < n - 3; i++) {
        // 跳过重复元素
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        // 优化：最小的四个数之和已经大于 target
        if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;
        
        // 优化：当前数与最大的三个数之和仍小于 target
        if (nums[i] + nums[n - 1] + nums[n - 2] + nums[n - 3] < target) continue;
        
        for (let j = i + 1; j < n - 2; j++) {
            // 跳过重复元素
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;
            
            // 优化
            if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) break;
            if (nums[i] + nums[j] + nums[n - 1] + nums[n - 2] < target) continue;
            
            let left = j + 1;
            let right = n - 1;
            
            while (left < right) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right];
                
                if (sum === target) {
                    result.push([nums[i], nums[j], nums[left], nums[right]]);
                    
                    // 跳过重复元素
                    while (left < right && nums[left] === nums[left + 1]) left++;
                    while (left < right && nums[right] === nums[right - 1]) right--;
                    
                    left++;
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }
    
    return result;
}

// 测试用例
console.log(fourSum([1, 0, -1, 0, -2, 2], 0));
// 输出: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]

console.log(fourSum([0, 0, 0, 0], 0));
// 输出: [[0, 0, 0, 0]]

console.log(fourSum([-2, -1, -1, 0, 1, 2], 0));
// 输出: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, -1, 0, 2]]

console.log("hello js")
console.log("hello js")
console.log("hello js")
console.log("hello js")
console.log("hello js")
console.log("hello js")
console.log("hello js")
console.log("hello js")
console.log("hello js")
console.log("hello js")
console.log("hello js")
console.log("hello js")
console.log("hello js")
console.log("hello js")
console.log("hello js")
console.log("hello js")
console.log("hello js")
console.log("hello js")
console.log("hello js")
console.log("hello js")
console.log("hello js")
