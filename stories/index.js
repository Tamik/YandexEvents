import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Welcome } from '@storybook/react/demo'
import { Avatar, Image } from './../src/js/ui-components'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)
storiesOf('Image', module)
  .add('small', () => <Image size='small' src='http://placehold.it/50x50' />)
  .add('large', () => <Image size='large' src='http://placehold.it/350x50' />)
