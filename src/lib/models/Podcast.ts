import seedRandom from "seed-random";
import { DBItem } from "../PouchRX/DBItem";
import { parseChildNodeTextContent } from "./parseChildNodeTextContent";
import { Episode, parsePodcastEpisodes } from "./parsePodcastEpisodes";
import { parseTextContent } from "./parseTextContent";
import { queryChildNode } from "./queryChildNode";
type PodcastImage = {
  urL?: string;
  title?: string;
  link?: string;
};

type PodcastOwner = {
  name: string;
  email?: string;
};

export class Podcast implements DBItem {
  _id: string;
  _rev?: string;
  tags: string[];
  url: string;
  title: string;
  link: string;
  language: string;
  copyright: string;
  subtitle: string;
  author: string;
  description: string;
  owner?: PodcastOwner;
  explicit: string;
  podcastType: string;
  episodes: string[];
  image?: PodcastImage;
}

const rssChannel = "rss > channel";

function parseTags(document: Document) {
  const tagsElement = document.querySelector(`${rssChannel} > keywords`);
  return tagsElement?.textContent
    ? ["podcast"].concat(
        tagsElement.textContent.split(",").map((tag) => tag.trim())
      )
    : ["podcast"];
}

function parseTitle(document: Document) {
  return parseTextContent(document, `${rssChannel} > title`);
}
function parseID(link: string) {
  return seedRandom(link)().toString().split(".")[1];
}

function parseLink(document: Document) {
  return parseTextContent(document, `${rssChannel} > link`);
}

function parseCopyright(document: Document): string {
  return parseTextContent(document, `${rssChannel} > copyright`);
}
function parseAuthor(document: Document): string {
  return parseChildNodeTextContent(document, `${rssChannel}`, "itunes:author");
}
function parseExplicit(document: Document): string {
  return parseChildNodeTextContent(
    document,
    `${rssChannel}`,
    "itunes:explicit"
  );
}
function parseLanguage(document: Document): string {
  return parseTextContent(document, `${rssChannel} > language`);
}

function parseDescription(document: Document) {
  return parseTextContent(document, `${rssChannel} > description`);
}
function parsePodcastType(document: Document) {
  return parseChildNodeTextContent(document, rssChannel, "itunes:type");
}
function parseSubtitle(document: Document) {
  return parseChildNodeTextContent(document, rssChannel, "itunes:subtitle");
}

function parseImage(document: Document) {
  const imageElm = document.querySelector(`${rssChannel} > image`);

  const url = imageElm?.querySelector("url")?.textContent;
  const title = imageElm?.querySelector("title")?.textContent;
  const link = imageElm?.querySelector("link")?.textContent;

  return url
    ? {
        url: url,
        title: title ? title : undefined,
        link: link ? link : undefined,
      }
    : undefined;
}
// function parseLink(document: Document) {
// }

function parseOwner(document: Document): PodcastOwner | undefined {
  const ownerElm = queryChildNode(document, rssChannel, "itunes:owner");

  console.log(ownerElm);

  if (ownerElm) {
    const nameElm = Array.from(ownerElm.childNodes).filter(
      (e) => e.nodeName === "itunes:name"
    )[0]?.textContent;
    const emailElm = Array.from(ownerElm.childNodes).filter(
      (e) => e.nodeName === "itunes:email"
    )[0]?.textContent;

    if (nameElm) {
      return { email: emailElm ? emailElm : undefined, name: nameElm };
    }
  }

  return undefined;
}
export function parsePodcast(
  document: Document,
  url: string
): [Podcast, Episode[]] {
  const episodes = parsePodcastEpisodes(document);

  const podcast: Podcast = {
    _id: parseID(url),
    author: parseAuthor(document),
    copyright: parseCopyright(document),
    url: url,
    episodes: episodes.map((e) => e._id),
    description: parseDescription(document),
    explicit: parseExplicit(document),
    image: parseImage(document),
    language: parseLanguage(document),
    link: parseLink(document),
    owner: parseOwner(document),
    podcastType: parsePodcastType(document),
    subtitle: parseSubtitle(document),
    tags: parseTags(document),
    title: parseTitle(document),
  };

  console.log(podcast);
  console.log(episodes);

  return [podcast, episodes];
}
