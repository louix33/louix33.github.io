import { defineUserConfig, defaultTheme } from 'vuepress'

export default defineUserConfig({
    // site-level locales config
    locales: {
      '/': {
        lang: 'en-US',
        title: 'Louis\'s Skyhouse',
        description: 'just for fun ^_^',
      },
      '/zh/': {
        lang: 'zh-CN',
        title: '路易十三的空中小屋',
        description: 'just for fun ^_^',
      },
    },
    theme: defaultTheme({
      // 侧边索引栏
      sidebar: {
        '/zh/blog':[
          {
            text: '博客',
            children:[
              '/zh/blog/index.md',
              '/zh/blog/deploy-vuepress.md',
            ]
          }
        ]
      }
    }),
  })