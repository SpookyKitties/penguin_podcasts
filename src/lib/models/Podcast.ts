import { DBItem } from "../PouchRX/DBItem";
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
  owner: { name: string; email: string };
  explicit: string;
  podcastType: string;

  image: { urL: string; title: string; link: string };
}

const rssChannel = "rss > channel";

export function getTextContent(document: Document, selector: string) {
  const elmTxt = document.querySelector(selector)?.textContent;

  return elmTxt ? elmTxt : "";
}

function parseTags(document: Document) {
  const tagsElement = document.querySelector(`${rssChannel} > keywords`);
  return tagsElement?.textContent
    ? ["podcast"].concat(
        tagsElement.textContent.split(",").map((tag) => tag.trim())
      )
    : ["podcast"];
}

function parseTitle(document: Document) {
  return getTextContent(document, `${rssChannel} > title`);
}
function parseID(document: Document) {}

export function parsePodcast(document: Document): Podcast {
  return {
    _id: "",
    author: "",
    copyright: "",
    url: "",
    description: "",
    explicit: "",
    image: { link: "", title: "", urL: "" },
    language: "",
    link: "",
    owner: { email: "", name: "" },
    podcastType: "",
    subtitle: "",
    tags: parseTags(document),
    title: parseTitle(document),
  };
}
