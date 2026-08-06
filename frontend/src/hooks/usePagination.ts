import { useCallback, useMemo, useState } from 'react'

import { DEFAULT_PAGE_SIZE } from '@/utils/constants'

interface UsePaginationOptions {
  initialPage?: number
  initialPageSize?: number
  totalItems?: number
}

export function usePagination({
  initialPage = 0,
  initialPageSize = DEFAULT_PAGE_SIZE,
  totalItems = 0,
}: UsePaginationOptions = {}) {
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalItems / pageSize)),
    [totalItems, pageSize],
  )

  const goToPage = useCallback(
    (nextPage: number) => {
      setPage(Math.max(0, Math.min(nextPage, totalPages - 1)))
    },
    [totalPages],
  )

  const nextPage = useCallback(() => {
    goToPage(page + 1)
  }, [goToPage, page])

  const previousPage = useCallback(() => {
    goToPage(page - 1)
  }, [goToPage, page])

  const resetPage = useCallback(() => {
    setPage(0)
  }, [])

  return {
    page,
    pageSize,
    totalPages,
    setPage: goToPage,
    setPageSize,
    nextPage,
    previousPage,
    resetPage,
    canGoNext: page < totalPages - 1,
    canGoPrevious: page > 0,
  }
}
