<template>
  <el-card shadow="hover">
    <template #header>
      <el-button
        :type="state"
        size="large"
        @click="openWebsiteInNewTab()"
      >
        <b>{{ props.desc }}</b>
      </el-button>
    </template>
    delay 延迟:
    <el-text tag="b">{{ delay }}</el-text>

    <el-link
      type="primary"
      :href="url"
      target="_blank"
      style="display: block"
    >
      {{ url }}
    </el-link>
  </el-card>
</template>
<script setup lang="ts">
import { ItemData } from '@/utils/types'
import pingUrl from '@/utils/ping'

const props = defineProps<ItemData>()

const url = ref<string>()
const delay = ref<string>('ms')
const state = ref<string>('success')

if (isHttpOrHttps(props.url)) {
  url.value = props.url
} else {
  url.value = appendToDomain(props.url)
}

function isHttpOrHttps(url: string) {
  return (
    url.startsWith('http://') ||
    url.startsWith('https://')
  )
}
function appendToDomain(str: string) {
  const currentUrl = window.location.href
  const domain = currentUrl.substr(
    0,
    currentUrl.indexOf(
      '/',
      currentUrl.indexOf('//') + 2,
    ),
  )

  if (str.startsWith('/')) {
    return domain + str
  } else if (str.startsWith(':')) {
    const hostname = window.location.hostname
    return (
      window.location.protocol +
      '//' +
      hostname +
      str
    )
  } else {
    return domain + '/' + str
  }
}

const testDelay = async (url: string) => {
  for (let i = 0; i <= 10; i++) {
    const result = await pingUrl(url)
    delay.value = result + 'ms'
    if (result.toString().includes('Error')) {
      state.value = 'danger'
    }
  }
}

testDelay(url.value)

function openWebsiteInNewTab() {
  window.open(url.value, '_blank')
}
</script>

<style scoped></style>
