import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { Episode } from "../../../lib/models/parsePodcastEpisodes";
import { currentEpisode, updatePlayTime } from "../../../lib/rss/data";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"],
})
export class PlayerComponent implements OnInit, OnDestroy {
  public episode$: Subscription;

  @HostListener("")
  public episode: Episode;

  constructor() {}
  ngOnDestroy(): void {
    this.episode$?.unsubscribe();
  }
  /**
   * Called when something outside the player needs to play/pause the currently playing episode,
   * but the current status is unknown the it
   * */
  playPause(): void {
    const audVid = document.querySelector("audio,video") as HTMLMediaElement;

    if (audVid?.paused) {
      audVid.play();
    } else if (audVid?.paused === false) {
      audVid.pause();
    }
    console.log(audVid?.paused);
  }
  async durationChanced(event: Event, episode: Episode): Promise<void> {
    try {
      await updatePlayTime(episode._id, event.timeStamp).toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {
    this.episode$ = currentEpisode
      .pipe(filter((o) => o !== undefined))
      .subscribe((episode: Episode) => {
        if (this.episode?._id === episode._id) {
          this.playPause();
        } else {
          this.episode = episode;
        }
      });
  }
}
