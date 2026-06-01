import { Suspense } from "react";
import { SiteHeader } from "@/features/_layout/site-header";

export default function AppLayout(props: LayoutProps<"/">) {
  return (
    <div className="relative z-10 flex min-h-svh flex-col">
      <Suspense>
        <SiteHeader />
      </Suspense>
      <main className="">{props.children}</main>
    </div>
  );
}
