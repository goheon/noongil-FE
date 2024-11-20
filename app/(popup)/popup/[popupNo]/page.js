const Page = async ({ params }) => {
  const popupNo = (await params).popupNo
  return <div>My popupNo: {popupNo}</div>
}

export default Page
