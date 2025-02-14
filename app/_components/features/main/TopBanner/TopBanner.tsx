import styles from './TopBanner.module.scss'
import classNames from 'classnames/bind'
import Image from 'next/image'
import SampleImg from '@/public/free-img.jpg'
import { Chip } from '@/app/_components/ui'

const cx = classNames.bind(styles)

const TopBanner = () => {
  return (
    <div className={cx('container')}>
      <Image
        className={cx('banner-img')}
        src={SampleImg}
        alt="top-banner"
        width={382}
        height={429}
      />

      <Chip className={cx('banner-chip')}>자세히 보기</Chip>
    </div>
  )
}

export default TopBanner
