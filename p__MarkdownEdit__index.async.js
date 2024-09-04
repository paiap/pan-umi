"use strict";(self.webpackChunkpanan=self.webpackChunkpanan||[]).push([[4804],{63206:function(v,t,n){n.r(t),n.d(t,{default:function(){return f}});var r=n(5574),s=n.n(r),e=n(67294),d=n(13912),l=n(26443),b=n(72171),m=`---
# frontmatter: https://jekyllrb.com/docs/front-matter/
layout: post
title: Blogging Like a Hacker
---

## Markdown Basic Syntax

I just love **bold text**. Italicized text is the _cat's meow_. At the command prompt, type \` nano \`.

My favorite markdown editor is [ByteMD](https://github.com/bytedance/bytemd).

1. First item
2. Second item
3. Third item

> Dorothy followed her through many of the beautiful rooms in her castle.

\`\`\`js
import gfm from '@bytemd/plugin-gfm'
import { Editor, Viewer } from 'bytemd'

const plugins = [
  gfm(),
  // Add more plugins here
]

const editor = new Editor({
  target: document.body, // DOM to render
  props: {
    value: '',
    plugins,
  },
})

editor.on('change', (e) => {
  editor.$set({ value: e.detail.value })
})
\`\`\`

## GFM Extended Syntax

Automatic URL Linking: https://github.com/bytedance/bytemd

~~The world is flat.~~ We now know that the world is round.

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |

## Footnotes

Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.
[^bignote]: Here's one with multiple paragraphs and code.

    Indent paragraphs to include them in the footnote.

    \`{ my code }\`

    Add as many paragraphs as you like.

## Gemoji

Thumbs up: :+1:, thumbs down: :-1:.

Families: :family_man_man_boy_boy:

Long flags: :wales:, :scotland:, :england:.

## Math Equation

Inline math equation: $a+b$

$$
displaystyle left( sum_{k=1}^n a_k b_k \right)^2 leq left( sum_{k=1}^n a_k^2 \right) left( sum_{k=1}^n b_k^2 \right)
$$

## Mermaid Diagrams

\`\`\`mermaid
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
\`\`\`

`,h=n(11774),a=n(85893),u=[(0,d.Z)()],g=function(){var c=(0,e.useState)(""),o=s()(c,2),p=o[0],i=o[1];return(0,e.useEffect)(function(){i(m)},[]),(0,a.jsx)(h._z,{ghost:!0,header:{title:"markdown\u7F16\u8F91\u5668"},children:(0,a.jsx)(l.M,{value:p,plugins:u,onChange:function(y){i(y)}})})},f=g}}]);
