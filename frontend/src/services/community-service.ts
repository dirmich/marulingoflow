import api from './api'

export const communityService = {
    getPosts: async (communityId?: number, page: number = 1) => {
        const { data } = await api.get(`/community/posts?page=${page}${communityId ? `&community_id=${communityId}` : ''}`)
        return data.posts
    },
    createPost: async (content: string, communityId: number, postType: string = 'normal') => {
        const { data } = await api.post('/community/posts', { content, community_id: communityId, post_type: postType })
        return data
    },
    getComments: async (postId: number) => {
        const { data } = await api.get(`/community/posts/${postId}/comments`)
        return data.comments
    },
}
