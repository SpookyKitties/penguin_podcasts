import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Episode } from "../../../lib/models/parsePodcastEpisodes";
import { currentEpisode } from "../../../lib/rss/data";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"],
})
export class PlayerComponent implements OnInit, OnDestroy {
  public episode: Subscription;

  constructor() {}
  ngOnDestroy(): void {
    this.episode?.unsubscribe();
  }

  ngOnInit(): void {
    this.episode = currentEpisode.subscribe((episode) => {
      console.log(episode);
    });
  }
}
