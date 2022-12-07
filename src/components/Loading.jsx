import React from "react";
import { Spinner } from "react-bootstrap";
import styled, { css } from "styled-components";

const LoadingOverlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    ${
        props => 
        props.darkMode === true ? (
            css`background-color: black`
        ) : (
            css`background-color: white`
        )
    }
`

class Loading extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <LoadingOverlay darkMode={this.props.darkMode}>
                <Spinner animation="grow" variant={this.props.darkMode ? "light" : "dark"} />
            </LoadingOverlay>
        )
    }
}

export default Loading;