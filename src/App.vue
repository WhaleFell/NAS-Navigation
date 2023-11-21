<template>
  <el-container>
    <el-header>
      <div class="title">{{ title }}</div>
    </el-header>
    <el-main>
      <p>
        当前页面 URL: {{ currentURL }} 修改
        <code>/public/config.json</code>
        文件自定义网站
      </p>
      <dir type="flex" class="test-dashboard">
        <p>
          各大网站访问延迟:(设定了6s延迟,最好多刷新几次)
        </p>
        <div v-for="(v, k) in testUrls">
          <el-link
            :href="v"
            target="_blank"
            type="primary"
          >
            {{ k }}
          </el-link>
          ----
          <el-tag disable-transitions :id="k">
          </el-tag>
        </div>
      </dir>

      <el-row
        :gutter="20"
        :body-style="{ padding: '0px' }"
        type="flex"
      >
        <el-col
          :xs="24"
          :sm="12"
          :md="8"
          :lg="8"
          :xl="8"
          v-for="item in data?.items"
          class="grid-content"
        >
          <Item
            :desc="item.desc"
            :icon="item.icon"
            :url="item.url"
            class="item-card"
          ></Item>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Data } from '@/utils/types'
import request from '@/utils/request'
import Item from '@/components/Item.vue'
import pingUrl from '@/utils/ping'

const currentURL = ref<string>(
  window.location.origin,
)
const data = ref<Data>()
const testUrls = ref<{ [key: string]: string }>({
  Baidu: 'https://apps.bdimg.com/favicon.ico',
  Google: 'https://google.com/favicon.ico',
  Youtube: 'https://yt3.ggpht.com/favicon.ico',
  GitHub:
    'https://github.githubassets.com/favicon.ico',
  Blog: 'https://whaleluo.top',
})
const title = ref<string>('Default Title')

const testFunc = async () => {
  const promises = []
  for (let key in testUrls.value) {
    console.log(`req: ${testUrls.value[key]}`)
    const url = testUrls.value[key]
    const tag = document.querySelector(`#${key}`)
    if (!tag) continue
    const requests = Array.from(
      { length: 5 },
      async () => {
        const result = await pingUrl(
          `${url}?${Date.now()}`,
        )
        if (result) {
          tag.textContent = `${result} ms`
        }
      },
    )
    promises.push(...requests)
  }
  await Promise.all(promises)
}

const loadData = async () => {
  const config = (
    await request.get('/public/config.json')
  ).data
  data.value = config
  title.value = config.title
  document.title = config.title
}

// 挂载之后
onMounted(() => {
  loadData()
  testFunc()
})
</script>

<style scoped>
.el-header {
  background-color: aquamarine;
  text-align: center;
  line-height: 60px;
}

.el-row {
  padding: 10px 10px;
  background-color: #f9fafc;
}

.test-dashboard {
  padding: 10px 10px;
  background-color: #f9fafc;
}
.item-card {
  margin: 10px;
}
.title {
  background: linear-gradient(
    to right,
    #f00,
    #00f
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  font-size: 40px;
}
</style>
