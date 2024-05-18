"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import DetailSheet from "@/components/evaluation/DetailSheet";
import { caseId } from "@/lib/tableData";

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

const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const columns: ColumnDef<Evaluation>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const id: number = row.getValue("id");
      const evaluationId = caseId(id);

      return evaluationId;
    },
  },
  {
    accessorKey: "client_id",
    accessorFn: (row) => row.client_id.full_name,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Entry date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const localDate = new Date(row.getValue("created_at")).toLocaleDateString(
        undefined,
        dateOptions,
      );

      return <span>{localDate}</span>;
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last upadate
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const localDate = new Date(row.getValue("created_at")).toLocaleDateString(
        undefined,
        dateOptions,
      );

      return <span>{localDate}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Case status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      let color = "";
      // Open, Pending Samples, In Progress, Confirmation, Completed

      if (status == "Open") {
        color = "text-destructive";
      } else if (status == "Completed") {
        color = "text-primary";
      } else {
        color = "text-warning";
      }

      return <span className={color}>{status}</span>;
    },
  },
  {
    accessorKey: "debt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Payment status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const debt = row.getValue("debt");
      const debtLabel = debt ? "Unpaid" : "Paid";

      return (
        <div
          className={`flex h-9 w-28 items-center justify-center p-1 ${debt ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}
        >
          {debtLabel}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const evaluation = row.original;

      return <DetailSheet id={evaluation.id} />;
    },
  },
];
