import styles from './MainPage.module.scss'
import classNames from 'classnames/bind'
import TopBanner from './TopBanner/TopBanner'
import PopularList from './PopularList/PopularList'
import CustomList from './CustomList/CustomList'
import PeriodList from './PeriodList/PeriodList'

const cx = classNames.bind(styles)

const MainPage = () => {
  return (
    <div className={cx('container')}>
      <TopBanner />
      <PopularList type="popup" />
      <PopularList type="exhibition" />
      <CustomList />
      <PeriodList type="open" />
      <PeriodList type="close" />
    </div>
  )
}

export default MainPage
