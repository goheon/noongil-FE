import { useEffect, RefObject } from 'react'

// 이벤트 타입을 마우스와 터치 이벤트 모두 포함하도록 정의
type Event = MouseEvent | TouchEvent

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      // ref.current가 없거나, 클릭된 요소가 ref.current 내부에 포함되어 있으면 아무것도 하지 않음
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      // 외부를 클릭했다면 핸들러 함수 호출
      handler(event)
    }

    // mousedown과 touchstart 이벤트를 모두 감지하여 모바일 환경도 지원
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    // 클린업 함수: 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler]) // ref나 handler가 변경되면 이펙트를 다시 실행
}

export default useOnClickOutside
