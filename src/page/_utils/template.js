// 处理日期时间格式
function formatDate(date) {
    // 将日期时间字符串转换成日期对象
    return date&&typeof date == 'string'&&date.replace('T', ' ')||'--'
}

// 处理时间格式到年
function formatDateToYear (dataStr) {
    return typeof dataStr == 'string' && dataStr.substring(0,10);
}


// 根据传递来的值, 处理表格信息, 格式化文本
function replaceText(text, replaceValue,conditionText){
    return text == conditionText?replaceValue:text
}