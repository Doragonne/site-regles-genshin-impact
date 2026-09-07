import { QuartzTransformerPlugin } from "@quartz-community/types"
import {
  joinSegments,
  pathToRoot,
  resolveRelative,
  stripSlashes,
  endsWith,
} from "@quartz-community/utils"

interface CrawlLinksOptions {
  markdownLinkResolution: "absolute" | "relative" | "shortest"
  prettyLinks: boolean
  openLinksInNewTab: boolean
  lazyLoad: boolean
  externalLinkIcon: boolean
  disableBrokenWikilinks: boolean
}

const defaultOptions: CrawlLinksOptions = {
  markdownLinkResolution: "absolute",
  prettyLinks: true,
  openLinksInNewTab: false,
  lazyLoad: false,
  externalLinkIcon: true,
  disableBrokenWikilinks: false,
}

function isFolderPath(path: string): boolean {
  return path.endsWith("/")
}

function transformLink(
  src: string,
  target: string,
  opts: {
    strategy: CrawlLinksOptions["markdownLinkResolution"]
    allSlugs: string[]
  },
): string {
  // On reprend ici la logique de Quartz
  const targetCanonical = target
    .replace(/\.md$/, "")
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase()
    .replace(/ /g, "-")

  const effectiveSrc =
    !endsWith(src, "index") && opts.allSlugs.includes(`${src}/index`)
      ? `${src}/index`
      : src

  if (opts.strategy === "shortest") {
    const matchingFileNames = opts.allSlugs.filter((slug) => {
      const parts = slug.split("/")
      const fileName = parts.at(-1)

      // Fonctionnement normal de Quartz
      if (targetCanonical === fileName) {
        return true
      }

      // ⭐ CORRECTION FOLDER NOTES
      //
      // Classe/Classe.md devient :
      // création-de-personnage/classe/index
      //
      // On considère donc également :
      // .../classe/index
      //
      // comme une correspondance pour [[Classe]]
      if (
        fileName === "index" &&
        parts.length >= 2 &&
        parts[parts.length - 2] === targetCanonical
      ) {
        return true
      }

      return false
    })

    if (matchingFileNames.length === 1) {
      return resolveRelative(effectiveSrc, matchingFileNames[0])
    }
  }

  // Fallback : comportement normal
  return joinSegments(pathToRoot(effectiveSrc), targetCanonical)
}

export const CrawlLinks: QuartzTransformerPlugin<
  Partial<CrawlLinksOptions>
> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }

  return {
    name: "CrawlLinks",

    textTransform(ctx, src) {
      return src
    },

    markdownPlugins() {
      return []
    },

    externalResources() {
      return []
    },
  }
}

export default CrawlLinks