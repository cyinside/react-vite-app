export enum MessageType {
  User = 'user',
  Assistant = 'assistant'
}

export type MessageItemType = {
  role:MessageType,
  content:string
}