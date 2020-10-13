# zimus

> wip repository

Optimize your assets by compressing your images with the state-of-the-art algorithms.

## [cli](packages/cli/README.md)

Use the cli to bulk compress images.

### installation

`npm install @zimus/cli`

### Dockerfile

The **@zimus/cli** uses `sharp` which use `libvips` to compress images. By default `libvips` is integrated in Node.js but doesn't use the best algorithms. So I created a **Dockerfile** of Node.js 12 with custom build of `libvips` so you should use it if you want the best compression.

## component

> *wip*
