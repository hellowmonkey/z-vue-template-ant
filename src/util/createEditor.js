import E from 'wangeditor'
import config from '../config'

export default (el, handleChange) => {
    const editor = new E(el)
    if (handleChange) {
        editor.customConfig.onchange = (html) => {
            handleChange(html)
        }
    }
    editor.customConfig.uploadFileName = 'image'
    editor.customConfig.uploadImgServer = config.baseURL + 'storage/upload'
    editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'undo', // 撤销
        'redo' // 重复
    ]
    editor.customConfig.uploadImgHooks = {
        customInsert (insertImg, result, editor) {
            insertImg(result.data[0].url)
        }
    }
    editor.create()
    return editor
}
