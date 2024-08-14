import { useEffect, useRef, useState } from 'react';
import { Button, Card, CardContent, CardHeader,Stack,TextField } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { useModel } from '@/content/ChatProvider'

function LoginCard() {
  const inputRef = useRef<any>()
  const { setOpenRouterAPIKey } = useModel()
  const submitHandle = ()=>{
    if(inputRef.current.value){
      setOpenRouterAPIKey(inputRef.current.value)
    }
  }

  return (
    <Card variant="outlined">
      <CardHeader title={"请输入你的OPENROUTER_API_KEY"}></CardHeader>
      <CardContent>
        <Stack direction="row" spacing={2}>
        <TextField
          id="input-key"
          variant="standard"
          inputRef={inputRef}
        />
        <Button onClick={submitHandle} variant="outlined" size='small'>OK</Button>
        </Stack>
      </CardContent>
    </Card>
  )}

export default LoginCard