import sql from '../db'

export class CommunityService {
    static async getPosts(communityId?: number, page: number = 1, limit: number = 20) {
        const offset = (page - 1) * limit
        if (communityId) {
            return await sql`
        SELECT p.*, u.nickname as author_name 
        FROM posts p
        JOIN users u ON p.user_id = u.id
        WHERE p.community_id = ${communityId}
        ORDER BY p.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
        }
        return await sql`
      SELECT p.*, u.nickname as author_name 
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `
    }

    static async createPost(userId: string, communityId: number, content: string, postType: string = 'normal', imageUrl?: string) {
        return await sql`
      INSERT INTO posts (user_id, community_id, content, post_type, image_url)
      VALUES (${userId}, ${communityId}, ${content}, ${postType}, ${imageUrl})
      RETURNING *
    `
    }

    static async getComments(postId: number) {
        return await sql`
      SELECT c.*, u.nickname as author_name
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = ${postId}
      ORDER BY c.created_at ASC
    `
    }

    static async createComment(userId: string, postId: number, content: string) {
        return await sql`
      INSERT INTO comments (post_id, user_id, content)
      VALUES (${postId}, ${userId}, ${content})
      RETURNING *
    `
    }
}
