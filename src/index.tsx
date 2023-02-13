import React from "react"
import {createRoot} from "react-dom/client"
import {Provider} from "react-redux"
import styled, {createGlobalStyle} from "styled-components"
import App from "./App"
import {store} from "./store"

const GlobalStyle = createGlobalStyle`
   *,
    *::before,
    *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }   
    
    body {
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
        font-weight: 400;
    }
`

export const StyledContainer = styled.div`
    max-width: 1220px;
    margin: 0 auto;
`

const root = createRoot(
    document.getElementById("root") as HTMLElement
)

root.render(
    <Provider store={store}>
        <GlobalStyle/>
        <App/>
    </Provider>
)
