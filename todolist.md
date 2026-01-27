# Admin UI 구현 TODO

## 1. 인증 시스템
- [x] AdminAuthProvider (Context + localStorage 토큰 관리)
- [x] useAdmin 훅 (토큰 가져오기, 로그아웃, 인증 API 호출 헬퍼)
- [x] /admin/login 페이지

## 2. 어드민 레이아웃
- [x] /admin/layout.tsx (인증 체크, 네비게이션)

## 3. 포스트 목록 (대시보드)
- [x] /admin/page.tsx (포스트 목록 테이블, 삭제 버튼)
- [x] PostList 컴포넌트

## 4. 글 작성/수정 폼
- [x] PostForm 공용 컴포넌트 (title, description, category, thumbnail, markdown, is_public)
- [x] 마크다운 에디터 + 실시간 미리보기
- [x] 이미지 업로드 연동 (썸네일 + 본문 이미지)

## 5. 글 작성 페이지
- [x] /admin/posts/new/page.tsx

## 6. 글 수정 페이지
- [x] /admin/posts/[id]/edit/page.tsx

## 7. 빌드 검증
- [x] pnpm build 통과 확인
