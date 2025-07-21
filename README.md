# README

vercel: [pan-bu1h8b02l-panans-projects.vercel.app](https://pan-bu1h8b02l-panans-projects.vercel.app/)

cloudflare: [pan-umi.pages.dev](https://pan-umi.pages.dev/)

netlify: [pan-umi.netlify.app](https://pan-umi.netlify.app/)

### special rules

1. 所有的接口返回结构为 `{code:0,msg:'成功',data:{} | []}`,data 中才是返回的数据
2. 在写组件时候，保证与其相关的所有页面和小组件都在该文件夹内，通用小组件放入 components 文件夹中，子页面放入 pages 文件夹中，工具函数放入 utils 文件夹中，接口函数放入 api 文件夹中「可以根据功能不同在 api 文件夹中创建不同文件」，mock 数据放在 mock 文件夹中「api 文件夹中引用即可」
