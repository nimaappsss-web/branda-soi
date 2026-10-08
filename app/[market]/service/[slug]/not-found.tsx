import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[400px] flex-col items-center justify-center px-4">
      <h2 className="text-2xl font-bold">Service not found</h2>
      <p className="mt-2 text-muted-foreground">Could not find the requested service.</p>
      <Link href="../" className="mt-4">
        <Button>Back to Services</Button>
      </Link>
    </div>
  );
}
