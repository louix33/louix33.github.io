import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
    // site-level locales config
    locales: {
      '/': {
        lang: 'en-US',
        title: 'Louis\' Blog',
        description: 'Louis\' Blog',
      },
      '/en/': {
        lang: 'en-US',
        title: 'Louis\' Blog',
        description: 'Louis\' Blog',
      },
      '/zh/': {
        lang: 'zh-CN',
        title: 'Louis的博客',
        description: 'Louis的博客',
      },
    },
  })