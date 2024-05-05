export default function DebtBadge({ debt }: { debt: boolean }) {
  const debtLabel = debt ? "Unpaid" : "Paid";
  return (
    <div
      className={`flex items-center justify-center p-2 ${debt ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}
    >
      <span className="font-mono">{debtLabel}</span>
    </div>
  );
}
