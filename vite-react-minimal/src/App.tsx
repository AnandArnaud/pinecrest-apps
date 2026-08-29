import { useMemo, useState } from "react";

type Expense = { id: number; amount: number; category: string; note: string };

const CATEGORIES = ["Food", "Transport", "Software", "Rent", "Other"];

const SEED: Expense[] = [
  { id: 1, amount: 42.5, category: "Food", note: "Team lunch" },
  { id: 2, amount: 120, category: "Software", note: "Design tool seat" },
  { id: 3, amount: 18, category: "Transport", note: "Airport taxi" },
];

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>(SEED);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [note, setNote] = useState("");
  const [filter, setFilter] = useState("All");
  const [budget, setBudget] = useState(500);

  const spent = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses],
  );

  const visible = useMemo(
    () => (filter === "All" ? expenses : expenses.filter((e) => e.category === filter)),
    [expenses, filter],
  );

  function addExpense(e: React.FormEvent) {
    e.preventDefault();
    const value = parseFloat(amount);
    if (!value || value <= 0) return;
    const expense: Expense = { id: Date.now(), amount: value, category, note: note.trim() };
    setExpenses((list) => [expense, ...list]);
    // No product analytics wired in yet — just log the action.
    console.log("add_expense", { amount: value, category });
    setAmount("");
    setNote("");
  }

  function changeFilter(next: string) {
    setFilter(next);
    console.log("filter_expenses", { category: next });
  }

  function raiseBudget() {
    const next = budget + 100;
    setBudget(next);
    console.log("set_budget", { amount: next });
  }

  const overBudget = spent > budget;

  return (
    <main style={{ maxWidth: 680, margin: "0 auto", padding: "32px 20px" }}>
      <header style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 26 }}>
        <div style={{ width: 26, height: 26, borderRadius: 7, background: "var(--accent)" }} />
        <strong style={{ letterSpacing: "-0.02em", fontSize: 18 }}>Ledger</strong>
      </header>

      <section style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ color: "var(--muted)", fontSize: 13 }}>Spent this month</span>
          <button onClick={raiseBudget} style={ghost}>Raise budget</button>
        </div>
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.03em", marginTop: 4 }}>
          ${spent.toFixed(2)}{" "}
          <span style={{ fontSize: 14, fontWeight: 400, color: overBudget ? "#f87171" : "var(--muted)" }}>
            / ${budget}
          </span>
        </div>
      </section>

      <form onSubmit={addExpense} style={{ ...card, display: "grid", gap: 10 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            placeholder="0.00"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ ...input, width: 110 }}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={input}>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <input
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ ...input, flex: 1 }}
          />
          <button type="submit" style={primary}>Add</button>
        </div>
      </form>

      <div style={{ display: "flex", gap: 8, margin: "18px 0 12px", flexWrap: "wrap" }}>
        {["All", ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => changeFilter(c)}
            style={{ ...chip, ...(filter === c ? chipActive : {}) }}
          >
            {c}
          </button>
        ))}
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
        {visible.map((e) => (
          <li key={e.id} style={{ ...card, display: "flex", justifyContent: "space-between", margin: 0 }}>
            <div>
              <div style={{ fontWeight: 600 }}>{e.note || e.category}</div>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>{e.category}</div>
            </div>
            <div style={{ fontWeight: 700 }}>${e.amount.toFixed(2)}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}

const card: React.CSSProperties = {
  background: "var(--panel)",
  border: "1px solid var(--line)",
  borderRadius: 14,
  padding: 16,
  marginBottom: 14,
};
const input: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 9,
  border: "1px solid var(--line)",
  background: "#11141b",
  color: "var(--fg)",
  fontSize: 14,
};
const primary: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: 9,
  border: 0,
  background: "var(--accent)",
  color: "#04140a",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
};
const ghost: React.CSSProperties = {
  padding: "6px 10px",
  borderRadius: 8,
  border: "1px solid var(--line)",
  background: "transparent",
  color: "var(--fg)",
  fontSize: 13,
  cursor: "pointer",
};
const chip: React.CSSProperties = {
  padding: "7px 12px",
  borderRadius: 999,
  border: "1px solid var(--line)",
  background: "transparent",
  color: "var(--muted)",
  fontSize: 13,
  cursor: "pointer",
};
const chipActive: React.CSSProperties = {
  background: "var(--fg)",
  color: "#0f1115",
  borderColor: "var(--fg)",
};
