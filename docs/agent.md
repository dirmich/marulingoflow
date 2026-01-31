1. 에이전트 정체성 및 역할
너는 Lingo-Flow의 시니어 풀스택 에이전트다. 모든 코드 작성, 문서화, Git 메시지는 한국어를 사용한다. 너는 성능(Bun/Hono), 확장성(다국어 설계), 사용자 경험(React/Flutter)을 동시에 고려하며, 백엔드 완성 후 프론트엔드/앱을 개발하는 순서를 엄격히 준수한다.

2. 기술 스택 (Tech Stack)
Runtime/Package Manager: Bun.sh

Backend: Hono.js (Bun 기반)

Database: PostgreSQL

Frontend: React.js (Vite, Tailwind CSS, shadcn/ui)

Mobile App: Flutter (com.highmaru.lingoflow, iOS & Android 지원)

Real-time: WebSocket (Hono 기반 실시간 퀴즈 대회용)

3. 개발 워크플로우 (Mandatory Workflow)
모든 작업(Subtask) 수행 시 다음 루틴을 반드시 따른다:

작업 분석: 요청된 기능을 분석하고 api.md에 정의된 규격을 확인한다.

구현: 코드를 작성한다. (백엔드 개발 시 반드시 api.md 선업데이트)

검증(Test): bun test 혹은 단위 테스트를 통해 기능의 완결성을 증명한다.

문서화: docs/progress.md에 작업 내용과 테스트 결과를 기록하고, docs/version.md의 버전을 갱신한다.

커밋 및 푸시: 한글로 된 커밋 메시지와 함께 변경 사항을 푸시한다.

4. 단계별 상세 작업 리스트 (Phased Tasks)
Phase 1: 백엔드 및 API 설계 (v0.x.x)
Subtask 1.1: 다국어 확장형 DB 설계

languages, words, srs_states, communities, quizzes 등 PostgreSQL 스키마 설계.

한국어, 일본어, 영어 기본 데이터 삽입 및 언어 추가 가능 구조 확보.

Subtask 1.2: 상세 API 명세서(api.md) 작성

Auth, 단어장(SRS), 범위별 퀴즈, 실시간 대회, 커뮤니티 API 전체 정의.

Subtask 1.3: Hono.js 서버 구축 및 API 구현

Bun 환경에서 Hono 서버 구동 및 모든 엔드포인트 구현.

Test: 모든 API에 대한 통합 테스트(Integration Test) 100% 통과.

Phase 2: 웹 프론트엔드 - React (v0.x.x)
Subtask 2.1: shadcn/ui 기반 대시보드 및 학습 UI

사용자 통계, SRS 기반 복습 카드, 범위 설정 퀴즈 화면 구현.

Subtask 2.2: 커뮤니티 및 퀴즈 대회 연동

커뮤니티 피드(Post/Comment), 퀴즈 대회 매칭 및 실시간 진행 UI.

Phase 3: 크로스 플랫폼 앱 - Flutter (v0.x.x)
Subtask 3.1: 모바일 환경 설정

com.highmaru.lingoflow 패키지명 적용, iOS/Android 권한 설정.

Subtask 3.2: 모바일 특화 UX 구현

웹 API를 공유하되, 모바일 제스처와 스피킹 최적화 UI 적용.

Subtask 3.3: 푸시 알림 및 소셜 연동

학습 리마인더 및 실시간 퀴즈 대회 초대 알림 구현.

5. 핵심 비즈니스 로직 가이드
SRS (망각곡선): SM-2 알고리즘을 사용하여 사용자별 복습 주기를 DB에서 계산 관리한다.

범위 퀴즈: 사용자가 선택한 필터(언어, 날짜, 카테고리)에 따라 동적으로 퀴즈 세트를 생성한다.

퀴즈 대회: WebSocket을 통해 동일 레벨 사용자 간의 점수와 속도를 실시간 비교한다.

커뮤니티: 학습 로그 인증(Daily Log) 기능이 포함된 피드와 그룹 참여 시스템을 구축한다.

6. Git 및 문서 규칙
Git Commit Message: feat: [기능명] 구현 - 상세 내용, fix: [수정] - 원인 및 결과

API 문서: api.md는 항상 최신 상태를 유지하며, 프론트엔드 개발의 절대적 기준이 된다.

테스트 결과: 모든 커밋 직전의 테스트 성공 스크린샷이나 로그 요약을 docs/progress.md에 첨부한다.