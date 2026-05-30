/**
 * 两数相加
 * 给你两个非空链表，表示两个非负整数。
 * 数字逆序存储，每个节点包含一个数字位。
 * 将这两个数相加并返回一个新的链表。
 */

// 定义链表节点
class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/**
 * 将数组转换为链表
 * @param arr 数字数组
 * @returns 链表头节点
 */
export function arrayToListNode(arr: number[]): ListNode | null {
  if (arr.length === 0) return null;

  const head = new ListNode(arr[0]);
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }

  return head;
}

/**
 * 将链表转换为数组
 * @param head 链表头节点
 * @returns 数字数组
 */
export function listNodeToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;

  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }

  return result;
}

/**
 * 两数相加
 * @param l1 第一个链表
 * @param l2 第二个链表
 * @returns 结果链表
 */
export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummyHead = new ListNode(0);
  let current = dummyHead;
  let carry = 0;

  while (l1 !== null || l2 !== null || carry !== 0) {
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;
    const sum = val1 + val2 + carry;

    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);

    current = current.next;
    l1 = l1 ? l1.next : null;
    l2 = l2 ? l2.next : null;
  }

  return dummyHead.next;
}

// 使用示例
if (require.main === module) {
  // 342 + 465 = 807
  // 链表表示: 2 -> 4 -> 3 和 5 -> 6 -> 4
  const l1 = arrayToListNode([2, 4, 3]);
  const l2 = arrayToListNode([5, 6, 4]);

  const result = addTwoNumbers(l1, l2);
  console.log('结果链表:', listNodeToArray(result)); // [7, 0, 8]

  // 9999999 + 9999 = 10009998
  // 链表表示: 9 -> 9 -> 9 -> 9 -> 9 -> 9 -> 9 和 9 -> 9 -> 9 -> 9
  const l3 = arrayToListNode([9, 9, 9, 9, 9, 9, 9]);
  const l4 = arrayToListNode([9, 9, 9, 9]);

  const result2 = addTwoNumbers(l3, l4);
  console.log('结果链表:', listNodeToArray(result2)); // [8, 9, 9, 9, 0, 0, 0, 1]
}
