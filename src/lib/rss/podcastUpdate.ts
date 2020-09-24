import { map, mergeMap } from "rxjs/operators";
import { Podcast } from "../models/Podcast";
import { Episode } from "../models/parsePodcastEpisodes";
import { DBItem } from "../PouchRX/DBItem";
import { db$ } from "./data";
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
export function podcastUpdate([podcast, episodes]: [Podcast, Episode[]]) {
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
