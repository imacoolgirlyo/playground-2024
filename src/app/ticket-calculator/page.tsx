"use client";
interface DiscountPolicy {
  getDiscountPrice(price: number): number;
}

interface DiscountCondition {
  type: "SEQUENCE" | "PERIOD";
  isSatisfiedBy(movie: Movie): boolean;
}

interface Movie {
  title: string;
  price: number;
  time: Date;
  discountPolicy: {
    type: "AMOUNT_DISCOUNT" | "PERCENT_DISCOUNT";
    discountAmount?: number;
    discountPercent?: number;
  };
}

function TicketCalculator() {
  // 여러 종류의 movie가 존재. 각 movie는 다른 가격 정책을 가짐
  // 가격 정책은 movie에 따라 다름
  // movie는 title, price, discountPolicy를 가지고 있음 (솔직히 discountPolicy랑 discountCondition이 헷갈림)
  // movie는 가격 정책을 가지고 있음
  const movies: Movie[] = [
    {
      title: "Dune 2",
      price: 15000,
      time: new Date(2024, 4, 2),
      discountPolicy: {
        type: "AMOUNT_DISCOUNT",
        discountAmount: 1000,
      },
    },
    {
      title: "혹성탈출",
      price: 20000,
      time: new Date(2024, 5, 1),
      discountPolicy: {
        type: "PERCENT_DISCOUNT",
        discountPercent: 10,
      },
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.title}
            style={{
              border: "1px solid black",
              padding: "10px",
              margin: "10px",
            }}
          >
            <div>{movie.title}</div>
            <div>{movie.price}원</div>
            <div>
              {movie.discountPolicy.type === "AMOUNT_DISCOUNT"
                ? `${movie.discountPolicy.discountAmount}원 할인`
                : `${movie.discountPolicy.discountPercent}% 할인`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicketCalculator;
