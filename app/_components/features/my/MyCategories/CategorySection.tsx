import styles from './MyCategories.module.scss'
import classNames from 'classnames/bind'
import Image from 'next/image'
import { CATEGORY_IMG_LIST } from '@/app/_constants/categoryImg'
import { ICON } from '@/public'
import { TEventCategory } from '@/app/_types'

const cx = classNames.bind(styles)

interface CategorySectionProps<T extends string> {
  title: string
  categories: T[]
  selectedCategories: T[]
  handleCategories: (value: T) => void
}

const CategorySection = <T extends string>(props: CategorySectionProps<T>) => {
  const { title, categories, selectedCategories, handleCategories } = props

  return (
    <div className={cx('section')}>
      <div className={cx('title')}>{title}</div>

      <ul className={cx('list')}>
        {categories.map((value) => (
          <li key={value}>
            <label htmlFor={value} className={cx('list-item')}>
              <input
                id={value}
                className={cx('checkbox')}
                type="checkbox"
                checked={selectedCategories.includes(value)}
                onChange={() => handleCategories(value)}
              />

              <div className={cx('img-wrapper')}>
                <Image
                  className={cx('img')}
                  src={CATEGORY_IMG_LIST[value as TEventCategory].img}
                  alt="img"
                  width={90}
                  height={90}
                />

                <div className={cx('checkbox')}>
                  <Image
                    src={
                      selectedCategories.includes(value)
                        ? ICON.check_mark_active
                        : ICON.check_mark
                    }
                    alt="checkbox"
                    width={15}
                    height={15}
                  />
                </div>
              </div>

              <span className={cx('label')}>
                {CATEGORY_IMG_LIST[value as TEventCategory].label}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategorySection
