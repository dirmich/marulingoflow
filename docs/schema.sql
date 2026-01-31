-- Lingo-Flow Initial Database Schema (PostgreSQL)

-- 1. 지원 언어 (Languages)
CREATE TABLE languages (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL, -- 'ko', 'en', 'ja' 등
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. 사용자 (Users)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    nickname VARCHAR(50),
    native_language_id INTEGER REFERENCES languages(id),
    target_language_id INTEGER REFERENCES languages(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2.1 OAuth 공급자 정보 (Auth Providers)
CREATE TABLE auth_providers (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    provider_name VARCHAR(50) NOT NULL, -- 'google', 'apple', 'github' 등
    provider_user_id VARCHAR(255) NOT NULL, -- OAuth 제공자의 고유 사용자 ID
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(provider_name, provider_user_id)
);

-- 3. 단어 데이터 (Words)
CREATE TABLE words (
    id SERIAL PRIMARY KEY,
    language_id INTEGER REFERENCES languages(id) NOT NULL,
    text TEXT NOT NULL,
    phonetic TEXT,
    meaning TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'general',
    level VARCHAR(20), -- 예: 'A1', 'JLPT_N1'
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. SRS 학습 상태 (SRS States)
CREATE TABLE srs_states (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    word_id INTEGER REFERENCES words(id) ON DELETE CASCADE,
    interval INTEGER DEFAULT 0, -- 복습 간격 (일)
    ease_factor DOUBLE PRECISION DEFAULT 2.5, -- SM-2 알고리즘 파라미터
    repetition INTEGER DEFAULT 0, -- 반복 횟수
    next_review_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_reviewed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, word_id)
);

-- 5. 커뮤니티 (Communities)
CREATE TABLE communities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. 게시글 (Posts)
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    community_id INTEGER REFERENCES communities(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    post_type VARCHAR(20) DEFAULT 'normal', -- 'normal', 'daily_log'
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. 댓글 (Comments)
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. 퀴즈 (Quizzes)
CREATE TABLE quizzes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    language_id INTEGER REFERENCES languages(id),
    category VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. 퀴즈 결과 (Quiz Results)
CREATE TABLE quiz_results (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    quiz_id INTEGER REFERENCES quizzes(id),
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. 실시간 퀴즈 대회 (Tournaments)
CREATE TABLE tournaments (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    status VARCHAR(20) DEFAULT 'planned', -- 'planned', 'ongoing', 'finished'
    language_id INTEGER REFERENCES languages(id),
    start_at TIMESTAMP WITH TIME ZONE,
    end_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
