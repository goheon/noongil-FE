import styles from './MainPage.module.scss'
import classNames from 'classnames/bind'
import TopBanner from './TopBanner/TopBanner'
import PopularList from './PopularList/PopularList'
import RecommendList from './RecommedList/RecommendList'
import PeriodList from './PeriodList/PeriodList'
import { TEventCodeName } from '@/app/_types'

const cx = classNames.bind(styles)

interface MainPageProps {
  eventCode: TEventCodeName
}

const MainPage = (props: MainPageProps) => {
  const { eventCode } = props

  return (
    <div className={cx('container')}>
      <TopBanner eventCode={eventCode} />
      <PopularList eventCode={eventCode} />
      <RecommendList eventCode={eventCode} />
      <PeriodList eventCode={eventCode} periodType="open" />
      <PeriodList eventCode={eventCode} periodType="close" />
    </div>
  )
}

export default MainPage
