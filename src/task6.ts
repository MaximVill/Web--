export type Invoice = {
  id: string;
  amount: number;
  status: "paid" | "free";
};

export type StatusTotals = { paid: number; free: number };

export function sumByStatus(invoices: readonly Invoice[]): StatusTotals {
  // Аккумулятор пересоздаётся на каждом шаге, входные объекты не меняются
  return invoices.reduce<StatusTotals>(
    (totals, invoice) => ({
      ...totals,
      [invoice.status]: totals[invoice.status] + invoice.amount,
    }),
    { paid: 0, free: 0 },
  );
}

const invoices: readonly Invoice[] = [
  { id: "INV-001", amount: 1500, status: "paid" },
  { id: "INV-002", amount: 250.5, status: "free" },
  { id: "INV-003", amount: 3200, status: "paid" },
  { id: "INV-004", amount: 0, status: "free" },
  { id: "INV-005", amount: 749.5, status: "free" },
];

console.log("Смешанный набор:", sumByStatus(invoices));
console.log("Пустой массив:", sumByStatus([]));

// Входные данные не изменились
console.log("invoices:", invoices);

// Ошибка компиляции: статус вне объединения "paid" | "free"
// sumByStatus([{ id: "INV-006", amount: 100, status: "pending" }]);
// TS2322: Type '"pending"' is not assignable to type '"free" | "paid"'.
