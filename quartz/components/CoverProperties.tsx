import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

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
      <img src={`/${imageName}`} alt="" />
    </div>
  )
}

export default (() => CoverProperties) satisfies QuartzComponentConstructor