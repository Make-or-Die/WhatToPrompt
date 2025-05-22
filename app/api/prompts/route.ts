import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { createPromptSchema } from '@/lib/validations'
import { ZodError } from 'zod'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate request body
    const validatedData = createPromptSchema.parse(body)

    const prompt = await prisma.prompt.create({
      data: {
        authorName: validatedData.authorName || 'Anonymous',
        title: validatedData.title,
        content: validatedData.content,
        response: validatedData.response,
        model: validatedData.model,
        hashtags: validatedData.hashtags,
      },
    })

    return NextResponse.json(prompt)
  } catch (error) {
    console.error('Failed to create prompt:', error)

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create prompt' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const prompts = await prisma.prompt.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(prompts)
  } catch (error) {
    console.error('Failed to fetch prompts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch prompts' },
      { status: 500 }
    )
  }
}
