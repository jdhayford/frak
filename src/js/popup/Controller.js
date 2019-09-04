import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

// this.port.onMessage.addListener((session) => {
//   this.setState({
//     sessionName: session.code,
//     sessionStatus: Status.DONE,
//   });
// });

class Controller extends React.Component {
  render() {
    return (
      <Container>
        StaleMate
      </Container>
    );
  }
}

export default Controller;