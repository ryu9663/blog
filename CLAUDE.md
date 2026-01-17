# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 헌법 (Project Constitution)

이 블로그는 개발자 류준열의 기술 블로그로, 다음 원칙들을 엄격히 준수해야 합니다.

### 핵심 가치
1. **성능 최적화**: 모든 코드는 성능을 최우선으로 고려
2. **사용자 경험**: 빠른 로딩, 직관적인 인터페이스, 접근성 보장
3. **SEO 최적화**: 검색 엔진 최적화를 통한 콘텐츠 도달률 극대화
4. **코드 품질**: 타입 안정성과 유지보수성을 최우선으로 고려

## Development Commands

- **Development**: `pnpm dev` - Next.js 개발 서버 시작
- **Build**: `pnpm build` - 프로덕션 빌드 (.next 디렉토리 먼저 삭제)
- **Production**: `pnpm start` - 프로덕션 서버 시작 (포트 8080)
- **Bundle Analysis**: `pnpm analyze` - 번들 분석기와 함께 빌드
- **Linting**: 
  - `pnpm lint` - ESLint 실행
  - `pnpm lint:fix` - ESLint 자동 수정
  - `pnpm lint:style` / `pnpm lint:style:fix` - SCSS 스타일 린팅
- **Testing**: `pnpm test` - Jest 테스트 실행 (watch 모드)

## SEO 최적화 가이드라인

### 메타데이터 관리
- 모든 페이지는 고유한 title과 description을 가져야 함
- `src/app/layout.tsx`의 metadata 객체 활용
- OpenGraph 이미지는 800x600, 1800x1600 두 가지 사이즈 제공
- locale은 `ko_KR` 사용

### 구조화된 데이터
- 블로그 포스트는 Article schema 적용 필요
- 작성일, 수정일, 작성자 정보 포함
- 카테고리와 태그 정보 구조화

### 성능 최적화
- Next.js Image 컴포넌트 필수 사용
- `next.config.js`에 허용된 이미지 도메인만 사용
- ISR(Incremental Static Regeneration) 활용: `REVALIDATE_TIME = 10초`
- **Request Deduplication**: `React.cache()`로 API 중복 호출 자동 제거
- **병렬 데이터 페칭**: `Promise.all()`로 독립적인 API 호출 동시 실행

### URL 구조
- `/post/[id]` - 개별 포스트
- `/posts/[category]` - 카테고리별 목록
- `/posts/[category]/[subCategory]` - 서브카테고리 목록
- 모든 URL은 의미 있는 구조 유지

## 검색 시스템 아키텍처

### Fuse.js 기반 클라이언트 사이드 검색
- 서버 요청 없는 즉시 검색 결과 제공
- 퍼지 검색으로 오타 허용성 제공
- 검색 가중치: 제목(0.5), 설명(0.5)

### 검색 성능 최적화
```typescript
const searchOptions = {
  keys: [
    { name: 'metaField.title', weight: 0.5 },
    { name: 'metaField.description', weight: 0.5 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
};
```

### 디바운싱 적용
- `useDebounce` 훅으로 500ms 지연 적용
- 불필요한 검색 연산 최소화

## 코드베이스 아키텍처

### 디렉토리 구조
```
src/
├── app/                    # App Router 구조
│   ├── _components/        # 공용 컴포넌트
│   ├── api/dato/          # DatoCMS API 엔드포인트
│   ├── post/[id]/         # 동적 포스트 페이지
│   └── posts/             # 카테고리별 포스트 목록
├── libs/dato/             # DatoCMS GraphQL 클라이언트
├── utils/                 # 유틸리티 함수
├── types/                 # TypeScript 타입 정의
└── styles/               # 글로벌 SCSS 스타일
```

### 컴포넌트 설계 원칙
1. **단일 책임 원칙**: 각 컴포넌트는 하나의 명확한 역할
2. **CSS Modules**: 모든 컴포넌트는 `.module.scss` 사용
3. **타입 안정성**: Props와 상태에 대한 엄격한 타입 정의
4. **재사용성**: 공용 컴포넌트는 `_components/`에 위치

### TypeScript 타입 컨벤션
1. **타입 정의 위치**: 모든 공용 타입은 `src/types/` 디렉토리에 정의
2. **명명 규칙**:
   - 인터페이스/타입명은 PascalCase + `Type` 접미사 (예: `PostType`, `MetaFieldType`)
   - 변형 타입은 명확한 의미 전달 (예: `PostWithoutMarkdownType`)
3. **타입 재사용**:
   - `PostWithoutMarkdownType = Omit<PostType, "markdown">`: markdown 필드가 불필요한 목록/사이드바 컴포넌트에서 사용
   - 불필요한 데이터 전송 방지 및 타입 안정성 향상
4. **제네릭 활용**: API 함수는 제네릭으로 응답 타입 지정

```typescript
// 전체 포스트 타입 (마크다운 포함)
const post = await getPostById<{ article: PostType }>({ postId });

// 마크다운 제외 타입 (목록/사이드바용)
const posts = await getPosts<{ allArticles: PostWithoutMarkdownType[] }>();
```

### 상태 관리
- **Zustand**: 사이드바 상태 관리 (`src/app/_components/Sidebar/index.store.tsx`)
- **React State**: 컴포넌트별 로컬 상태
- 전역 상태 최소화 원칙

## 스타일링 가이드라인

### SCSS 아키텍처
```
styles/
├── _global.scss          # 글로벌 스타일
├── _reset.scss           # CSS 리셋
├── _libs.scss            # 외부 라이브러리 스타일
└── libs/
    ├── _palette.scss     # 컬러 팔레트
    ├── _vars.scss        # SCSS 변수
    ├── _mixins.scss      # SCSS 믹스인
    └── _animations.scss  # 애니메이션 정의
```

### 디자인 시스템
- **Typography**: `typography.module.scss`에서 관리
- **Color Palette**: `_palette.scss`의 정의된 색상만 사용
- **Spacing**: 8px 기준 그리드 시스템
- **Responsive**: Mobile First 접근법

### CSS Modules 규칙
- 클래스명은 camelCase 사용
- BEM 방법론 적용하되 Module 스코핑 활용
- 전역 스타일은 최소한으로 제한

## DatoCMS 연동 가이드

### GraphQL 쿼리 최적화
- 필요한 필드만 요청
- 이미지 최적화: `responsiveImage` 활용
- 페이지네이션: `first: "100"` 제한

### 환경변수 관리
- `API_TOKEN`: DatoCMS API 토큰
- `GTM_ID`: Google Tag Manager ID

### 캐싱 전략
- ISR: `revalidate: 10초`
- 이미지 캐싱: Next.js Image 컴포넌트 활용
- DatoCMS CDN 최적화

## React Server Component 최적화 패턴

### React.cache()를 이용한 요청 중복 제거
- **위치**: `src/app/api/dato/*.ts` API 함수들
- **패턴**: 내부 함수를 구현한 후 `React.cache()`로 래핑하여 export
- **효과**: 동일 렌더링 사이클 내 중복 API 요청 자동 제거

```typescript
// src/app/api/dato/getPostById.ts 예시
import { cache } from "react";

const _getPostById = async <T>({ postId }: { postId: string }) => {
  // API 로직
};

// React.cache()로 같은 렌더링 요청 내 중복 호출 방지
export const getPostById = cache(_getPostById);
```

**적용 규칙**:
- 모든 DatoCMS API 함수는 `React.cache()` 적용 필수
- 함수명: 내부 구현은 `_functionName`, export는 `functionName`
- Server Component에서만 사용 (Client Component에서는 사용 불가)

### Promise.all을 이용한 병렬 데이터 페칭
- **목적**: Waterfall 패턴 제거로 로딩 시간 단축
- **적용 대상**: 서로 의존성이 없는 다중 API 호출

```typescript
// src/app/_components/SidebarWrapper/index.tsx 예시
const [postsResult, categoriesResult] = await Promise.all([
  getPosts<{ allArticles: PostWithoutMarkdownType[] }>(),
  getCategories<{ allArticles: Pick<PostWithoutMarkdownType, "category" | "_createdAt">[] }>(),
]);
```

**적용 규칙**:
- 독립적인 데이터 소스는 반드시 병렬로 fetch
- 순차 실행이 필요한 경우에만 개별 await 사용

## 성능 모니터링

### Core Web Vitals 최적화
- **LCP**: 2.5초 이하 목표
- **FID**: 100ms 이하 목표  
- **CLS**: 0.1 이하 목표

### 번들 사이즈 관리
- `pnpm analyze`로 정기적 분석
- Dynamic Import 활용으로 코드 스플리팅
- Tree Shaking 최적화

### 이미지 최적화
- WebP 포맷 우선 사용
- 적절한 사이즈 지정
- Lazy Loading 기본 적용

## 보안 및 접근성

### 보안
- 환경변수로 민감 정보 관리
- CORS 정책 준수
- XSS 방지를 위한 입력 검증

### 접근성 (a11y)
- 시맨틱 HTML 사용
- 키보드 네비게이션 지원
- 충분한 색상 대비
- 스크린 리더 호환성

## 테스팅 전략

### Jest 설정
- `**/*.test.ts`, `**/*.test.tsx` 패턴
- CSS Modules 모킹: `identity-obj-proxy`
- jsdom 환경에서 테스트 실행

### 테스트 범위
- 유틸리티 함수: 100% 커버리지 목표
- 컴포넌트: 주요 기능 테스트
- API 호출: MSW를 이용한 모킹

이 헌법을 준수하여 일관성 있고 고품질의 코드베이스를 유지하세요.