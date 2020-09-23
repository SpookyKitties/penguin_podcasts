export function parseTextContent(
  document: Document | HTMLElement,
  selector: string
) {
  const elmTxt = document.querySelector(selector)?.textContent;

  return elmTxt ? elmTxt : "";
}
