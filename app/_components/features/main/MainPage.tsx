import styles from './MainPage.module.scss'
import classNames from 'classnames/bind'
import TopBanner from './TopBanner/TopBanner'
import PopularList from './PopularList/PopularList'
import CustomList from './CustomList/CustomList'
import PeriodList from './PeriodList/PeriodList'

const cx = classNames.bind(styles)

interface MainPageProps {
  category: 'all' | 'popup' | 'exhibition'
}

const MainPage = (props: MainPageProps) => {
  const { category } = props

  return (
    <div className={cx('container')}>
      <TopBanner category={category} />
      <PopularList category={category} />
      <CustomList />
      <PeriodList category={category} periodType="open" />
      <PeriodList category={category} periodType="close" />
    </div>
  )
}

export default MainPage
