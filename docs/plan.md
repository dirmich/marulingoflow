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

---

# Phase 2: Web Frontend Design Plan

React(Vite)를 사용하여 고품질의 학습 경험을 제공하는 대시보드 및 UI를 구현합니다.

## Tech Stack
- **Framework**: React.js (TypeScript)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Lucide Icons
- **State Management**: React Query (TanStack Query) for API synchronization
- **Routing**: React Router DOM

## Proposed Components
### 1. Layout System
- `Navbar`: 상단 내비게이션 (홈, 퀴즈, 커뮤니티, 프로필)
- `Layout`: 공통 레이아웃 및 테마 적용

### 2. Dashboard Page
- `UserStats`: 일일 학습량, 연속 학습일, 레벨 정보 시각화
- `ReviewCard`: SRS 기반 오늘 복습할 단어 수 표시 및 학습 시작 버튼

### 3. Learning UI
- `Flashcard`: 단어/문장 학습 카드 인터페이스 (SM-2 등급 입력 포함)
- `QuizSession`: 동적 퀴즈 및 실시간 대회 UI

---

## Verification Plan (Frontend)
- **API 연동**: Axios Interceptor를 통한 JWT 인증 및 에러 처리 검증
- **애니메이션**: Flashcard 뒤집기 및 페이지 전환 효과 부드러움 확인
- 반응형: 모바일 기기에서의 학습 편의성 테스트

---

# Phase 4: Advanced Features & Admin System Plan

모든 고도화 기능을 통합하고 어드민 시스템을 구축합니다.

## 1. Role-Based Access Control (Admin: oldtv.cf@gmail.com)
- **Auth**: 해당 이메일 로그인 시 `ADMIN` 역할 부여 및 JWT 포함.
- **Admin API**: 사용자 전체 목록 조회 및 시스템 통계 제공.

## 2. Gemini AI Integration
- 단어별 실시간 예문 생성 및 학습 가이드 제공.

## 3. Gamification & Analytics
- **Leaderboard**: Redis Sorted Sets 기반 실시간 랭킹.
- **Charts**: Recharts를 활용한 학습 추이 시각화.

## 4. Infrastructure
- **Docker**: DB/Redis 원클릭 환경 구축 (`docker-compose.yml`).

---

# Phase 3: Cross-platform App Design Plan (Flutter)

Flutter를 사용하여 iOS와 Android에서 동일한 고성능 학습 경험을 제공합니다.

## Tech Stack
- **Framework**: Flutter
- **State Management & Routing**: GetX (Simple, Reactive, Dependency Injection)
- **Networking**: Dio (with Interceptors for JWT)
- **Persistence**: Get Storage (GetX ecosystem) or Flutter Secure Storage

## Proposed Folders
- `lib/core`: 테마, 상수
- `lib/services`: API 통신 (Dio)
- `lib/views`: 페이지 및 위젯 UI
- `lib/models`: 데이터 모델

## Key Features
1. **SRS Learning**: 스와이프 가능한 플래시카드 UI
2. **Dashboard**: 모바일 전용 통계 위젯
3. **Connectivity**: 백엔드 API 공유 및 오프라인 캐시 고려

---

## Verification Plan (App)
- **Cross-device**: iOS/Android 시뮬레이터 확인
- **Performance**: 복습 애니메이션 부드러움 확인
