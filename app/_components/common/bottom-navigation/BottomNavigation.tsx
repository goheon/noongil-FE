import styles from './bottomNavigation.module.scss'

const BottomNavigation: React.FC = () => {
  // ${!isNavigationDisplay && styles['hidden']}
  return (
    <div className={`${styles[`bottom-navigation`]}`}>BottomNavigation</div>
  )
}

export { BottomNavigation }
