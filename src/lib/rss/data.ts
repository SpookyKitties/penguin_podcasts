import axios from "axios";
import { Observable, of } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { parsePodcast, Podcast } from "../models/Podcast";
import { PouchyRX } from "../PouchRX/PouchyRX";
import { updatePodcasts } from "./podcastUpdate";
export const db$ = new PouchyRX("penguin_podcasts");

export const podcasts$: Observable<Podcast[]> = of([]);

podcasts$.subscribe(async (o) => {
  console.log(o);
  o.push({} as Podcast);

  const p = await podcasts$.toPromise();
  console.log(p);
});

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

export async function loadTestData() {
  const podcasts = await podcasts$.toPromise();
  try {
    await downloadPodcast("http://localhost:4200/assets/rss.xml")
      .pipe(
        map(([podcast, episodes]) => {
          const oldPodcast = podcasts.find((p) => p._id === podcast._id);

          if (oldPodcast) {
            console.log(oldPodcast);
            podcast.author = "aiofjioa2389";
            const episodeIDS = new Set(
              podcast.episodeIDS.concat(oldPodcast.episodeIDS)
            );
            Object.assign(oldPodcast, podcast);
            oldPodcast.episodeIDS = Array.from(episodeIDS);
            console.log(oldPodcast);
            console.log(podcast);
          } else {
            podcasts.push(podcast);
          }
          // podcastUpdate([podcast, episodes]);
        })
      )
      .toPromise();
  } catch (error) {
    console.log(error);
  }
}

export function getPodcasts() {
  return db$.findByTags(["podcast"]);
}
