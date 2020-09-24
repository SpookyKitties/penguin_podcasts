import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { db$, downloadPodcast } from "../../lib/rss/data";
import { podcastUpdate, removePodcast } from "../../lib/rss/podcastUpdate";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  test() {
    // removePodcast("http://localhost:4200/assets/rss.xml").subscribe((o) =>
    //   console.log(o)
    // );

    db$.allDocs().subscribe((o) => console.log(o));

    // downloadPodcast("http://localhost:4200/assets/rss.xml")
    //   .pipe(
    //     map(([podcast, episodes]) => {
    //       podcastUpdate([podcast, episodes]);
    //     })
    //   )
    //   .subscribe();
    //   .pipe(
    //     catchError((err) => {
    //       throw err;
    //     })
    //   )
    //   .subscribe(
    //     () => {
    //       console.log("asdfioj8239");
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
  }
}
