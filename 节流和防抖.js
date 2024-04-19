/**
 * 函数防抖：返回一个新函数，该函数会推迟原函数的执行，最多等待指定的延迟时间。(基础版本)
 * @param this 绑定的上下文对象。
 * @param func 需要被推迟执行的函数。
 * @param delay 延迟时间（毫秒）。
 * @returns 返回一个新的函数，该函数可以取消原函数的排队执行。
 */
export function debounce(this, func, delay) {
    let timerId;
    const context = this;
    return function (...args) {

        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}


/**
 * 防抖函数，用于限制函数的调用频率。(基础版本)
 * @param fn 要被节流的函数，该参数必须是一个对象，包含一个apply方法。
 * @param interval 防抖时间间隔，单位为毫秒。
 * @returns 返回一个节流后的函数。
 */

export const throttle = (fn, interval) => {
    let lastTime = 0
    let _throttle = function (this, ...args) {
        let nowTime = new Date().getTime();
        if (nowTime - lastTime >= interval) {
            fn.apply(this, args)
            lastTime = nowTime
        }
    }
    return _throttle
}