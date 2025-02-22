interface ErrorPageProps {
  error: string
}

export function ErrorPage({ error }: ErrorPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-4 text-4xl font-bold text-destructive">Configuration Error</h1>
      <p className="mb-8 max-w-md text-muted-foreground">{error}</p>
      <p className="text-sm text-muted-foreground">
        Please check your configuration file and try again.
      </p>
    </div>
  )
}
