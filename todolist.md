# Admin CRUD API 구현 TODO

## 개요
Supabase 기반 어드민 CRUD API를 Next.js Route Handlers로 구현.
ADMIN_PASSWORD 기반 인증, 이미지 업로드(S3) 포함.

## API 라우트 구조
```
src/app/api/admin/
├── auth.ts                    # 인증 헬퍼 (validateAdmin)
├── posts/
│   ├── route.ts               # GET (목록), POST (생성)
│   └── [id]/
│       └── route.ts           # GET (상세), PUT (수정), DELETE (삭제)
├── categories/
│   ├── route.ts               # GET (목록), POST (생성)
│   └── [id]/
│       └── route.ts           # PUT (수정), DELETE (삭제)
└── upload/
    └── route.ts               # POST (S3 이미지 업로드)
```

---

## TODO

### 1. 인증 헬퍼
- [x] `src/app/api/admin/auth.ts` 생성
  - `Authorization: Bearer <ADMIN_PASSWORD>` 검증 함수
  - 실패 시 401 응답 반환 헬퍼

### 2. 포스트 API
- [x] `src/app/api/admin/posts/route.ts`
  - [x] **GET** - 전체 포스트 목록 (is_public 무관, 어드민용)
    - `createAdminClient()` 사용, posts + categories + images 조인
  - [x] **POST** - 포스트 생성
    - body: `{ title, description, markdown, category_id, thumbnail_id?, is_public }`
    - posts 테이블 insert

- [x] `src/app/api/admin/posts/[id]/route.ts`
  - [x] **GET** - 단일 포스트 상세 (UUID로 조회)
  - [x] **PUT** - 포스트 수정 (`Partial<PostInsert>`)
  - [x] **DELETE** - 포스트 삭제 (hard delete)

### 3. 카테고리 API
- [x] `src/app/api/admin/categories/route.ts`
  - [x] **GET** - 카테고리 목록
  - [x] **POST** - 카테고리 생성 (`{ main_category, sub_category }`)

- [x] `src/app/api/admin/categories/[id]/route.ts`
  - [x] **PUT** - 카테고리 수정
  - [x] **DELETE** - 카테고리 삭제

### 4. 이미지 업로드 API
- [x] `src/app/api/admin/upload/route.ts`
  - [x] **POST** - 이미지 업로드
    - FormData로 파일 수신
    - `@aws-sdk/client-s3` PutObjectCommand로 S3 업로드
    - images 테이블에 레코드 insert (s3_key, alt, width, height)
    - CloudFront URL + image record 반환

---

## 기술 사항

| 항목 | 결정 |
|------|------|
| 인증 | `ADMIN_PASSWORD` 환경변수, Bearer 토큰 방식 |
| DB 클라이언트 | `createServiceClient()` (service role key, RLS 우회) |
| 이미지 저장 | AWS S3 + CloudFront CDN |
| 라우트 방식 | Next.js App Router Route Handlers |
| 기존 코드 영향 | 없음 (기존 읽기 API와 독립적) |

## 검증 방법
- [ ] `pnpm build` 빌드 오류 확인
- [ ] curl로 각 엔드포인트 호출 테스트
- [ ] 인증 실패 시 401 응답 확인
