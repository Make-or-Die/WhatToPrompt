import { Suspense } from 'react'
import { PromptCard } from './components/PromptCard'
import { prisma } from '@/lib/prisma'
import { type Prompt } from '@prisma/client'
import CreatePromptForm from './components/CreatePromptForm'

async function getPrompts() {
  const prompts = await prisma.prompt.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
  return prompts
}

export default async function Home() {
  const prompts = await getPrompts()

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='py-16 bg-[#FFE03D]'>
        <div className='container mx-auto px-4'>
          <div
            className='border-4 border-black p-8 bg-white'
            style={{ boxShadow: '12px 12px 0px 0px rgba(0,0,0,1)' }}
          >
            <h1 className='text-5xl md:text-6xl font-black mb-4'>
              What To Prompt?
            </h1>
            <p className='text-xl md:text-2xl font-bold'>
              Share your best AI prompts and see what works for others.
            </p>
          </div>
        </div>
      </section>

      <div className='container mx-auto px-4 py-16'>
        <div className='grid md:grid-cols-12 gap-8'>
          {/* Sidebar with Create Form */}
          <div className='md:col-span-4 lg:col-span-3'>
            <div className='sticky top-4'>
              <div
                className='border-4 border-black bg-white overflow-hidden'
                style={{ boxShadow: '5px 5px 0px 0px rgba(0,0,0,1)' }}
              >
                <div className='bg-[#FF3F56] p-4 border-b-4 border-black'>
                  <h2 className='text-2xl font-black text-white'>
                    Create Prompt
                  </h2>
                </div>
                <div className='p-4'>
                  <CreatePromptForm />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content with Prompt Cards */}
          <div className='md:col-span-8 lg:col-span-9'>
            <div
              className='border-4 border-black bg-white p-6 mb-8'
              style={{ boxShadow: '5px 5px 0px 0px rgba(0,0,0,1)' }}
            >
              <h2 className='text-3xl font-black mb-2'>Latest Prompts</h2>
              <p className='text-lg'>
                Browse the community&apos;s best AI prompts
              </p>
            </div>

            <div className='grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
              <Suspense
                fallback={
                  <div className='col-span-full flex justify-center py-12'>
                    <div className='border-4 border-black bg-muted p-8 text-center w-full max-w-md'>
                      <p className='text-xl font-bold'>Loading prompts...</p>
                    </div>
                  </div>
                }
              >
                {prompts.length === 0 ? (
                  <div className='col-span-full border-4 border-black bg-muted p-8 text-center'>
                    <h3 className='text-xl font-bold mb-2'>No prompts yet!</h3>
                    <p>Be the first to share your AI prompt.</p>
                  </div>
                ) : (
                  prompts.map((prompt: Prompt) => (
                    <div
                      key={prompt.id}
                      className='border-4 border-black bg-white hover:-translate-y-1 transition-all'
                      style={{ boxShadow: '5px 5px 0px 0px rgba(0,0,0,1)' }}
                    >
                      <PromptCard
                        id={prompt.id}
                        title={prompt.title}
                        content={prompt.content}
                        response={prompt.response}
                        model={prompt.model}
                        authorName={prompt.authorName || 'Anonymous'}
                        createdAt={prompt.createdAt}
                        hashtags={prompt.hashtags}
                        usefulness={prompt.usefulness}
                      />
                    </div>
                  ))
                )}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
