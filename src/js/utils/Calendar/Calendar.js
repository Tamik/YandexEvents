/**
 * @function addToCalendar
 * @description Функция, позволяющая добавить событие в календарь на устройстве пользователя
 * @param {string} title
 * @param {Array} location (координаты)
 * @param {string} description
 * @param {Object} startDate
 * @param {Object} endDate
 * @returns {Promise}
 */
const addToCalendar = (title, location = null, description = '', startDate, endDate) => new Promise((resolve, reject) => {
  const newStartDate = startDate.replace(/-/g, '/')
  const newEndDate = endDate.replace(/-/g, '/')

  window.plugins.calendar.createEventInteractively(
    title,
    location,
    description,
    newStartDate,
    newEndDate,
    resolve,
    reject
  )
})

export default addToCalendar
