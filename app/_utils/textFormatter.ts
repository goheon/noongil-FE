// 주소를 '구'에서 자릅니다.
export const extractCityDistrict = (address: string) => {
  const match = address.match(/^[^\s]+ \S+구/)
  return match ? match[0] : address
}

// 이벤트 기간을 xxxx.xx.xx ~ xxxx.xx.xx 으로 수정합니다.
export const formatDateRange = (start: string, end: string) => {
  const format = (date: string) =>
    `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6, 8)}`

  return `${format(start)} ~ ${format(end)}`
}
