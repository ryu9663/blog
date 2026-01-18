# Performance Optimization Analysis Command

Analyze the blog codebase from a performance optimization perspective and provide improvement recommendations as a senior frontend developer.

## Input

$ARGUMENTS: Analysis target (optional)
- Specific file path: `src/app/post/[id]/page.tsx`
- Specific directory: `src/app/_components/`
- Analysis type: `bundle`, `rendering`, `data-fetching`, `images`
- If empty: Full codebase analysis

## Reference Skill

**Always analyze based on rules from `.claude/skills/react-best-practices/SKILL.md`.**

Individual rule details: `.claude/skills/react-best-practices/rules/*.md`

## Analysis Process

### 1. Priority 1: Eliminating Waterfalls (CRITICAL)

**Related rules:** `async-*`

```bash
# Promise.all usage
grep -r "Promise.all" src/ --include="*.tsx" --include="*.ts"

# Sequential await patterns (potential Waterfall) - async-parallel violation
grep -rn "await" src/ --include="*.tsx" | head -30

# Suspense boundary usage - async-suspense-boundaries
grep -r "<Suspense" src/ --include="*.tsx"
```

**Checklist:**
- [ ] `async-parallel`: Use Promise.all() for independent operations
- [ ] `async-defer-await`: Move await to actual usage point
- [ ] `async-suspense-boundaries`: Stream content with Suspense

### 2. Priority 2: Bundle Size Optimization (CRITICAL)

**Related rules:** `bundle-*`

```bash
# Barrel import anti-pattern - bundle-barrel-imports violation
grep -r "export \* from" src/ --include="index.ts"
grep -r "from \".*/index\"" src/ --include="*.tsx"

# Dynamic import usage - bundle-dynamic-imports
grep -r "dynamic(" src/ --include="*.tsx"
grep -r "import(" src/ --include="*.tsx" --include="*.ts"

# Client component ratio
grep -r "use client" src/ --include="*.tsx" | wc -l
```

**Checklist:**
- [ ] `bundle-barrel-imports`: Import directly, avoid barrel files
- [ ] `bundle-dynamic-imports`: Use next/dynamic for heavy components
- [ ] `bundle-defer-third-party`: Load analytics/logging after hydration
- [ ] `bundle-preload`: Preload on hover/focus for perceived speed

### 3. Priority 3: Server-Side Performance (HIGH)

**Related rules:** `server-*`

```bash
# React.cache() application - server-cache-react
grep -r "import { cache }" src/app/api/
grep -rn "export const" src/app/api/dato/ --include="*.ts"

# Minimize data passed to client - server-serialization
grep -r "PostType\|PostWithoutMarkdownType" src/ --include="*.tsx"

# Parallel fetching - server-parallel-fetching
grep -r "Promise.all" src/app/ --include="*.tsx"
```

**Checklist:**
- [ ] `server-cache-react`: Apply React.cache() to all API functions
- [ ] `server-serialization`: Minimize data passed to client components
- [ ] `server-parallel-fetching`: Restructure components for parallel fetching

### 4. Priority 4: Client-Side Data Fetching (MEDIUM-HIGH)

**Related rules:** `client-*`

```bash
# SWR usage - client-swr-dedup
grep -r "useSWR\|from \"swr\"" src/

# Global event listener duplication - client-event-listeners
grep -r "addEventListener" src/ --include="*.tsx"
grep -r "removeEventListener" src/ --include="*.tsx"
```

**Checklist:**
- [ ] `client-swr-dedup`: Use SWR for automatic request deduplication
- [ ] `client-event-listeners`: Deduplicate global event listeners

### 5. Priority 5: Re-render Optimization (MEDIUM)

**Related rules:** `rerender-*`

```bash
# Inline function/object patterns (cause re-renders)
grep -r "onClick={() =>" src/ --include="*.tsx" | head -20
grep -r "style={{" src/ --include="*.tsx" | head -20

# useCallback/useMemo usage
grep -r "useCallback\|useMemo" src/ --include="*.tsx"

# useEffect dependencies - rerender-dependencies
grep -r "useEffect" src/ --include="*.tsx" -A 3 | head -40
```

**Checklist:**
- [ ] `rerender-memo`: Extract expensive work into memoized components
- [ ] `rerender-dependencies`: Use primitive dependencies in effects
- [ ] `rerender-functional-setstate`: Use functional setState for stable callbacks
- [ ] `rerender-lazy-state-init`: Pass function to useState for expensive initialization

### 6. Priority 6: Rendering Performance (MEDIUM)

**Related rules:** `rendering-*`

```bash
# Conditional rendering pattern - rendering-conditional-render
grep -r "&& <" src/ --include="*.tsx" | head -20

# content-visibility usage - rendering-content-visibility
grep -r "content-visibility" src/ --include="*.scss"

# Static JSX hoisting - rendering-hoist-jsx
grep -r "const.*=.*<" src/ --include="*.tsx" | head -20
```

**Checklist:**
- [ ] `rendering-conditional-render`: Use ternary instead of &&
- [ ] `rendering-content-visibility`: Use content-visibility for long lists
- [ ] `rendering-hoist-jsx`: Extract static JSX outside components

### 7. Priority 7: JavaScript Performance (LOW-MEDIUM)

**Related rules:** `js-*`

```bash
# RegExp in loops - js-hoist-regexp
grep -rn "new RegExp" src/ --include="*.ts" --include="*.tsx"

# Array method chaining - js-combine-iterations
grep -r "\.filter.*\.map\|\.map.*\.filter" src/ --include="*.tsx"
```

**Checklist:**
- [ ] `js-hoist-regexp`: Hoist RegExp creation outside loops
- [ ] `js-combine-iterations`: Combine multiple filter/map into one loop
- [ ] `js-set-map-lookups`: Use Set/Map for O(1) lookups

### 8. Image Optimization

```bash
# Next.js Image component usage
grep -r "from \"next/image\"" src/
grep -r "<Image" src/ -A 3 | head -30

# Plain img tag usage (warning)
grep -r "<img" src/ --include="*.tsx"
```

**Checklist:**
- [ ] Next/Image component usage
- [ ] priority attribute (LCP images)
- [ ] Appropriate sizes specification

## Analysis Result Template

```markdown
## Performance Analysis Report

### Executive Summary
- Overall Performance Score: [A/B/C/D/F]
- Key Bottlenecks:
- Expected Improvement:

---

### Priority 1: Eliminating Waterfalls (CRITICAL)

| Rule | Status | Location | Improvement |
|------|--------|----------|-------------|
| async-parallel | | | |
| async-defer-await | | | |
| async-suspense-boundaries | | | |

---

### Priority 2: Bundle Size Optimization (CRITICAL)

| Rule | Status | Location | Improvement |
|------|--------|----------|-------------|
| bundle-barrel-imports | | | |
| bundle-dynamic-imports | | | |
| bundle-defer-third-party | | | |

---

### Priority 3: Server-Side Performance (HIGH)

| Rule | Status | Location | Improvement |
|------|--------|----------|-------------|
| server-cache-react | | | |
| server-serialization | | | |
| server-parallel-fetching | | | |

---

### Priority 4-5: Client & Re-render (MEDIUM)

| Rule | Status | Location | Improvement |
|------|--------|----------|-------------|
| client-swr-dedup | | | |
| rerender-memo | | | |
| rerender-dependencies | | | |

---

### Improvement Roadmap by Priority

#### P0 - Critical (Immediate)
- [ ]

#### P1 - High (Within 1 week)
- [ ]

#### P2 - Medium (Within 2 weeks)
- [ ]

---

*Analyzed by Claude Code with react-best-practices skill*
```

## Reference Documents

- **React Best Practices**: `.claude/skills/react-best-practices/SKILL.md`
- **Individual Rule Details**: `.claude/skills/react-best-practices/rules/*.md`
- **Project Guidelines**: `CLAUDE.md`