import { ComponentPropsWithRef, forwardRef } from 'react'
import styles from './Checkbox.module.scss'
import classNames from 'classnames/bind'
import { ICON } from '@/public'
import Image from 'next/image'

const cx = classNames.bind(styles)

interface CheckboxProps extends ComponentPropsWithRef<'input'> {
  label: string | JSX.Element
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    onChange,
    value,
    disabled,
    checked,
    className,
    children,
    label,
    type = 'checkbox',
    ...rest
  } = props

  return (
    <label className={cx('container')}>
      <input
        className={cx(className, 'checkbox')}
        ref={ref}
        type={type}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...rest}
      />
      <Image
        src={checked ? ICON.checkbox_on : ICON.checkbox_off}
        alt="checkbox"
        width={17}
        height={17}
      />

      {label}
    </label>
  )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox
