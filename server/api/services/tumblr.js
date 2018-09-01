import tumblr from 'tumblr.js'
import config from '../config'

const client = tumblr.createClient({
  consumer_key: config.tumblr.consumerKey
})

export const getTumblrPosts = (offset = 0) => {
  return new Promise((resolve, reject) => {
    client.blogPosts('eaude-studio.tumblr.com', {offset, limit: 50}, (err, data) => {
      if (err) {
        console.log(err)
        reject(err)
      }
      resolve(data)
    })
  })
}
