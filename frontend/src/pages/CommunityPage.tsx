import React from 'react'
import { MessageSquare, Heart, Share2, PlusCircle, Image as ImageIcon } from 'lucide-react'

const CommunityPage: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-white">커뮤니티 피드</h1>
                    <p className="text-slate-400">다른 학습자들의 열정을 나누어보세요!</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full font-bold transition-colors">
                    <PlusCircle size={20} />
                    <span>글쓰기</span>
                </button>
            </header>

            <div className="space-y-6">
                <PostCard
                    author="김학습"
                    time="2시간 전"
                    content="오늘 드디어 영어 단어 100개를 복습 완료했습니다! SM-2 알고리즘 덕분에 훨씬 효율적으로 외워지는 것 같아요. 🔥"
                    type="daily_log"
                    likes={12}
                    comments={4}
                />
                <PostCard
                    author="이열공"
                    time="4시간 전"
                    content="일본어 N2 합격 수기입니다. 궁금하신 점 댓글 달아주세요!"
                    likes={25}
                    comments={10}
                />
            </div>
        </div>
    )
}

const PostCard: React.FC<{ author: string, time: string, content: string, type?: string, likes: number, comments: number }> = ({ author, time, content, type, likes, comments }) => (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:border-slate-700 transition-colors">
        <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white text-sm">
                    {author[0]}
                </div>
                <div>
                    <h4 className="font-bold text-slate-100">{author}</h4>
                    <p className="text-xs text-slate-500">{time}</p>
                </div>
                {type === 'daily_log' && (
                    <span className="ml-auto px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-wider rounded border border-green-500/20">
                        학습 인증
                    </span>
                )}
            </div>

            <p className="text-slate-300 leading-relaxed">{content}</p>

            <div className="flex items-center gap-6 pt-2 border-t border-slate-800">
                <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors group">
                    <Heart size={18} className="group-hover:fill-current" />
                    <span className="text-sm font-medium">{likes}</span>
                </button>
                <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors">
                    <MessageSquare size={18} />
                    <span className="text-sm font-medium">{comments}</span>
                </button>
                <button className="ml-auto text-slate-500 hover:text-slate-300">
                    <Share2 size={18} />
                </button>
            </div>
        </div>
    </div>
)

export default CommunityPage
