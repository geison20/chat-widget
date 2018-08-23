import React, { Component } from "react";

import { List, Divider, Card, Badge, Avatar } from "antd";

class RoomSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: true
    };
  }

  render = () => {
    const { rooms, handleEnterRoom } = this.props;

    return (
      <Card
        bordered={false}
        style={{ display: this.state.display ? "flex" : "none" }}
      >
        <Divider>Selecione uma sala</Divider>

        <List
          size="small"
          itemLayout="horizontal"
          dataSource={rooms}
          renderItem={room => (
            <List.Item
              key={room.id}
              actions={[
                <Badge status="success" text="3" />,
                <a
                  onClick={() => {
                    this.setState({ display: false });

                    document.getElementsByClassName(
                      "rcw-sender"
                    )[0].style.display = "flex";
                    handleEnterRoom(room);
                  }}
                >
                  Entrar
                </a>
              ]}
            >
              <List.Item.Meta
                title={room.name}
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                description="isso é um teste"
              />
            </List.Item>
          )}
        />
      </Card>
    );
  };
}

export default RoomSelect;
