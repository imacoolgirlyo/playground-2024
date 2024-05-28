"use client";

import emotionStyled from "@emotion/styled";
import { useState } from "react";

interface DiscountPolicy {
  getDiscountPrice(price: number): number;
}

interface DiscountCondition {
  type: "SEQUENCE" | "PERIOD";
  isSatisfiedBy(screening: Screening): boolean;
}

interface Screening {
  whenScreened: Date;
  sequence: number;

  title: string; // 영화 제목, 가격, discountPolicy은 Movie 객체로 분리할 수 있으나, 여기서는 간단하게 처리
  price: number;
  discountPolicy: {
    type: "AMOUNT_DISCOUNT" | "PERCENT_DISCOUNT";
    discountAmount?: number;
    discountPercent?: number;
  };
}

function TicketCalculator() {
  const [screeningToBuy, setScreeningToBuy] = useState<Screening | null>(null);

  const screenings: Screening[] = [
    {
      title: "Dune 2",
      sequence: 1,
      price: 15000,
      whenScreened: new Date(2024, 4, 2),
      discountPolicy: {
        type: "AMOUNT_DISCOUNT",
        discountAmount: 1000,
      },
    },
    {
      title: "혹성탈출",
      sequence: 2,
      price: 20000,
      whenScreened: new Date(2024, 5, 6),
      discountPolicy: {
        type: "PERCENT_DISCOUNT",
        discountPercent: 10,
      },
    },
  ];

  const conditions: DiscountCondition[] = [
    {
      type: "SEQUENCE",
      isSatisfiedBy: (screening: Screening) => {
        return screening.sequence === 1;
      },
    },
    {
      type: "PERIOD",
      isSatisfiedBy: (screening: Screening) => {
        return screening.whenScreened > new Date(2024, 5, 5);
      },
    },
  ];

  const calculateDiscountPrice = (
    screening: Screening | null,
    conditions: DiscountCondition[]
  ): number => {
    if (!screening) {
      return 0;
    }

    const conditionSatisfied = conditions.find((condition) =>
      condition.isSatisfiedBy(screening)
    );

    if (!conditionSatisfied) {
      return 0;
    }

    if (screening.discountPolicy.type === "AMOUNT_DISCOUNT") {
      return screening.discountPolicy.discountAmount!;
    } else {
      return (
        screening.price * (screening.discountPolicy.discountPercent! / 100)
      );
    }
  };

  const calculateDiscountedPrice = (
    screening: Screening | null,
    conditions: DiscountCondition[]
  ): number => {
    if (!screening) {
      return 0;
    }

    const discountPrice = calculateDiscountPrice(screening, conditions);
    return screening.price - discountPrice;
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
        }}
      >
        {screenings.map((screening) => (
          <ScreeningItem
            key={screening.title}
            style={{
              border: "1px solid black",
              padding: "10px",
              margin: "10px",
            }}
            onClick={() => setScreeningToBuy(screening)}
          >
            <div>{screening.title}</div>
            <div>{screening.price}원</div>
            <div>
              {screening.discountPolicy.type === "AMOUNT_DISCOUNT"
                ? `${screening.discountPolicy.discountAmount}원 할인`
                : `${screening.discountPolicy.discountPercent}% 할인`}
            </div>
          </ScreeningItem>
        ))}
      </div>
      <div>
        <div>총 결제 금액: {screeningToBuy ? screeningToBuy.price : ""}원</div>
        <div>
          할인 금액: {calculateDiscountPrice(screeningToBuy, conditions)}원
        </div>
        <div>
          할인 후 금액: {calculateDiscountedPrice(screeningToBuy, conditions)}원
        </div>
      </div>
    </div>
  );
}

export default TicketCalculator;

const ScreeningItem = emotionStyled.div`
    border: 1px solid black;
    padding: "10px";
    margin: "10px";
    :hover {
        background-color: lightgray;
    }
`;
