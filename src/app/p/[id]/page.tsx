import { EmojiCard } from "@/app/_components/emoji-card"
import { PageContent } from "@/app/_components/page-content"
import { formatPrompt } from "@/lib/utils"
import { getEmoji } from "@/server/get-emoji"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata | undefined> {
  const { id } = await params
  const data = await getEmoji(id)
  if (!data) return

  const title = `${formatPrompt(data.prompt)} | AI Emoji Generator`
  const description = `An emoji generated from the prompt: ${data.prompt}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function Emoji({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await getEmoji(id)
  if (!data) redirect("/")

  return (
    <PageContent prompt={data.prompt}>
      <EmojiCard id={id} alwaysShowDownloadBtn />
    </PageContent>
  )
}
