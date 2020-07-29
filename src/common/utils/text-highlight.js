/*
 * 简单的文本按关键字高亮处理
 *
 * @Created: 2020-07-28 22:01:44
 * @Author: yesc (yes.ccx@gmail.com)
 */

export default (content, text) => {
    // 关键字处理
    text = text.replace(/[<>&"]/g, function (c) { return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]; });

    // 按关键字分割，再重新拼接
    let contentBlocks = content.split(text).map((block) => {
        return `<span>${block}</span>`;
    });
    let resHtml = contentBlocks.join(`<em>${text}</em>`);

    return resHtml;
};