import { BottomSheet } from '../_components'

const ReportPage = () => {
  return (
    <div>
      Report page
      <BottomSheet type={'filter'} isOpen={false}>
        <ChildComp />
      </BottomSheet>
    </div>
  )
}

const ChildComp = () => {
  return <div>child Component</div>
}

export default ReportPage
