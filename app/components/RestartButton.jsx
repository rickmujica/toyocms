"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function RestartButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const restartFilters = () => {
    router.push(`${pathname}`);
  }

  return (
    <>
      {searchParams.toString() &&
        <button type="button" className="btn btn-danger clear-filters ms-auto" onClick={restartFilters}>Reiniciar</button>
      }
    </>
  )
}

