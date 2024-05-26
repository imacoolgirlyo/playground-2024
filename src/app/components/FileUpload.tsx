"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";

interface Transaction {
  date: string;
  card_Number: string;
  cancellation_status: string;
  payment_method: string;
  amount: number;
  merchant: string;
  business_number: string;
  tax_Type: string;
  category?: string;
}

const FileUpload: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json<string[]>(worksheet, {
        header: 1,
      });

      const rows = json
        .slice(6)
        .filter((row) =>
          row.some(
            (cell: any) => cell !== undefined && cell !== null && cell !== ""
          )
        );

      const transactions = rows.map((row) => {
        const transaction: Transaction = {
          date: row[0],
          card_Number: row[1],
          cancellation_status: row[3],
          payment_method: row[4],
          amount: parseInt(row[5].replace(/,/g, ""), 10),
          merchant: row[6],
          business_number: row[8],
          tax_Type: row[9],
        };

        transaction.category = categorizeTransaction(transaction.merchant);
        return transaction;
      });

      setTransactions(transactions);
    };

    reader.readAsArrayBuffer(file);
  };

  const categorizeTransaction = (merchant: string): string => {
    const categories = {
      통신비: ["SKT", "KT", "LGU"],
      구독료: ["Netflix", "Spotify", "YouTube"],
      교통비: ["버스", "지하철", "택시"],
      공과금: ["전기", "가스", "수도"],
      대출: ["KB국민은행", "신한은행", "우리은행"],
      식자재: ["마트", "농협", "슈퍼"],
      생필품: ["다이소", "이마트", "홈플러스"],
      편의점: ["CU", "GS25", "세븐일레븐"],
      카페: ["스타벅스", "커피빈", "엔제리너스"],
      외식: ["식당", "레스토랑", "한식"],
      약속: ["주점", "바", "카페"],
      쇼핑: ["백화점", "쇼핑몰", "아울렛"],
      미용: ["헤어", "네일", "피부"],
      의료: ["병원", "약국", "치과"],
      여가: ["영화관", "테마파크", "노래방"],
      여행: ["호텔", "항공", "여행사"],
      경조사비: ["화환", "축의금", "부조금"],
      기타: [],
    };

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some((keyword) => merchant.includes(keyword))) {
        return category;
      }
    }
    return "기타";
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.date} - {transaction.merchant} - {transaction.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUpload;
