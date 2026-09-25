# Code Remote 安装与使用

状态：已提交定时发布（MCP 回执和服务日志已核验）

定时时间：2026-09-27 00:00 PDT（太平洋夏令时间）

备选标题：用 iPhone 远程操作 Codex｜手机连回 Mac 上的 Codex

封面文案：手机连回你的 Mac

## 正文

想在 iPhone 上操作 Mac 里的 Codex，可以按这条最短路径安装：

1. Mac 和 iPhone 都安装 Tailscale，登录同一个 tailnet；Mac 先安装并登录 Codex CLI。
2. 在 Mac 终端运行：

```sh
git clone https://github.com/huangxinxinyu/CodeRemote.git
cd CodeRemote
make bootstrap
make build
tailscale ip -4
```

3. 记下最后显示的 Mac 私网 IP，按 README 的启动命令填入这个 IP 和你的项目绝对路径，启动 daemon。
4. iPhone 开启 Tailscale VPN，在 Safari 打开 `http://刚才的IP:8080`，就能进入原生终端。

Mac 需要保持开机联网。完整启动命令、Claude Code 模式和排错说明都在 GitHub：`huangxinxinyu/CodeRemote`。

## 配图与标签

- 配图顺序：[连接后的主界面](assets/code-remote/01-app.jpg)、[安装步骤卡](assets/code-remote/07-install-steps.png)
- 实际提交标签：独立开发、程序员日常
- 可见范围：公开可见；原创声明：是
- 安装详情：https://github.com/huangxinxinyu/CodeRemote#快速开始
- 编辑说明：`make doctor` 留在 README 排错流程，不放进这篇主步骤。
