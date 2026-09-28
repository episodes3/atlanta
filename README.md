# Atlanta Trip Note 2026
GitHub Pages용 정적 사이트입니다.

## 배포
1. 이 폴더의 index.html, style.css, app.js를 GitHub 저장소 루트에 업로드합니다.
2. GitHub → Settings → Pages → Deploy from a branch → main / root 선택.
3. 생성된 Pages URL로 접속합니다.

## 저장 방식
메모, 체크리스트, 구성안 노트는 현재 브라우저 localStorage에 저장됩니다. 같은 브라우저/기기에서는 새로고침해도 유지됩니다. 여러 기기 동기화가 필요하면 Supabase 연동이 필요합니다.
