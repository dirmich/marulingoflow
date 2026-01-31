import { Hono } from 'hono'
import { authMiddleware } from '../middlewares/auth'
import { CommunityService } from '../services/community-service'

const community = new Hono()

community.use('*', authMiddleware)

community.get('/posts', async (c) => {
    const communityId = c.req.query('community_id') ? Number(c.req.query('community_id')) : undefined
    const page = Number(c.req.query('page')) || 1

    const posts = await CommunityService.getPosts(communityId, page)
    return c.json({ posts })
})

community.post('/posts', async (c) => {
    const payload = c.get('jwtPayload') as any
    const userId = payload.sub
    const { community_id, content, post_type, image_url } = await c.req.json()

    const post = await CommunityService.createPost(userId, community_id, content, post_type, image_url)
    return c.json({ success: true, post })
})

community.get('/posts/:id/comments', async (c) => {
    const postId = Number(c.req.param('id'))
    const comments = await CommunityService.getComments(postId)
    return c.json({ comments })
})

community.post('/posts/:id/comments', async (c) => {
    const payload = c.get('jwtPayload') as any
    const userId = payload.sub
    const postId = Number(c.req.param('id'))
    const { content } = await c.req.json()

    const comment = await CommunityService.createComment(userId, postId, content)
    return c.json({ success: true, comment })
})

export default community
