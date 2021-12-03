# HTTP 缓存

## 强缓存

> 1.0
  服务端时间 跟 客户端时间对比
  Expires
> 1.1
  服务端时间对比
  cache-control, max-age=20

## 协商缓存
  
  cache-control, no-cache
  > 时间协商
  res Last-modified, new Date()
  req If-modified-Since
  > 内容协商
  res Etag, hash
  req If-None-Match, hash

## Service Work
