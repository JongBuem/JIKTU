# 🧩 프로젝트 구조 가이드 (Feature-Sliced Design 기반)

이 프로젝트는 **Next.js App Router 기반**이며, **Feature-Sliced Design (FSD)** 아키텍처를 기반으로 **기능 중심 확장성**, **유지보수성**, **재사용성**을 극대화하도록 설계되었습니다.

---

## 🧭 설계 목적 및 방향

### ✅ 1. 기능 중심 모듈화 (`features/`)

- 로그인, 회원가입, 검색창 등 사용자 인터랙션 중심의 **작은 기능 단위(feature)**로 분리합니다.
- 각 feature는 `ui/`, `model/`, `api/`, `lib/`, `types/` 세그먼트로 구성되며, 공개 API는 `index.ts`에서 제공합니다.
- `api/`: 외부 API 요청 로직 담당 (fetch, axios 등)
- `lib/`: 순수 유틸 함수, 검증, 계산 등 내부 비즈니스 보조 함수 담당

### ✅ 2. 도메인 상태 및 모델은 `entities/`

- User, Post 등 비즈니스 중심의 상태는 `entities/`에 정의하며, 여러 feature에서 공유될 수 있습니다.
- zustand, recoil 등 상태관리 라이브러리를 활용하며, UI 조각, 타입, 상태 등을 포함합니다.
- 각 entities는 `ui/`, `model/`, `types/` 세그먼트로 구성되며, 공개 API는 `index.ts`에서 제공합니다.
- `ui/`: 도메인 개체의 시각화를 위한 “표현용 UI 컴포넌트”
- `model/`: 도메인(Entity)의 상태(state)와 조작 로직을 포함한 전역 상태의 출발점

### ✅ 3. 고수준 UI 조립은 `widgets/`

- 여러 feature와 entity를 조합하여 **중간 복잡도 이상의 UI 블록**을 구성합니다.
- 예: `loginSection`, `signupSection`, `profileSidebar` 등 하나의 시각적/기능적 블록
- 내부적으로는 `ui/` 세그먼트로 구성됩니다.

### ✅ 4. 전역 유틸과 컴포넌트는 `shared/`

- 공통 컴포넌트, 유틸 함수, API 인스턴스, 타입 정의는 `shared/`에 위치합니다.
- **어떤 레이어에서도 참조 가능**하지만, **shared는 누구도 참조해서는 안 됩니다.**
- 복잡한 전역 타입도 `shared/types/` 세그먼트 내에 관리합니다.

### ✅ 5. 페이지는 `app/`에서 직접 구성

- Next.js App Router 기반에서 페이지 구성은 `app/` 디렉토리에서 이루어집니다.
- 페이지는 feature/widget을 조립하여 실제 페이지를 구성합니다.
- FSD의 `pages/` 개념은 App Router에선 `app/`으로 대체되므로, `pages/`는 사용하지 않습니다.

---

## 📐 프로젝트 디렉토리 구조 (FSD 기준)

```plaintext
src/
├── app/                                  # Next.js App Router 라우팅
│   └── login/
│       └── page.tsx                      # 로그인 페이지 라우트
├── features/                             # 사용자 인터랙션 중심 기능 (기능 단위)
│   └── signup/
│       ├── ui/                           # 인풋, 버튼 등 조립 가능한 단위
│       ├── model/                        # 상태, 로직 훅
│       ├── api/                          # API 호출 함수
│       │   lib/                          # 비즈니스 로직 (순수 함수)
│       ├── types/                        # 내부 전용 타입
│       └── index.ts                      # 공개 API
├── entities/                             # 도메인 상태 및 핵심 모델
│   └── user/
│       ├── model/                        # 상태 store (zustand)
│       ├── ui/                           # 관련 공통 UI (Avatar 등)
│       ├── types/                        # 도메인 타입 정의
│       └── index.ts                      # 공개 API
├── widgets/                              # 고수준 UI 조립 단위
│   └── loginSection/
│       └── ui/
│           ├── loginSection.tsx         # 배너 + 로그인 폼 조립
│           ├── loginBanner.tsx
│           ├── loginNotice.tsx
│           └── signupForm.tsx           # 조립된 SignupForm 컴포넌트
├── shared/                               # 전역 유틸, API, 타입, 공통 UI
│   ├── api/
│   │   └── axiosInstance.ts
│   ├── ui/
│   │   └── Button.tsx
│   ├── constants/
│   │   └── routes.ts
│   └── types/
│       └── auth.ts
```

---

## ⛔ 의존성 규칙 (Dependency Rule)

```plaintext
app       → widgets, features, entities, shared
widgets   → features, entities, shared
features  → entities, shared
entities  → shared
shared    → (아무 것도 import 금지)
```

> 의존성은 **한 방향으로만 흐를 수 있으며**, 상위 레이어는 하위 레이어만 참조할 수 있습니다.

---

## 🔄 상태관리 전략

- `features/`는 주로 로컬 상태 및 UI 검증 로직을 담당 (`useSignupForm`, `useLoginForm` 등)
- `entities/`는 글로벌한 상태 관리 책임 (ex. 로그인 유저 상태 → `useUserStore`)
- 상태는 가능한 **단일 소스 원칙(Single Source of Truth)**을 따르고, UI에는 props를 통해 전달

---

## 📦 공개 API (index.ts)

각 Slice는 `index.ts`를 통해 필요한 컴포넌트, 훅, 타입만 외부로 노출합니다.
내부 로직은 숨기고, 필요한 것만 공개하여 **응집성과 캡슐화**를 높입니다.

```ts
// features/signup/index.ts
export { useSignupForm } from "./model/useSignupForm";
export { default as SignupEmailInput } from "./ui/signupEmailInput";
export { default as SignupPasswordInput } from "./ui/signupPasswordInput";
export { default as SignupSubmitButton } from "./ui/signupSubmitButton";
```

---

## 🧪 테스트 전략

- 테스트는 각 기능 폴더 내 `__tests__/` 디렉토리에 위치
- `Jest` + `Testing Library` 기반으로 동작, 유효성, 흐름을 검증
- 공통 모킹은 `/__mocks__/` 디렉토리에 위치

```plaintext
features/
  └── signup/
      └── __tests__/
          └── signupForm.test.tsx
shared/
  └── ui/
      ├── button.tsx
      └── __tests__/
          └── button.test.tsx
```

### 테스트 범주 예시

| 유형             | 설명                                     |
| ---------------- | ---------------------------------------- |
| 렌더링 테스트    | 컴포넌트 렌더링 여부 확인                |
| 유효성 테스트    | 입력값 검증 및 오류 메시지 확인          |
| 동작 테스트      | 버튼 클릭 → 요청 실행 여부 검증          |
| 통합 흐름 테스트 | 로그인 후 리디렉션 등 실제 시나리오 검증 |

---

## ❓왜 `processes/`, `pages/`는 생략되었는가?

### ✅ `processes/` 생략 이유

- 단순 조합을 위한 중간 계층은 현재 프로젝트 규모에선 필요하지 않음
- 페이지 또는 위젯에서 직접 feature 조립으로 충분

### ✅ `pages/` 생략 이유

- Next.js App Router 기반에서는 `app/`이 `pages/`를 대체함
- 기존 `pages/` 구조는 Pages Router용이므로, App Router에서는 사용하지 않음

---

## ▶️ 시작 방법

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

## ✅ 요약 문장

> 이 프로젝트는 **Feature-Sliced Design 아키텍처**를 기반으로 `features/`, `entities/`, `widgets/`, `shared/`, `app/` 계층을 통해 **명확한 책임 분리**와 **기능 중심의 구조 확장성**을 확보하였으며, `processes/`, `pages/`는 **Next.js App Router 기준으로 생략**되었습니다.
