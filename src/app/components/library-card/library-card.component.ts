import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { Podcast } from "../../../lib/models/Podcast";
import { db$ } from "../../../lib/rss/data";

@Component({
  selector: "library-card",
  templateUrl: "./library-card.component.html",
  styleUrls: ["./library-card.component.scss"],
})
export class LibraryCardComponent implements OnInit, OnDestroy {
  @Input() podcastID: string;
  public podcast: Podcast;
  interval: NodeJS.Timeout;
  constructor(public router: Router) {}
  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  ngOnInit(): void {
    this.updateView();
    // this.interval = setInterval(() => {
    //   console.log(this.podcast);
    // }, 1000);
  }

  open() {
    this.router.navigateByUrl(`/podcast/${this.podcastID}`);
  }

  async updateView(): Promise<void> {
    try {
      this.podcast = (await db$
        .get(this.podcastID ? this.podcastID : "")
        .pipe(filter((dbItem) => dbItem?.tags.includes("podcast") === true))
        .toPromise()) as Podcast;
    } catch (error) {
      console.log(error);
    }
  }
}
