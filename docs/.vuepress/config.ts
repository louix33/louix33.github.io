import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
    // site-level locales config
    locales: {
      '/': {
        lang: 'en-US',
        title: 'Louis\' Blog',
        description: 'Louis\' Blog',
      },
      '/zh/': {
        lang: 'zh-CN',
        title: '路易十三的博客',
        description: '路易十三的博客',
      },
    },
  })