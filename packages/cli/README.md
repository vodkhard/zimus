# @zimus/cli

Bulk optimize your assets by compressing your images with the state-of-the-art algorithms with the help of `sharp` and `libvips`

### installation

`npm install @zimus/cli`

The **@zimus/cli** uses `sharp` which use `libvips` to compress images. By default `libvips` is integrated in Node.js but doesn't use the best algorithms. So I created a **Dockerfile** of Node.js 12 with custom build of `libvips` so you should use it if you want the best compression.

For more information go here

### usage

`npm run generate <source-dir>`
> use `--help` for more informations

### algorithms

- [MOZJpeg](https://github.com/mozilla/mozjpeg): best JPEG compressor today, used by Instagram
- [WebP](https://developers.google.com/speed/webp): new file format developed by Google, [more efficient than JPEG on small images (width < ~1500px)](https://siipo.la/blog/is-webp-really-better-than-jpeg)
- AVIF: the new one, more efficient than everyone else, used by Netflix