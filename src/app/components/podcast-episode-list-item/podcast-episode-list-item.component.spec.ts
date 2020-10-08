import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastEpisodeListItemComponent } from './podcast-episode-list-item.component';

describe('PodcastEpisodeListItemComponent', () => {
  let component: PodcastEpisodeListItemComponent;
  let fixture: ComponentFixture<PodcastEpisodeListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcastEpisodeListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastEpisodeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
