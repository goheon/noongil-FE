const Page = async ({ params }) => {
  const exhibitionNo = (await params).exhibitionNo
  return <div>My exhibitionNo: {exhibitionNo}</div>
}

export default Page
