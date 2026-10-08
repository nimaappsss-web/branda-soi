export const Footer = () => {
  const year = 2025;
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground">
          © {year} Branda V2. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
