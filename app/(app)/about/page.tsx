"use client";

import { browserClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const supabase = browserClient();

  const [evaluations, setEvaluations] = useState([]);

  async function getEvaluations() {
    const { data: evaluations, error } = await supabase
      .from("evaluations")
      .select();

    setEvaluations(evaluations);
  }

  useEffect(() => {
    getEvaluations();
  }, []);

  return (
    <div>
      <ul>
        {evaluations?.map((evaluation) => (
          <li key={evaluation.id}>
            {evaluation.id}
            {evaluation.created_at}
            {evaluation.status}
            {evaluation.debt}
          </li>
        ))}
      </ul>
    </div>
  );
}
