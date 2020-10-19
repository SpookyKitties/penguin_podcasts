import SeedRandom from "seed-random";
import { DBItem } from "../PouchRX/DBItem";
import { parseChildNodeTextContent } from "./parseChildNodeTextContent";
import { parseTextContent } from "./parseTextContent";
export class Episode implements DBItem {
  playing?: boolean;
  _rev?: string;
  _id: string;
  title: string;
  author: string;
  subTitle: string;
  fileType: "audio" | "video";
  description: string;
  url: string;
  guid: string;
  link: string;
  pubDate: Date;
  duration: string;
  tags: string[];
  played: boolean;
}

const rssSelector = "rss > channel";
function parseTitle(elm: HTMLElement) {
  return parseTextContent(elm, `title`);
}
function parseAuthor(elm: HTMLElement) {
  // console.log(parseChildNodeTextContent(elm, "", "itunes:author"));
  // console.log(
  //   Array.from(elm.childNodes).filter((o) => o.nodeName === "itunes:author")[0]
  //     ?.textContent
  // );

  return parseChildNodeTextContent(elm, "", "itunes:author");
}
function parseSubTitle(elm: HTMLElement) {
  return parseChildNodeTextContent(elm, "", "itunes:subtitle");
}
function parseDescription(elm: HTMLElement) {
  return parseTextContent(elm, `description`)?.replace(/\n/g, "");
}
function parseUrl(elm: HTMLElement) {
  const url = elm.querySelector("enclosure")?.getAttribute("url");
  return url ? url : "";
}
function parseGuid(elm: HTMLElement) {
  return parseTextContent(elm, `guid`);
}
function parseLink(elm: HTMLElement) {
  return parseTextContent(elm, `link`);
}
function parsePubDate(elm: HTMLElement) {
  return new Date(parseTextContent(elm, `pubDate`));
}
function parseDuration(elm: HTMLElement) {
  return parseChildNodeTextContent(elm, "", "itunes:duration");
}
function parseTags(elm: HTMLElement) {
  const tags = parseChildNodeTextContent(elm, "", "itunes:keywords");

  return tags.split(",").map((tag) => tag.trim());
}

function fileType(elm: HTMLElement): "video" | "audio" {
  const url = elm.querySelector("enclosure")?.getAttribute("type");

  return !url?.includes("video") ? "audio" : "video";
}

export function parsePodcastEpisodes(document: Document) {
  return Array.from(document.querySelectorAll("rss > channel > item")).map(
    (elm: HTMLElement): Episode => {
      return {
        _id: SeedRandom(parseUrl(elm))().toString().split(".")[1],
        author: parseAuthor(elm),
        description: parseDescription(elm),
        duration: parseDuration(elm),
        url: parseUrl(elm),
        guid: parseGuid(elm),
        link: parseLink(elm),
        pubDate: parsePubDate(elm),
        subTitle: parseSubTitle(elm),
        tags: ["episode"].concat(parseTags(elm)),
        title: parseTitle(elm),
        fileType: fileType(elm),
      };
    }
  );
}
