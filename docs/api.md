# Lingo-Flow API Specification (v0.1.0)

## 1. Overview
- **Base URL**: `/api/v1`
- **Authentication**: Bearer Token (JWT)

---

## 2. Auth API (OAuth2 SSO & JWT)
Google SSO를 기본으로 하며, JWT와 Redis를 사용해 세션리스로 동작합니다.

### 2.1 Google 로그인 시작 (Login with Google)
`GET /auth/google`
- Google OAuth 인증 페이지로 리다이렉트합니다.

### 2.2 Google 콜백 (Callback)
`GET /auth/google/callback`
- Google로부터 인증 코드를 받아 처리합니다.
- 새로운 사용자인 경우 이메일 기반으로 자동 회원가입을 진행합니다.
- **Response**
```json
{
  "access_token": "jwt_token...",
  "refresh_token": "refresh_token...",
  "user": { "id": "uuid", "email": "user@gmail.com", "nickname": "..." }
}
```

### 2.3 토큰 갱신 (Token Refresh)
`POST /auth/refresh`
- Refresh Token을 사용하여 Access Token을 재발급합니다.
- Redis에 저장된 Refresh Token 정보를 검증합니다.

### 2.4 로그아웃 (Logout)
`POST /auth/logout`
- Redis에서 해당 세션 정보를 삭제하여 무효화합니다.

---

## 3. Redis Session Architecture
- **JWT (Access Token)**: Stateless하며 요청 시마다 서버에서 검증합니다. (만료 시간 짧음)
- **Refresh Token**: Redis에 `user_id`를 키로 하여 저장됩니다. (만료 시간 김)
- **White-list/Black-list**: 로그아웃 시 토큰을 Black-list에 추가하거나, 활성 세션만 White-list로 관리하여 보안을 강화합니다.

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
