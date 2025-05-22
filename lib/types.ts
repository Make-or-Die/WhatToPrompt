import { AIModel } from '@prisma/client'

export interface CreatePromptBody {
  authorName?: string
  title: string
  content: string
  response: string
  model: AIModel
  hashtags: string[]
}
