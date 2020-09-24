import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  test() {
    // downloadPodcast("http://localhost:4200/assetsd/rss.xml")
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
