import { queryChildNode } from "./queryChildNode";

export function parseChildNodeTextContent(
  document: Document | HTMLElement,
  selector: string,
  nodeName: string
) {
  const elm = (selector !== ""
    ? queryChildNode(document, selector, nodeName)
    : document
  )?.textContent;

  return elm ? elm : "";
}
