import { Component, Input, OnInit } from "@angular/core";
import { Episode } from "../../../lib/models/parsePodcastEpisodes";

@Component({
  selector: "app-podcast-episode-list-item",
  templateUrl: "./podcast-episode-list-item.component.html",
  styleUrls: ["./podcast-episode-list-item.component.scss"],
})
export class PodcastEpisodeListItemComponent implements OnInit {
  @Input() episode: Episode;
  constructor() {}

  ngOnInit(): void {}
}
