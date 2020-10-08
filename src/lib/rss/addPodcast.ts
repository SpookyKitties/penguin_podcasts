import isUrl from "isurl";
import { flatMap, map } from "rxjs/operators";
import { podcastUpdate } from "./podcastUpdate";
import { db$, downloadPodcast } from "./data";

export async function addPodcast() {
  const url = prompt("Enter Podcast URL");
  if (url && isUrl(new URL(url ? url : ""))) {
    try {
      await downloadPodcast(url)
        .pipe(
          map(([podcast, episodes]) => {
            return podcastUpdate([podcast, episodes]);
          }),
          flatMap((o) => o)
        )
        .toPromise();
    } catch (error) {
      console.log(error);
    }
  }
}
