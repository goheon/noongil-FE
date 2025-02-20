import styles from './MainPage.module.scss'
import classNames from 'classnames/bind'
import TopBanner from './TopBanner/TopBanner'
import PopularList from './PopularList/PopularList'
import CustomList from './CustomList/CustomList'
import PeriodList from './PeriodList/PeriodList'
import { SpeedDial } from '../../common'

const cx = classNames.bind(styles)

const MainPage = () => {
  return (
    <div className={cx('container')}>
      <TopBanner />
      <PopularList type="all" />
      <CustomList />
      <PeriodList type="all" periodType="open" />
      <PeriodList type="all" periodType="close" />
      <SpeedDial />
    </div>
  )
}

export default MainPage
