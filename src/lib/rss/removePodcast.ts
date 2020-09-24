import { filter, map, mergeMap } from "rxjs/operators";
import { Podcast } from "../models/Podcast";
import { DBItem } from "../PouchRX/DBItem";
import { db$ } from "./data";
import seedRandom from "seed-random";

export function removePodcast(url: string) {
  return db$.get(seedRandom(url)().toString().split(".")[1]).pipe(
    filter((o: Podcast) => o !== undefined && Array.isArray(o?.episodeIDS)),
    map(async (podcast: Podcast) => {
      const docs = await db$
        .bulkGet(
          podcast.episodeIDS.map((id) => {
            return { id: id };
          })
        )
        .toPromise();
      const promises = docs.map((doc) =>
        db$.remove(doc as DBItem & { _rev: string }).toPromise()
      );
      return Promise.all(promises);
    }),
    mergeMap((o) => o)
  );
}
