# Lingo-Flow Phase 1.1 설계 계획

Lingo-Flow의 핵심인 다국어 지원, SRS(망각곡선) 시스템, 그리고 커뮤니티 기능을 위한 데이터베이스를 설계하고, 이를 바탕으로 `api.md` 초안을 작성합니다.

## Proposed Changes

### Auth System (OAuth2 & Redis) [UPDATED]

구글 SSO를 통한 자동 회원가입 및 JWT/Redis 기반 세션리스 인증을 구현합니다.

#### 1. OAuth2 Integration
- Google SSO를 우선 순위로 구현하며, `auth_providers` 테이블을 통해 추후 Apple, GitHub 등으로 확장 가능하게 설계합니다.
- `users` 테이블에서 `password_hash`를 제거하고 OAuth 공급자 정보를 연동합니다.

#### 2. Session Management (JWT & Redis)
- **Access Token**: Hono의 JWT Middleware를 사용하여 요청마다 검증합니다.
- **Refresh Token**: Redis에 저장하여 세션을 관리하며, 로그아웃 시 무효화 처리합니다.
- **Workflow**: 
  1. 사용자가 OAuth 로그인 성공
  2. DB에 사용자 정보 확인 (없으면 신규 생성)
  3. JWT 발행 및 Redis에 세션 정보 저장
  4. 클라이언트에 토큰 전달

#### 3. Database Schema Changes
- `auth_providers` 테이블 신설: 공급자명(`google` 등)과 연동 ID(`sub`)를 관리합니다.
- `users` 테이블: `password_hash` 필드 제거.

---

### API Specification (api.md) [NEW]

다음 기능들을 포함하는 API 명세서를 작성합니다:
- **Auth**: 회원가입, 로그인, 프로필 관리
- **SRS Word Path**: 단어 조회, 학습 상태 업데이트, 오늘 복습할 단어 목록
- **Quiz**: 퀴즈 목록 조회, 퀴즈 결과 제출
- **Tournament**: 실시간 대회 참가 신청, 랭킹 조회
- **Community**: 피드 조회, 게시글 작성, 학습 인증(Daily Log)

---

## Verification Plan

### Automated Tests
- DB 스키마 검증을 위한 SQL 스크립트 실행 테스트
- API 명세서의 요청/응답 구조 정합성 검토

### Manual Verification
- 사용자 검토를 통한 스키마 및 API 구조 확정
