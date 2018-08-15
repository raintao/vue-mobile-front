/* 全局过滤函数 */

import * as moment from 'moment'

/**
 * 按格式进行日期过滤
 *
 * @export
 * @param {any} date
 * @param {string} format   // 格式
 * @param {string} source   // 源
 * @returns
 */
export function dateFormat(date, format = 'YYYY-MM-DD', source) {
    if (!date) { return '' }
    return moment(date, source).format(format)
}

/**
 * 金额过滤（逢3位加逗号）
 *
 * @export
 * @param {any} money
 * @returns
 */
export function moneyFormat(money = '0.00') {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

/** 
 * 保留小数, 默认 2 位
 * @param {any} num
 * @param {boolean} isMust  // 是否必须保留小数点
 * @param {number} fixed    // 小数点位数
 */
export function toFixed(num, isMust = false, fixed = 2) {
    let newNum = parseFloat(num)
    if (isNaN(newNum) || newNum === 0) return !isMust ? '0' : (0).toFixed(fixed)

    if (isMust) return newNum.toFixed(fixed)

    let newNumArry = ('' + newNum).split('.')
    if (newNumArry[1] === '00') return newNumArry[0]

    return newNumArry[1] && newNumArry[1].length > 2 ? newNum.toFixed(fixed) : newNum
}