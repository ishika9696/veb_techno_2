import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface">
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      <div className="text-center relative z-10">
        <Loader2 size={40} className="animate-spin text-accent-600 dark:text-accent-400 mx-auto mb-4" />
        <p className="font-heading text-sm font-semibold tracking-wider uppercase text-muted-foreground">
          Veb Techno Inc
        </p>
      </div>
    </div>
  );
}
