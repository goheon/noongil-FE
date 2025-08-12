// markerStore.ts
import { create } from 'zustand'
import { ICON } from '@/public'

export type MapType = naver.maps.Map
export type MarkerType = 'popup' | 'exhibition'
export interface Marker {
  id: string
  position: { lat: number; lng: number }
  title?: string
  isSelected?: boolean
  type: MarkerType
  onClick?: (marker: Marker) => void
}
export interface MarkerInstance {
  id: string
  instance: naver.maps.Marker
  labelMarker?: naver.maps.Marker
  clickListener?: naver.maps.MapEventListener | null
  labelClickListener?: naver.maps.MapEventListener | null
}

const MIN_ZOOM_FOR_LABELS = 15
const createLabelStyle = (isMobile: boolean) => {
  const content = (text: string) => `
    <div style="
      background: white; padding: 5px; border: 1px solid #ccc; border-radius: 3px;
      font-size: ${isMobile ? '12px;' : '16px;'} text-align: center; white-space: nowrap;
    ">${text}</div>`
  const size = new naver.maps.Size(100, 30)
  const getAnchor = (text: string) => {
    let x = text.length * 6.2
    if (isMobile) {
      x = text.length * 4.85
    }
    return typeof window !== 'undefined' && window?.naver?.maps?.Point
      ? new window.naver.maps.Point(x, 5)
      : { x, y: 5 }
  }
  return { content, size, getAnchor }
}
const createMarkerIcon = (type: MarkerType) => ({
  url: type === 'popup' ? ICON.marker_popup : ICON.marker_exhibition,
  size: new naver.maps.Size(48, 48),
  origin: new naver.maps.Point(0, 0),
  anchor: new naver.maps.Point(18, 36),
  scaledSize: new naver.maps.Size(36, 36),
})

type MarkerState = {
  map: MapType | null
  markers: Record<string, MarkerInstance>
  order: string[]
  selectedId: string | null
  compact: boolean

  setMap: (map: MapType | null) => void
  setCompact: (compact: boolean) => void
  select: (id: string | null) => void
  clearAll: () => void
  removeById: (id: string) => void
  addOne: (marker: Marker) => void
  replaceAll: (list: Marker[]) => void
  updateLabels: (zoomLevel: number) => void
}

export const useMarkerStore = create<MarkerState>((set, get) => ({
  map: null,
  markers: {},
  order: [],
  selectedId: null,
  compact: false,

  setMap: (map) => set({ map }),
  setCompact: (compact) => set({ compact }),
  select: (id) => set({ selectedId: id }),

  clearAll: () => {
    const { markers } = get()
    Object.values(markers).forEach((m) => {
      m.instance.setMap(null)
      m.labelMarker?.setMap(null)
      if (m.clickListener) naver.maps.Event.removeListener(m.clickListener)
      if (m.labelClickListener)
        naver.maps.Event.removeListener(m.labelClickListener)
    })
    set({ markers: {}, order: [], selectedId: null })
  },

  removeById: (id) => {
    const { markers } = get()
    const target = markers[id]
    if (!target) return
    target.instance.setMap(null)
    target.labelMarker?.setMap(null)
    if (target.clickListener)
      naver.maps.Event.removeListener(target.clickListener)
    if (target.labelClickListener)
      naver.maps.Event.removeListener(target.labelClickListener)
    const next = { ...markers }
    delete next[id]
    set((s) => ({
      markers: next,
      order: s.order.filter((x) => x !== id),
      selectedId: s.selectedId === id ? null : s.selectedId,
    }))
  },

  addOne: (marker) => {
    const { map, compact } = get()
    if (!map) return
    const LABEL = createLabelStyle(compact)

    const instance = new naver.maps.Marker({
      position: new naver.maps.LatLng(marker.position.lat, marker.position.lng),
      map,
      icon: createMarkerIcon(marker.type),
      title: marker.title || '',
    })

    let clickListener: naver.maps.MapEventListener | null = null
    if (marker.onClick) {
      clickListener = naver.maps.Event.addListener(instance, 'click', () => {
        if (map.getZoom() >= MIN_ZOOM_FOR_LABELS) marker.onClick?.(marker)
        else {
          map.setCenter(
            new naver.maps.LatLng(marker.position.lat, marker.position.lng),
          )
          map.setZoom(MIN_ZOOM_FOR_LABELS, true)
        }
      })
    }

    const showLabel = map.getZoom() >= MIN_ZOOM_FOR_LABELS
    const labelMarker = new naver.maps.Marker({
      position: new naver.maps.LatLng(marker.position.lat, marker.position.lng),
      map: showLabel ? map : undefined,
      icon: {
        content: LABEL.content(marker.title || ''),
        size: LABEL.size,
        anchor: LABEL.getAnchor(marker.title || ''),
      },
    })

    let labelClickListener: naver.maps.MapEventListener | null = null
    if (marker.onClick) {
      labelClickListener = naver.maps.Event.addListener(
        labelMarker,
        'click',
        () => {
          if (map.getZoom() >= MIN_ZOOM_FOR_LABELS) marker.onClick?.(marker)
        },
      )
    }

    set((s) => ({
      markers: {
        ...s.markers,
        [marker.id]: {
          id: marker.id,
          instance,
          labelMarker,
          clickListener,
          labelClickListener,
        },
      },
      order: [...s.order, marker.id],
    }))
  },

  replaceAll: (list) => {
    const { clearAll, addOne } = get()
    clearAll()
    list.forEach(addOne)
  },

  updateLabels: (zoomLevel) => {
    const { map, compact, markers } = get()
    if (!map) return
    const LABEL = createLabelStyle(compact)
    const shouldShow = zoomLevel >= MIN_ZOOM_FOR_LABELS

    const updated: Record<string, MarkerInstance> = {}
    Object.values(markers).forEach((m) => {
      try {
        const pos = m.instance.getPosition()
        if (!m.labelMarker) {
          const labelMarker = new naver.maps.Marker({
            position: new naver.maps.LatLng(pos.y, pos.x),
            map: shouldShow ? map : undefined,
            icon: {
              content: LABEL.content(m.instance.getTitle() || ''),
              size: LABEL.size,
              anchor: LABEL.getAnchor(m.instance.getTitle() || ''),
            },
          })
          updated[m.id] = { ...m, labelMarker }
        } else {
          m.labelMarker.setPosition(new naver.maps.LatLng(pos.y, pos.x))
          m.labelMarker.setMap(shouldShow ? map : null)
          m.labelMarker.setIcon({
            content: LABEL.content(m.instance.getTitle() || ''),
            size: LABEL.size,
            anchor: LABEL.getAnchor(m.instance.getTitle() || ''),
          })
          updated[m.id] = m
        }
      } catch (e) {
        console.error('Failed to update marker label:', e)
        updated[m.id] = m
      }
    })
    set((s) => ({ markers: { ...s.markers, ...updated } }))
  },
}))
