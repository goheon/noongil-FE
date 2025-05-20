import { TEventCategory } from '../_types'
import { ALL_CATEGORY_LABELS } from './event'
import { StaticImageData } from 'next/image'
import BeautyImg from '@public/images/beauty.webp'
import ComicImg from '@public/images/cartoon.webp'
import FashionImg from '@public/images/fashion.webp'
import CharacterImg from '@public/images/character.webp'
import DesignImg from '@public/images/design.webp'
import EnterImg from '@public/images/entertainment.webp'
import ExpImg from '@public/images/experience.webp'
import FoodImg from '@public/images/food.webp'
import HealthImg from '@public/images/health.webp'
import ItImg from '@public/images/it.webp'
import KidImg from '@public/images/kids.webp'
import LifeImg from '@public/images/lifestyle.webp'
import MediaImg from '@public/images/media_art.webp'
import PaintingImg from '@public/images/painting.webp'
import PictureImg from '@public/images/picture.webp'
import SculpImg from '@public/images/sculpture.webp'

export const CATEGORY_IMG_LIST: Record<
  TEventCategory,
  { label: string; img: StaticImageData }
> = {
  PASH: {
    label: ALL_CATEGORY_LABELS['PASH'],
    img: FashionImg,
  },
  CHAR: {
    label: ALL_CATEGORY_LABELS['CHAR'],
    img: CharacterImg,
  },
  FANDB: {
    label: ALL_CATEGORY_LABELS['FANDB'],
    img: FoodImg,
  },
  BEAU: {
    label: ALL_CATEGORY_LABELS['BEAU'],
    img: BeautyImg,
  },
  IT: {
    label: ALL_CATEGORY_LABELS['IT'],
    img: ItImg,
  },
  LIFT: {
    label: ALL_CATEGORY_LABELS['LIFT'],
    img: LifeImg,
  },
  ENTER: {
    label: ALL_CATEGORY_LABELS['ENTER'],
    img: EnterImg,
  },
  SPORT: {
    label: ALL_CATEGORY_LABELS['SPORT'],
    img: HealthImg,
  },
  PHOT: {
    label: ALL_CATEGORY_LABELS['PHOT'],
    img: PictureImg,
  },
  PAINT: {
    label: ALL_CATEGORY_LABELS['PAINT'],
    img: PaintingImg,
  },
  MEDIA: {
    label: ALL_CATEGORY_LABELS['MEDIA'],
    img: MediaImg,
  },
  SCULP: {
    label: ALL_CATEGORY_LABELS['SCULP'],
    img: SculpImg,
  },
  DESIGN: {
    label: ALL_CATEGORY_LABELS['DESIGN'],
    img: DesignImg,
  },
  EXPER: {
    label: ALL_CATEGORY_LABELS['EXPER'],
    img: ExpImg,
  },
  CHILD: {
    label: ALL_CATEGORY_LABELS['CHILD'],
    img: KidImg,
  },
  COMIC: {
    label: ALL_CATEGORY_LABELS['COMIC'],
    img: ComicImg,
  },
}
