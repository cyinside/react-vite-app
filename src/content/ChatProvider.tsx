import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { MessageType,MessageItemType } from '../types/globalType'

type ChatProviderProps = {
  children: ReactNode
}

type ChatContext = {
  messagesList: MessageItemType[]//消息列表
  setMessagesList: Dispatch<React.SetStateAction<any>>
  updateMessagelist: (newPop: string,type:MessageType) => void
  openRouterAPIKey:string //openRouterAPIKey
  setOpenRouterAPIKey: Dispatch<React.SetStateAction<string>>
}

const ChatContext = createContext({} as ChatContext)

export const useModel = () => {
  return useContext(ChatContext)
}

export const ChatProvider = (props: ChatProviderProps) => {
  const { children } = props
  const [messagesList, setMessagesList] = useState<any>([])
  const [openRouterAPIKey, setOpenRouterAPIKey] = useState(localStorage.getItem('OPENROUTER_API_KEY'))

  const _messageList = useRef<any>(messagesList)

  useEffect(() => {
    _messageList.current = messagesList
     console.log(messagesList);
     
  }, [messagesList])
  
  const updateMessagelist = (newPop: string,type:MessageType) => {
    if(newPop){
      setMessagesList([
        ... _messageList.current,{
          role:type,
          content:newPop
        }
      ])
      // console.log( _messageList.current);
    }
  }

  return (
    <ChatContext.Provider
      value={{
        messagesList,
        setMessagesList,
        updateMessagelist,
        openRouterAPIKey, setOpenRouterAPIKey
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
