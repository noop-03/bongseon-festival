# 제48회 봉선의 메아리 — 디지털 리플렛

Stack: Next.js 15 + TypeScript + Tailwind CSS 4, Supabase (DB/Auth/Storage), Vercel, GitHub Actions CI/CD, Sentry, Jest, Playwright.

## 로컬 개발

1. `.env`를 `.env.local`로 복사 후 값 채우기
2. `npm i`
3. `npm run dev`

## Supabase

- `data/supabase.sql` 스키마를 프로젝트에 적용하세요.
- Auth 가입 시 `profiles`에 자신의 `id`로 레코드 생성 필요.
- 관리자 권한은 `profiles.role = 'admin'`으로 설정.

## 배포

- Vercel 프로젝트에 환경변수 등록
- GitHub Actions (`.github/workflows/ci.yml`)가 빌드/테스트

