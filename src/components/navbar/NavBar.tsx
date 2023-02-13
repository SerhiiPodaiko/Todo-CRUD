import styled from "styled-components"
import {StyledContainer} from "../../index"

const StyledNavBar = styled.header`
    padding: 10px 30px;
    background: #9457EB;
`

const StyledTitle = styled.h4`
    color: #fff;
    font-size: 20px;
`

const NavBar = () => {
    return (
        <StyledNavBar>
            <StyledContainer>
                <StyledTitle>CRUD</StyledTitle>
            </StyledContainer>
        </StyledNavBar>
    )
}

export default NavBar
