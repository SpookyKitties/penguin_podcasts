import { PouchyRX } from "../PouchRX/PouchyRX";
import axios from "axios";
import { of, Subject } from "rxjs";
import { catchError, filter, map, mergeMap } from "rxjs/operators";
import { parsePodcast } from "../models/Podcast";
export const db$ = new PouchyRX("penguin_podcasts");

export function downloadPodcast(url: string) {
  return of(axios.get(url, { responseType: "text" })).pipe(
    mergeMap((o) => o),
    map((axiosData) => {
      try {
        const parser = new DOMParser();

        const document = parser.parseFromString(axiosData.data, "text/xml");
        return parsePodcast(document, url);
      } catch (error) {
        throw new Error(`No valid podcast found at ${url}`);
      }
    })
  );
}
