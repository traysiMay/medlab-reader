import styled from 'styled-components'

export const Nav = styled.div`
display:flex;
justify-content:space-around;
div {
    border: 7px white solid;
    width: 100%;
    text-align: center;
    background: black;
    height: 50px;
    color: white;
    line-height: 50px;
    font-size: 24px;
    font-weight: bold;
}
`

export const SearchInput = styled.input`
    width: 90%;
    display: block;
    margin: 40px auto 16px;
    border: 2px black solid;
    height: 47px;
    font-size: 30px;
    text-align: center;
`

export const EmailContainer = styled.div`
    display:flex;
    background:black;
    color:white;
    justify-content: center;
    flex-direction: column;
    width: 90%;
    margin: auto;
`
export const EmailLine = styled.div`
    font-size:20px;
    white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
    &.rsvp {
        text-align: center;
        padding:22px;
        text-decoration: ${props => props.boop}
    }
    &.raptor {
        color:deeppink;
    }
    &#selected{
        background:limegreen;
    }
`
export const ButtonContainer = styled.div`
position: fixed;
    left: 0;
    bottom: 0;
    width:100%;
`
export const Button = styled.button`
    background: black;
    color: white;
    width: 100%;
    height: 150px;
    text-align: center;
    display: block;
    margin: auto;
    font-size: 49px;
    border: 13px white solid;
`