import ChatCard from '@/components/ChatCard'
import { useModel } from '@/content/ChatProvider'
import { MessageType,MessageItemType } from '@/types/globalType'

function ChatList({loading,toLogin}:{loading:boolean,toLogin:boolean}) {
  const {messagesList} = useModel()
  return (
    <div>
      {/* 信息列表 */}
      {
        messagesList.map((item:MessageItemType,index:number)=><ChatCard role={item.role} content={item.content} key={index}/>
        )
      }
      {/* 加载显示 */}
      {
        loading && <ChatCard role={MessageType.Assistant} content='Loading...' key={0}/>
      }
    </div>
  )}
export default ChatList