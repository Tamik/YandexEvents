export const GEOLOCATION_WATCH_TIMEOUT = 60000 // seconds

export const CLUSTER_STYLE_PRESET = 'islands#blueClusterIcons'
export const EVENT_STYLE_PRESET = 'islands#blueCircleDotIcon'
export const MYLOCATION_STYLE_PRESET = 'islands#geolocationIcon'

export const INIT_ZOOM = 13 // zoom: 1..23
export const MIN_ZOOM = 9
export const CONTROLS = []

export const MAP_ZOOM_TO_MY_LOCATION = 15

export const POINT_TYPES = {
  MY_LOCATION: 'mylocation',
  EVENT: 'event',
}

export const EVENT_PLACEMARK_OPTIONS = {
  preset: EVENT_STYLE_PRESET,
}

export const MYLOCATION_PLACEMARK_OPTIONS = {
  preset: MYLOCATION_STYLE_PRESET,
}

export const formatDistance = (metters) => {
  if (metters < 1000) {
    return `${metters} м`
  }
  const km = (metters / 1000).toFixed(1)
  return `${km} км`
}

export const getTimeEpoch = () => ((new Date()).getTime() / 1000)
