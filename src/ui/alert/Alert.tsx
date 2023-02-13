import {FC, ReactNode} from "react"
import styled from "styled-components"

interface AlertProps {
    children: ReactNode,
    type: string
}

const StyledAlert = styled.div`
        padding: 20px;
        border-radius: 10px;
        background: #EB6A5E;
        color: #fff;
        font-size: 18px;
        font-weight: 500;
        text-align: center;
        
        &.error {
            background: #EB4C42;
        }
        
        &.success {
            background: #50C878;
        }
    `

const Alert: FC<AlertProps> = ({children, type}) => {
    return (
        <StyledAlert>
            {children}
        </StyledAlert>
    )
}

export default Alert
