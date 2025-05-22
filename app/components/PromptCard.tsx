import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { AIModel } from '@prisma/client'

interface PromptCardProps {
  id: string
  title: string
  content: string
  response: string
  model: AIModel
  authorName: string
  createdAt: Date
  hashtags: string[]
  usefulness: number
}

export function PromptCard({
  title,
  content,
  response,
  model,
  authorName,
  createdAt,
  hashtags,
  usefulness,
}: PromptCardProps) {
  return (
    <div className='h-full flex flex-col'>
      <div className='p-4 bg-white border-b-4 border-black'>
        <div className='flex items-start justify-between'>
          <div>
            <h3 className='text-xl font-black line-clamp-2'>{title}</h3>
            <p className='mt-1 text-sm'>
              by {authorName || 'Anonymous'} •{' '}
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </p>
          </div>
          <span className='inline-block px-3 py-1 bg-[#2B3AED] text-white font-bold text-sm border-2 border-black'>
            {model.replace(/_/g, ' ')}
          </span>
        </div>
      </div>

      <div className='p-4 flex-grow'>
        <div className='space-y-4'>
          <div>
            <h4 className='font-bold mb-2 text-[#FF3F56]'>Prompt</h4>
            <div className='p-3 bg-[#F3F3F3] border-2 border-black'>
              <p className='text-sm line-clamp-3'>{content}</p>
            </div>
          </div>
          <div>
            <h4 className='font-bold mb-2 text-[#FF3F56]'>Response</h4>
            <div className='p-3 bg-[#F3F3F3] border-2 border-black'>
              <p className='text-sm line-clamp-3'>{response}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='p-4 border-t-2 border-black'>
        <div className='flex flex-wrap gap-2'>
          {hashtags.map((tag) => (
            <span
              key={tag}
              className='px-2 py-1 bg-[#FFE03D] text-black text-xs font-bold border-2 border-black'
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
