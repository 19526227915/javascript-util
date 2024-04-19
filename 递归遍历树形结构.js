

// 深拷贝和浅拷贝的意思分别是：深拷贝是指拷贝对象的具体内容，
// 二内存地址是自主分配的，拷贝结束之后俩个对象虽然存的值是一样的，
// 但是内存地址不一样，俩个对象页互相不影响，
// 互不干涉。浅拷贝是指对内存地址的复制，让目标对象指针和源对象指向同一片内存空间。

/**
 * 深度复制对象。
 * @param obj 要进行深度复制的对象。
 * @param visited 用于记录已访问过的对象，防止循环引用，默认为一个新的 WeakMap 实例。
 * @returns 返回 obj 的深度复制副本。
 */
export function deepCopy(obj, visited = new WeakMap()) {
    // 如果是 null 或非对象类型，直接返回
    if (obj === null || typeof obj !== 'object') return obj;

    // 检查是否已复制过该对象，如果是，则直接返回已复制的结果
    const cachedCopy = visited.get(obj);
    if (cachedCopy) return cachedCopy;

    // 根据不同的对象类型创建相应的副本
    let clone;
    if (Array.isArray(obj)) {
        clone = [];
    } else if (obj instanceof Date) {
        clone = new Date(obj);
    } else if (obj instanceof RegExp) {
        clone = new RegExp(obj.source, obj.flags);
    } else if (obj instanceof Set) {
        clone = new Set();
        for (const item of obj) {
            clone.add(deepCopy(item, visited));
        }
    } else if (obj instanceof Map) {
        clone = new Map();
        for (const [key, value] of obj.entries()) {
            clone.set(deepCopy(key, visited), deepCopy(value, visited));
        }
    } else {
        // 对于普通对象，创建一个新对象，并继承原型链上的属性
        clone = Object.create(Object.getPrototypeOf(obj));
    }

    // 将复制的对象存入 visited 映射，用于检测循环引用
    visited.set(obj, clone);

    // 遍历对象的所有属性，递归复制它们到新对象
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clone[key] = deepCopy(obj[key], visited);
        }
    }

    return clone;
}