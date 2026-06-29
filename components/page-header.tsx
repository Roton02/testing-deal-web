export function PageHeader({
  title,
  description,
  badge,
}: {
  title: string;
  description?: string;
  badge?: string;
}) {
  return (
    <div className="mb-8">
      {badge && (
        <span className="mb-2 inline-block rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent-foreground">
          {badge}
        </span>
      )}
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {description && (
        <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
