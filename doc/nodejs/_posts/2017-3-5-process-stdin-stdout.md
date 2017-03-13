---
layout: post
title:  process stdin and stdout
tags: node
---

## How to trigger stdin end event

```js  
process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('end');
});
```

### Answer: ctr+d
