import React from 'react'

import { Map as YandexMaps } from 'components'

import { Container } from 'ui-components'

/**
 * @function Map
 * @description Экран просмотра Карты
 */
const Map = () => (
  <Container stretching>
    <YandexMaps />
  </Container>
)

export default Map
