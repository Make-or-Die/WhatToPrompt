-- CreateEnum
CREATE TYPE "AIModel" AS ENUM ('GPT4', 'CLAUDE_SONNET', 'GEMINI_PRO', 'DEEPSEEK', 'GROK', 'QWEN', 'MISTRAL_MEDIUM', 'LLAMA4', 'PERPLEXITY', 'COPILOT', 'GEMMA', 'MINIMAX', 'SPARK', 'ERNIE', 'MOONSHOT', 'COHERE', 'MISTRAL_SMALL', 'PANGU', 'BLOOM', 'ALPHAFOLD');

-- CreateTable
CREATE TABLE "Prompt" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "model" "AIModel" NOT NULL,
    "authorName" VARCHAR(100),
    "usefulness" INTEGER NOT NULL DEFAULT 0,
    "hashtags" TEXT[],

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);
