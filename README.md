# 🍀 운세 로또 번호 추천 앱

  생년월일시를 기반으로 사주팔자와 수비학을 활용해 나만의 행운 로또 번호를 추천해주는 MZ 스타일 웹 앱입니다.

  ## ✨ 주요 기능

  - **생년월일시 입력** — 태어난 연도/월/일/시각 선택
  - **운세 분석** — 천간지지, 오행, 수비학 기반 번호 생성
  - **결과 페이지** — 로또볼 애니메이션 + 행운 지수 / 메시지 / 방향 / 색상
  - **다크 / 라이트 모드** — 우측 상단 버튼으로 전환

  ## 🛠 기술 스택

  | 영역 | 기술 |
  |------|------|
  | 프론트엔드 | React 19, Vite, TailwindCSS, Framer Motion |
  | 백엔드 | Express 5, TypeScript |
  | API 설계 | OpenAPI 3.1 → Orval 코드젠 |
  | 모노레포 | pnpm workspaces |

  ## 🚀 로컬 실행

  ```bash
  pnpm install

  # API 서버
  pnpm --filter @workspace/api-server run dev

  # 프론트엔드
  pnpm --filter @workspace/lotto-app run dev
  ```

  ## 📁 프로젝트 구조

  ```
  .
  ├── artifacts/
  │   ├── api-server/   # Express API (운세 계산 로직)
  │   └── lotto-app/    # React + Vite 프론트엔드
  ├── lib/
  │   ├── api-spec/     # OpenAPI 스펙
  │   ├── api-client-react/  # 생성된 React Query 훅
  │   ├── api-zod/      # 생성된 Zod 스키마
  │   └── db/           # Drizzle ORM
  └── scripts/
  ```
  