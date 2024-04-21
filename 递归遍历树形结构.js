/**
 * 更新树形结构数据中的特定节点。
 * @param {Array} treeData - 表示树形结构的数组。
 * @param {Object} options - 包含要更新的节点信息的对象。
 * @param {string} options.key - 要查找和更新的节点的唯一标识符。
 * @param {*} options.val - 要更新到找到的节点上的新值。
 * @returns {Array} - 返回更新后的树形结构数组。如果没有找到并更新节点，则返回原始树形结构。
 */
const updateTreeData=(treeData,options)=>{
    // 遍历树形结构的函数，用于查找并更新目标节点
    const traverse=(node)=>{
        // 如果当前节点是数组，则递归遍历每个子元素
        if (Array.isArray(node)) {
            node.forEach(child => traverse(child));
            return;
        }
        // 如果当前节点有children属性，则递归遍历每个子节点
        if (node.children) {
            for (const child of node.children) {
                traverse(child);
            }
        }
        // 如果当前节点有list属性，则遍历list，更新目标节点的checkResult属性
        if (node.list) {
            return node.list.map((item) => {
                if (item.key === options.key) {
                    return Object.assign(item, {checkResult: options.val})
                }
                return item
            })
        }
    }
    // 开始遍历输入的树形结构，查找并更新目标节点
    for (const node of treeData) {
        const updatedNode = traverse(node);
        // 如果遍历过程中更新了节点，则返回整个更新后的树形结构
        if (updatedNode) {
            return treeData;
        }
    }
    // 如果没有找到需要更新的节点，返回原始树形结构
    return treeData
}

/**
 * 从树结构数据中获取所有节点的id组成的新数组
 * @param {Array} treeData - 树结构数据，每个节点应包含一个唯一的id属性，且可能包含子节点
 * @return {Array} 返回一个包含所有节点id的数组
 */
const getAllIdsFromTree = (treeData) => {
    const ids = [];

    // 确保treeData是一个数组
    if (Array.isArray(treeData)) {
        for (const node of treeData) {
            ids.push(node.id);

            // 检查当前节点是否有子节点
            if ('children' in node && Array.isArray(node.children)) {
                const childIds = getAllIdsFromTree(node.children);
                ids.push(...childIds);
            }
        }
    }

    return ids;
}

/**
 * 检查两个数组是否相等
 * @param {Array} a - 第一个数组
 * @param {Array} b - 第二个数组
 * @returns {boolean} - 如果两个数组相等返回true，否则返回false
 */
const arraysEqual = (a, b) => {
    if (a === b) return true; // 如果引用的是同一个数组，则直接返回true
    if (a == null || b == null) return false; // 如果有一个是null或undefined，则返回false
    if (a.length !== b.length) return false; // 长度不同则内容肯定不同

    const setA = new Set(a);
    const setB = new Set(b);

    return setA.size === setB.size && [...setA].every(value => setB.has(value));
}