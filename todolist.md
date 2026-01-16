# React Best Practices 개선 Todo List

`posts/page.tsx` 컴포넌트 트리 분석 결과

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

*Generated: 2026-01-17*
