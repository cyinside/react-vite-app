import { ChatProvider } from './content/ChatProvider'
import Chat from './pages/Chat'

function App() {
  return (
    <>
      <ChatProvider>
        <Chat />
      </ChatProvider>
    </>
  )
}

export default App
