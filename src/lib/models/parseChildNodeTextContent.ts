import { queryChildNode } from "./queryChildNode";

export function parseChildNodeTextContent(
  document: Document | HTMLElement,
  selector: string,
  nodeName: string
) {
  const elm = (selector.trim() !== ""
    ? queryChildNode(document, selector, nodeName)
    : Array.from(document.childNodes).filter((o) => o.nodeName === nodeName)[0]
  )?.textContent;

  return elm ? elm : "";
}
