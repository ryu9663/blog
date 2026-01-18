# React Best Practices 개선 Todo List

## 전체 코드베이스 성능 분석 (2026-01-18)

**Overall Score: B+**

### P0 - Critical (즉시 적용)

- [x] **React.cache() 전체 API 함수 적용** (`server-cache-react`) ✅ 완료
  - ✅ `src/app/api/dato/getPosts.ts` - 적용 완료
  - ✅ `src/app/api/dato/getCategories.ts` - 적용 완료
  - ✅ `src/app/api/dato/getPostIds.ts` - 적용 완료
  - ✅ `src/app/api/dato/getPostById.ts` - 이미 적용됨
  - 효과: 동일 렌더링 사이클 내 중복 API 요청 자동 제거

```typescript
// 적용 예시
import { cache } from "react";

const _getPosts = async <T>(query = GET_META_FIELDS): Promise<T> => {
  // 기존 로직
};

export const getPosts = cache(_getPosts);
```

### P1 - High (1주 내 적용)

- [ ] **Shiki dynamic import 적용** (`bundle-dynamic-imports`)
  - 파일: `src/app/post/[id]/Markdown/_components/Code.tsx`
  - 문제: shiki는 번들 사이즈가 큰 라이브러리
  - 개선: dynamic import로 코드 스플리팅

```typescript
const highlightCode = async (code: string, language: string) => {
  const { codeToHtml } = await import("shiki");
  return codeToHtml(code, { lang: language, theme: "github-dark" });
};
```

- [ ] **Barrel imports 제거** (`bundle-barrel-imports`)
  - 파일: `src/types/index.ts`
  - 문제: `export * from` 패턴이 tree-shaking 방해
  - 개선: 직접 import 사용
    - Before: `import { PostType } from "@/types"`
    - After: `import { PostType } from "@/types/apiResponseType"`

### P2 - Medium (2주 내 적용)

- [ ] **Fuse.js lazy loading** (`bundle-conditional`)
  - 파일: `src/app/_components/Search/index.tsx`
  - 문제: 검색 기능이 항상 필요하지 않음
  - 개선: Search 컴포넌트 진입 시점에 dynamic import 고려

- [ ] **content-visibility 적용** (`rendering-content-visibility`)
  - 파일: Posts 컴포넌트 스타일
  - 적용 시점: 포스트 목록이 많아질 경우

---

## 잘 적용된 부분 (전체 분석)

| 패턴 | 위치 | 상태 |
|------|------|------|
| Promise.all 병렬 페칭 | `SidebarWrapper/index.tsx:11` | ✅ |
| Suspense boundaries | `layout.tsx:122`, `Markdown/index.tsx:40` | ✅ |
| Third-party 지연 로딩 | `layout.tsx:69,81` (afterInteractive) | ✅ |
| 데이터 직렬화 최적화 | `PostWithoutMarkdownType`, `Pick<>` 사용 | ✅ |
| Next/Image 사용 | `Cards`, `MarkdownImage`, `Heading` | ✅ |
| useMemo 적용 | `Search/index.tsx:17` (Fuse 인스턴스) | ✅ |
| useDebounce 적용 | 검색 입력 최적화 | ✅ |

---

## `posts/page.tsx` 컴포넌트 트리 분석 결과

## 컴포넌트 트리 구조

```
posts/page.tsx (Server Component)
├── h2
└── PostsWithSearch (Client Component - "use client")
    ├── Search (Client Component)
    │   └── input
    └── Posts
        └── section > div
            └── Cards
                └── Card[] (mapped)
                    └── Link > div
                        ├── Image
                        └── div (content)
```

---

## Todo Items

### Priority 1: CRITICAL

- [x] **Client Component 경계 최적화** (`server-serialization`) ✅ 완료
  - 파일: `src/app/_components/PostsWithSearch/index.tsx:12`
  - 문제: `initialPosts` 전체 데이터(markdown 본문 포함)가 클라이언트로 직렬화됨
  - 해결: `ClientPostType` 생성하여 markdown 필드 제외, 검색 가중치 재조정

---

### Priority 2: MEDIUM

- [ ] **useEffect 의존성 누락** (`rerender-dependencies`)
  - 파일: `src/app/_components/Search/index.tsx:40`
  - 문제: `onSearchResults`가 deps 배열에 누락됨
  - 개선: `useCallback`으로 안정화하거나 deps에 추가

- [ ] **불안정한 key 사용**
  - 파일: `src/app/_components/Cards/index.tsx:30`
  - 문제: `key={metaField.title}` - title은 중복 가능성 있음
  - 개선: `key={id}` 사용

---

### Priority 3: LOW

- [ ] **조건부 렌더링 패턴 개선** (`rendering-conditional-render`)
  - 파일: `src/app/_components/Cards/index.tsx:27-48`
  - 문제: `&&` 연산자 사용 시 falsy 값 렌더링 위험
  - 개선: `condition ? <Component /> : null` 삼항 연산자 사용

- [ ] **불필요한 Fragment 래핑 제거**
  - 파일: `src/app/_components/Cards/index.tsx:34`
  - 문제: `subCategory={<>{subCategory}</>}`
  - 개선: `subCategory={subCategory}`

- [ ] **ESLint 비활성화 주석 제거**
  - 파일: `src/app/_components/Cards/index.tsx:1-2`
  - 문제: `eslint-disable` 주석이 코드 품질 저하 유발
  - 개선: 미사용 변수 제거 후 주석 삭제

---

## 잘 적용된 부분

| 패턴 | 위치 | 설명 |
|------|------|------|
| `useMemo` for Fuse | `Search/index.tsx:17` | Fuse 인스턴스 메모이제이션 |
| Image lazy loading | `Cards/index.tsx:43` | 첫 3개만 eager, 나머지 lazy |
| Server Component 활용 | `posts/page.tsx` | 데이터 페칭이 서버에서 수행 |
| blur placeholder | `Cards/index.tsx:41-42` | 이미지 로딩 UX 개선 |

---

## 참고 규칙

- `server-serialization`: 클라이언트 컴포넌트로 전달되는 데이터 최소화
- `rerender-dependencies`: Effect 의존성 배열에 모든 의존성 포함
- `rendering-conditional-render`: 조건부 렌더링에 삼항 연산자 사용

---

*Last Updated: 2026-01-18*
