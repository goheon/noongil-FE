'use client'

import { motion } from 'framer-motion'
import classNames from 'classnames/bind'
import styles from './LoadingSpinner.module.scss'

const cx = classNames.bind(styles)

const LoadingSpinner = () => {
  return (
    <motion.div
      className={cx('spinner')}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        ease: 'linear',
        duration: 1,
      }}
    />
  )
}

export default LoadingSpinner
