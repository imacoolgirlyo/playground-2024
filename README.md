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

### Object 에 익숙해지기

0. Object 책 1,2,3장을 읽고 객체 지향의 기본 개념에 대해서 알아봅니다.

1. 영화 예매 시스템의 도메인들을 생각해보고 이를 객체로 만들어봅니다. url: `/oop/ticketApplication`

- js에서의 class 생성, 사용, 접근 제어자 등에도 익숙해집니다.

2. 실제 컴포넌트에서 할인 정책에 따라 할인된 영화 금액들을 보여주고 싶습니다. 컴포넌트 내에 이리 저리 흩어져있는 중요 비즈니스 로직들을 한 곳에서 관리 할 수 있도록 리팩토링 해봅시다.
   url: `/ticket-calculator`

- calculateDiscountPrice 함수를 screening 객체 내에서 처리할 수 있도록 바꿔봅시다.
- screening.getDiscountAmount 에서는 discountPolicy의 타입에 따라 총 할인 금액을 계산하는 방식을 다르게 처리하고 있습니다.
  만약, 할인 정책이 더 늘어난다면 discountPolicy type도 늘어날 것이고 그에 따라 계산하는 방식들도 더 추가 됩니다. 할인 금액을 계산하는 방식을 꼭 screening이 알아야할까요? discountPolicy가 직접 계산하게끔 리팩토링 해봅시다.
  - DiscountPolicy interface 생성, AmountDiscountPolicy, PercentDiscountPolicy 만들기
