/**
 * @function addToCalendar
 * @description Функция, позволяющая добавить событие в календарь на устройстве пользователя
 * @param {string} title
 * @param {Array} location (координаты)
 * @param {string} description
 * @param {Object} startDate
 * @param {Object} endDate
 */
const addToCalendar = (title, location = null, description = '', startDate = new Date(), endDate = new Date()) => {
  const successHandler = () => {
    // successHandler
    console.log('Calendar', true)
  }
  const errorHandler = (error) => {
    // errorHandler
    console.error('Calendar', error)
  }

  window.plugins.calendar.createEventInteractively(
    title,
    location,
    description,
    startDate,
    endDate,
    successHandler,
    errorHandler
  )
}

export default addToCalendar
