import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeModule } from './home/home.module';
import { DetailModule } from './detail/detail.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LibraryComponent } from './components/library/library.component';
import { DownloadedComponent } from './components/downloaded/downloaded.component';
import { UnplayedComponent } from './components/unplayed/unplayed.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { LibraryCardComponent } from './components/library-card/library-card.component';
import { PodcastComponent } from './components/podcast/podcast.component';
import { PodcastListItemComponent } from './components/podcast-list-item/podcast-list-item.component';
import { PodcastEpisodeListItemComponent } from './components/podcast-episode-list-item/podcast-episode-list-item.component';
import { PodcastEpisodeDateComponent } from './components/podcast-episode-date/podcast-episode-date.component';
import { PlayerComponent } from './components/player/player.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, SidebarComponent, SettingsComponent, LibraryComponent, DownloadedComponent, UnplayedComponent, PlaylistComponent, LibraryCardComponent, PodcastComponent, PodcastListItemComponent, PodcastEpisodeListItemComponent, PodcastEpisodeDateComponent, PlayerComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    DetailModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
