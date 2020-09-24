import { PouchyRX } from "../PouchRX/PouchyRX";
import axios from "axios";
import { of, Subject } from "rxjs";
import { catchError, filter, map, mergeMap } from "rxjs/operators";
import { parsePodcast, Podcast } from "../models/Podcast";
import { Episode } from "../models/parsePodcastEpisodes";
import { DBItem } from "../PouchRX/DBItem";
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

function updatePodcast(dbItems: DBItem[], podcast: Podcast) {
  const oldPodcast = dbItems.find((p) => p._id === podcast._id) as
    | Podcast
    | undefined;
  podcast.episodeIDS = Array.from(
    new Set(
      podcast.episodeIDS.concat(
        oldPodcast?.episodeIDS ? oldPodcast.episodeIDS : []
      )
    )
  );

  podcast._rev = oldPodcast?._rev;
}

function updateEpisodes(dbItems: DBItem[], episodes: Episode[]) {
  episodes.map((episode) => {
    const oldEpisode = dbItems.find((oe) => oe._id === episode._id);
    episode._rev = oldEpisode?._rev;
  });
}
export function update([podcast, episodes]: [Podcast, Episode[]]) {
  return db$
    .bulkGet(
      [{ id: podcast._id }].concat(
        episodes.map((e) => {
          return { id: e._id };
        })
      )
    )
    .pipe(
      map((dbItems) => {
        updatePodcast(dbItems, podcast);
        updateEpisodes(dbItems, episodes);
        return db$.bulkDocs([podcast as DBItem].concat(episodes));
      }),
      mergeMap((o) => o)
    )
    .subscribe((o) => console.log(o));

  // db$.bulkDocs([podcast as DBItem].concat(episodes)).subscribe();
}

export function notNullorUndefined<T>(val: T) {
  return val !== null && val !== undefined;
}
