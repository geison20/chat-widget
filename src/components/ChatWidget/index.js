import React, { Component } from "react";
import deepstream from "deepstream.io-client-js";

import { parse } from "query-string";

import axios from "../../services/axios";
import UserForm from "../UserForm";
import Typing from "../Typing";

import "react-chat-widget/lib/styles.css";
import "./style.css";
import foto from "../../foto.jpg";

import {
  Widget,
  addResponseMessage,
  renderCustomComponent
} from "react-chat-widget";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: null,
      token: null,
      accountId: null
    };
  }

  handleCreateUserChat = async ({ email, name, phone }) => {
    const { token, accountId, chat } = this.state;

    try {
      const deepstreamClient = deepstream("localhost:6020").login(
        {
          type: "webhook",
          email,
          data: {
            name,
            phone,
            accountId
          }
        },
        (success, data) => console.log(success, data)
      );

      const recordClient = deepstreamClient.record.getRecord("clients");

      recordClient.whenReady(() => {
        recordClient.set({
          email,
          name,
          phone,
          token,
          accountId
        });

        recordClient.delete();
        // console.log(recordClient);
      });
      // const List = chat.toString();

      // // create a list
      // const WLRoom = deepstreamClient.record.getList(List);

      // // when ready
      // WLRoom.whenReady(() => {
      //   const clientId = `clients/${email}`;

      //   if (!WLRoom.getEntries().some(recordName => recordName === clientId)) {
      //     const recordClient = deepstreamClient.record.getRecord(clientId);

      //     recordClient.whenReady(() => {
      //       WLRoom.addEntry(clientId);

      //       recordClient.set({
      //         email,
      //         name,
      //         phone,
      //         token,
      //         accountId
      //       });

      //       // rec.discard();
      //     });
      //   }
      // });

      // // events
      // WLRoom.on("entry-added", recordName => {
      //   console.log("Add new user in List: ", recordName);
      // });

      document.getElementsByClassName("rcw-sender")[0].style.display = "flex";
    } catch (error) {
      console.log(error);
    }
  };

  componentWillMount = async () => {
    const {
      location: { search }
    } = this.props;

    const { token } = parse(search);

    try {
      const {
        data: { chat, id: accountId }
      } = await axios("/api/accounts/token", {
        params: {
          token
        }
      });

      this.setState({
        chat,
        token,
        accountId
      });

      renderCustomComponent(UserForm, {
        handleCreateUserChat: this.handleCreateUserChat
      });
    } catch (error) {
      console.log("Ocorreu algum erro pela falta do token", error);
    }
  };

  handleNewUserMessage = async message => {
    const { privateChat } = this.state;

    privateChat.emit("message", {
      text: message
    });
  };

  handleOnChangeMessage = async e =>
    this.state.currentUser.isTypingIn({
      roomId: this.state.privateRoomId
    });

  render() {
    return (
      <Widget
        handleOnChangeMessage={this.handleOnChangeMessage}
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
