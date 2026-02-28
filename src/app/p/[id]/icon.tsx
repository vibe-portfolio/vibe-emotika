import { Favicon } from "@/app/_components/favicon"
import { getEmoji } from "@/server/get-emoji"

export { contentType, size } from "@/app/_components/favicon"

export default async function Icon({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await getEmoji(id)
  if (!data?.noBackgroundUrl) return

  return Favicon({ url: data.noBackgroundUrl })
}
