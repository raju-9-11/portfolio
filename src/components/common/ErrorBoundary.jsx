import React from 'react';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const Container = styled.div`
  background-color: #0000aa; /* Classic BSOD blue */
  color: #fff;
  font-family: 'Courier New', monospace;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      rgba(0, 0, 0, 0.3) 50%
    );
    background-size: 100% 4px;
    pointer-events: none;
  }
`;

const Title = styled.h1`
  background-color: #fff;
  color: #0000aa;
  padding: 5px 10px;
  font-size: 1.5rem;
  margin-bottom: 40px;
`;

const Message = styled.div`
  max-width: 800px;
  font-size: 1.2rem;
  line-height: 1.5;
  text-align: left;
`;

const ErrorDetails = styled.div`
  margin-top: 40px;
  font-size: 1rem;
  opacity: 0.8;
  white-space: pre-wrap;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 10px;
  height: 20px;
  background: #fff;
  animation: ${blink} 1s step-end infinite;
  vertical-align: middle;
  margin-left: 5px;
`;

const Action = styled.button`
    margin-top: 50px;
    background: transparent;
    border: 2px solid #fff;
    color: #fff;
    padding: 10px 20px;
    font-family: inherit;
    font-size: 1rem;
    cursor: pointer;
    text-transform: uppercase;

    &:hover {
        background: #fff;
        color: #0000aa;
    }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Title>SYSTEM FAILURE</Title>
          <Message>
            <p>A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) + 00010E36. The current application will be terminated.</p>
            <p>* Press Enter to return to the system.</p>
            <p>* Press CTRL+ALT+DEL to restart your computer. You will lose any unsaved information in all applications.</p>
          </Message>
          <ErrorDetails>
            Details: {this.state.error && this.state.error.toString()}
            <Cursor />
          </ErrorDetails>
          <Action onClick={this.handleReload}>[ REBOOT SYSTEM ]</Action>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
