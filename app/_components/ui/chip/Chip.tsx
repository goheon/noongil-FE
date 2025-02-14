import { ComponentPropsWithoutRef } from 'react'
import Image from 'next/image'
import styles from './Chip.module.scss'
import classNames from 'classnames/bind'
import { ICON } from '@/public'

const cx = classNames.bind(styles)

interface ChipProps
  extends Pick<
    ComponentPropsWithoutRef<'div'>,
    'className' | 'children' | 'style'
  > {
  onClick?: () => void
  suffixIcon?: keyof typeof ICON
  category?: string
  iconSize?: number
}

const Chip = (props: ChipProps) => {
  const {
    className,
    children,
    style,
    onClick,
    suffixIcon,
    category = 'popup',
    iconSize = 20,
    ...rest
  } = props

  return (
    <div
      className={cx(
        'chip',
        {
          'chip--exhibition': category === 'exhibition',
        },
        className,
      )}
      onClick={onClick}
      {...rest}
    >
      {children}

      {suffixIcon && (
        <Image
          src={ICON[suffixIcon]}
          alt="icon"
          width={iconSize}
          height={iconSize}
        />
      )}
    </div>
  )
}

export default Chip
