import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProfileType {
  id: string;
  full_name: string;
}

interface Evaluation {
  id: number;
  created_at: string;
  updated_at: string;
  client_id: ProfileType;
  status: string;
  debt: boolean;
}

export default function EvaluationTable({
  evaluations,
}: {
  evaluations: Evaluation[];
}) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Case ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Entry Date</TableHead>
          <TableHead>Last update</TableHead>
          <TableHead>Case Status</TableHead>
          <TableHead>Payment Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {evaluations.map((evaluation) => (
          <TableRow key={evaluation.id}>
            <TableCell>{evaluation.id}</TableCell>
            <TableCell>{evaluation.client_id.full_name}</TableCell>
            <TableCell>{evaluation.created_at}</TableCell>
            <TableCell>{evaluation.updated_at}</TableCell>
            <TableCell>{evaluation.status}</TableCell>
            <TableCell>{evaluation.debt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
