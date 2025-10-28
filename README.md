# Heum App 🏊‍

> 수영 기록 및 소셜(피드) 기능을 제공하는 크로스플랫폼(Android, iOS, Web) 앱입니다.
>
> 이 문서는 `팀 허우적 허우적`을 위한 메인 프로젝트 가이드입니다.

<br>

## ✨ 1. 핵심 기술 스택 (Core Tech Stack)

이 프로젝트는 다음의 핵심 라이브러리를 기반으로 합니다.

* **코어**: `React Native`, `Expo (Managed)`
* **라우팅**: `Expo Router (v3)`
* **스타일링**: `NativeWind (v4)` (Tailwind CSS for React Native)
* **서버 상태 관리**: `React Query (TanStack Query)`
* **클라이언트 상태 관리**: `Zustand`
* **언어**: `TypeScript`

<br>

## 🚀 2. 시작하기 (Getting Started)

### 의존성 설치

```bash
npm install
```
### 개발 서버 실행
babel.config.js 또는 tailwind.config.js 수정 후에는 항상 캐시를 초기화하는 것이 좋습니다.

```bash
# 캐시를 비우고 서버 시작 (권장)
npx expo start -c

# 또는 npm 스크립트 (package.json에 등록된)
npm run start --clear
```

### 플랫폼별 실행
서버 실행 후 터미널에서 해당 키를 누릅니다.

- **Android**: a 키
- **iOS**: i 키
- **Web**: w 키

## 📂 3. 프로젝트 구조 철학 (Architecture)

이 프로젝트는 `app/`과 `src/`라는 두 개의 핵심 폴더로 분리됩니다.

### `app/` (라우팅과 화면 조립)

> "어떤 화면이 어디에 있는지"를 정의합니다. (Expo Router의 영역)

* `app/` 폴더의 파일/폴더 구조가 그대로 앱의 URL과 내비게이션 경로가 됩니다.
* `_layout.tsx` 파일은 해당 폴더의 **레이아웃**이나 **네비게이터**(`Stack`, `Tabs`) 역할을 합니다.
* `(group)` 폴더는 URL 경로에 영향을 주지 않고 레이아웃을 분리합니다. (예: `(auth)`와 `(main)`)
* `app/` 폴더의 파일(예: `app/(main)/(tabs)/index.tsx`)은 "껍데기"이며, 실제 UI 로직은 `src/features/`에서 가져와 **조립**합니다.

### `src/` (기능과 로직)

> **"그 화면이 어떻게 동작하는지"**를 정의합니다. (팀 협업의 영역)

* **`src/features/` (⭐ 핵심)**
    * 팀 협업 시 **충돌(Conflict)을 방지**하기 위해 도메인(기능)별로 코드를 분리합니다.
    * `auth` 담당자는 `src/features/auth/` 폴더만 수정하고, `record` 담당자는 `src/features/record/` 폴더만 수정하는 것을 원칙으로 합니다.
    * 각 `feature` 폴더는 자신의 `api`, `hooks`, `components`를 가질 수 있습니다.

* **`src/components/common/`**
    * **NativeWind**를 기반으로 스타일링된, 앱 전역에서 재사용되는 공통 컴M포넌트입니다.
    * 예: `Button.tsx`, `Card.tsx`, `Input.tsx`, `Modal.tsx` 등

* **`src/store/`**
    * `Zustand` 스토어를 관리합니다. (예: `authStore.ts`)

* **`src/api/`**
    * `React Query`의 `queryFn`이나 `axios` 인스턴스 등 공통 API 로직을 관리합니다.

* **`src/hooks/` / `src/constants/` / `src/lib/`**
    * 전역에서 사용되는 공통 훅, 상수, 유틸리티 함수를 관리합니다.

<br>

## 📁 4. 전체 디렉토리 구조 (Tree)

```plaintext
heum-app/
│
├── app/                      # (A) 라우팅 (Expo Router)
│   ├── (auth)/             # 1. 인증 그룹 (로그인 전)
│   │   ├── _layout.tsx     # (Stack)
│   │   └── signup.tsx
│   │
│   ├── (main)/             # 2. 메인 앱 그룹 (로그인 후)
│   │   ├── (tab)/
│   │   │   ├── _layout.tsx # (Tabs) 5개 탭
│   │   │   ├── index.tsx   # 홈(대시보드)
│   │   │   ├── calendar.tsx
│   │   │   ├── feed.tsx
│   │   │   ├── gear.tsx
│   │   │   └── my.tsx
│   │   ├── record/         # 탭을 덮는 스크린 (상세)
│   │   │   ├── [date].tsx
│   │   │   └── create.tsx
│   │   └── _layout.tsx     # (Stack) (tab)과 record/를 관리
│   │
│   ├── (onboarding)/       # 3. 온보딩 그룹 (최초 1회)
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   │
│   └── _layout.tsx         # 0. 최상위 레이아웃 (Provider)
│
├── src/                      # (B) 기능 및 로직
│   │
│   ├── api/
│   ├── assets/
│   ├── components/
│   │   └── common/         # NativeWind 기반 공통 컴포넌트
│   │
│   ├── features/           # (C) ⭐ 팀 협업을 위한 기능별 폴더
│   │   ├── auth/
│   │   ├── calendar/
│   │   ├── dashboard/
│   │   ├── record/
│   │   └── ... (기능별)
│   │
│   ├── hooks/
│   ├── lib/ (utils)
│   └── store/              # Zustand 스토어
│
├── app.json                # Expo 설정
├── babel.config.js         # NativeWind 플러그인 설정
├── tailwind.config.js      # NativeWind (Tailwind) 설정
└── package.json

```

## 💡 5. 자주 발생하는 문제 (Troubleshooting)

* **Q: 스타일이 적용되지 않거나 `className`이 작동하지 않아요.**
    * A: `tailwind.config.js`의 `content` 배열에 `app/`과 `src/` 경로가 올바르게 추가되었는지 확인하세요.
    * A: `babel.config.js`에 `plugins: ['nativewind/babel']`이 추가되었는지 확인하세요.
    * A: 설정 변경 후에는 **반드시 `npx expo start -c`로 캐시를 비우고 재시작**하세요.
* **Q: Expo Router가 새 파일을 인식하지 못해요.**
    * A: `expo-router`는 가끔 새 파일을 즉시 인식하지 못합니다. `npx expo start -c`로 재시작하세요.
* **Q: `app/` 폴더에 파일을 만들었는데 탭이나 헤더가 이상해요.**
    * A: 해당 파일이 속한 그룹(폴더)의 `_layout.tsx` 파일(`Stack` 또는 `Tabs`)에 `<Stack.Screen name="..."/>`으로 올바르게 등록되었는지 확인하세요.

# rn-app
