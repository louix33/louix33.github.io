import{_ as t,r as i,o as p,c as o,a as n,b as s,d as e,e as l}from"./app-9dfae3e9.js";const c={},u=n("h1",{id:"在-github-pages-上部署-vuepress",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#在-github-pages-上部署-vuepress","aria-hidden":"true"},"#"),s(" 在 GitHub Pages 上部署 VuePress")],-1),r={href:"https://v2.vuepress.vuejs.org/guide",target:"_blank",rel:"noopener noreferrer"},d={href:"https://docs.github.com/en/pages",target:"_blank",rel:"noopener noreferrer"},v=l(`<h2 id="写在前面" tabindex="-1"><a class="header-anchor" href="#写在前面" aria-hidden="true">#</a> 写在前面</h2><h3 id="可能需要的前置知识" tabindex="-1"><a class="header-anchor" href="#可能需要的前置知识" aria-hidden="true">#</a> 可能需要的前置知识</h3><p>本文假定您：</p><ul><li>了解 Linux 下基本的命令行操作</li><li>了解 Git 版本控制的原理和基本操作</li><li>能够正常访问 GitHub 并拥有一个 GitHub 账号</li></ul><h3 id="关于-vuepress-和-github-pages" tabindex="-1"><a class="header-anchor" href="#关于-vuepress-和-github-pages" aria-hidden="true">#</a> 关于 VuePress 和 GitHub Pages</h3><ul><li><p>VuePress 是一个以 Markdown 为中心的静态网站生成器。你可以使用 Markdown 来书写内容，然后 VuePress 会将其编译为 HTML 网页。</p></li><li><p>GitHub Pages 是一项静态站点托管服务，它直接从 GitHub 上的仓库获取 HTML、CSS 和 JavaScript 等文件，然后构建并发布网站。对于本人这种<s>写着玩的</s>个人博客而言，省去了租赁服务器和注册域名<s>以及天朝特色备案制度</s>的麻烦。</p></li></ul><h2 id="创建-github-仓库" tabindex="-1"><a class="header-anchor" href="#创建-github-仓库" aria-hidden="true">#</a> 创建 GitHub 仓库</h2><p>在 GitHub 上创建一个名为 &lt;username&gt;.github.io 的空仓库，其中 &lt;username&gt; 必须是是你的 GitHub 用户名（不是昵称！）。这样， GitHub 可以将仓库中指定分支的内容自动部署在域名 &lt;username&gt;.github.io 下。</p><h2 id="本地环境配置" tabindex="-1"><a class="header-anchor" href="#本地环境配置" aria-hidden="true">#</a> 本地环境配置</h2><p>为方便调试，需要在本地安装 Node.js 及其包管理工具（pnpm / npm / yarn），并通过包管理工具安装 VuePress。本文以 Debian Bookworm 上安装 Node.js 18、pnpm、VuePress v2.x 为例。</p><p>安装 Node.js：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 导入GPG key</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> ca-certificates <span class="token function">curl</span> gnupg
<span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/apt/keyrings
<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key <span class="token operator">|</span> <span class="token function">sudo</span> gpg <span class="token parameter variable">--dearmor</span> <span class="token parameter variable">-o</span> /etc/apt/keyrings/nodesource.gpg

<span class="token comment"># 创建deb repo</span>
<span class="token assign-left variable">NODE_MAJOR</span><span class="token operator">=</span><span class="token number">18</span> <span class="token comment"># 此处指定要安装的Node.js版本号，可以更改为其他值</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_<span class="token variable">$NODE_MAJOR</span>.x nodistro main&quot;</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/apt/sources.list.d/nodesource.list

<span class="token comment"># 安装Node.js</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> nodejs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装 pnpm 和 VuePress：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用自动脚本安装pnpm</span>
<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://get.pnpm.io/install.sh <span class="token operator">|</span> <span class="token function">sh</span> -

<span class="token comment"># 克隆远程仓库</span>
<span class="token function">git</span> clone https://github.com/<span class="token operator">&lt;</span>username<span class="token operator">&gt;</span>/<span class="token operator">&lt;</span>username<span class="token operator">&gt;</span>.github.io.git
<span class="token builtin class-name">cd</span> <span class="token operator">&lt;</span>username<span class="token operator">&gt;</span>.github.io

<span class="token function">pnpm</span> init <span class="token comment"># 初始化项目</span>
<span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> vuepress@next @vuepress/client@next vue <span class="token comment"># 将 VuePress 安装为本地依赖</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="项目配置" tabindex="-1"><a class="header-anchor" href="#项目配置" aria-hidden="true">#</a> 项目配置</h2><p>在<code>package.json</code>中添加一些 scripts：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;docs:dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress dev docs&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;docs:build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress build docs&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将默认的临时目录和缓存目录添加到<code>.gitignore</code>中，这些文件不需要版本管理：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&#39;node_modules&#39;</span> <span class="token operator">&gt;&gt;</span> .gitignore
<span class="token builtin class-name">echo</span> <span class="token string">&#39;.temp&#39;</span> <span class="token operator">&gt;&gt;</span> .gitignore
<span class="token builtin class-name">echo</span> <span class="token string">&#39;.cache&#39;</span> <span class="token operator">&gt;&gt;</span> .gitignore
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建第一篇文档：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> docs
<span class="token builtin class-name">echo</span> <span class="token string">&#39;# Hello VuePress&#39;</span> <span class="token operator">&gt;</span> docs/index.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>至此，我们搭建好了一个只有一个页面（<code>index.md</code>）的 VuePress 网站。在本地启动一个热重载的开发服务器，看看它长什么样子：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> docs:dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>开发服务器会监听本地的8080端口。在浏览器中打开 http://localhost:8080，如果一切顺利，你就可以看到刚刚创建的 &quot;Hello VuePress&quot; 页面了。你随时可以按 Ctrl+C 关闭这个服务器。</p><h2 id="部署至-github-pages" tabindex="-1"><a class="header-anchor" href="#部署至-github-pages" aria-hidden="true">#</a> 部署至 GitHub Pages</h2><p>GitHub Pages 并未内建对 VuePress 的支持，因此我们需要通过 GitHub Action 提供的 workflow 来实现自动化构建和部署。</p><h3 id="workflow-脚本" tabindex="-1"><a class="header-anchor" href="#workflow-脚本" aria-hidden="true">#</a> Workflow 脚本</h3><p>创建<code>.github/workflows/docs.yml</code>，该 YAML 文件描述了 workflow 的触发条件、触发时执行的任务和流程等。可以参考下面的示例：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> Build Docs

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token comment"># 每当 push 到 main 分支时触发部署</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>main<span class="token punctuation">]</span>
  <span class="token comment"># 手动触发部署</span>
  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build-docs</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录</span>
          <span class="token key atrule">fetch-depth</span><span class="token punctuation">:</span> <span class="token number">0</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup pnpm
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> pnpm/action<span class="token punctuation">-</span>setup@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># 选择要使用的 pnpm 版本</span>
          <span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token number">8</span>
          <span class="token comment"># 使用 pnpm 安装依赖</span>
          <span class="token key atrule">run_install</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup Node.js
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># 选择要使用的 node 版本</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token number">18</span>
          <span class="token comment"># 缓存 pnpm 依赖</span>
          <span class="token key atrule">cache</span><span class="token punctuation">:</span> pnpm

      <span class="token comment"># 运行构建脚本</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build VuePress site
        <span class="token key atrule">run</span><span class="token punctuation">:</span> pnpm docs<span class="token punctuation">:</span>build

      <span class="token comment"># 查看 workflow 的文档来获取更多信息</span>
      <span class="token comment"># @see https://github.com/crazy-max/ghaction-github-pages</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to GitHub Pages
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> crazy<span class="token punctuation">-</span>max/ghaction<span class="token punctuation">-</span>github<span class="token punctuation">-</span>pages@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># 部署到 gh-pages 分支</span>
          <span class="token key atrule">target_branch</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages
          <span class="token comment"># 部署目录为 VuePress 的默认输出目录</span>
          <span class="token key atrule">build_dir</span><span class="token punctuation">:</span> docs/.vuepress/dist
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token comment"># @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret</span>
          <span class="token key atrule">GITHUB_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每次 push 到 main 分支时，该 workflow 就会被触发（也可以手动触发）。执行的操作是：在云端配置好 VuePress 所需要的环境，再执行 VuePress 的构建操作，编译 main 分支下的 Markdown 文档；随后，将编译好的静态资源（默认在<code>docs/.vuepress/dist/</code>目录下）push 到 gh-pages 分支。</p><p>将本地修改 push 到 GitHub，你会在 GitHub 仓库的 Action 标签下看到我们创建的 workflow，名字叫做 &quot;Build Docs&quot;，并且它已经开始自动执行了！如果没有，你可以手动执行。</p><h3 id="一些仓库设置" tabindex="-1"><a class="header-anchor" href="#一些仓库设置" aria-hidden="true">#</a> 一些仓库设置</h3><p>然而事情并没有那么顺利——片刻后你可能会看见一个红色的叉号，提示你该 workflow 在执行过程中出错了。如果你仔细看报错信息，会发现是 Deploy to Github Pages 这步出错了，有类似这样的提示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>remote: Permission to louix33/louix33.github.io.git denied to github-actions[bot].
  fatal: unable to access &#39;https://github.com/louix33/louix33.github.io.git/&#39;: The requested URL returned error: 403
  Error: The process &#39;/usr/bin/git&#39; failed with exit code 128
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这说明 GitHub Action 并没有权限修改你的仓库。我们的 workflow 需要在仓库的 gh-pages 分支存放编译后的网页，因此写入权限是必要的。为此你需要前往 Settings &gt; Actions &gt; General &gt; Workflow permissions，将权限从只读改为读写。</p><p>另外，我们需要确保 Settings &gt; Pages &gt; Build and deployment 已经设置为 &quot;Deploy from a branch&quot;，并且指定 gh-pages 这个分支。</p><p>完成上面的操作后，从公网访问 &lt;username&gt;.github.io，如果能看到你之前创建的<code>index.md</code>的内容，就说明大功告成了！</p><h2 id="后记" tabindex="-1"><a class="header-anchor" href="#后记" aria-hidden="true">#</a> 后记</h2>`,38),k={href:"https://github.com/louix33/louix33.github.io",target:"_blank",rel:"noopener noreferrer"};function m(b,h){const a=i("ExternalLinkIcon");return p(),o("div",null,[u,n("p",null,[s("本文将介绍如何在 GitHub Pages 上部署 VuePress 静态网站。这也是本网站的部署方式。本文内容整理自 "),n("a",r,[s("VuePress"),e(a)]),s(" 和 "),n("a",d,[s("GitHub Pages"),e(a)]),s(" 的官方文档，并结合了一些个人经验。本人完全不了解 Vue、JavaScript 等前端技术，也希望借此了解一下相关知识。")]),v,n("p",null,[s("本网站的源代码"),n("a",k,[s("在 GitHub 上开源"),e(a)]),s("，并可作为这篇教程的参考。如有任何疑问或意见，欢迎提出 issue。")])])}const f=t(c,[["render",m],["__file","deploy-vuepress.html.vue"]]);export{f as default};
