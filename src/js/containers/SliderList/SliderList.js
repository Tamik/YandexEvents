import React from 'react'
import PropTypes from 'prop-types'

import { List } from 'components'
import { Slider } from 'ui-components'
import style from 'components/List/style.scss'

const SliderList = props => (
  <div className={style.list__wrap}>
    <h3 className={style.list__title}>{props.title}</h3>
    <Slider>
      {
        props.payload.map(item => (
          <div>
            <List key={item.id} type='slider_events' data={item} />
          </div>
        ))
      }
    </Slider>
  </div>
)

SliderList.defaultProps = {
  title: null,
}

SliderList.propTypes = {
  title: PropTypes.string,
  payload: PropTypes.shape().isRequired,
}

export default SliderList
