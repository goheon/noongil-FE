import { useDisplayState } from '@/app/_lib'
import styles from './bottomNavigation.module.scss'

const BottomNavigation: React.FC = () => {
  const { isNavigationDisplay } = useDisplayState()

  return (
    <div
      className={`${styles[`bottom-navigation`]} ${!isNavigationDisplay && styles['hidden']}`}
    >
      BottomNavigation
    </div>
  )
}

export { BottomNavigation }
