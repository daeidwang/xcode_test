/**
 * 数组扁平化方法
 */

/**
 * 将多维数组扁平化为一维数组
 * @param arr 要扁平化的数组
 * @param depth 扁平化深度，默认无限
 * @returns 扁平化后的一维数组
 */
function flatten<T>(arr: any[], depth: number = Infinity): T[] {
  return arr.reduce<T[]>((acc, val) => {
    return acc.concat(Array.isArray(val) && depth > 0
      ? flatten(val, depth - 1)
      : val);
  }, []);
}

// 示例
const nested = [1, [2, [3, [4, [5]]]]];
console.log(flatten(nested));           // [1, 2, 3, 4, 5]
console.log(flatten(nested, 2));         // [1, 2, 3, [4, [5]]]
console.log(flatten([1, [2, 3, [4]], 5])); // [1, 2, 3, 4, 5]

export { flatten };
