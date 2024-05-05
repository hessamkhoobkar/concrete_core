import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DateFormater, caseId } from "@/lib/tableData";
import DebtBadge from "@/components/evaluation/DebtBadge";
import StatusBadge from "@/components/evaluation/StatusBadge";
import DetailSheet from "@/components/evaluation/DetailSheet";

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
    <Table className="mt-8 border-separate border-spacing-y-1">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Case ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Entry Date</TableHead>
          <TableHead>Last update</TableHead>
          <TableHead>Case Status</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {evaluations.map((evaluation) => (
          <TableRow
            key={evaluation.id}
            className="border-none bg-card hover:bg-concrete-600"
          >
            <TableCell>{caseId(evaluation.id)}</TableCell>
            <TableCell>{evaluation.client_id.full_name}</TableCell>
            <TableCell>{DateFormater(evaluation.created_at)}</TableCell>
            <TableCell>{DateFormater(evaluation.updated_at)}</TableCell>
            <TableCell>
              <StatusBadge status={evaluation.status} />
            </TableCell>
            <TableCell>
              <DebtBadge debt={evaluation.debt} />
            </TableCell>
            <TableCell>
              <DetailSheet />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
