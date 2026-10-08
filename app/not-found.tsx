import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[400px] flex-col items-center justify-center px-4">
      <h2 className="text-2xl font-bold">Page not found</h2>
      <p className="mt-2 text-muted-foreground">Could not find the requested page.</p>
      <Link href="/" className="mt-4">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
