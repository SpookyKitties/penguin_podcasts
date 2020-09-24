export function queryChildNode(
  document: Document | HTMLElement,
  selector: string,
  nodeName: string
): HTMLElement | undefined {
  const elm = document.querySelector(selector);
  if (elm?.childNodes) {
    const node = Array.from(elm.childNodes).filter(
      (n) => n.nodeName === nodeName
    )[0];

    return node ? (node as HTMLElement) : undefined;
  }
  return undefined;
}
