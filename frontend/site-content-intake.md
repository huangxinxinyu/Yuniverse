# 个人网站文字补全清单

日期：2026-05-11

这份文件只处理文字信息。图片、真实照片、封面图、作品截图、音乐/电影海报等素材先不收集，等文字定稿后再单独处理。

## 当前结论

这个网站现在已经有完整页面结构，但内容仍以 mock / placeholder / fictional / invented 文案为主。README 也明确写着：当前 profile、project、notes、contact copy 都是 mock content。

主要需要替换的代码位置：

- `src/data/content.ts`：基础个人信息、作品、人生时间线、博客、音乐、电影、图片条目。
- `src/content/siteContent.ts`：首页 hero、About 详细页、各 section 的标题/摘要/说明、博客分类、Collection 文案。
- 测试里还有对 mock 文案的断言，真正替换内容后需要同步更新：`tests/about-page.test.tsx`、`src/data/siteContent.test.ts`。

## 参考截图

下面截图是这次审阅时从本地站点重新截的，用来标记“我想改的是哪一屏”。

### 首页

![首页桌面](output/playwright/content-audit-home-desktop.png)

![首页移动端](output/playwright/content-audit-home-mobile.png)

### About

![About 桌面](output/playwright/content-audit-about-desktop.png)

![About 移动端](output/playwright/content-audit-about-mobile.png)

### Work

![Work 桌面](output/playwright/content-audit-work-desktop.png)

### Life

![Life 桌面](output/playwright/content-audit-life-desktop.png)

### Blog

![Blog 桌面](output/playwright/content-audit-blog-desktop.png)

### Collection

![Collection 桌面](output/playwright/content-audit-collection-desktop.png)

## 页面文字缺口

### 首页

当前问题：首页第一屏有真实姓名 `黄新宇`，但其他句子仍是 mock personal site。需要确认真实姓名/品牌、首页一句话、当前身份、关注方向、按钮文案和右侧状态信号。

### About

当前问题：这一页最明显，直接显示 `Identity page / mock content`、`Intro placeholder`、`Values and interests placeholder`、`Craft and tools placeholder`。需要真实自我介绍、经历主线、价值观、工具栈和公开边界。

### Work

当前问题：所有项目都是虚构的，例如 `Studio Console`、`Memory Atlas`、`Signal Notebook`。需要 3 个左右真实项目，或 3 个可公开描述的项目类型。

### Life

当前问题：时间线是虚构生活笔记，例如 `Opened the first lab notebook`、`Imagined city routes`。可以换成公开安全的成长线、阶段节点或 Now/Log。

### Blog

当前问题：博客文章标题、摘要和状态都是 mock。需要确认是否保留 Blog，以及真实文章/计划主题。

### Collection

当前问题：音乐、电影、图片都是虚构条目。图片素材暂时不需要，只需要先确认栏目是否保留，以及真实条目的文字。

### 导航

当前路由是 `/`、`/about`、`/work`、`/life`、`/blog`、`/collection`。需要确认栏目是否保留、是否新增 Contact、导航语言用中文还是英文。

## 我建议的优先级

先不要一次性写完整网站。建议按这个顺序给我：

1. 首页身份信息和一句话定位。
2. About 的短版/长版自我介绍。
3. 3 个真实 Work 项目。
4. Blog 是否保留以及 3 个真实文章主题。
5. Life 和 Collection 是否保留。

有了这些文字后，我再把代码里的 mock content 替换成真实内容，并同步调整测试。图片素材、视觉风格和版式优化放到下一轮。

## 你在这里补充

### 1. 网站身份和语气

中文名：黄新宇

英文名：Xinyu 但是觉得不需要涵盖

昵称：

个人品牌/网站名：Yuniverse

语言策略：简约

公开身份定位：学生/软件开发工程师

希望别人看完首页记住的一句话：有创造力，温暖，有趣，或者也可以是介绍这个网站的一句话，介绍Yuniverse和宇宙的这个idea

希望别人联系你的原因：工作机会/交友

公开联系方式：电话：13567277836，github：https://github.com/huangxinxinyu， 微信号：XinyuHimself，邮箱：xinyuhimself@gmail.com

公开所在地：目前在上海实习，之后会去UCSD念书

不希望公开的信息：

### 2. 首页 Hero

顶部小字 eyebrow：

主标题：

副标题/hero 文案：

主按钮文案：

次按钮文案：

右侧信号 1：

右侧信号 2：

右侧信号 3：

希望访客优先点击哪里：

### 3. About 页面

短版自我介绍：我本科在悉尼大学软件工程专业，研究生在UCSD ECE

长版自我介绍：

经历主线：

坐标 1：浙江省湖州市递铺第三小学

坐标 2：杭州英特外国语学校（初中高中都是）

坐标 3：就是悉尼和SD了

价值观/原则 1：

价值观/原则 2：

价值观/原则 3：

价值观/原则 4：

价值观/原则 5：

真实技术栈/工具栈：我觉得可以简单介绍下我做软件开发工程就行，可以加个跳转到具体的工作页面，不用太详细

希望保留的个人兴趣维度：唱跳rap篮球/健身/电影

About 页面不要写的内容：

我暂时就写到这里

### 4. Work 项目

项目 1 名称：

项目 1 时间范围：

项目 1 角色：

项目 1 一句话摘要：

项目 1 具体工作：

项目 1 技术栈：

项目 1 结果/影响：

项目 1 当前状态：

项目 1 链接/截图是否可公开：

项目 1 不能公开的细节：

项目 2 名称：

项目 2 时间范围：

项目 2 角色：

项目 2 一句话摘要：

项目 2 具体工作：

项目 2 技术栈：

项目 2 结果/影响：

项目 2 当前状态：

项目 2 链接/截图是否可公开：

项目 2 不能公开的细节：

项目 3 名称：

项目 3 时间范围：

项目 3 角色：

项目 3 一句话摘要：

项目 3 具体工作：

项目 3 技术栈：

项目 3 结果/影响：

项目 3 当前状态：

项目 3 链接/截图是否可公开：

项目 3 不能公开的细节：

### 5. Life / Timeline

是否保留 Life 页面：

如果不保留，想改成什么：

节点 1：

节点 2：

节点 3：

节点 4：

节点 5：

节点 6：

### 6. Blog / Writing

是否保留 Blog：

如果不保留，想改成什么：

分类是否使用中文：

分类列表：

置顶文章：

文章/主题 1：

文章/主题 2：

文章/主题 3：

文章/主题 4：

文章/主题 5：

### 7. Collection

是否保留 Collection：

如果不保留，想改成什么：

Collection 的目的：审美/人格展示，还是资源库：

Music 1：

Music 2：

Music 3：

Movies 1：

Movies 2：

Movies 3：

Pictures 1：

Pictures 2：

Pictures 3：

### 8. 导航和栏目取舍

保留的栏目：

删除的栏目：

要新增的栏目：

是否新增 Contact：

导航语言：中文 / 英文 / 中英混排：

其他备注：

