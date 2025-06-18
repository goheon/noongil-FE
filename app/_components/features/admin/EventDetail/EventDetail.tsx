import styles from './EventDetail.module.scss'
import EventImageForm from '../EventImageForm/EventImageForm'
import EventBaseForm from '../EventBaseForm/EventBaseForm'

interface EventDetailProps {
  eventId: string
}

const EventDetail: React.FC<EventDetailProps> = (props) => {
  const { eventId } = props

  return (
    <div className={`${styles['container']}`}>
      <EventBaseForm eventId={eventId} />

      <EventImageForm eventId={eventId} />
    </div>
  )
}

export default EventDetail
