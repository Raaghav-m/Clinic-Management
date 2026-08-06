import { Loader } from '@/components/common/Loader'

export function LoadingPage() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Loader size="lg" label="Loading page..." />
    </div>
  )
}
