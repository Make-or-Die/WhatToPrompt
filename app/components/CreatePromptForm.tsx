'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { createPromptSchema, type CreatePromptSchema } from '@/lib/validations'
import { useMutation } from '@tanstack/react-query'
import { AIModel } from '@prisma/client'

export default function CreatePromptForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CreatePromptSchema>({
    resolver: zodResolver(createPromptSchema),
    defaultValues: {
      authorName: '',
      title: '',
      content: '',
      response: '',
      model: 'GPT4',
      hashtags: [],
    },
  })

  const createPromptMutation = useMutation({
    mutationFn: async (data: CreatePromptSchema) => {
      const res = await fetch('/api/prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          hashtags: data.hashtags || [],
        }),
      })

      if (!res.ok) throw new Error('Failed to create prompt')
      return res.json()
    },
    onSuccess: () => {
      reset()
    },
  })

  const onSubmit = (data: CreatePromptSchema) => {
    createPromptMutation.mutate({
      ...data,
      hashtags: data.hashtags || [],
    })
  }

  return (
    <Card className='max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle>Share Your Prompt</CardTitle>
        <CardDescription>
          Share your AI prompts and responses with the community.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='authorName' className='font-bold'>
              Your Name (optional)
            </Label>
            <Input
              id='authorName'
              {...register('authorName')}
              placeholder='Anonymous'
              className='neobrutalist-input'
            />
            {errors.authorName && (
              <p className='text-sm text-destructive font-bold'>
                {errors.authorName.message}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='title' className='font-bold'>
              Title
            </Label>
            <Input
              id='title'
              required
              {...register('title')}
              placeholder='Enter a descriptive title'
              className='neobrutalist-input'
            />
            {errors.title && (
              <p className='text-sm text-destructive font-bold'>
                {errors.title.message}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='content' className='font-bold'>
              Prompt
            </Label>
            <Textarea
              id='content'
              required
              {...register('content')}
              placeholder='Enter your prompt here'
              className='min-h-[80px] neobrutalist-input'
            />
            {errors.content && (
              <p className='text-sm text-destructive font-bold'>
                {errors.content.message}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='response' className='font-bold'>
              AI Response
            </Label>
            <Textarea
              id='response'
              required
              {...register('response')}
              placeholder="Paste the AI's response here"
              className='min-h-[80px] neobrutalist-input'
            />
            {errors.response && (
              <p className='text-sm text-destructive font-bold'>
                {errors.response.message}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='model' className='font-bold'>
              AI Model Used
            </Label>
            <Select
              value={watch('model')}
              onValueChange={(value: AIModel) => setValue('model', value)}
            >
              <SelectTrigger className='neobrutalist-select'>
                <SelectValue placeholder='Select an AI model' />
              </SelectTrigger>
              <SelectContent>
                {Object.values(AIModel).map((modelOption) => (
                  <SelectItem key={modelOption} value={modelOption}>
                    {modelOption.replace(/_/g, ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.model && (
              <p className='text-sm text-destructive font-bold'>
                {errors.model.message}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='hashtags' className='font-bold'>
              Hashtags
            </Label>
            <Input
              id='hashtags'
              {...register('hashtags')}
              placeholder='AI, Writing, UMKM (comma-separated)'
              className='neobrutalist-input'
              onChange={(e) => {
                const value = e.target.value
                setValue(
                  'hashtags',
                  value.split(',').map((tag) => tag.trim())
                )
              }}
            />
            {errors.hashtags && (
              <p className='text-sm text-destructive font-bold'>
                {errors.hashtags.message}
              </p>
            )}
          </div>

          <Button
            type='submit'
            className='w-full bg-[#FF3F56] text-white border-2 border-black hover:-translate-y-1 active:translate-y-0 transition-all font-bold'
            style={{ boxShadow: '5px 5px 0px 0px rgba(0,0,0,1)' }}
            disabled={createPromptMutation.isPending}
          >
            {createPromptMutation.isPending ? 'Sharing...' : 'Share Prompt'}
          </Button>

          {createPromptMutation.isError && (
            <p className='text-sm text-destructive text-center font-bold'>
              {createPromptMutation.error.message || 'Failed to share prompt'}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
