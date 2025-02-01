import { ExhibitionDetailPageProps } from '@/app/_types'

const ExhibitionDetailPage = async ({ params }: ExhibitionDetailPageProps) => {
  const { exhibitionNo } = await params
  return <div>My exhibitionNo: {exhibitionNo}</div>
}

export default ExhibitionDetailPage
