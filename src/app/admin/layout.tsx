import { ReactNode } from "react";

export const metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
