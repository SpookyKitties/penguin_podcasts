import { Component, OnInit } from "@angular/core";
import { ElectronService } from "./core/services";
import { TranslateService } from "@ngx-translate/core";
import { AppConfig } from "../environments/environment";
import { db$, downloadPodcast, sideBar$ } from "../lib/rss/data";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  show = false;

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    public httpClient: HttpClient
  ) {
    this.translate.setDefaultLang("en");
    console.log("AppConfig", AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log("Run in electron");
      console.log("Electron ipcRenderer", this.electronService.ipcRenderer);
      console.log("NodeJS childProcess", this.electronService.childProcess);
    } else {
      console.log("Run in browser");
    }

    db$.init(); //.subscribe();
  }
  ngOnInit(): void {
    sideBar$.subscribe((o) => {
      console.log(o);

      this.show = !this.show;
    });
    // this.httpClient
    //   .get("assets/rss.xml", { responseType: "text" })
    //   .subscribe((o) => {
    //     const domParser = new DOMParser();
    //     const [podcast, episodes] = parsePodcast(
    //       domParser.parseFromString(o, "text/xml"),
    //       "https://skeptoid.com/podcast.xml"
    //     );
    //   });
  }
}
import { parsePodcast, Podcast } from "../lib/models/Podcast";
import { catchError } from "rxjs/operators";
