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
      // 语言显示名称
      locales: {
        '/': {
          selectLanguageName: 'English',
          // 顶部导航栏
          navbar: [
            {
              text: 'Blog',
              link: '/blog/',
            }
          ],
        },
        '/zh/': {
          selectLanguageName: '简体中文',
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
          },

          // 顶部导航栏
          navbar: [
            {
              text: '博客',
              link: '/zh/blog/',
            }
          ],
        },
      }
    }),
  })