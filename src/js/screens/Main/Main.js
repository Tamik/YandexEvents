import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { replace } from 'actions/navigationActions'
import { sendModalCategoryData } from 'actions/dataActions'

import { Tabs, Container } from 'ui-components'

import style from 'screens/main/style.scss'
import styleTabs from 'ui-components/Tabs/style.scss'

const Main = (props) => {
  const activeTabName = props.router.route.slice(2)
  const activeCategoryId = parseInt(props.params.categoryId, 10)

  const viewMainTab = () => {
    props.onViewMainTab()
  }

  const viewCategory = (categoryData) => {
    props.onViewCategory(categoryData)
  }

  // @TODO: get from api middleware
  const payloadCategoriesJSON = [
    {
      "id": 1,
      "title": "Выставки"
    },
    {
      "id": 2,
      "title": "Фестивали"
    },
    {
      "id": 3,
      "title": "Спорт"
    },
    {
      "id": 4,
      "title": "Концерты"
    },
    {
      "id": 5,
      "title": "Парки"
    },
    {
      "id": 6,
      "title": "Экскурсии"
    }
  ]

  return (
    <div className='screen'>
      <Tabs>
        { /* Main tab */ }
        <div
          role='button'
          className={`${styleTabs.tabs__item} ${activeTabName === 'feed' ? styleTabs.tabs__item_active : ''}`}
          onClick={() => {
            viewMainTab()
          }}
        >Подборки</div>
        {
          /* Print categories tabs */
          payloadCategoriesJSON.map((item, idx) => {
            return (
              <div
                key={item.id}
                role='button'
                className={`${styleTabs.tabs__item} ${activeCategoryId == item.id ? styleTabs.tabs__item_active : ''}`}
                onClick={() => {
                  viewCategory(item)
                }}
              >{item.title}</div>
            )
          })
        }
      </Tabs>
      <Container scrolling stretching>
        <props.fragment params={props.params} view={props.view} />
      </Container>
    </div>
  )
}

export default connect(
  state => ({
    router: state.router,
    user: state.user,
    data: state.data,
    view: state.view,
  }),
  dispatch => ({
    onViewMainTab: () => {
      dispatch(replace('/feed'))
    },
    onViewCategory: (categoryData) => {
      dispatch(sendModalCategoryData(categoryData))
      dispatch(replace(`/category/${categoryData.id}/list`))
    },
  })
)(Main)
