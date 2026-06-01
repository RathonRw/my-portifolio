import { Suspense } from "react";
import SiteFooter from "@/features/_layout/site-footer";
import { SiteHeader } from "@/features/_layout/site-header";

export default function AppLayout(props: LayoutProps<"/">) {
  return (
    <div className="relative z-10 flex min-h-svh flex-col">
      <Suspense>
        <SiteHeader />
      </Suspense>
      <main className="relative min-h-screen">{props.children}</main>
      <SiteFooter />
    </div>
  );
}
