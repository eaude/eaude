import tumblr from 'tumblr.js'
import config from '../config';

const client = tumblr.createClient({
     consumer_key: config.tumblr.consumerKey,
});

export const getTumblrPosts = () => {
    return new Promise((resolve, reject) => {
        client.blogPosts('eaude-studio.tumblr.com', (err, data) => {
            if(err) { 
                reject(err);
            }
            resolve(data);
        });
    });
}
