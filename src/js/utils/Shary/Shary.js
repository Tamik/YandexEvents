const CHOOSER_TITLE_EVENT = 'Поделиться событием'
const EVENT_URL_TPL = `${process.env.HOST}/event/%`

/**
 * @see https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin#readme
 */
const share = options => new Promise((resolve, reject) => {
  window.plugins.socialsharing.shareWithOptions(options, resolve, reject)
})

const Shary = {
  shareEvent: (eventData) => {
    const enter = eventData.is_free ? 'Свободный вход' : ''
    const messageText = [
      `${eventData.title}, `,
      `${eventData.dateTime}, `,
      (enter ? `${enter}, ` : ''),
      (eventData.location_title !== eventData.address
        ? `${eventData.location_title} (${eventData.address})`
        : ''),
    ].join('')

    const options = {
      message: messageText,
      subject: eventData.title,
      files: [eventData.photo_large],
      url: EVENT_URL_TPL.replace(/%/, eventData.id),
      chooserTitle: CHOOSER_TITLE_EVENT,
    }

    return share(options)
  },

  sharePlace: () => {},
  shareEntity: () => {},
  shareApp: () => {},
}

export default Shary
