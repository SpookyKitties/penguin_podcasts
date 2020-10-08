import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./shared/components";

import { HomeRoutingModule } from "./home/home-routing.module";
import { DetailRoutingModule } from "./detail/detail-routing.module";
import { LibraryComponent } from "./components/library/library.component";
import { PlaylistComponent } from "./components/playlist/playlist.component";
import { UnplayedComponent } from "./components/unplayed/unplayed.component";
import { DownloadedComponent } from "./components/downloaded/downloaded.component";
import { SettingsComponent } from "./components/settings/settings.component";

const routes: Routes = [
  {
    path: "",
    component: LibraryComponent,
  },
  { path: "library", component: LibraryComponent },
  { path: "Playlist", component: PlaylistComponent },
  { path: "unplayed", component: UnplayedComponent },
  { path: "downloaded", component: DownloadedComponent },
  { path: "settings", component: SettingsComponent },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    HomeRoutingModule,
    DetailRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
