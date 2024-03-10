<template>
  <div>
    <a-button
      @click="goPreview"
    >
      预览 pdf 文件
    </a-button>
    <a-button
      @click="downLoad"
    >
      下载 pdf 文件
    </a-button>
    <div class="doc-render-box">
      <div ref="refFile"></div>
    </div>
  </div>
  <div class="pdf-preview">
    <vue-pdf-embed :source="state.source" class="vue-pdf-embed" />
  </div>
</template>

<script name="pdf" setup>
import { getFile } from '@/services/demo';
import VuePdfEmbed from "vue-pdf-embed";

const state = reactive({
  source: 'http://127.0.0.1:4000/getPdf',
});

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
  const link = document.createElement('a')

  link.href = state.source;
  link.target = '_blank';
  link.style.display = 'none'

  document.body.appendChild(link)

  link.click()
  link.remove()
}

// 下载
const downLoad = async () => {
  const res = await getFile({
    url: 'http://127.0.0.1:4000/getPdf'
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
.pdf-preview {
    position: relative;
    height: 100vh;
    padding: 20px 0;
    box-sizing: border-box;
    background: rgb(66, 66, 66);
    overflow: auto;
}

.vue-pdf-embed {
    text-align: center;
    width: 90%;
    border: 1px solid #e5e5e5;
    margin: 0 auto;
    box-sizing: border-box;
}
</style>