import React, { Component } from "react";

import UserForm from "../UserForm";
import RoomSelect from "../RoomSelect";

import { Row, Divider, Card, Steps, Button } from "antd";

const Step = Steps.Step;

const steps = [
  {
    title: "Formulário",
    description: "Forneça seu contato",
    content: <UserForm />
  },
  {
    title: "Salas",
    description: "Escolha uma sala",
    content: <RoomSelect />
  }
];

class StepByStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0
    };
  }

  next = () => this.setState({ current: this.state.current + 1 });

  prev = () => this.setState({ current: this.state.current - 1 });

  render() {
    const { current } = this.state;

    return (
      <Row>
        <Card>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
            merninisti licere mihi ista probare, quae sunt a te dicta? Refert
            tamen, quo modo.
          </p>
        </Card>

        <Divider>Identifique-se</Divider>

        <Steps progressDot size="small" current={current}>
          {steps.map(({ title, description }) => (
            <Step key={title} title={title} description={description} />
          ))}
        </Steps>

        {steps[current].content}

        <div>
          {current < steps.length - 1 && (
            <Button type="primary" block onClick={() => this.next()}>
              Próximo
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              block
              onClick={() =>
                (document.getElementsByClassName(
                  "rcw-sender"
                )[0].style.display = "flex")
              }
            >
              Iniciar Conversa
            </Button>
          )}
        </div>
      </Row>
    );
  }
}

export default StepByStep;
