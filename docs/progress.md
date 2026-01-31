# Progress Log

## [v0.2.0] - 2026-01-31
### Added
- Google SSO 및 JWT/Redis 인증 시스템 구현
- SRS (SM-2 알고리즘) 기반 단어 학습/복습 API 구현
- 퀴즈 및 커뮤니티(피드, 댓글, 인증) API 구현
- WebSocket 기반 실시간 퀴즈 대회 시스템 구현
- 프로젝트 구조 재편 (frontend, backend, app, docs)

## [v0.1.0] - 2026-01-31
## [2026-01-31] Phase 1.1: 다국어 및 커뮤니티 통합 DB 설계 완료

### 작업 내용
- **다국어 확장형 DB 스키마 설계**: `languages`, `users`, `words`, `srs_states`, `communities`, `posts`, `quizzes`, `tournaments` 테이블 정의. (`docs/schema.sql`)
- **OAuth2 SSO 및 세션 설계**: Google SSO 연동 및 JWT/Redis 기반 세션리스 인증 아키텍처 설계 및 구현.
- **SRS 단어장 시스템**: SM-2 알고리즘 기반 복습 주지 관리 및 API 구현.
- **퀴즈 및 커뮤니티**: 동적 퀴즈 생성, 게시글/댓글, 학습 인증(Daily Log) 기능 구현.
- **실시간 대회 (WebSocket)**: WebSocket을 이용한 실시간 랭킹 및 퀴즈 대회 시스템 구축.

### 테스트 결과
- 모든 API 엔드포인트에 대한 논리적 검증 완료.
- TypeScript 타입 오류 해결 및 코드 품질 확보.
- Hono.js 서버 및 Bun 환경 최적화 완료.
