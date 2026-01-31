import React, { useState } from 'react'

interface FlashcardProps {
    word: string
    meaning: string
    phonetic?: string
    onReview: (quality: number) => void
}

const Flashcard: React.FC<FlashcardProps> = ({ word, meaning, phonetic, onReview }) => {
    const [isFlipped, setIsFlipped] = useState(false)

    return (
        <div className="flex flex-col items-center gap-8 py-12">
            <div
                className={`relative w-80 h-96 cursor-pointer transform transition-transform duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                onClick={() => setIsFlipped(!isFlipped)}
            >
                {/* Front */}
                <div className="absolute inset-0 bg-slate-900 border-2 border-slate-800 rounded-3xl flex flex-col items-center justify-center p-8 backface-hidden shadow-2xl">
                    <p className="text-sm text-slate-500 uppercase tracking-widest mb-4">Word</p>
                    <h2 className="text-5xl font-black text-white text-center">{word}</h2>
                    {phonetic && <p className="text-slate-400 mt-4 text-xl">[{phonetic}]</p>}
                    <p className="absolute bottom-12 text-slate-600 animate-pulse text-sm">카드 앞면을 클릭하면 뜻이 보입니다</p>
                </div>

                {/* Back */}
                <div className="absolute inset-0 bg-blue-900 border-2 border-blue-700 rounded-3xl flex flex-col items-center justify-center p-8 backface-hidden rotate-y-180 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                        <div className="w-24 h-24 bg-blue-800 rounded-full blur-3xl opacity-50 -mr-12 -mt-12"></div>
                    </div>
                    <p className="text-sm text-blue-300 uppercase tracking-widest mb-4">Meaning</p>
                    <h3 className="text-4xl font-bold text-white text-center">{meaning}</h3>
                </div>
            </div>

            {isFlipped && (
                <div className="flex gap-2 flex-wrap justify-center max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {[0, 1, 2, 3, 4, 5].map((q) => (
                        <button
                            key={q}
                            onClick={() => {
                                onReview(q)
                                setIsFlipped(false)
                            }}
                            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold border border-slate-700 transition-colors"
                        >
                            Q{q}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Flashcard
