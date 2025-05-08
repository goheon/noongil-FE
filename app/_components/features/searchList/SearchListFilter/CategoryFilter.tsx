'use client'

import styles from './CategoryFilter.module.scss'
import classNames from 'classnames/bind'
import FilterLayout from './FilterLayout'
import { usePathname } from 'next/navigation'
import { useListFilterStore } from '@/app/_store/listFilter/useListFilterStore'
import {
  POPUP_OPTION_VALUES,
  POPUP_CATEGORY_LABELS,
  EXHIBITION_CATEGORY_LABELS,
  EXHIBITION_OPTION_VALUES,
} from '../../admin/type'
import { Checkbox } from '@/app/_components/ui'

const cx = classNames.bind(styles)

interface CategoryFilterProps {
  isExhibitionPage?: boolean
}

const CategoryFilter = (props: CategoryFilterProps) => {
  const { isExhibitionPage } = props

  const pathname = usePathname()

  const { setCategory, category } = useListFilterStore()

  return (
    <FilterLayout isExhibitionPage={isExhibitionPage}>
      <ul className={cx('list')}>
        {(() => {
          switch (true) {
            case pathname.includes('popup'):
              return (
                <>
                  {POPUP_OPTION_VALUES.map((option) => (
                    <li key={option}>
                      <Checkbox
                        value={option}
                        label={POPUP_CATEGORY_LABELS[option]}
                        onChange={() => setCategory(option)}
                        checked={category.includes(option)}
                        isExhibitionPage={isExhibitionPage}
                      />
                    </li>
                  ))}
                </>
              )

            case pathname.includes('exhibition'):
              return (
                <>
                  {EXHIBITION_OPTION_VALUES.map((option) => (
                    <li key={option}>
                      <Checkbox
                        value={option}
                        label={EXHIBITION_CATEGORY_LABELS[option]}
                        onChange={() => setCategory(option)}
                        checked={category.includes(option)}
                        isExhibitionPage={isExhibitionPage}
                      />
                    </li>
                  ))}
                </>
              )

            default:
              return (
                <>
                  {POPUP_OPTION_VALUES.map((option) => (
                    <li key={option}>
                      <Checkbox
                        value={option}
                        label={POPUP_CATEGORY_LABELS[option]}
                        onChange={() => setCategory(option)}
                        checked={category.includes(option)}
                        isExhibitionPage={isExhibitionPage}
                      />
                    </li>
                  ))}

                  {EXHIBITION_OPTION_VALUES.map((option) => (
                    <li key={option}>
                      <Checkbox
                        value={option}
                        label={EXHIBITION_CATEGORY_LABELS[option]}
                        onChange={() => setCategory(option)}
                        checked={category.includes(option)}
                        isExhibitionPage={isExhibitionPage}
                      />
                    </li>
                  ))}
                </>
              )
          }
        })()}
      </ul>
    </FilterLayout>
  )
}

export default CategoryFilter
