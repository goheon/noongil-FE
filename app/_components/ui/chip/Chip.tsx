import { ComponentPropsWithoutRef } from 'react'
import Image from 'next/image'
import styles from './Chip.module.scss'
import classNames from 'classnames/bind'
import { ICON } from '@/public'
import { TEventCodeName } from '@/app/_types'

const cx = classNames.bind(styles)

interface ChipProps
  extends Pick<
    ComponentPropsWithoutRef<'div'>,
    'className' | 'children' | 'style'
  > {
  onClick?: () => void
  suffixIcon?: keyof typeof ICON
  eventCode?: TEventCodeName
  iconSize?: number
  handleIconClick?: () => void
}

const Chip = (props: ChipProps) => {
  const {
    className,
    children,
    style,
    onClick,
    handleIconClick,
    suffixIcon,
    eventCode = 'popup',
    iconSize = 20,
    ...rest
  } = props

  return (
    <div
      className={cx(
        'chip',
        {
          'chip--exhibition': eventCode === 'exhibition',
        },
        className,
      )}
      onClick={onClick}
      {...rest}
    >
      <div className={cx('text-wrapper')}>{children}</div>

      {suffixIcon && (
        <div
          onClick={(e) => {
            if (handleIconClick) {
              e.stopPropagation()
              handleIconClick()
            }
          }}
        >
          <Image
            src={ICON[suffixIcon]}
            alt="icon"
            width={iconSize}
            height={iconSize}
          />
        </div>
      )}
    </div>
  )
}

export default Chip
