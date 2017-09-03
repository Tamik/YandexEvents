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
   * @todo: implement it and Расписать критерии
   */
  beautifyDatesRange: (dateStart, dateEnd) => {
    // @todo: implement
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
