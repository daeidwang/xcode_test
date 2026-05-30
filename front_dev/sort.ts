/**
 * 数组排序方法集合
 */

// ==================== 错误类型定义 ====================

export class SortError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SortError';
  }
}

function isValidArray(arr: any): arr is any[] {
  return Array.isArray(arr);
}

function isNonEmptyArray(arr: any[]): boolean {
  return arr.length > 0;
}

// ==================== 基础类型排序 ====================

/**
 * 冒泡排序 O(n²)
 * 通过相邻元素比较和交换，将较大的元素逐渐"冒泡"到数组末端
 * @param arr 待排序数组
 * @returns 排序后的新数组
 */
export function bubbleSort<T>(arr: T[]): T[] {
  if (!isValidArray(arr)) {
    throw new SortError('参数 arr 必须是数组');
  }
  if (!isNonEmptyArray(arr)) {
    return [];
  }

  const result = [...arr];
  const n = result.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
      }
    }
  }

  return result;
}

/**
 * 选择排序 O(n²)
 * 在未排序部分找到最小元素，放到已排序部分的末尾
 * @param arr 待排序数组
 * @returns 排序后的新数组
 */
export function selectionSort<T>(arr: T[]): T[] {
  if (!isValidArray(arr)) {
    throw new SortError('参数 arr 必须是数组');
  }
  if (!isNonEmptyArray(arr)) {
    return [];
  }

  const result = [...arr];
  const n = result.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (result[j] < result[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [result[i], result[minIdx]] = [result[minIdx], result[i]];
    }
  }

  return result;
}

/**
 * 插入排序 O(n²)
 * 将元素逐个插入到已排序部分的正确位置
 * @param arr 待排序数组
 * @returns 排序后的新数组
 */
export function insertionSort<T>(arr: T[]): T[] {
  if (!isValidArray(arr)) {
    throw new SortError('参数 arr 必须是数组');
  }
  if (!isNonEmptyArray(arr)) {
    return [];
  }

  const result = [...arr];
  const n = result.length;

  for (let i = 1; i < n; i++) {
    const current = result[i];
    let j = i - 1;

    while (j >= 0 && result[j] > current) {
      result[j + 1] = result[j];
      j--;
    }
    result[j + 1] = current;
  }

  return result;
}

/**
 * 快速排序 O(n log n) 平均时间复杂度
 * 选择基准元素，将数组分为两部分，递归排序
 * @param arr 待排序数组
 * @returns 排序后的新数组
 */
export function quickSort<T>(arr: T[]): T[] {
  if (!isValidArray(arr)) {
    throw new SortError('参数 arr 必须是数组');
  }
  if (!isNonEmptyArray(arr)) {
    return [];
  }

  if (arr.length <= 1) {
    return [...arr];
  }

  const pivot = arr[0];
  const left: T[] = [];
  const right: T[] = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

/**
 * 归并排序 O(n log n)
 * 采用分治策略，将数组分为两部分分别排序后合并
 * @param arr 待排序数组
 * @returns 排序后的新数组
 */
export function mergeSort<T>(arr: T[]): T[] {
  if (!isValidArray(arr)) {
    throw new SortError('参数 arr 必须是数组');
  }
  if (!isNonEmptyArray(arr)) {
    return [];
  }

  if (arr.length <= 1) {
    return [...arr];
  }

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge<T>(left: T[], right: T[]): T[] {
  const result: T[] = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

/**
 * 使用 JavaScript 内置排序（快速排序实现）
 * @param arr 待排序数组
 * @param compareFn 比较函数，接收 T 类型参数
 * @returns 排序后的新数组
 */
export function sort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  if (!isValidArray(arr)) {
    throw new SortError('参数 arr 必须是数组');
  }
  return [...arr].sort(compareFn);
}

// ==================== 对象数组排序 ====================

/**
 * 根据指定键排序对象数组
 * @param arr 对象数组
 * @param key 对象键名
 * @param ascending 是否升序（默认 true）
 * @returns 排序后的新数组
 */
export function sortByKey<T extends Record<string, any>>(
  arr: T[],
  key: keyof T,
  ascending: boolean = true
): T[] {
  if (!isValidArray(arr)) {
    throw new SortError('参数 arr 必须是数组');
  }
  if (arr.length === 0) {
    return [];
  }
  if (key === null || key === undefined || key === '') {
    throw new SortError('参数 key 不能为空');
  }

  return [...arr].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    const order = ascending ? 1 : -1;

    if (aVal < bVal) return -1 * order;
    if (aVal > bVal) return 1 * order;
    return 0;
  });
}

/**
 * 根据多个键排序对象数组（优先级从左到右）
 * @param arr 对象数组
 * @param keys 键名数组及升序/降序配置
 * @returns 排序后的新数组
 * @example sortByMultipleKeys(users, [{ key: 'age', ascending: true }, { key: 'name', ascending: false }])
 */
export function sortByMultipleKeys<T extends Record<string, any>>(
  arr: T[],
  keys: Array<{ key: keyof T; ascending?: boolean }>
): T[] {
  if (!isValidArray(arr)) {
    throw new SortError('参数 arr 必须是数组');
  }
  if (arr.length === 0) {
    return [];
  }
  if (!isValidArray(keys)) {
    throw new SortError('参数 keys 必须是数组');
  }
  if (keys.length === 0) {
    throw new SortError('参数 keys 不能为空数组');
  }

  // 校验每个 key
  for (const item of keys) {
    if (item.key === null || item.key === undefined || item.key === '') {
      throw new SortError('keys 数组中的 key 不能为空');
    }
  }

  return [...arr].sort((a, b) => {
    for (const { key, ascending = true } of keys) {
      const aVal = a[key];
      const bVal = b[key];
      const order = ascending ? 1 : -1;

      if (aVal < bVal) return -1 * order;
      if (aVal > bVal) return 1 * order;
    }
    return 0;
  });
}

/**
 * 根据嵌套键排序对象数组
 * @param arr 对象数组
 * @param keyPath 嵌套键路径，如 'address.city'
 * @param ascending 是否升序（默认 true）
 * @returns 排序后的新数组
 */
export function sortByPath<T extends Record<string, any>>(
  arr: T[],
  keyPath: string,
  ascending: boolean = true
): T[] {
  if (!isValidArray(arr)) {
    throw new SortError('参数 arr 必须是数组');
  }
  if (arr.length === 0) {
    return [];
  }
  if (!keyPath || typeof keyPath !== 'string' || keyPath.trim() === '') {
    throw new SortError('参数 keyPath 必须是有效的非空字符串');
  }

  return [...arr].sort((a, b) => {
    const aVal = getNestedValue(a, keyPath);
    const bVal = getNestedValue(b, keyPath);
    const order = ascending ? 1 : -1;

    if (aVal < bVal) return -1 * order;
    if (aVal > bVal) return 1 * order;
    return 0;
  });
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

// 使用示例
if (require.main === module) {
  console.log('=== 基础类型排序 ===');
  const arr = [64, 34, 25, 12, 22, 11, 90];
  console.log('原始数组:', arr);
  console.log('冒泡排序:', bubbleSort(arr));
  console.log('选择排序:', selectionSort(arr));
  console.log('插入排序:', insertionSort(arr));
  console.log('快速排序:', quickSort(arr));
  console.log('归并排序:', mergeSort(arr));
  console.log('内置排序:', sort(arr));
  console.log('降序排序:', sort(arr, (a, b) => b - a));

  console.log('\n=== 对象数组排序 ===');
  const users = [
    { name: 'Alice', age: 25, score: 90 },
    { name: 'Bob', age: 30, score: 85 },
    { name: 'Charlie', age: 25, score: 95 },
    { name: 'Diana', age: 28, score: 88 },
  ];

  console.log('原始数组:', users);
  console.log('按 age 升序:', sortByKey(users, 'age'));
  console.log('按 age 降序:', sortByKey(users, 'age', false));
  console.log('按 score 升序:', sortByKey(users, 'score'));

  console.log('按 age 升序 + score 降序:', sortByMultipleKeys(users, [
    { key: 'age', ascending: true },
    { key: 'score', ascending: false }
  ]));

  const products = [
    { name: 'Phone', price: 999, details: { color: 'black' } },
    { name: 'Laptop', price: 1999, details: { color: 'silver' } },
    { name: 'Tablet', price: 599, details: { color: 'black' } },
  ];
  console.log('按嵌套键排序 (details.color):', sortByPath(products, 'details.color'));

  console.log('\n=== 错误处理示例 ===');
  // 空数组
  console.log('空数组测试:', bubbleSort([]));

  // 边界情况测试
  try {
    sortByKey(null as any, 'name');
  } catch (e) {
    console.log('sortByKey(null) 错误:', (e as Error).message);
  }

  try {
    sortByKey(users, '' as any);
  } catch (e) {
    console.log('sortByKey(key="") 错误:', (e as Error).message);
  }

  try {
    sortByMultipleKeys(users, []);
  } catch (e) {
    console.log('sortByMultipleKeys(keys=[]) 错误:', (e as Error).message);
  }

  try {
    sortByPath(products, '');
  } catch (e) {
    console.log('sortByPath(keyPath="") 错误:', (e as Error).message);
  }
}
