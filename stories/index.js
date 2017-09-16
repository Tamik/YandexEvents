import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions' // what is it
import { linkTo } from '@storybook/addon-links'

import { Welcome } from '@storybook/react/demo'

import {
  Avatar,
  BottomNavigation,
  Button,
  Card,
  Carousel,
  Container,
  FloatingButton,
  HolidayCard,
  Icon,
  Image,
  MapCard,
  SlideCard,
  Slider,
  Spinner,
  Tabs,
  TopBar,
} from 'ui-components'

import styleTabs from 'ui-components/Tabs/style.scss'
import styleBottomNavigation from 'ui-components/BottomNavigation/style.scss'

storiesOf('Avatar', module)
  .add('Without title', () => <Avatar src='' />)
  .add('With title', () => <Avatar title='Николай Басков' src='' />)

storiesOf('Button', module)
  .addDecorator(story => (
    <div style={{ maxWidth: 400 }}>
      {story()}
    </div>
  ))
  .add('default', () => <Button label='Button' />)
  .add('disabled', () => <Button label='Button' disabled />)
  .add('primary', () => <Button label='Button' primary />)

storiesOf('FloatingButton', module)
  .add('default', () => <FloatingButton />)
  .add('with icon', () => <FloatingButton icon={<Icon type='list' />} />)
  .add('with icon && title', () => (
    <FloatingButton
      title='Список'
      icon={<Icon type='list' />}
    />
  ))

storiesOf('Icon', module)
  .add('default', () => <Icon type='map' />)
  .add('80x80', () => <Icon type='map' height='80' width='80' />)
  .add('red color', () => <Icon type='map' color='red' />)

storiesOf('Image', module)
  .add('small', () => <Image />)
  .add('medium', () => <Image size='medium' />)
  .add('large', () => <Image sieze='large' />)

storiesOf('Card', module)
  .addDecorator(story => (
    <div style={{ maxWidth: 400 }}>
      {story()}
    </div>
  ))
  .add('small', () => <Card title='Парк Горького' />)
  .add('medium', () => <Card size='medium' title='День города' />)

storiesOf('MapCard', module)
  .add('default', () => <MapCard title='Неизвестная выставка' onClick={action('clicked')} />)

storiesOf('HolidayCard', module)
  .add('open', () => <HolidayCard title='Неизвестная выставка' />)

storiesOf('SlideCard', module)
  .add('small', () => (
    <SlideCard
      title='Неизвестная выставка'
      date='2 ноября'
      onClick={action('clicked')}
    />
  ))
  .add('medium', () => (
    <SlideCard
      title='Неизвестная выставка'
      date='2 ноября'
      size='medium'
      onClick={action('clicked')}
    />
  ))

storiesOf('Spinner', module)
  .add('default', () => <Spinner />)

storiesOf('Tabs', module)
  .add('default', () => (
    <Tabs>
      <div className={`${styleTabs.tabs__item} ${styleTabs.tabs__item_active}`}>Выставки</div>
      <div className={styleTabs.tabs__item}>Фестивали</div>
      <div className={styleTabs.tabs__item}>Парки</div>
    </Tabs>
  ))

storiesOf('TopBar', module)
  .add('default', () => <TopBar title='Парк Горького' />)
  .add('transparent', () => <TopBar isTransparent />)
  .add('with icon', () => <TopBar iconLeft={<Icon type='arrowBack' />} />)

storiesOf('BottomNavigation', module)
  .add('default', () => (
    <BottomNavigation>
      <div
        className={`
          ${styleBottomNavigation.BottomNavigation__item}
          ${styleBottomNavigation.BottomNavigation__item_active}
        `}
      >
        <Icon
          type={'eventFill'}
          height='20'
        />
        День Города
      </div>
      <div className={styleBottomNavigation.BottomNavigation__item}>

        <Icon
          type={'star'}
          height='20'
        />
        Все праздники
      </div>
      <div className={styleBottomNavigation.BottomNavigation__item}>
        <Icon
          type={'bookmark'}
          height='20'
          color='#777'
        />
        Закладки
      </div>
    </BottomNavigation>
  ))

storiesOf('Container', module)
  .addDecorator(story => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: 400,
      height: 300,
      overflowY: 'hidden',
      backgroundColor: '#bfd4eb',
    }}
    >
      {story()}
    </div>
  ))
  .add('default', () => (
    <Container color>
      <Avatar src='' />
    </Container>
  ))
  .add('stretching', () => (
    <Container stretching color>
      <Avatar src='' />
    </Container>
  ))
  .add('scrolling', () => (
    <Container stretching scrolling color>
      <Avatar src='' />
      <Avatar src='' />
      <Avatar src='' />
    </Container>
  ))

storiesOf('Carousel', module)
  .addDecorator(story => (
    <div style={{ maxWidth: 400 }}>
      {story()}
    </div>
  ))
  .add('with Avatars', () => (
    <Carousel>
      <div>
        <Avatar src='' />
        <Avatar src='' />
        <Avatar src='' />
        <Avatar src='' />
        <Avatar src='' />
      </div>
    </Carousel>
  ))

storiesOf('Slider', module)
  .add('default (infinite)', () => (
    <Slider>
      <SlideCard title='Выставка 1' date='2 ноября' size='medium' onClick={action('clicked')} />
      <SlideCard title='Выставка 2' date='2 мая' size='medium' onClick={action('clicked')} />
      <SlideCard title='Выставка 3' date='2 ноября' size='medium' onClick={action('clicked')} />
    </Slider>
  ))
  .add('finite', () => (
    <Slider infinite={false}>
      <SlideCard title='Выставка 1' date='2 ноября' size='medium' onClick={action('clicked')} />
      <SlideCard title='Выставка 2' date='2 мая' size='medium' onClick={action('clicked')} />
      <SlideCard title='Выставка 3' date='2 ноября' size='medium' onClick={action('clicked')} />
    </Slider>
  ))
  .add('with dots', () => (
    <Slider dots infinite={false}>
      <SlideCard title='Выставка 1' date='2 ноября' size='medium' onClick={action('clicked')} />
      <SlideCard title='Выставка 2' date='2 мая' size='medium' onClick={action('clicked')} />
      <SlideCard title='Выставка 3' date='2 ноября' size='medium' onClick={action('clicked')} />
    </Slider>
  ))
