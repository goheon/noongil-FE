import { PopupDetailPageProps } from '@/app/_types'

const PopupDetailPage = async ({ params }: PopupDetailPageProps) => {
  const popupNo = (await params).popupNo
  return <div>My popupNo: {popupNo}</div>
}

export default PopupDetailPage
