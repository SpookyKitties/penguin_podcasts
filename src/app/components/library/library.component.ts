import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { Podcast } from "../../../lib/models/Podcast";
import { getPodcasts } from "../../../lib/rss/data";

@Component({
  selector: "app-library",
  templateUrl: "./library.component.html",
  styleUrls: ["./library.component.scss"],
})
export class LibraryComponent implements OnInit {
  podcasts: Podcast[];
  constructor(public activatedRoute: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.podcasts = (await getPodcasts().toPromise()) as Podcast[];
  }
}
