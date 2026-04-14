import { Suspense } from "react";
import type { Metadata } from "next";

import { PaymentForm } from "./PaymentForm";

const siteName = "Earlsdwara Digital";

export const metadata: Metadata = {
  title: "Pay",
  description: `Pay ${siteName} securely via Flutterwave.`,
};

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-lg px-4 py-24 text-center text-sm text-muted">Loading payment form…</div>
      }
    >
      <PaymentForm />
    </Suspense>
  );
}
