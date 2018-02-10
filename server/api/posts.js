import { Router } from 'express'

const router = Router()

import {getTumblrPosts} from './services/tumblr';

// Mock Users
/* GET users listing. */
router.get('/posts', async function (req, res, next) {
    try {
        const posts = await getTumblrPosts();
        res.json(posts)
    } catch (err) {
        console.error(err)
        res.json({  })
    }
})

// /* GET user by ID. */
// router.get('/users/:id', function (req, res, next) {
//   const id = parseInt(req.params.id)
//   if (id >= 0 && id < users.length) {
//     res.json(users[id])
//   } else {
//     res.sendStatus(404)
//   }
// })

export default router