import classNames from 'classnames/bind'
import Image from 'next/image'

import { ICON } from '@/public'
import styles from './ResearchButton.module.scss'

const cx = classNames.bind(styles)

const ResearchButton = () => {
  return (
    <button className={cx('research-button')}>
      <Image
        className={cx('research-icon')}
        src={ICON.refresh}
        alt={'refresh'}
        width={17}
        height={17}
      />
      <span>현위치에서 재검색</span>
    </button>
  )
}

export default ResearchButton
