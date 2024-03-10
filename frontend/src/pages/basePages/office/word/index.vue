<template>
  <div>
    <a-button
      @click="goPreview"
    >
      预览 word 文件
    </a-button>
    <a-button
      @click="downLoad"
    >
      下载 word 文件
    </a-button>
    <div class="doc-render-box">
      <div ref="refFile"></div>
    </div>
  </div>
</template>

<script name="word" setup>
import { getFile } from '@/services/demo';
import { defineComponent, ref } from 'vue'

const docxPromise = () => import('docx-preview')

/**
 * 解析 filename
 */
function extractFileNameFromContentDispositionHeader (value) {
  const patterns = [
    /filename\*=[^']+'\w*'"([^"]+)";?/i,
    /filename\*=[^']+'\w*'([^;]+);?/i,
    /filename="([^;]*);?"/i,
    /filename=([^;]*);?/i
  ]

  let responseFilename
  patterns.some(regex => {
    responseFilename = regex.exec(value)
    return responseFilename !== null
  })
  if (responseFilename !== null && responseFilename.length > 1) {
    try {
      return decodeURIComponent(responseFilename[1])
    } catch (e) {
      console.error(e)
    }
  }

  return null
}

const refFile = ref(null)
// 预览
const goPreview = async () => {
  const docx = await docxPromise()
  const { data } = await getFile({
    url: 'http://127.0.0.1:4000/getDoc'
  });
  docx.renderAsync(data, refFile.value, null, {
    className: "docx", //默认和文档样式类的类名/前缀
    inWrapper: true, //启用围绕文档内容呈现包装器
    ignoreWidth: true, //禁用页面的渲染宽度
    ignoreHeight: true, //禁用页面的渲染高度
    ignoreFonts: true, //禁用字体渲染
    breakPages: true, //在分页符上启用分页
    ignoreLastRenderedPageBreak: true, //在lastRenderedPageBreak元素上禁用分页
    experimental: true, //启用实验功能（制表符停止计算）
    trimXmlDeclaration: true, //如果为true，则在解析之前将从xml文档中删除xml声明
    useBase64URL: false, //如果为true，图像、字体等将转换为base 64 URL，否则使用URL.createObjectURL
    useMathMLPolyfill: false, //包括用于铬、边等的MathML多填充。
    showChanges: false, //启用文档更改的实验渲染（插入/删除）
    debug: false, //启用额外的日志记录
  })
}

// 下载
const downLoad = async () => {
  const res = await getFile({
    url: 'http://127.0.0.1:4000/getDoc'
  });
  const fileName = extractFileNameFromContentDispositionHeader(
    res.headers?.['content-disposition']
  )

  const blob = new Blob([res.data])
  const link = document.createElement('a')

  link.href = URL.createObjectURL(blob)
  link.download = fileName || 'word文件.docx'
  link.style.display = 'none'

  document.body.appendChild(link)

  link.click()
  link.remove()
}

</script>

<style lang="scss" scoped>
.doc-render-box {
  width: 900px;
  padding-top: 10px;
  margin: 0 auto;
  overflow-x: auto;
}
</style>