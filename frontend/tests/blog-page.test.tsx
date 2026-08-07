import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import App from '../src/App'
import { BlogPage } from '../src/pages/BlogPage'
import {
  blogCategories,
  blogPosts,
  blogTopics,
  siteSections,
} from '../src/content/siteContent'

describe('blog page', () => {
  const html = renderToStaticMarkup(<BlogPage />)
  const pageTwoHtml = renderToStaticMarkup(<BlogPage initialPage={2} />)
  const pageThreeHtml = renderToStaticMarkup(<BlogPage initialPage={3} />)
  const pageFourHtml = renderToStaticMarkup(<BlogPage initialPage={4} />)
  const firstPagePosts = blogPosts.slice(0, 6)
  const secondPagePosts = blogPosts.slice(6, 12)
  const thirdPagePosts = blogPosts.slice(12, 18)
  const fourthPagePosts = blogPosts.slice(18)

  it('renders a dedicated blog index from real planning data', () => {
    expect(html).toContain('data-page="blog"')
    expect(html).toContain('aria-labelledby="blog-title"')
    expect(siteSections.blog.summary.toLowerCase()).not.toContain('mock')

    for (const post of firstPagePosts) {
      expect(html).toContain(post.title)
      expect(html).toContain(post.excerpt)
    }

    for (const post of secondPagePosts) {
      expect(html).not.toContain(post.title)
    }
  })

  it('shows categories, tags, and an accessible featured post area', () => {
    for (const category of blogCategories) {
      expect(html).toContain(`data-category="${category.id}"`)
      expect(html).toContain(category.label)
    }

    for (const post of firstPagePosts) {
      for (const tag of post.tags) {
        expect(html).toContain(tag)
      }
    }

    expect(html).toContain('aria-labelledby="featured-post-title"')
    expect(html).toContain('data-featured="true"')
  })

  it('shows software topics under the software category', () => {
    const softwareHtml = renderToStaticMarkup(<BlogPage initialFilter="software" />)

    expect(html).not.toContain('data-category="systems"')
    expect(softwareHtml).toContain('aria-label="Blog topics"')

    for (const topic of blogTopics) {
      expect(softwareHtml).toContain(`data-topic="${topic.id}"`)
      expect(softwareHtml).toContain(topic.label)
    }

    expect(softwareHtml).toContain('实习总结')
    expect(softwareHtml).toContain('Agent 架构分享')
    expect(softwareHtml).toContain('AI 工具分享')
    expect(softwareHtml).not.toContain('aria-label="Blog series"')
  })

  it('shows series only for the active software topic when that topic has series', () => {
    const aiToolsHtml = renderToStaticMarkup(
      <BlogPage initialFilter="software" initialTopic="ai-tools" />,
    )
    const internshipHtml = renderToStaticMarkup(
      <BlogPage initialFilter="software" initialTopic="internship-summary" />,
    )

    expect(aiToolsHtml).toContain('aria-label="Blog series"')
    expect(aiToolsHtml).toContain('data-series="codex-legendary-driver"')
    expect(aiToolsHtml).toContain('Codex 传奇驾驶员')
    expect(aiToolsHtml).not.toContain('data-series="agent-infrastructure"')
    expect(aiToolsHtml).not.toContain('data-series="backend-flow"')

    expect(internshipHtml).not.toContain('aria-label="Blog series"')
  })

  it('shows the Claude Agent SDK series under agent architecture', () => {
    const agentArchitectureHtml = renderToStaticMarkup(
      <BlogPage initialFilter="software" initialTopic="agent-architecture" />,
    )
    const agentArchitecturePageTwoHtml = renderToStaticMarkup(
      <BlogPage
        initialFilter="software"
        initialTopic="agent-architecture"
        initialPage={2}
      />,
    )

    expect(agentArchitectureHtml).toContain('aria-label="Blog series"')
    expect(agentArchitectureHtml).toContain('data-series="claude-agent-sdk"')
    expect(agentArchitectureHtml).toContain('Claude Agent SDK')
    expect(agentArchitectureHtml).toContain('data-series="nano-notebook-dev-log"')
    expect(agentArchitectureHtml).toContain(
      'nano-notebook 开发日志 02：可恢复、可中断的 Agent Runtime 为什么必须自研',
    )
    expect(agentArchitecturePageTwoHtml).toContain(
      'Claude Agent SDK 01：Trace 不是终点，Eval 才是',
    )
  })

  it('does not expose draft, planned, or published status filters to readers', () => {
    expect(html).not.toContain('aria-label="Blog status filters"')
    expect(html).not.toContain('Drafts')
    expect(html).not.toContain('Planned')
    expect(html).not.toContain('Published')
  })

  it('does not render a future-state placeholder when a filter has no matches', () => {
    const futureHtml = renderToStaticMarkup(<BlogPage initialFilter="future" />)

    expect(futureHtml).not.toContain('role="status"')
    expect(futureHtml).not.toContain(siteSections.blog.emptyState)
    expect(futureHtml).not.toContain('Future state')
    expect(futureHtml).not.toContain('href="/blog/hello-world"')
  })

  it('links the blog index to the readable articles', () => {
    expect(html).toContain('href="/blog/nano-notebook-dev-log-06"')
    expect(html).toContain('href="/blog/nano-notebook-dev-log-05"')
    expect(html).toContain('href="/blog/nano-notebook-dev-log-04"')
    expect(html).toContain('href="/blog/nano-notebook-dev-log-03"')
    expect(html).toContain('href="/blog/nano-notebook-dev-log-02"')
    expect(html).toContain('href="/blog/nano-notebook-dev-log-01"')
    expect(pageTwoHtml).toContain('href="/blog/codex-legendary-driver-open-source-skill-set"')
    expect(pageTwoHtml).toContain('href="/blog/internship-agent-memory-governance"')
    expect(pageTwoHtml).toContain('href="/blog/codex-legendary-driver-loop-engineering"')
    expect(pageTwoHtml).toContain('href="/blog/dokploy-lightweight-paas-deployment-tradeoffs"')
    expect(pageTwoHtml).toContain('href="/blog/claude-agent-sdk-trace-to-eval"')
    expect(pageTwoHtml).toContain('href="/blog/codex-legendary-driver-context-noise"')
    expect(pageThreeHtml).toContain('href="/blog/codex-legendary-driver-skill-workflows"')
    expect(pageThreeHtml).toContain('href="/blog/internship-daytona-agent-workspace"')
    expect(pageThreeHtml).toContain('href="/blog/obsidian-codex-ai-knowledge-base"')
    expect(pageThreeHtml).toContain('href="/blog/agent-data-flywheel-observability-seo"')
    expect(pageThreeHtml).toContain('href="/blog/internship-invite-backend-flow"')
    expect(pageThreeHtml).toContain('href="/blog/internship-stripe-payment-backend-flow"')
    expect(pageFourHtml).toContain('href="/blog/multica-local-agent-workflow"')
    expect(pageFourHtml).toContain('href="/blog/internship-agent-infrastructure-notes"')
    expect(pageFourHtml).toContain('href="/blog/hello-world"')
    expect(html).toContain('Read article')
    expect(blogPosts[0].title).toBe(
      'nano-notebook 开发日志 06：Prometheus + Grafana，让 Agent 项目从“跑通”变成“可运维”',
    )
    expect(blogPosts[0].status).toBe('published')
  })

  it('paginates the blog index in groups of six posts', () => {
    expect(html).toContain('aria-label="Blog pagination"')
    expect(html).toContain('Page 1 of 4')
    expect(html).toContain('aria-current="page"')
    expect(html).toContain('data-page-button="1"')
    expect(html).toContain('data-page-button="2"')
    expect(html).toContain('data-page-button="3"')
    expect(html).toContain('data-page-button="4"')
    expect(html).toContain('Next')
    expect(html).not.toContain('Previous')

    for (const post of firstPagePosts) {
      expect(html).toContain(post.title)
    }

    for (const post of secondPagePosts) {
      expect(pageTwoHtml).toContain(post.title)
    }

    for (const post of thirdPagePosts) {
      expect(pageThreeHtml).toContain(post.title)
    }

    for (const post of fourthPagePosts) {
      expect(pageFourHtml).toContain(post.title)
    }

    expect(pageTwoHtml).toContain('Page 2 of 4')
    expect(pageTwoHtml).toContain('Previous')
    expect(pageTwoHtml).toContain('Next')
    expect(pageThreeHtml).toContain('Page 3 of 4')
    expect(pageThreeHtml).toContain('Previous')
    expect(pageThreeHtml).toContain('Next')
    expect(pageFourHtml).toContain('Page 4 of 4')
    expect(pageFourHtml).toContain('Previous')
    expect(pageFourHtml).not.toContain('Next')
  })

  it('hides pagination when the active category fits on one page', () => {
    const notesHtml = renderToStaticMarkup(<BlogPage initialFilter="notes" />)

    expect(notesHtml).not.toContain('aria-label="Blog pagination"')
    expect(notesHtml).toContain('Hello World')
  })

  it('filters the blog index by series', () => {
    const codexSeriesHtml = renderToStaticMarkup(
      <BlogPage
        initialFilter="software"
        initialTopic="ai-tools"
        initialSeries="codex-legendary-driver"
      />,
    )

    expect(codexSeriesHtml).toContain('Codex 传奇驾驶员')
    expect(codexSeriesHtml).toContain('Codex 传奇驾驶员 04：我把自己的 Skill Set 开源了')
    expect(codexSeriesHtml).toContain(
      'Codex 传奇驾驶员 03：Loop Engineering，让 Agent 在无人盯守时工作',
    )
    expect(codexSeriesHtml).toContain('Codex 传奇驾驶员 02：减少噪音，别把上下文当垃圾桶')
    expect(codexSeriesHtml).toContain('Codex 传奇驾驶员 01：Skill 是把好用的工作流复用起来')
    expect(codexSeriesHtml).toContain('不要只和 AI 聊天：我是怎么用 Obsidian + Codex 建知识库的')
    expect(codexSeriesHtml).toContain('Multica：把本地 AI Coding Agent 变成可管理的长任务')
    expect(codexSeriesHtml).not.toContain('实习项目里用到 Daytona 后，我重新理解了 agent sandbox')
    expect(codexSeriesHtml).not.toContain('aria-label="Blog pagination"')
  })

  it('keeps the published blog articles in blog data', () => {
    expect(blogPosts.map((post) => post.slug)).toEqual([
      'nano-notebook-dev-log-06',
      'nano-notebook-dev-log-05',
      'nano-notebook-dev-log-04',
      'nano-notebook-dev-log-03',
      'nano-notebook-dev-log-02',
      'nano-notebook-dev-log-01',
      'codex-legendary-driver-open-source-skill-set',
      'internship-agent-memory-governance',
      'codex-legendary-driver-loop-engineering',
      'dokploy-lightweight-paas-deployment-tradeoffs',
      'claude-agent-sdk-trace-to-eval',
      'codex-legendary-driver-context-noise',
      'codex-legendary-driver-skill-workflows',
      'internship-daytona-agent-workspace',
      'obsidian-codex-ai-knowledge-base',
      'agent-data-flywheel-observability-seo',
      'internship-invite-backend-flow',
      'internship-stripe-payment-backend-flow',
      'multica-local-agent-workflow',
      'internship-agent-infrastructure-notes',
      'hello-world',
    ])
    expect(html).not.toContain('Bachelor and Postgraduate Study')
    expect(html).not.toContain('Software Engineering Notes')
    expect(html).not.toContain('Fitness, Films, and Fun')
    expect(html).not.toContain('Work in Progress')
  })

  it('renders the nano-notebook dev log article as a readable page', () => {
    const articleHtml = renderToStaticMarkup(
      <App initialPath="/blog/nano-notebook-dev-log-01" />,
    )

    expect(articleHtml).toContain('data-page="blog-post"')
    expect(articleHtml).toContain('nano-notebook 开发日志 01：我为什么做一个自己的 NotebookLM')
    expect(articleHtml).toContain('PostgreSQL 和 S3 是真相来源')
    expect(articleHtml).toContain('Back to blog')
  })

  it('renders the nano-notebook dev log 02 article as a readable page', () => {
    const articleHtml = renderToStaticMarkup(
      <App initialPath="/blog/nano-notebook-dev-log-02" />,
    )

    expect(articleHtml).toContain('data-page="blog-post"')
    expect(articleHtml).toContain(
      'nano-notebook 开发日志 02：可恢复、可中断的 Agent Runtime 为什么必须自研',
    )
    expect(articleHtml).toContain('可恢复')
    expect(articleHtml).toContain('LangGraph')
    expect(articleHtml).toContain('Publication Barrier')
    expect(articleHtml).toContain('Back to blog')
  })

  it('renders the nano-notebook dev log 03 article as a readable page', () => {
    const articleHtml = renderToStaticMarkup(
      <App initialPath="/blog/nano-notebook-dev-log-03" />,
    )

    expect(articleHtml).toContain('data-page="blog-post"')
    expect(articleHtml).toContain(
      'nano-notebook 开发日志 03：Trace 链路建模、Observability SDK 与 Dashboard 设计',
    )
    expect(articleHtml).toContain('Durable Agent Trace')
    expect(articleHtml).toContain('obs_trace_records')
    expect(articleHtml).toContain('canonical hash')
    expect(articleHtml).toContain('Back to blog')
  })

  it('renders the nano-notebook dev log 04 article as a readable page', () => {
    const articleHtml = renderToStaticMarkup(
      <App initialPath="/blog/nano-notebook-dev-log-04" />,
    )

    expect(articleHtml).toContain('data-page="blog-post"')
    expect(articleHtml).toContain(
      'nano-notebook 开发日志 04：RAG 全流程、混合检索与离线评测',
    )
    expect(articleHtml).toContain('为什么要用 RAG')
    expect(articleHtml).toContain('RRF')
    expect(articleHtml).toContain('先拿引用')
    expect(articleHtml).toContain('Back to blog')
  })

  it('renders the nano-notebook dev log 05 article as a readable page', () => {
    const articleHtml = renderToStaticMarkup(
      <App initialPath="/blog/nano-notebook-dev-log-05" />,
    )

    expect(articleHtml).toContain('data-page="blog-post"')
    expect(articleHtml).toContain(
      'nano-notebook 开发日志 05：给知识库装上受控工具：MCP Tool Plane、权限与编排',
    )
    expect(articleHtml).toContain('模型提议，系统审批执行')
    expect(articleHtml).toContain('search_evidence')
    expect(articleHtml).toContain('ToolCallError')
    expect(articleHtml).toContain('Claude Code')
    expect(articleHtml).toContain('Back to blog')
  })

  it('renders the nano-notebook dev log 06 article as a readable page', () => {
    const articleHtml = renderToStaticMarkup(
      <App initialPath="/blog/nano-notebook-dev-log-06" />,
    )

    expect(articleHtml).toContain('data-page="blog-post"')
    expect(articleHtml).toContain(
      'nano-notebook 开发日志 06：Prometheus + Grafana，让 Agent 项目从“跑通”变成“可运维”',
    )
    expect(articleHtml).toContain('nano_task_terminal_total')
    expect(articleHtml).toContain('go_gc_heap_live_bytes')
    expect(articleHtml).toContain('histogram_quantile')
    expect(articleHtml).toContain('Back to blog')
  })

  it('renders the Dokploy deployment selection article as a readable page', () => {
    const articleHtml = renderToStaticMarkup(
      <App initialPath="/blog/dokploy-lightweight-paas-deployment-tradeoffs" />,
    )

    expect(articleHtml).toContain('data-page="blog-post"')
    expect(articleHtml).toContain('Dokploy：实习中接触到的轻量 PaaS 技术选型思路')
    expect(articleHtml).toContain('GitHub Actions 负责 CI 和制品生产')
    expect(articleHtml).toContain('环境变量不是密钥保险箱')
    expect(articleHtml).toContain('Dokploy Applications')
    expect(articleHtml).toContain(
      'href="https://docs.dokploy.com/docs/core/applications"',
    )
    expect(articleHtml).toContain(
      'href="https://docs.github.com/en/actions/tutorials/publish-packages/publish-docker-images"',
    )
    expect(articleHtml).toContain('Back to blog')
  })

  it('renders markdown reference links as clickable anchors', () => {
    const articleHtml = renderToStaticMarkup(
      <App initialPath="/blog/agent-data-flywheel-observability-seo" />,
    )

    expect(articleHtml).toContain(
      'href="https://zylos.ai/research/2026-04-16-ai-agent-data-flywheels-production-feedback-loops"',
    )
    expect(articleHtml).toContain(
      'AI Agent Data Flywheels: Closing the Loop Between Production Deployments and Model Improvement',
    )
    expect(articleHtml).not.toContain(
      '[AI Agent Data Flywheels: Closing the Loop Between Production Deployments and Model Improvement]',
    )
  })

  it('renders the Codex context noise article as a readable page', () => {
    const articleHtml = renderToStaticMarkup(
      <App initialPath="/blog/codex-legendary-driver-context-noise" />,
    )

    expect(articleHtml).toContain('data-page="blog-post"')
    expect(articleHtml).toContain('Codex 传奇驾驶员 02：减少噪音，别把上下文当垃圾桶')
    expect(articleHtml).toContain('tool search')
    expect(articleHtml).toContain('55k tokens')
    expect(articleHtml).toContain('85%')
    expect(articleHtml).toContain('write、select、compress、isolate')
    expect(articleHtml).toContain('https://openai.github.io/openai-agents-python/context/')
    expect(articleHtml).toContain('Back to blog')
  })

  it('renders the Claude Agent SDK trace article as a readable page', () => {
    const articleHtml = renderToStaticMarkup(
      <App initialPath="/blog/claude-agent-sdk-trace-to-eval" />,
    )

    expect(articleHtml).toContain('data-page="blog-post"')
    expect(articleHtml).toContain('Claude Agent SDK 01：Trace 不是终点，Eval 才是')
    expect(articleHtml).toContain('claude_code.interaction')
    expect(articleHtml).toContain('线上 trace 发现问题')
    expect(articleHtml).toContain('OpenTelemetry')
    expect(articleHtml).toContain('LangSmith Evaluation')
    expect(articleHtml).toContain('Back to blog')
  })

  it('renders the Codex skill workflows article as a readable page', () => {
    const articleHtml = renderToStaticMarkup(
      <App initialPath="/blog/codex-legendary-driver-skill-workflows" />,
    )

    expect(articleHtml).toContain('data-page="blog-post"')
    expect(articleHtml).toContain('Codex 传奇驾驶员 01：Skill 是把好用的工作流复用起来')
    expect(articleHtml).toContain('skill-creator')
    expect(articleHtml).toContain('brainstorming')
    expect(articleHtml).toContain('planning-with-files')
    expect(articleHtml).toContain('grill-me')
    expect(articleHtml).toContain('Superpower 全家桶')
    expect(articleHtml).toContain('https://developers.openai.com/codex/skills')
    expect(articleHtml).toContain('Back to blog')
  })

  it('renders the Hello World article as a readable page', () => {
    const articleHtml = renderToStaticMarkup(<App initialPath="/blog/hello-world" />)

    expect(articleHtml).toContain('data-page="blog-post"')
    expect(articleHtml).toContain('Hello World')
    expect(articleHtml).toContain('hello world')
    expect(articleHtml).toContain('这是 ai 发布的内容')
    expect(articleHtml).toContain('Back to blog')
  })

  it('renders the Daytona agent workspace article as a readable page', () => {
    const articleHtml = renderToStaticMarkup(
      <App initialPath="/blog/internship-daytona-agent-workspace" />,
    )

    expect(articleHtml).toContain('data-page="blog-post"')
    expect(articleHtml).toContain('实习项目里用到 Daytona 后，我重新理解了 agent sandbox')
    expect(articleHtml).toContain('agent workspace')
    expect(articleHtml).toContain('状态恢复')
    expect(articleHtml).toContain('sandbox tenant')
    expect(articleHtml).toContain('Daytona 官方文档')
    expect(articleHtml).toContain('Back to blog')
  })

  it('renders the internship Agent Infrastructure article as a readable page', () => {
    const articleHtml = renderToStaticMarkup(
      <App initialPath="/blog/internship-agent-infrastructure-notes" />,
    )

    expect(articleHtml).toContain('data-page="blog-post"')
    expect(articleHtml).toContain('实习记录：做 AI Agent Infrastructure 的阶段小结')
    expect(articleHtml).toContain('Agent Infrastructure')
    expect(articleHtml).toContain('Vibe Coding')
    expect(articleHtml).not.toContain('上海食物主义')
    expect(articleHtml).toContain('Back to blog')
  })

  it('renders the Multica local agent workflow article as a readable page', () => {
    const articleHtml = renderToStaticMarkup(
      <App initialPath="/blog/multica-local-agent-workflow" />,
    )

    expect(articleHtml).toContain('data-page="blog-post"')
    expect(articleHtml).toContain('Multica：把本地 AI Coding Agent 变成可管理的长任务')
    expect(articleHtml).toContain('WSL')
    expect(articleHtml).toContain('multica daemon start')
    expect(articleHtml).toContain('Yuniverse')
    expect(articleHtml).toContain('指挥官')
    expect(articleHtml).toContain('一边实习')
    expect(articleHtml).toContain('连接远程机器')
    expect(articleHtml).toContain('delegate 给远程 agent')
    expect(articleHtml).toContain('运维和排障场景')
    expect(articleHtml).toContain('权限管理')
    expect(articleHtml).not.toContain('cd ~/code/yuniverse/frontend')
    expect(articleHtml).not.toContain('git push origin main:master')
  })

  it('renders markdown-style command blocks in technical blog posts', () => {
    const articleHtml = renderToStaticMarkup(
      <App initialPath="/blog/multica-local-agent-workflow" />,
    )

    expect(articleHtml).toContain('<h3>WSL 下的本地流程</h3>')
    expect(articleHtml).toContain('<pre class="blog-code-block"')
    expect(articleHtml).toContain('<code class="language-bash">')
    expect(articleHtml).toContain('multica issue create --title &quot;Build a personal website&quot;')
    expect(articleHtml).toContain('multica issue run-messages')
  })

  it('renders markdown images and source links in blog posts', () => {
    const articleHtml = renderToStaticMarkup(
      <App initialPath="/blog/codex-legendary-driver-open-source-skill-set" />,
    )

    expect(articleHtml).toContain('<h3>Source</h3>')
    expect(articleHtml).toContain(
      'href="https://github.com/huangxinxinyu/xinyu-s-skill-set"',
    )
    expect(articleHtml).toContain(
      'src="/images/blog/xinyu-s-skill-set-repo.png"',
    )
    expect(articleHtml).toContain('class="blog-image-block"')
  })
})
