import type { BlogPost } from '../../data/types'

export const nanoNotebookDevLog08 = {
  slug: 'nano-notebook-dev-log-08',
  title: 'nano-notebook 开发日志 08：日志为什么从 PostgreSQL 走向 Kafka + ClickHouse',
  date: '2026-09-18',
  excerpt:
    '一次线上测试中的查询变慢，让我重新划分了产品状态与观测数据的边界。这篇记录 nano-notebook 为什么保留 PostgreSQL，又将日志和 Trace 经 Kafka 送入 ClickHouse。',
  content: [
    '一开始，nano-notebook 的产品状态和日志都放在 PostgreSQL 里。这个选择很自然：项目早期的数据量有限，Trace 需要和 Run、Job、Checkpoint 一起看，直接查数据库就能定位一次 Agent 执行发生了什么。',
    '一次线上测试里，查询开始变慢。我当时已经知道日志写入的并发量很高，但这次现象把问题放到了台面上：产品业务状态和观测数据正在共用同一套读写资源。',
    '## PostgreSQL 继续负责产品状态',
    'PostgreSQL 适合保存产品里的核心状态。Run 是否完成、Job 是否重试、Checkpoint 是否已经写入，这些数据会更新，也需要事务、约束、关联查询和准确的单条读取。',
    '这类数据的量通常可控，但正确性要求很高。一次状态更新要么成功，要么失败，不能留下半条记录。PostgreSQL 的事务能力正好服务于这部分需求。',
    '日志和 Trace 的形态不同。它们从 Agent 运行中持续产生，写入后基本不再修改。后续查询通常按时间范围筛选，再看某个 Agent、工具或模型的调用情况，统计错误率、耗时和调用次数。很多查询只需要读取少数几个字段，却要覆盖大量历史记录。',
    '把这两种数据放在一起，PostgreSQL 同时承担了事务型业务负载和持续追加的观测负载。线上测试里的查询变慢，说明这条边界需要重新划分。',
    '## ClickHouse 更贴近日志的读写方式',
    '日志和 Trace 适合追加写入，也适合按时间做过滤和聚合。ClickHouse 的列式存储正好服务这类访问方式：分析查询只读取需要的列，压缩效率更高，大范围聚合也更直接。',
    '因此，迁移的范围不是把整个系统从 PostgreSQL 搬走。产品状态仍然留在 PostgreSQL，日志和 Trace 则进入 ClickHouse，负责后续的检索和分析。',
    '```text\n产品业务状态 ──────────> PostgreSQL\nAgent 日志 / Trace → Kafka → ClickHouse\n```',
    '这样的拆分也让两类查询各自回到合适的存储系统。产品侧继续做状态读取和更新；观测侧按时间、类型和维度分析 Agent 的运行情况。',
    '## Kafka 把写入从业务链路中拆开',
    '只把日志目标换成 ClickHouse 还不够。业务请求如果直接等待 ClickHouse 写入，存储侧短暂变慢时，影响还是会传回 Agent 的执行链路。',
    'Kafka 放在中间后，业务侧只负责把日志事件交给统一的投递层。下游消费者再异步写入 ClickHouse。高峰流量可以先进入缓冲，ClickHouse 恢复后继续处理；之后增加告警、成本分析或离线评测，也可以在 Kafka 后面新增消费者。',
    '日志可能会有短暂的可见延迟，但这不影响产品状态和 Agent 任务本身的正确性。',
    '## 在原有代码上少改一点',
    '这次调整没有让 Kafka 或 ClickHouse 的代码进入每个 Agent、Tool 和业务接口。业务代码仍按原来的方式记录 Trace，只依赖统一的记录接口。',
    '改动集中在数据出口。原来由 PostgreSQL 直接承接的日志写入，被替换成可扩展的投递层；Trace 的领域结构和业务侧调用方式保持稳定。Kafka 负责交付，ClickHouse 负责存储和分析。',
    '这条链路后来还可以继续增加能力，但业务代码不需要跟着每次存储变化重写。对我来说，迁移最重要的收获不是增加了两个组件，而是把产品状态和观测数据放回了各自合适的位置。',
  ],
  aiDisclosure:
    '本文由 AI 协助整理表达；技术选型和项目事实来自 nano-notebook 的现有设计与实现。',
  readingMinutes: 4,
  category: 'software',
  topic: 'agent-architecture',
  series: 'nano-notebook-dev-log',
  tags: ['nano-notebook', 'PostgreSQL', 'Kafka', 'ClickHouse', 'Observability'],
  status: 'published',
} satisfies BlogPost
