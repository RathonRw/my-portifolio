import type { Metadata } from "next";
import CertificatesList from "@/features/certificates/list";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Professional certificates i have earned",
};

export default async function CertificatesPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="mx-auto max-w-2xl px-6">
        <header className="mb-16 text-center">
          <p className="font-mono text-muted-foreground text-xs uppercase tracking-widest">
            Certificates
          </p>
        </header>
        <CertificatesList />
      </div>
    </main>
  );
}
