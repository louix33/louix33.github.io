# 在GitHub Pages上部署VuePress

作为本人博客的第一篇文章，本文将介绍如何在 GitHub Pages 上部署 VuePress 静态网站。这也是本网站的部署方式。本文内容整理自 [VuePress](https://v2.vuepress.vuejs.org/guide/) 和 [GitHub Pages](https://docs.github.com/en/pages) 的官方文档，并结合了一些个人经验。本人完全不了解 Vue、JavaScript 等前端技术，也希望借此了解一下相关知识。

## 写在前面

### 可能需要的前置知识

本文假定您：

- 了解 Linux 下基本的命令行操作
- 了解 Git 版本控制的原理和基本操作
- 能够正常访问 GitHub 并拥有一个 GitHub 账号

### 关于 VuePress 和 GitHub Pages

- VuePress 是一个以 Markdown 为中心的静态网站生成器。你可以使用 Markdown 来书写内容，然后 VuePress 会将其编译为 HTML 网页。

- GitHub Pages 是一项静态站点托管服务，它直接从 GitHub 上的仓库获取 HTML、CSS 和 JavaScript 等文件，然后构建并发布网站。对于本人这种~~写着玩的~~个人博客而言，省去了租赁服务器和注册域名~~以及天朝特色备案制度~~的麻烦。

## 创建 GitHub 仓库

在 GitHub 上创建一个名为 \<username\>.github.io 的空仓库，其中 \<username\> 必须是是你的 GitHub 用户名（不是昵称！）。这样， GitHub 可以将仓库中指定分支的内容自动部署在域名 \<username\>.github.io 下。

## 本地环境配置

为方便调试，需要在本地安装 Node.js 及其包管理工具（pnpm / npm / yarn），并通过包管理工具安装 VuePress。本文以 Debian Bookworm 上安装 Node.js 18、pnpm、VuePress v2.x 为例。

安装Node.js：

```sh
# 导入GPG key
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

# 创建deb repo
NODE_MAJOR=18 # 此处指定要安装的Node.js版本号，可以更改为其他值
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

# 安装Node.js
sudo apt-get update
sudo apt-get install nodejs
```

安装 pnpm 和 VuePress：

```sh
# 使用自动脚本安装pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -

# 克隆远程仓库
git clone https://github.com/<username>/<username>.github.io.git
cd <username>.github.io

pnpm init # 初始化项目
pnpm add -D vuepress@next @vuepress/client@next vue # 将 VuePress 安装为本地依赖
```



## 项目配置

在`package.json`中添加一些 scripts：

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

将默认的临时目录和缓存目录添加到`.gitignore`中，这些文件不需要版本管理：

```sh
echo 'node_modules' >> .gitignore
echo '.temp' >> .gitignore
echo '.cache' >> .gitignore
```

创建第一篇文档：

```sh
mkdir docs
echo '# Hello VuePress' > docs/index.md
```

至此，我们搭建好了一个只有一个页面（即上面创建的`index.md`）的 VuePress 网站。在本地启动一个热重载的开发服务器，看看它长什么样子：

```sh
pnpm docs:dev
```

开发服务器会监听本地的8080端口。在浏览器中打开 http://localhost:8080，如果一切顺利，你就可以看到刚刚创建的 "Hello VuePress" 页面了。你随时可以按 Ctrl+C 关闭这个服务器。

## 部署至GitHub Pages

GitHub Pages 并未内建对 VuePress 的支持，因此我们需要通过 GitHub Action 提供的 workflow 来实现自动化构建和部署。

### Workflow脚本

创建`.github/workflows/docs.yml`，该 YAML 文件描述了 workflow 的触发条件、触发时执行的任务和流程等。可以参考下面的示例：

```yaml
name: Build Docs

on:
  # 每当 push 到 main 分支时触发部署
  push:
    branches: [main]
  # 手动触发部署
  workflow_dispatch:

jobs:
  build-docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          # 选择要使用的 pnpm 版本
          version: 8
          # 使用 pnpm 安装依赖
          run_install: true

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          # 选择要使用的 node 版本
          node-version: 18
          # 缓存 pnpm 依赖
          cache: pnpm

      # 运行构建脚本
      - name: Build VuePress site
        run: pnpm docs:build

      # 查看 workflow 的文档来获取更多信息
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v2
        with:
          # 部署到 gh-pages 分支
          target_branch: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          build_dir: docs/.vuepress/dist
        env:
          # @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

每次 push 到 main 分支时，该 workflow 就会被触发（也可以手动触发）。执行的操作是：在云端配置好 VuePress 所需要的环境，再执行 VuePress 的构建操作，编译 main 分支下的 Markdown 文档；随后，将编译好的静态资源（默认在`docs/.vuepress/dist`目录下）push到 gh-pages 分支。

将本地修改 push 到 GitHub，你会在 GitHub 仓库的 Action 标签下看到我们创建的 workflow，名字叫做 "Build Docs"，并且它已经开始自动执行了！如果没有，你可以手动执行。

### 一些仓库设置

然而事情并没有那么顺利——片刻后你可能会看见一个红色的叉号，提示你该 workflow 在执行过程中出错了。如果你仔细看报错信息，会发现是 Deploy to Github Pages 这步出错了，有类似这样的提示：

```
remote: Permission to louix33/louix33.github.io.git denied to github-actions[bot].
  fatal: unable to access 'https://github.com/louix33/louix33.github.io.git/': The requested URL returned error: 403
  Error: The process '/usr/bin/git' failed with exit code 128
```

这说明 GitHub Action 并没有权限修改你的仓库。我们的 workflow 需要在仓库的 gh-pages 分支存放编译后的网页，因此写入权限是必要的。为此你需要前往 Settings > Actions > General > Workflow permissions，将权限从只读改为读写。

另外，我们需要确保 Settings > Pages > Build and deployment 已经设置为 "Deploy from a branch"，并且指定 gh-pages 这个分支。

完成上面的操作后，公网访问 \<username\>.github.io，如果能看到你之前创建的`index.md`的内容，就说明大功告成了！

## 后记

本网站的源代码[在 GitHub 上开源](https://github.com/louix33/louix33.github.io)，并可作为这篇教程的参考。

如有任何疑问或意见，欢迎提出 issue 或联系 louixliu@outlook.com。
