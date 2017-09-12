export const GEOLOCATION_WATCH_TIMEOUT = 60000 // seconds

export const CLUSTER_STYLE_PRESET = 'islands#blueClusterIcons'
export const EVENT_STYLE_PRESET = 'islands#blueCircleDotIcon'
export const MYLOCATION_STYLE_PRESET = 'islands#geolocationIcon'

export const INIT_ZOOM = 13 // zoom: 1..23
export const MIN_ZOOM = 9
export const CONTROLS = ['zoomControl']

export const MAP_ZOOM_TO_MY_LOCATION = 15

/* dev:start */
export const POINT_TYPES = {
  MY_LOCATION: 'mylocation',
  EVENT: 'event',
}
/* dev:end */

export const EVENT_PLACEMARK_OPTIONS = {
  preset: EVENT_STYLE_PRESET,
}

export const MYLOCATION_PLACEMARK_OPTIONS = {
  preset: MYLOCATION_STYLE_PRESET,
}

/* dev:start */
export const formatDistance = (metters) => {
  if (metters < 1000) {
    return `${metters.toFixed(0)} м`
  }
  const km = (metters / 1000).toFixed(1)
  return `${km} км`
}
/* dev:end */

export const getTimeEpoch = () => ((new Date()).getTime() / 1000)
