import EventDetail from '@/app/_components/features/admin/EventDetail/EventDetail'

export default async function Page({
  params,
}: {
  params: Promise<{ eventId: string }>
}) {
  const slug = (await params).eventId

  return (
    <div>
      <EventDetail eventId={slug} />
    </div>
  )
}
