import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

/**
 * 現在時刻を取得する
 * @param defaultTimezone タイムゾーン（デフォルトは 'Asia/Tokyo' ）
 * @returns 現在時刻の文字列
 */
export const getNowAsString = (defaultTimezone: string = 'Asia/Tokyo'): string => {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.tz.setDefault(defaultTimezone)
  const dt: string = dayjs().tz().format('YYYY年MM月DD日 HH時mm分')
  return dt
}

/**
 * 日付をフォーマットする
 * @param dt 日付
 * @param timeDiff 時差（デフォルトは 9 ）
 * @returns フォーマット済みの日付文字列
 */
export const formatDatetime = (dt: Date, timeDiff: number = 9) => {
  try {
    // Convert timezone
    const datetime = new Date(
      dt.getFullYear(),
      dt.getMonth() + 1,
      dt.getDate(),
      dt.getHours() + timeDiff,
      dt.getMinutes(),
      dt.getSeconds(),
    )

    // Format datetime string
    const year = ('    ' + datetime.getFullYear()).slice(-4)
    const month = ('00' + datetime.getMonth()).slice(-2)
    const date = ('00' + datetime.getDate()).slice(-2)
    const hours = ('00' + datetime.getHours()).slice(-2)
    const minutes = ('00' + datetime.getMinutes()).slice(-2)
    const seconds = ('00' + datetime.getSeconds()).slice(-2)

    return `${year}年${month}月${date}日 ${hours}時${minutes}分`
  } catch {
    return ''
  }
}