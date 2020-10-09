import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { sideBar$ } from "../../../lib/rss/data";

@Component({
  selector: "app-titlebar",
  templateUrl: "./titlebar.component.html",
  styleUrls: ["./titlebar.component.scss"],
})
export class TitlebarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  async openSidebar(): Promise<void> {
    sideBar$.next();
  }
}
