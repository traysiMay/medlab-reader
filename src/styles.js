import styled from 'styled-components'

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
    &.rsvp {
        text-align: center;
        font-size: 30px;
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
margin-top:10px;
`
export const Button = styled.button`
    background: black;
    color: white;
    width: 330px;
    height: 150px;
    text-align: center;
    display: block;
    margin: auto;
    font-size: 49px;
`