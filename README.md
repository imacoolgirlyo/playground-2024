## 🏊‍♀️ Playground

### flex CSS

url: /flex

1. contents의 height가 브라우저의 나머지 영역을 다 차지하도록 만들어보세요. (단, calc는 쓰지 않아야 함)
2. contents height가 나머지 영역의 절반만 차지하도록 만들어보세요.
3. contents와 header의 height가 각각 50%씩 차지하도록 만들어보세요.

<details>
<summary>정답</summary>

1. FlexComponent의 부모 element가 전체 브라우저 영역 height가 되도록 설정(부모의 높이를 100vh), Content에 `flex-grow: 1`

2. Content에 `flex-grow: 0.5`

3. Content, Header에 모두 `flex-grow: 1`

부모가 flex container 일 때, flex item들의 기본 사이즈를 더해도 영역이 남는 경우가 있다. 이때 만약 남은 영역을 다 채우게끔 만들어버리고 싶다면? 👉 자식에게 `flex-grow` 먹여서 얼만큼 남은 영역들을 차지하게끔 할것인지 설정

</details>
