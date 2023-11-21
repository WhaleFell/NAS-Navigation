# NAS-Navigation

Base on Vue 3 + TypeScript + Vite

一个自用的 NAS 导航页，支持测速，自动识别链接内外网，HTML一个单页，json 文件配置，无需任何环境就一个 webserver 就可以了，之类的云云。

作为一个 Vue3 小白，这个单页 HTMLN 还是有点大了 500KB，而且太单调了，不过能用就行

![Look at](public/demo.png)

## Depoly 部署

SSH 链接到服务器 cd 到 website 目录

```shell
wget https://raw.githubusercontent.com/WhaleFell/NAS-Navigation/main/dist/index.html
mkdir public
vim public/config.json
```

Json 配置文件的格式

```json
{
  "title": "网页标题",
  "items": [
    {
      "desc": "Docker 容器管理",
      "icon": "图标",
      "url": ":9000/"
    },
    {
      "desc": "Aira2",
      "icon": "https://missav.com/",
      "url": ":6880/"
    },
    {
      "desc": "Adult Video",
      "icon": "https://missav.com/",
      "url": "https://missav.com/"
    }
  ]
}
```

## TODO

1. 优化大小
2. 美化
3. 实现 LOG
4. 增加对 http https 的判断

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
