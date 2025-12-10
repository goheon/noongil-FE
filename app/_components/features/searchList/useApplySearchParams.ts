import { usePathname, useRouter } from 'next/navigation'

const useApplySearchParams = () => {
  const router = useRouter()
  const pathname = usePathname()

  const updateParam = (
    params: URLSearchParams,
    key: string,
    value?: string | null,
  ) => {
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
  }

  const applyParams = (updates: Record<string, string | null | undefined>) => {
    const newParams = new URLSearchParams(window.location.search)

    Object.entries(updates).forEach(([key, value]) => {
      updateParam(newParams, key, value)
    })

    const basePath =
      pathname === '/lists' ||
      pathname === '/lists/exhibition' ||
      pathname === '/lists/popup'
        ? pathname
        : '/lists'

    router.push(`${basePath}?${newParams.toString()}`)
  }

  return { applyParams }
}

export default useApplySearchParams
