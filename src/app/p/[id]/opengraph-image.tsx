import { OpenGraphImage } from "@/app/_components/opengraph-image"
import { DEFAULT_OG_IMAGE } from "@/lib/constants"
import { getEmoji } from "@/server/get-emoji"

export { contentType, size } from "@/app/_components/favicon"

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await getEmoji(id)
  if (!data) return

  const image = data.noBackgroundUrl || data.originalUrl
  if (!image) return
  return OpenGraphImage({ url: image })
}
