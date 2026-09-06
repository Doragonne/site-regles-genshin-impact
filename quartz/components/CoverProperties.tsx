import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "./util"

const CoverProperties: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const cover = fileData.frontmatter?.cover

  if (!cover) {
    return null
  }

  const imageName = String(cover)
    .replace(/^\[\[/, "")
    .replace(/\]\]$/, "")

  return (
    <div class="cover-properties">
      <img
        src={resolveRelative(fileData.slug!, imageName)}
        alt=""
      />
    </div>
  )
}

export default (() => CoverProperties) satisfies QuartzComponentConstructor