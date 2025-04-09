import styles from './ServiceList.module.scss'
import classNames from 'classnames/bind'
import Image from 'next/image'

const cx = classNames.bind(styles)

export interface ServiceItemProps {
  icon: string
  label: string
}

export interface ServiceListProps {
  title: string
  items: ServiceItemProps[]
}

const ServiceList = ({ title, items }: ServiceListProps) => (
  <div className={cx('section')}>
    <div className={cx('title')}>{title}</div>
    <ul className={cx('service-list')}>
      {items.map((item) => (
        <li className={cx('list-item')} key={item.label}>
          <Image src={item.icon} alt="icon" width={17} height={17} />
          {item.label}
        </li>
      ))}
    </ul>
  </div>
)

export default ServiceList
