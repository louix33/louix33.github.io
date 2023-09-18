import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
    // site-level locales config
    locales: {
      '/': {
        lang: 'en-US',
        title: 'Louis\'s Skyhouse',
        description: 'Vacant',
      },
      '/zh/': {
        lang: 'zh-CN',
        title: '路易十三的空中小屋',
        description: 'Vacant',
      },
    },
  })