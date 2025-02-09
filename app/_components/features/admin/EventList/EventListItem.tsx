import {
  IEventListItem,
  POPUP_CATEGORY_LABELS,
  EXHIBITION_CATEGORY_LABELS,
} from '../type'
import styles from './EventListItem.module.scss'
import Link from 'next/link'

const CATERGORY_LABEL: Record<string, string> = {
  ...EXHIBITION_CATEGORY_LABELS,
  ...POPUP_CATEGORY_LABELS,
}

interface EventListItemPros {
  item: IEventListItem
}

const EventListItem: React.FC<EventListItemPros> = (props) => {
  const { item } = props

  return (
    <div className={`${styles['container']}`}>
      <div className={`${styles['item']}`}>
        {item.ppstEnbnTypeCd === 'ENBN' ? '전시' : '팝업'}
      </div>
      <div className={`${styles['item']}`}>{item.eventNm}</div>
      <div className={`${styles['item']}`}>{CATERGORY_LABEL[item.ctgyId]}</div>
      <div className={`${styles['item']}`}>{item.eventAddr}</div>
      <div className={`${styles['item']}`}>{item.operStatDt}</div>
      <div className={`${styles['item']}`}>{item.operEndDt}</div>
      <div className={`${styles['item']}`}>
        <Link href={`eventlist/${item.eventId}`}>
          <button>수정</button>
        </Link>
      </div>
    </div>
  )
}

export default EventListItem
