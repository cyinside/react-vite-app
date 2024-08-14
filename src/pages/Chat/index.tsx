import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import ChatList from '@/components/ChatList'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useModel } from '@/content/ChatProvider'
import { MessageType } from '@/types/globalType'
import './style.scss'

import NorthIcon from '@mui/icons-material/North'
import LoginCard from '@/components/LoginCard'
import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'

// const OPENROUTER_API_KEY =
//   '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'
function Chat() {
  const inputRef = useRef<HTMLInputElement>()//输入框ref
  const listRef = useRef<HTMLElement>()//信息列表ref
  const { updateMessagelist, openRouterAPIKey,messagesList } = useModel()//信息共享
  const [isLoad, setIsLoad] = useState(false)//是否加载中
  const [isError, setIsError] = useState(false)//是否出错

  useEffect(() => {
    toBottom()
  }, [messagesList])

  //数据处理
  const resHandle = (response: any) => {
    const { data } = response
    localStorage.setItem('OPENROUTER_API_KEY', openRouterAPIKey)
    setIsLoad(false)

    if(inputRef.current)inputRef.current.value = ''
    if (data?.choices[0]?.message) {
      updateMessagelist(
        data?.choices[0]?.message.content,
        data?.choices[0]?.message.role
      )
    }
  }

  //提交处理
  const actionHandle = () => {
    if (
      !inputRef.current ||
      !inputRef.current.value ||
      isLoad ||
      !openRouterAPIKey
    )
      return
    setIsLoad(true)
    updateMessagelist(inputRef.current.value, MessageType.User)
    axios({
      method: 'post',
      url: 'https://openrouter.ai/api/v1/chat/completions',
      headers: {
        Authorization: `Bearer ${openRouterAPIKey}`,
        'Content-Type': 'application/json',
      },
      data: {
        model: 'mistralai/mistral-7b-instruct:free',
        messages: [{ role: MessageType.User, content: inputRef.current.value }],
      },
    })
      .then(resHandle)
      .catch(function (error: any) {
        console.log(error)
        setIsError(true)
      })
  }

  //回车发送
  const onKeyDownHandle = (e:any)=>{
    if (e.keyCode === 13) {
      e.preventDefault()
      actionHandle()
    }
  }

  //滚动到最新消息
  const toBottom = ()=>{
    const componentNode = listRef.current;
    if (componentNode) {
      const isScrolledToBottom = componentNode.scrollTop + componentNode.clientHeight === componentNode.scrollHeight;
      if (!isScrolledToBottom) {
        componentNode.scrollTo(0, componentNode.scrollHeight);
      }
    }
  }

  return (
    <Container fixed>
      <Box
        width="100%"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        padding="20px 0"
        className="chat"
      >

        {/* 出错处理 */}
        <Collapse in={isError}>
          <Alert
            severity="error"
            action={
              <Button
                size="small"
                onClick={() => {
                  window.location.reload()
                }}
              >
                刷新
              </Button>
            }
            sx={{ mb: 2 }}
          >
            请求出错请刷新页面
          </Alert>
        </Collapse>
        <Box flexGrow="1" padding="10px 0" overflow="scroll" ref={listRef}>
          {!openRouterAPIKey ? (
            // key输入框
            <LoginCard />
          ) : (
            // 信息列表
            <ChatList loading={isLoad} toLogin={!openRouterAPIKey} />
          )}
        </Box>
        <Box component="form" noValidate autoComplete="off" width="100%">
          {/* 问题输入框 */}
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-input">Message ChatGPT</InputLabel>
            <OutlinedInput
              id="outlined-input"
              inputRef={inputRef}
              onKeyDown={onKeyDownHandle}
              label="Message ChatGPT"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={actionHandle} edge="end" size="small">
                    <NorthIcon sx={{ color: '#fff' }} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
      </Box>
    </Container>
  )
}

export default Chat
