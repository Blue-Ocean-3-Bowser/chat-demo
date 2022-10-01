import logo from './logo.svg';
import './App.css';
import { StreamChat } from 'stream-chat';
import React, { useEffect, useState } from 'react';

import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  LoadingIndicator
} from 'stream-chat-react';

import 'stream-chat-react/dist/css/index.css';

// CLIENTS and USERS
const API_KEY = process.env.REACT_APP_STREAM_API_KEY;
console.log(API_KEY);
// const client = StreamChat.getInstance('u8vjx3rsc7vt');

const user = {
  id: 'James',
  name: 'James',
  image:'',
}

function App() {
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    async function init() {
      const chatClient = StreamChat.getInstance(API_KEY);

      await chatClient.connectUser(user, 'kdx9dff63j5w548mtntpdnusegrnp2c396dfgegqx7k86p9yp7yrgcm8x6np7hh9')

      const channel = chatClient.channel('messaging', 'react-talk', {
        image: '',
        name: 'Talk about React',
        members: [user.id]
      })

      await channel.watch();

      setChannel(channel);
      setClient(chatClient);
    }

    init()

    if (client) return () => client.disconnectUser();
  });

  if(!channel || !client)
    return <LoadingIndicator />

  return (
    <div className="App">
      <header className="App-header">
        <Chat client={client} theme='mesaging light'>
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
          </Channel>
        </Chat>
      </header>
    </div>
  );
}

export default App;
