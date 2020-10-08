import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-podcast-episode-date",
  templateUrl: "./podcast-episode-date.component.html",
  styleUrls: ["./podcast-episode-date.component.scss"],
})
export class PodcastEpisodeDateComponent implements OnInit {
  @Input() pubDate: string;

  public date: string;
  constructor() {}

  ngOnInit(): void {
    if (this.pubDate) {
      this.date = new Date(this.pubDate).toISOString().split("T")[0];
    }
  }
}
