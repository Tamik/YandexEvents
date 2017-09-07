import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { replace } from 'actions/navigationActions'
import { sendModalCategoryData } from 'actions/dataActions'

import { Tabs, Container, BottomNavigation, Icon } from 'ui-components'

import style from 'screens/main/style.scss'
import styleTabs from 'ui-components/Tabs/style.scss'
import styleBotNav from 'ui-components/BottomNavigation/style.scss'

const Main = (props) => {
  const activeTabName = props.router.route.slice(2)
  const activeCategoryId = parseInt(props.params.categoryId, 10)

  const viewMainTab = () => {
    props.onViewMainTab()
  }

  const viewCategory = (categoryData) => {
    props.onViewCategory(categoryData)
  }

  return (
    <div className='screen'>
      <Tabs style={{ ...props.data.configData.params.style.topBar }}>
        { /* Main tab */}
        <div
          role='button'
          className={`${styleTabs.tabs__item} ${activeTabName === 'feed' ? styleTabs.tabs__item_active : ''}`}
          onClick={() => {
            viewMainTab()
          }}
          style={props.data.configData.params.style.topBar}
        >{props.data.configData.params.mainTabTitle}</div>
        {
          /* Print categories tabs */
          props.data.configData.params.categories.map(item => (
            <div
              key={item.id}
              role='button'
              className={`${styleTabs.tabs__item} ${activeCategoryId === item.id ? styleTabs.tabs__item_active : ''}`}
              onClick={() => viewCategory(item)}
              style={props.data.configData.params.style.topBar}
            >{item.title}</div>
          )
          )
        }
      </Tabs>
      <Container scrolling stretching background>
        <props.fragment params={props.params} view={props.view} />
      </Container>
      <BottomNavigation>
        <div className={`${styleBotNav.botNav__item}`}>
          <Icon type='star' height='20' />
          Лучшее
        </div>
        <div className={`${styleBotNav.botNav__item}`}>
          <Icon type='ticket' height='20' />
          Мои билеты
        </div>
        <div className={`${styleBotNav.botNav__item}`}>
          <Icon type='moscowDayActive' height='20' />
          День Города
        </div>
        <div className={`${styleBotNav.botNav__item}`}>
          <Icon type='search' height='20' />
          Поиск
        </div>
        <div className={`${styleBotNav.botNav__item}`}>
          <Icon type='profile' height='20' />
          Профиль
        </div>
      </BottomNavigation>
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
