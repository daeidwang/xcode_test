/**
 * 深拷贝实现
 */

/**
 * 深拷贝函数 - 支持基本类型、对象、数组、Date、RegExp、Map、Set
 * @param target 需要深拷贝的目标值
 * @returns 深拷贝后的新值
 */
export function deepClone<T>(target: T): T {
  // 处理 null 和 undefined
  if (target === null || target === undefined) {
    return target;
  }

  // 处理基本类型
  if (typeof target !== 'object') {
    return target;
  }

  // 处理日期
  if (target instanceof Date) {
    return new Date(target.getTime()) as unknown as T;
  }

  // 处理正则
  if (target instanceof RegExp) {
    return new RegExp(target.source, target.flags) as unknown as T;
  }

  // 处理 Map
  if (target instanceof Map) {
    const cloneMap = new Map();
    target.forEach((value, key) => {
      cloneMap.set(key, deepClone(value));
    });
    return cloneMap as unknown as T;
  }

  // 处理 Set
  if (target instanceof Set) {
    const cloneSet = new Set();
    target.forEach((value) => {
      cloneSet.add(deepClone(value));
    });
    return cloneSet as unknown as T;
  }

  // 处理数组
  if (Array.isArray(target)) {
    const cloneArray: unknown[] = [];
    target.forEach((item, index) => {
      cloneArray[index] = deepClone(item);
    });
    return cloneArray as unknown as T;
  }

  // 处理普通对象
  const cloneObject: Record<string, unknown> = {};
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      cloneObject[key] = deepClone((target as Record<string, unknown>)[key]);
    }
  }

  return cloneObject as T;
}

// 使用示例
if (require.main === module) {
  const original = {
    name: '张三',
    age: 25,
    birthday: new Date('2000-01-01'),
    hobbies: ['篮球', '足球'],
    address: {
      city: '北京',
      district: '朝阳区'
    },
    regex: /test/gi,
    map: new Map([['key1', 'value1']]),
    set: new Set([1, 2, 3]),
    nestedArray: [
      { id: 1, items: ['a', 'b'] },
      { id: 2, items: ['c', 'd'] }
    ]
  };

  const cloned = deepClone(original);

  // 修改克隆对象
  cloned.name = '李四';
  cloned.hobbies.push('游泳');
  cloned.address.city = '上海';

  console.log('原始对象:', original);
  console.log('克隆对象:', cloned);
  console.log('验证:', original.name === '张三'); // true
  console.log('验证:', original.hobbies.length === 2); // true
}
