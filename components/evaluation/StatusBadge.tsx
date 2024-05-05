export default function StatusBadge({ status }: { status: string }) {
  return (
    <div className="">
      <span className="font-mono text-primary">{status}</span>
    </div>
  );
}
