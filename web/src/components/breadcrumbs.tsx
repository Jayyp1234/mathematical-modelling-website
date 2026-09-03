import Link from "next/link";

/** Visible trail that mirrors the BreadcrumbList structured data on the page —
 *  Google prefers the markup to match something the reader can actually see. */
export function Breadcrumbs({
  trail,
}: {
  trail: readonly { name: string; path: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="shell pt-[22px]">
      <ol className="text-body-light flex flex-wrap items-center gap-x-[8px] gap-y-[4px] text-[13px]">
        {trail.map((t, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={t.path + t.name} className="flex items-center gap-[8px]">
              {last ? (
                <span aria-current="page" className="text-ink font-medium">
                  {t.name}
                </span>
              ) : (
                <>
                  <Link href={t.path} className="hover:text-accent transition-colors">
                    {t.name}
                  </Link>
                  <span aria-hidden className="text-line-strong">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
