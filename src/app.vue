<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import { qiniu, script } from 'env'

  export default {
    name: 'Entry',
    head: {
      title: '天下漫友是一家',
      titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - calibur` : '天下漫友是一家 - calibur'
      },
      htmlAttrs: {
        lang: 'zh-CN'
      },
      bodyAttrs: '',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
        { name: 'force-rendering', content: 'webkit' },
        { hid: 'description', name: 'description', content: '一个兴趣使然的二次元综合网站' },
        { hid: 'keywords', name: 'keywords', content: 'calibur，咖喱棒, 动漫，ACG，二次元，视频，番剧，动画，新番，神作, 排行榜, 贴吧, 盖楼, 应援, 帖子, 在线' }
      ],
      link: [
        { rel: 'shortcut icon', type: 'image/x-icon', href: `${qiniu.host}/favicon.ico` }
      ],
      script: [
        { innerHTML: script.baiduStat, type: 'text/javascript' },
        { innerHTML: script.baiduPush, type: 'text/javascript' }
      ],
      __dangerouslyDisableSanitizers: 'script'
    },
    mounted () {
      if (this.$store.state.login) {
        setInterval(() => {
          this.$store.dispatch('getNotification', this)
        }, 60000)
        this.$cookie.set('JWT-TOKEN', this.$store.state.user.token)
      }
    }
  }
</script>
