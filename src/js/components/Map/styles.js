import styled from 'styled-components'

const YMapsWrap = styled.div`
display: flex;
flex-direction: column;
flex-grow: 1;
position: relative;
height: 90vh;
`
const Pane = styled.div`
position: absolute;
bottom: 0;
background: rgba(255, 255, 255, 0.8);
width: 100%;
opacity: 0;
`
const PaneInner = styled.div`
/* padding: 16px 5px; */
padding: 16px 0px;
text-align: center;
color: rgba(38, 50, 56, 1);
`
const BalloonLayout = styled.div`
position: absolute;
bottom: 0;
/* background: #fff; */
width: 100%;
z-index: 100;
`
const BalloonInner = styled.div`
/* background: #eff1f2; */
/* padding: 5px; */
margin-bottom: 32px;
`
const BalloonTopBar = styled.div`
`
const BtnClose = styled.div`
opacity: 0;
font-size: 11pt;
background: #fff;
border-bottom: 1px solid #CFD8DC;
border-right: 1px solid #CFD8DC;
border-radius: 2px;
height: 40px;
margin-bottom: 5px;
text-transform: uppercase;
text-align: center;
line-height: 40px;
color: rgba(38, 50, 56, 1);
`
const BalloonItemsWrap = styled.div`
max-height: 55vh;
overflow-x: hidden;
overflow-y: auto;
`
const BalloonEventItem = styled.div`
position: relative;
background: #fff;
border-right: 1px solid #CFD8DC;
border-bottom: 1px solid #CFD8DC;
border-radius: 2px;
margin-bottom: 5px;
padding: 10px;
`
const BalloonEventTitle = styled.div`
font-size: 16px;
font-weight: bold;
color: rgba(38, 50, 56, 1);
`
const BalloonEventMeta = styled.div`
font-size: 14px;
margin-top: 4px;
color: #455A64; 
`
const DistanceLabel = styled.span`
display: inline-block;
position: absolute;
right: 10px;
bottom: 10px;
margin-right: 6px;
color: rgba(38, 50, 56, 1);
`

const BtnGoToMyLocation = styled.div`
position: absolute;
right: 16px;
top: 24px;
background-color: rgba(255, 255, 255, .85);
border-radius: 50%;
width: 56px;
height: 56px;
text-align: center;
line-height: 72px;
box-shadow: 0 2px 6px -0.6px rgba(0, 0, 0, .25);
z-index: 100;
`

export {
  YMapsWrap,
  Pane,
  PaneInner,
  BalloonLayout,
  BalloonInner,
  BalloonTopBar,
  BtnClose,
  BalloonItemsWrap,
  BalloonEventItem,
  BalloonEventTitle,
  BalloonEventMeta,
  DistanceLabel,
  BtnGoToMyLocation
}
