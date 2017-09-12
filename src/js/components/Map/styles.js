import styled from 'styled-components'

export const YMapsWrap = styled.div`
display: flex;
flex-direction: column;
flex-grow: 1;
position: relative;
height: 90vh;
`

export const Pane = styled.div`
display: none;
position: absolute;
bottom: 0;
background-color: rgba(255, 255, 255, .8);
width: 100%;
opacity: 0;
`

export const PaneInner = styled.div`
padding: 16px 0px;
color: rgba(38, 50, 56, 1);
text-align: center;
`

export const BalloonLayout = styled.div`
position: absolute;
bottom: 0;
width: 100%;
z-index: 100;
`

export const BalloonInner = styled.div`
margin-bottom: 32px;
`

export const BalloonTopBar = styled.div`
`

export const BtnClose = styled.div`
display: none;
font-size: 11pt;
background-color: rgba(255, 255, 255, 1);
border-bottom: 1px solid rgba(207, 216, 220, 1);
border-right: 1px solid rgba(207, 216, 220, 1);
border-radius: 2px;
height: 40px;
margin-bottom: 5px;
color: rgba(38, 50, 56, 1);
text-align: center;
text-transform: uppercase;
line-height: 40px;
opacity: 0;
`

export const BalloonItemsWrap = styled.div`
max-height: 55vh;
overflow-x: hidden;
overflow-y: auto;
`

export const BalloonEventItem = styled.div`
position: relative;
background-color: rgba(255, 255, 255, 1);
border-right: 1px solid rgba(207, 216, 220, 1);
border-bottom: 1px solid rgba(207, 216, 220, 1);
border-radius: 2px;
margin-bottom: 5px;
padding: 10px;
`

export const BalloonEventTitle = styled.div`
font-size: 16px;
font-weight: bold;
color: rgba(38, 50, 56, 1);
`

export const BalloonEventMeta = styled.div`
font-size: 14px;
margin-top: 4px;
color: rgba(69, 90, 100, 1); 
`

export const DistanceLabel = styled.span`
display: inline-block;
position: absolute;
right: 10px;
bottom: 10px;
margin-right: 6px;
color: rgba(38, 50, 56, 1);
`

export const BtnRounded = styled.div`
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
// 24 - 96 - 168
