"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto flex min-h-[400px] flex-col items-center justify-center px-4">
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
      <button onClick={() => reset()} className="mt-4 rounded bg-primary px-4 py-2 text-primary-foreground">
        Try again
      </button>
    </div>
  );
}
