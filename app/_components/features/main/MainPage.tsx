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
      <TopBanner category={'all'} />
      <PopularList type="popup" />
      <PopularList type="exhibition" />
      <CustomList />
      <PeriodList type="open" />
      <PeriodList type="close" />
      <SpeedDial />
    </div>
  )
}

export default MainPage
