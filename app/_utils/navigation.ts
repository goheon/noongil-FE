export const getEventDetailUrl = (eventCode: string, id: number | string) => {
  const category = eventCode === '10' ? 'popup' : 'exhibition'

  return `/lists/${category}/${id}`
}
