import { Component, OnInit } from "@angular/core";
import { addPodcast } from "../../../lib/rss/addPodcast";

@Component({
  selector: "[sidebar]",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  addPodcast(): void {
    addPodcast();
  }
}
