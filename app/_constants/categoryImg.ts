import { TEventCategory } from '../_types'
import { ALL_CATEGORY_LABELS } from './event'
import { StaticImageData } from 'next/image'
import BeautyImg from '@/public/images/beauty.webp'
import ComicImg from '@/public/images/cartoon.webp'
import FashionImg from '@/public/images/fashion.webp'
import CharacterImg from '@/public/images/character.webp'
import DesignImg from '@/public/images/design.webp'
import EnterImg from '@/public/images/entertainment.webp'
import ExpImg from '@/public/images/experience.webp'
import FoodImg from '@/public/images/food.webp'
import HealthImg from '@/public/images/health.webp'
import ItImg from '@/public/images/it.webp'
import KidImg from '@/public/images/kids.webp'
import LifeImg from '@/public/images/lifestyle.webp'
import MediaImg from '@/public/images/media_art.webp'
import PaintingImg from '@/public/images/painting.webp'
import PictureImg from '@/public/images/picture.webp'
import SculpImg from '@/public/images/sculpture.webp'

export const CATEGORY_IMG_LIST: Record<
  TEventCategory,
  { label: string; img: StaticImageData; value: TEventCategory }
> = {
  PASH: {
    label: ALL_CATEGORY_LABELS['PASH'],
    img: FashionImg,
    value: 'PASH',
  },
  CHAR: {
    label: ALL_CATEGORY_LABELS['CHAR'],
    img: CharacterImg,
    value: 'CHAR',
  },
  FANDB: {
    label: ALL_CATEGORY_LABELS['FANDB'],
    img: FoodImg,
    value: 'FANDB',
  },
  BEAU: {
    label: ALL_CATEGORY_LABELS['BEAU'],
    img: BeautyImg,
    value: 'BEAU',
  },
  IT: {
    label: ALL_CATEGORY_LABELS['IT'],
    img: ItImg,
    value: 'IT',
  },
  LIFT: {
    label: ALL_CATEGORY_LABELS['LIFT'],
    img: LifeImg,
    value: 'LIFT',
  },
  ENTER: {
    label: ALL_CATEGORY_LABELS['ENTER'],
    img: EnterImg,
    value: 'ENTER',
  },
  SPORT: {
    label: ALL_CATEGORY_LABELS['SPORT'],
    img: HealthImg,
    value: 'SPORT',
  },
  PHOT: {
    label: ALL_CATEGORY_LABELS['PHOT'],
    img: PictureImg,
    value: 'PHOT',
  },
  PAINT: {
    label: ALL_CATEGORY_LABELS['PAINT'],
    img: PaintingImg,
    value: 'PAINT',
  },
  MEDIA: {
    label: ALL_CATEGORY_LABELS['MEDIA'],
    img: MediaImg,
    value: 'MEDIA',
  },
  SCULP: {
    label: ALL_CATEGORY_LABELS['SCULP'],
    img: SculpImg,
    value: 'SCULP',
  },
  DESIGN: {
    label: ALL_CATEGORY_LABELS['DESIGN'],
    img: DesignImg,
    value: 'DESIGN',
  },
  EXPER: {
    label: ALL_CATEGORY_LABELS['EXPER'],
    img: ExpImg,
    value: 'EXPER',
  },
  CHILD: {
    label: ALL_CATEGORY_LABELS['CHILD'],
    img: KidImg,
    value: 'CHILD',
  },
  COMIC: {
    label: ALL_CATEGORY_LABELS['COMIC'],
    img: ComicImg,
    value: 'COMIC',
  },
}
