import React, { Component } from "react";
import { parse } from "query-string";
import { ChatManager, TokenProvider } from "@pusher/chatkit";

import axios from "../../services/axios";
import UserForm from "../UserForm";
import RoomSelect from "../RoomSelect";
// import Welcome from "../Welcome";

import "react-chat-widget/lib/styles.css";
import "./style.css";
import foto from "../../foto.jpg";

import {
  Widget,
  addResponseMessage,
  renderCustomComponent
} from "react-chat-widget";

const tokenProvider = new TokenProvider({
  url: "http://localhost:5000/api/authentications/clients/chat",
  headers: {
    "accept-version": 1,
    "Accept-Language": "pt"
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      pusherRoomId: null,
      privateRoom: null,
      rooms: []
    };
  }

  handleEnterRoom = async ({ pusherRoomId }) => {
    const { currentUser } = this.state;

    await currentUser.joinRoom({
      roomId: pusherRoomId
    });

    const clientAgentRoom = await currentUser.createRoom({
      name: currentUser.id, // importante
      private: false
    });

    currentUser.subscribeToRoom({
      roomId: clientAgentRoom.id,
      hooks: {
        onNewMessage: message => {
          if (message.senderId !== currentUser.id) {
            addResponseMessage(message.text);
          }
        }
      },
      messageLimit: 100
    });

    this.setState({ pusherRoomId, privateRoom: clientAgentRoom.id });
  };

  handleCreateUserChat = async ({ email, name, phone }) => {
    const { rooms } = this.state;

    try {
      const {
        data: { id }
      } = await axios.post("/api/clients", { email, name, phone });

      const chatManager = new ChatManager({
        instanceLocator: "v1:us1:a55faaa0-561d-4a4e-afab-ac8e4383e38a",
        userId: id,
        tokenProvider: tokenProvider
      });

      const currentUser = await chatManager.connect();

      this.setState({
        currentUser
      });

      renderCustomComponent(RoomSelect, {
        handleEnterRoom: this.handleEnterRoom,
        rooms
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  componentWillMount = async () => {
    const {
      location: { search }
    } = this.props;

    const { token } = parse(search);

    try {
      const {
        data: { agents, rooms }
      } = await axios("/api/accounts/token", {
        params: {
          token
        }
      });

      this.setState({ rooms });

      renderCustomComponent(UserForm, {
        handleCreateUserChat: this.handleCreateUserChat
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  handleNewUserMessage = async messageFromClient => {
    const { privateRoom, currentUser } = this.state;

    const messageId = await currentUser.sendMessage({
      text: messageFromClient,
      roomId: privateRoom
    });

    console.log("message id: ", messageId);
  };

  render() {
    return (
      <Widget
        title="MEU TITULO"
        titleAvatar={foto}
        subtitle="MEU SUBTITULO"
        senderPlaceHolder="Escreva aqui..."
        profileAvatar={foto}
        handleNewUserMessage={this.handleNewUserMessage}
        badge={1}
        autofocus={true}
      />
    );
  }
}

export default App;
