# 과제명

## 과제 시작

1. tools 붙여넣기

2. 최초 의존성, ESLint, Prettier 설치
  npm install
  npx install-peerdeps --dev eslint-config-airbnb
  npm install prettier -D

3. package.json, package-lock.json 변경사항 삭제

4. 초기 커밋
  git add .
  git commit -m "chore: 초기 환경 설정"

5. README.md, REQUIREMENTS.md 작성
  최소 통과 기준 (ApplicationTest 기준)
  구현 기능 목록 정리

6. 문서 커밋
  git add .
  git commit -m "docs: 리드미, 요구사항 작성"

### 주의사항

- async/await 잘 붙이기
- private 메서드에 return 잘 붙이기
- getter에 잘 () 붙이기
- lint 같은 거 잘 안 되면 재시작 해보기
- 입력 상태를 유지한다면 instance로 만들기

## 최소 통과 기준 (ApplicationTest)

- [ ] 일에 0입력 예외 후 재입력 처리
  - [x] 0입력
- [ ] 정상적인 입력 처리

## 중요 조건

- 재입력
- 여러 단계 중간 실패 시 처음부터 재입력
- 휴일: 토, 일, 법정공휴일
- 평일, 휴일 사이클 다름
- 연속 2일 근무하게 될 경우 다음 근무자와 순번 바꿈
- 닉네임 5자 이내 중복x
- 최소 5명, 최재 35명 근무자
- 2월은 28일까지임

### 휴일

- 1.1
- 3.1
- 5.5
- 6.6
- 8.15
- 10.3
- 10.9
- 12.25

## 예외

- [ ] 한 종류 순번에 두 번 편성x
- [ ] 연속 2일 근무x

## 구현 기능 목록

- [x] 시작 월, 요일 입력
- [x] 근무 순번대로 닉네임 입력
- [ ] 각 요소에 나눠 출력
- [ ] 요일 순번대로 하는 로직
- [ ] 실패 시 단계별 재입력

### 1. 입력

- [x] 시작 월, 요일 csvstring
- [x] 평일/휴일 근무 순번대로 닉네임 csvstring

### 2. 핵심 로직

- [ ] 

### 3. 출력

- [ ] 선택 `달 일 요일 이름`
  - [ ] 평일이변서 법정공휴일일 경우 뒤에 (휴일) 표기
- [x] 월
- [x] +일
- [x] +요일
- [x] +휴일
- [ ] +이름
