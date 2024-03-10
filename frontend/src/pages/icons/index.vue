<template>
  <div class="icons-container">
    <a-tabs type="card" style="height: 100%">
      <a-tab-pane key="1" title="Icons">
        <a-scrollbar style="height: 90vh;overflow:auto;padding-bottom: 120px">
          <div class="grid-container">
            <div class="grid-item" v-for="item of svgIcons" :key="item" @click="handleClipboard(generateIconCode(item), $event)">
              <a-tooltip position="top" :content="generateIconCode(item)">
                <div class="icon-item">
                  <svg-icon :icon-class="item" class-name="disabled" />
                  <span>{{ item }}</span>
                </div>
              </a-tooltip>
            </div>
          </div>
        </a-scrollbar>
      </a-tab-pane>
      <a-tab-pane key="2" title="Remix Icons">
        <a-collapse class="content">
          <a-link href="https://remixicon.cn/">https://remixicon.cn/</a-link>
          <!-- <a-collapse-item v-for="cata of remixCatalog" :key="cata" :header="cata">
            <a-tooltip v-for="item of remixBook[cata]" :key="item"
              :content="generateRemixCode(item)" @click="handleClipboard(generateRemixCode(item), $event)">
              <div class="icon-item">
                <remix-icon :icon-class="item" class-name="disabled" />
                <span>{{ item }}</span>
              </div>
            </a-tooltip>
          </a-collapse-item> -->
        </a-collapse>
      </a-tab-pane>
      <a-tab-pane key="3" title="Arco Icons">
        <a-scrollbar style="height: 90vh;overflow:auto;padding-bottom: 120px">
          <div class="grid-container">
              <div class="grid-item" v-for="item of aIcons" :key="item" @click="handleClipboard(generateAIconCode(item), $event)">
                <a-tooltip position="top" :content="generateAIconCode(item)">
                  <div class="icon-item">
                    <component :is="item" class-name="disabled" />
                    <span>{{ item }}</span>
                  </div>
                </a-tooltip>
              </div>
          </div>
        </a-scrollbar>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import clipboard from '@/utils/clipboard';
import svgIcons from './svg-icons';
// import remixBook from './remix-icons';
// import { remixCatalog, } from '@/icons/config';
import aIcons from './a-icons';

export default {
  name: 'Icon',
  data() {
    return {
      svgIcons,
      // remixBook,
      // remixCatalog,
      aIcons,
    };
  },
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}"></svg-icon>`;
    },
    generateRemixCode(symbol) {
      return `<remix-icon icon-class="${symbol}"></remix-icon>`;
    },
    generateAIconCode(symbol) {
      return `<${symbol} />`;
    },
    handleClipboard(text, event) {
      clipboard(text, event);
    },
  },
};
</script>

<style lang="scss" scoped>
.icons-container {
  flex: 1;
  margin-bottom: 20px;
  background: var(--color-bg-2);
  color: var(--color-text-2);
  height: 100%;

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  grid-auto-rows: 100px;
  grid-gap: 0px;
  padding: 20px;
  position: relative;
}

.scrollbar {
  height: 100%;
}

.a-scrollbar {
  height: 100%;
  overflow: auto;
}


.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 0px .2px #ccc;

  .icon-item {
    text-align: center;
    color: #24292e;
    cursor: pointer;
    font-size: 20px;
    overflow: hidden;
    padding: 12px;

    .icon {
      display: inline-block;
      width: 1em;
      height: 1em;
      font-style: normal;
      vertical-align: -2px;
      outline: none;
      stroke: currentColor;
    }
  }
}

span {
  color: var(--color-text-2);
}

svg {
  color: var(--color-text-2);
}
</style>
