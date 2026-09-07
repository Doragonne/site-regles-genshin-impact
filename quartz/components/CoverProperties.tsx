import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { joinSegments } from "../util/path"

const CoverProperties: QuartzComponent = ({ fileData, cfg }: QuartzComponentProps) => {
  const cover = fileData.frontmatter?.cover

  if (!cover) {
    return null
  }

  const imageName = String(cover)
    .replace(/^\[\[/, "")
    .replace(/\]\]$/, "")

  const imagePath = joinSegments(
    cfg.baseUrl,
    "z_Assets",
    "zImages",
    "Armes",
    imageName,
  )

  return (
    <div class="cover-properties">
      <img src={`/${imagePath}`} alt="" />
    </div>
  )
}

export default (() => CoverProperties) satisfies QuartzComponentConstructor