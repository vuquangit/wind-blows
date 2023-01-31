export const FLAT_HOURS = Array(24)
  .fill(undefined)
  .map((_, index) => (String(index).length === 1 ? `0${index}` : String(index)))

export const FLAT_MINUTES = Array(6)
  .fill(undefined)
  .map((_, index) => (index === 0 ? `0${index}` : String(index * 10)))

export const FORMAT_L = 'YYYY/MM/DD'

export const FORMAT_LL = 'YYYY:MM:DD'

export const FORMAT_LLL = 'YYYY/MM/DD HH:mm'

export const FORMAT_LLLL = 'YYYY/MM/DD HH:mm:ss'

export const FORMAT_LLLLL = 'YYYY/MM/DD - HH:mm'

export const FORMAT_LLLLLAM = 'YYYY/MM/DD - hh:mm A'

export const FORMAT_LTS = 'YYYY/MM/DD - h:mma'

export const FORMAT_ISO_8601 = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]'

export const FORMAT_MONTH = 'YYYY/MM'
