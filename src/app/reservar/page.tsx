import { Suspense } from "react";
import { ReservarForm } from "./ReservarForm";

export default function ReservarPage() {
  return (
    <Suspense fallback={null}>
      <ReservarForm />
    </Suspense>
  );
}
