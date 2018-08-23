import React, { Component } from "react";

import { Form, Icon, Input, Row, Col, Divider, Button, Card } from "antd";

const FormItem = Form.Item;

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: true
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFields },
      handleCreateUserChat
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        this.setState({ display: false });
        handleCreateUserChat(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Card
        bordered={false}
        style={{ display: this.state.display ? "block" : "none" }}
      >
        <Row>
          <Divider>Identifique-se</Divider>

          <Form onSubmit={this.handleSubmit} style={{ width: "100%" }}>
            <Row>
              <Col>
                <FormItem
                  style={{ marginBottom: 5 }}
                  key="name"
                  hasFeedback={true}
                  label="Nome"
                >
                  {getFieldDecorator("name", {
                    rules: [
                      {
                        required: true,
                        message: "Obrigatório"
                      },
                      {
                        whitespace: true,
                        message: "Sem espaço em branco"
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="text"
                      placeholder="Ex. Vitor Lima"
                    />
                  )}
                </FormItem>
                <FormItem
                  style={{ marginBottom: 5 }}
                  key="email"
                  hasFeedback={true}
                  label="E-mail"
                >
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        type: "email",
                        message: "Email deve ser válido"
                      },
                      {
                        required: true,
                        message: "Obrigatório"
                      },
                      {
                        whitespace: true,
                        message: "Sem espaço em branco"
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="solution"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="text"
                      placeholder="Ex. vitor.lima@gmail.com"
                    />
                  )}
                </FormItem>
                <FormItem
                  style={{ marginBottom: 20 }}
                  key="phone"
                  hasFeedback={true}
                  label="Telefone"
                >
                  {getFieldDecorator("phone", {
                    rules: [
                      {
                        required: true,
                        message: "Obrigatório"
                      },
                      {
                        whitespace: true,
                        message: "Sem espaço em branco"
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="phone"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="text"
                      placeholder="Ex. 51 996304662"
                    />
                  )}
                </FormItem>
                <Button size="large" type="primary" block htmlType="submit">
                  Próximo
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </Card>
    );
  }
}

export default Form.create()(UserForm);
