# science dictionary (과학용어 사전)

복잡한 과학 용어를 쉽고 명확하게 설명해주는 웹 애플리케이션입니다.

## 주요 기능
- **실시간 검색:** 용어 및 설명 키워드로 검색 가능
- **카테고리 필터:** 물리학, 화학, 생명과학, 지구과학별 분류
- **반응형 디자인:** 모바일과 데스크탑 모두 최적화된 UI

## 기술 스택
- **Frontend:** React, TypeScript, Vite, Lucide React
- **Backend:** Node.js, Express, TypeScript
- **Deployment:** Render (Blueprint 지원)

## 로컬 실행 방법
1. 저장소 클론
2. `npm run install:all` 실행 (모든 의존성 설치)
3. `npm start` 실행 (백엔드 서버 시작)
4. 다른 터미널에서 `cd frontend && npm run dev` 실행 (프론트엔드 시작)

## 배포 방법 (Render)
1. GitHub에 새 저장소를 생성하고 이 코드를 푸시합니다.
2. Render 대시보드에서 **Blueprints** -> **New Blueprint Instance**를 선택합니다.
3. 생성한 GitHub 저장소를 연결합니다.
4. `render.yaml` 설정에 따라 자동으로 모든 서비스가 배포됩니다.
