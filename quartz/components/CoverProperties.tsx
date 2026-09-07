import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const CoverProperties: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const cover = fileData.frontmatter?.cover

  if (!cover) {
    return null
  }

  const imageName = String(cover)
    .replace(/^\[\[/, "")
    .replace(/\]\]$/, "")

  const imagePath = `/z_Assets/zImages/Armes/${imageName}`

  return (
    <div class="cover-properties">
      <img src={imagePath} alt="" />
    </div>
  )
}

export default (() => CoverProperties) satisfies QuartzComponentConstructor