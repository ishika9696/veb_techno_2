import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | Veb Techno Inc",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/20">
      {children}
    </div>
  );
}
