# Lingo-Flow API Specification (v0.1.0)

## 1. Overview
- **Base URL**: `/api/v1`
- **Authentication**: Bearer Token (JWT)

---

## 2. Auth API
시스템 접근 및 유저 관리를 위한 API입니다.

### 2.1 회원가입 (Register)
`POST /auth/register`

**Request Body**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "nickname": "lingo_master",
  "native_language_id": 1,
  "target_language_id": 2
}
```

### 2.2 로그인 (Login)
`POST /auth/login`

**Response**
```json
{
  "token": "eyJhbG...",
  "user": { "id": "uuid", "nickname": "lingo_master" }
}
```

---

## 3. SRS (Spaced Repetition System) API
학습 및 복습 관리를 위한 핵심 API입니다.

### 3.1 오늘 복습할 단어 목록 조회
`GET /srs/words/today`

**Response**
```json
{
  "words": [
    { "id": 101, "text": "こんにちは", "meaning": "안녕하세요", "next_review_at": "..." }
  ]
}
```

### 3.2 단어 학습 결과 제출 (SM-2 알고리즘 적용)
`POST /srs/review`

**Request Body**
```json
{
  "word_id": 101,
  "quality": 5  // 0-5 (점수: 0은 모름, 5는 완벽히 기억)
}
```

---

## 4. Community API
학습 인증 및 소셜 기능을 위한 API입니다.

### 4.1 전체 피드 조회
`GET /posts?type=all&page=1`

### 4.2 학습 인증 게시글 작성 (Daily Log)
`POST /posts`

**Request Body**
```json
{
  "community_id": 1,
  "content": "오늘 단어 50개 복습 완료!",
  "post_type": "daily_log",
  "image_url": "..."
}
```

---

## 5. Quiz & Tournament API
동기 부여를 위한 퀴즈 및 실시간 대회 API입니다.

### 5.1 퀴즈 목록 조회
`GET /quizzes?language_id=2`

### 5.2 퀴즈 결과 제출
`POST /quizzes/:id/submit`

### 5.3 현재 진행 중인 대회 조회
`GET /tournaments/active`

---

## 6. WebSocket Events (Quiz Tournament)
실시간 대회를 위한 이벤트 정의입니다.

- `join_tournament`: 대회 참가
- `quiz_next`: 다음 문제 스트리밍
- `submit_answer`: 답안 제출 (속도 기록)
- `tournament_rank`: 실시간 순위 변동 알림
