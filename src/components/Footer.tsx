import { Code, Heart } from 'lucide-react'

export async function Footer({ footerConfig }: { footerConfig?: string | boolean }) {
  if (footerConfig === false) {
    return null
  }

  const footerContent
    = typeof footerConfig === 'string'
      ? (
          footerConfig
        )
      : (
          <>
            <Code size={20} />
            with
            <Heart size={20} />
            by
            <a
              className="ml-1 rounded bg-muted px-[0.3rem] py-[0.2rem] hover:underline"
              href="https://github.com/keksiqc"
            >
              @keksiqc
            </a>
          </>
        )

  return (
    <footer className="bottom-0 my-12 flex w-full flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
      <div className="flex items-center justify-center gap-1">{footerContent}</div>
      <a
        className="rounded bg-muted px-[0.3rem] py-[0.2rem] hover:underline"
        href="https://github.com/keksiqc/shako"
      >
        GitHub
      </a>
    </footer>
  )
}
