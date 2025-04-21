# 🧩 프로젝트 구조 가이드

이 프로젝트는 **Next.js App Router 기반**의 구조로, 기능 단위의 확장성과 유지보수를 고려하여 아래와 같은 기준으로 설계되었습니다.

---

## 🧭 설계 목적 및 방향

이 프로젝트는 **기능 중심 설계**와 **컴포넌트 재사용성**, **효율적인 테스트**를 중심으로 구성되어 있으며, 다음과 같은 기준으로 설계되었습니다:

### ✅ 1. 라우팅과 뷰 분리 (`app/`)

- URL에 따른 페이지 구성을 담당합니다.
- 각 페이지에서만 사용하는 UI 조각은 `app/페이지명/_components/`에 분리하여 구성합니다.

### ✅ 2. 기능 중심 구조 (`features/`)

- 인증, 게시글, 사용자 등 **도메인별로 기능을 모듈화**합니다.
- 컴포넌트, 훅, API, 타입, 테스트를 **도메인 단위로 집중 관리**하여 응집도와 유지보수성을 높입니다.

### ✅ 3. 공통 컴포넌트 재사용 (`components/`)

- 전역에서 사용하는 버튼, 인풋, 모달 등 **UI 요소들을 한 곳에 모아 관리**합니다.
- 디자인 일관성과 재사용성 확보가 용이해집니다.

### ✅ 4. 테스트 내재화 (`__tests__/`)

- 각 기능 단위에서 바로 테스트할 수 있도록 폴더 안에 `__tests__` 디렉토리를 구성합니다.
- **기능 단위 테스트를 인라인화**하여, 리팩토링 및 QA 시 빠른 피드백 루프를 확보합니다.

### ✅ 5. 공통 상태 관리 도입 (`store/`, `features/도메인/store/`)

- 앱 전역에서 사용되는 상태(UI 상태, 모달 등)는 `store/`에 구성하고,
- 인증 등 도메인 전용 상태는 `features/도메인/store/`에 위치시켜 관리합니다.
- 이를 통해 상태 관리의 책임과 범위를 명확히 구분할 수 있습니다.

### ✅ 6. API 모듈 공통화 (`shared/api/`)

- axios 인스턴스 설정, 공통 헤더, 인터셉터 등은 `shared/api/axiosInstance.ts`에 구성합니다.
- 각 도메인의 API는 `features/도메인/services/`에 작성하고, 공통 유틸과 경로 상수는 `shared/api/endpoints.ts` 등에서 관리하여 API 관리 효율을 높입니다.

---

## 📐 프로젝트 디렉토리 구조

```plaintext
src/
├── app/                                        # 라우팅 페이지 디렉토리
│   ├── page.tsx                                # 루트 페이지
│   ├── layout.tsx                              # 전체 레이아웃 설정
│   └── login/                                  # "/login" 페이지
│       ├── page.tsx                            # 로그인 라우트 컴포넌트
│       └── _components/                        # 로그인 페이지 전용 UI 조각 모음
│           └── LoginBanner.tsx                 # 설명 배너 등 페이지에만 사용되는 UI
├── components/                                 # 전역 공통 UI 컴포넌트 모음
│   ├── ui/                                     # 버튼, 인풋 등 기본 요소
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   ├── layout/                                 # 페이지 레이아웃 구성 요소
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── feedback/                               # 사용자 반응 컴포넌트
│       ├── Spinner.tsx
│       └── Alert.tsx
├── features/                                   # 기능(도메인) 단위 로직/뷰/훅 모음
│   └── auth/                                   # 도메인 (로그인, 회원가입 등)
│       ├── components/                         # 도메인 전용 컴포넌트
│       │   ├── LoginForm.tsx
│       │   └── SignupForm.tsx
│       ├── hooks/                              # 인증 도메인 전용 커스텀 훅
│       │   └── useLogin.ts
│       ├── services/                           # axios or fetch 기반 API 함수 정의
│       │   └── authApi.ts
│       ├── types/                              # 도메인 타입 정의
│       │   └── auth.d.ts
│       ├── store/                              # (확장) 인증 상태 관리 모듈 (zustand/recoil 등)
│       │   └── authStore.ts
│       └── __tests__/                          # auth 도메인 관련 테스트 파일
│           ├── LoginForm.test.tsx
│           └── useLogin.test.ts
├── shared/                                     # 공통 유틸, 상수, API 모듈 등 모음
│   └── api/                                    # API 추상화 및 공통 유틸
│       ├── axiosInstance.ts                    # axios 인터셉터, 공통 설정
│       └── endpoints.ts                        # API URL 및 경로 상수 관리
├── store/                                      # (확장) 글로벌 상태 관리 전역 모듈
│   └── uiStore.ts                              # 예: 글로벌 모달 상태, 로딩 상태 등

```

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

---

## 상태관리

Controlled Component 방식을 사용, 커스텀 useState는 상위 컴포넌트에서 호출해서 하위 컴포넌트에 props로 넘겨주는 방식사용.

### ✅ 1. 예측 가능성

- 데이터 흐름이 한 방향이라 상태 변화가 명확함.

### ✅ 2. 재사용성

- 여러 부모 컴포넌트 에서든 사용할 수 있음.

### ✅ 3. 테스트 용이

- props만 넘기면 바로 테스트 가능.

### ✅ 4. 상태 제어 (의존성)

- 비지니스의 전체 상태를 중앙집중식으로 관리 가능.
- 상태흐름이 분산되어 관리가 힘듬.

### ✅ 5. 상태 공유

- 여러 컴포넌트에서 호출하면 서로다은 상태를 가질 수 있음음.

---

## 타입

### ✅ 1. 하나의 컴포넌트에서만 사용

- 컴포넌트 파일 내부에 작성성

### ✅ 2. 여러 컴포넌트에서 공유

- types/로 분리

### ✅ 3. 도메인 간 공유 or API 요청 타입

- types/ 에 DTO처럼 관리
- 도메인 간 의존 관리

---
