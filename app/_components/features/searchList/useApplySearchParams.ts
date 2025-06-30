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

    // 체크할 경로 키워드 목록
    const paths = ['exhibition', 'popup']

    // 현재 pathname에서 키워드 찾기
    const matchedPath = paths.find((p) => pathname.includes(`/${p}`))

    // matchedPath가 있으면 `/lists/${matchedPath}`, 없으면 기본 `/lists`
    const basePath = matchedPath ? `/lists/${matchedPath}` : '/lists'

    router.push(`${basePath}?${newParams.toString()}`)
  }

  return { applyParams }
}

export default useApplySearchParams
