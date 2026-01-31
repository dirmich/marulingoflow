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
- Phase 1.3: Hono.js 백엔드 핵심 기능 구현 완료 (Auth, SRS, Quiz, Community, WS)
- Phase 2: 웹 프론트엔드 (React + Tailwind) 대시보드 및 학습 UI 구현 완료
- Phase 3: 크로스 플랫폼 앱 (Flutter) 대시보드 및 학습 UI 기초 구현 완료
- **Current Status**: v0.3.0 개발 단계 종료 및 전체 기능 검증 완료
- **퀴즈 및 커뮤니티**: 동적 퀴즈 생성, 게시글/댓글, 학습 인증(Daily Log) 기능 구현.
- **실시간 대회 (WebSocket)**: WebSocket을 이용한 실시간 랭킹 및 퀴즈 대회 시스템 구축.

### 테스트 결과
- 모든 API 엔드포인트에 대한 논리적 검증 완료.
- TypeScript 타입 오류 해결 및 코드 품질 확보.
- Hono.js 서버 및 Bun 환경 최적화 완료.
