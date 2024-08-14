import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { MessageType } from '@/types/globalType'
import "./index.scss";
import { useTheme } from '@mui/material/styles';

import gptIcon from '@/assets/chatgpt_ic.png'

type ChatCardProps = {
  role:MessageType,
  content:any,
  key:string | number
}
const nameMap = {
  'user':'You',
  'assistant': 'ChatGPT'
}
function ChatCard({role,content,key}:ChatCardProps) {
  const theme = useTheme();

  return (
    <Box className='chatcard' key={key}>
      <Card >
      <CardHeader
        avatar={
          <Avatar 
          sx={{ bgcolor: role === MessageType.Assistant ?theme?.status?.green:theme?.status?.user ,width: 25, height: 25,padding:'3px'}}
          src={role === MessageType.Assistant ?gptIcon:null}
          >
          </Avatar>
        }
        title={nameMap[role]}
      />
      <CardContent>
        {
          typeof content === 'string' ? <Typography variant="body2" color="text.secondary" >
          {
            <div style={{ whiteSpace: 'pre-line' }}>{content}</div>
          }
        </Typography> : content
        }
        
      </CardContent>
      </Card>
    </Box>
  )
}

export default ChatCard