import { z } from 'zod'
import { AIModel } from '@prisma/client'

export const createPromptSchema = z.object({
  authorName: z.string().optional(),
  title: z.string().min(1, 'Title is required').max(255, 'Title is too long'),
  content: z.string().min(1, 'Prompt content is required'),
  response: z.string().min(1, 'AI response is required'),
  model: z.custom<AIModel>(
    (val) => Object.values(AIModel).includes(val as AIModel),
    {
      message: 'Invalid AI model selected',
    }
  ),
  hashtags: z.array(z.string()),
})

export type CreatePromptSchema = z.infer<typeof createPromptSchema>
