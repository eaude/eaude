import { 
  hydratePostCache, 
  checkPostCache, 
  buildPostsFromCache,
  getPostCountFromCache,
  shouldFlush,
  flushCache,
  getPostKeysFromCache
} from '../services/cache'

import { getTumblrPosts } from '../services/tumblr'

export const getPosts = async (req, res, next) => {
  try {
    const offset = Number(req.query.offset) || 0;
    const timeToLive = process.env.cache_ttl || 28800000
    const postKeys = await getPostKeysFromCache(offset);

    const [count, posts] = await Promise.all([
      getPostCountFromCache(),
      buildPostsFromCache(postKeys)
    ])

    getTumblrPosts(offset).then((blog) => {
        if (count !== blog.count) {
          hydratePostCache(blog, offset)
        }
    })

    if (offset === 0 && await shouldFlush(timeToLive)) {
      await flushCache()
    }

    res.json({count, posts})
  } catch (err) {
    console.error(err)
  }
}