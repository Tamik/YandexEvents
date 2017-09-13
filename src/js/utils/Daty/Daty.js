import moment from 'moment'

const Daty = {
  /**
   * Получить текущее время по МСК
   * @returns {Object}
   */
  getTodayMSK: () => {
    const date = moment(new Date()).utcOffset('+03:00').format('YYYY-MM-DD')
    const dateComponent = date.split('-')
    return {
      full: date,
      year: dateComponent[0],
      month: dateComponent[1],
      dayNum: dateComponent[2],
      yearInt: parseInt(dateComponent[0], 10),
      monthInt: parseInt(dateComponent[1], 10),
      dayNumInt: parseInt(dateComponent[2], 10),
    }
  },

  /**
   * Метод вернет красивую дату начала и дату завершения события
   *@params {Number} dateStart/dateEnd (ms)
   *@return {Object}
   * {
   *  dates: '1 - 2 сентября' || '1 сентября - 2 октября',
   *  time: '15:00',
   * }
   */
  beautifyDatesRange: (dateStart, dateEnd) => {
    const begin = moment(new Date(dateStart.replace(/-/g, '/')))
    const end = moment(new Date(dateEnd.replace(/-/g, '/')))
    let range = ''
    // Одинаковые месяцы начала и конца события
    if (begin.month() === end.month()) {
      if (begin.date() === end.date()) {
        // 2 ноября
        range = begin.locale('ru').format('D MMMM')
      }
      else {
        // 2 - 3 ноября
        range = `${begin.format('D')} — ${end.locale('ru').format('D MMMM')}`
      }
    }
    else {
      // 2 сентября - 2 декабря
      range = `${begin.locale('ru').format('D MMMM')} — ${end.locale('ru').format('D MMMM')}`
    }
    return ({
      dates: range,
      time: begin.locale('ru').format('HH:mm'),
    })
  },
  getDeclineOfNumber: (number, titlesArray) => {
    const cases = [2, 0, 1, 1, 1, 2]
    return titlesArray[
      (number % 100 > 4 && number % 100 < 20)
        ? 2
        : cases[(number % 10 < 5) ? number % 10 : 5]
    ]
  },
}

export default Daty
