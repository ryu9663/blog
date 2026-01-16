# PR Code Review Command

시니어 프론트엔드 개발자로서 PR 코드 리뷰를 수행합니다.

## 입력

$ARGUMENTS: GitHub PR URL (예: https://github.com/owner/repo/pull/123)

## 리뷰 프로세스

### 1. PR 정보 수집

URL에서 PR 정보를 추출하여 gh 명령어로 조회:

```bash
# PR 메타데이터 확인
gh pr view <PR_URL> --json title,body,files,additions,deletions

# PR diff 확인
gh pr diff <PR_URL>
```

### 2. 코드베이스 검증 (CRITICAL)

**타입과 실제 데이터 일치 여부 확인:**

변경된 코드가 타입 정의에만 의존하지 않고, 실제 데이터 흐름과 일치하는지 검증합니다.

예시 체크리스트:
- [ ] API/GraphQL 쿼리에서 실제로 해당 필드를 요청하는가?
- [ ] 타입 정의와 실제 런타임 데이터가 일치하는가?
- [ ] 제거하려는 필드가 실제로 전달되고 있는가?

```bash
# 관련 API 쿼리 확인
grep -r "query" src/app/api/ src/libs/

# 실제 데이터 흐름 추적
grep -r "<field_name>" src/
```

**불일치 발견 시 제안:**
- 타입 리팩토링 제안 (실제 데이터와 타입 일치시키기)
- 또는 실제로 필요한 데이터를 API에서 요청하도록 수정 제안

### 3. 사이드이펙트 분석

변경된 코드가 기존 기능에 영향을 주는지 확인:

```bash
# 변경된 파일/함수를 사용하는 곳 찾기
grep -r "<changed_function_or_component>" src/

# import 의존성 확인
grep -r "from.*<changed_file>" src/
```

체크리스트:
- [ ] 변경된 타입을 사용하는 다른 컴포넌트에 영향 없는가?
- [ ] 변경된 함수의 반환값이 달라져서 호출부에 영향 없는가?
- [ ] props 변경으로 인한 하위 컴포넌트 영향 없는가?

### 4. React Best Practices 검증

`.claude/skills/react-best-practices/SKILL.md` 기준으로 검토:

**Priority 1-3 (CRITICAL/HIGH) 중점 검토:**
- `server-serialization`: 클라이언트로 전달되는 데이터 최소화
- `bundle-barrel-imports`: 직접 import 사용
- `async-parallel`: 독립적 작업 병렬화
- `rerender-dependencies`: Effect 의존성 완전성

### 5. Gemini CLI를 통한 리뷰 요청

수집된 정보를 바탕으로 Gemini CLI에게 리뷰 요청:

```bash
# PR 정보와 diff를 수집하여 Gemini에게 전달
PR_INFO=$(gh pr view <PR_URL> --json title,body,files,additions,deletions)
PR_DIFF=$(gh pr diff <PR_URL>)

# Gemini CLI로 리뷰 요청
echo "다음 PR을 시니어 프론트엔드 개발자 관점에서 리뷰해주세요:

[PR 정보]
${PR_INFO}

[변경 내용]
${PR_DIFF}

[코드베이스 컨텍스트]
{관련 API 쿼리, 타입 정의, 사용처 등 - 위 단계에서 수집한 정보}

리뷰 관점:
1. 타입 정의와 실제 데이터 흐름 일치 여부
2. 기존 기능 사이드이펙트 가능성
3. React/Next.js 성능 최적화 패턴 준수
4. 코드 품질 및 유지보수성" | gemini
```

**Gemini CLI 사용 시 주의사항:**
- 긴 diff의 경우 파일로 저장 후 전달: `cat review_request.txt | gemini`
- 응답이 길 경우 `-s` 옵션으로 스트리밍 비활성화 가능

### 6. 리뷰 결과 정리

Gemini 응답과 코드베이스 분석 결과를 종합하여 리뷰 결과를 정리합니다.

```markdown
## PR Review by Gemini & Claude

### Summary
- 변경 목적:
- 영향 범위:

### Findings

#### Critical Issues
-

#### Warnings
-

#### Suggestions
-

### Type Consistency Check
- [ ] 타입과 실제 데이터 일치:
- [ ] 제안된 타입 리팩토링:

### Side Effect Analysis
- [ ] 영향받는 컴포넌트:
- [ ] 테스트 필요 영역:

### Best Practices Compliance
- [ ] server-serialization:
- [ ] rerender-dependencies:
- [ ] bundle optimization:

### Recommendation
- [ ] Approve
- [ ] Request Changes
- [ ] Needs Discussion

---
🤖 *Reviewed by Gemini CLI & Claude Code*
```

### 7. GitHub PR에 리뷰 코멘트 등록

`gh pr review` 명령어를 사용하여 PR에 리뷰 코멘트를 남깁니다:

```bash
# 리뷰 코멘트 남기기 (--comment: 승인/거절 없이 코멘트만)
gh pr review <PR_URL> --comment --body "$(cat <<'EOF'
## PR Review by Gemini & Claude

### Summary
...리뷰 내용...

---
🤖 *Reviewed by Gemini CLI & Claude Code*
EOF
)"

# 승인과 함께 코멘트
gh pr review <PR_URL> --approve --body "리뷰 내용"

# 변경 요청과 함께 코멘트
gh pr review <PR_URL> --request-changes --body "리뷰 내용"
```

**gh pr review 옵션:**
- `--comment`: 승인/거절 없이 코멘트만 남김
- `--approve`: PR 승인
- `--request-changes`: 변경 요청
- `--body`: 리뷰 본문 내용

## 참고 문서

- React Best Practices: `.claude/skills/react-best-practices/SKILL.md`
- 프로젝트 가이드라인: `CLAUDE.md`
