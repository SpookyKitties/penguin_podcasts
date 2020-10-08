import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastEpisodeDateComponent } from './podcast-episode-date.component';

describe('PodcastEpisodeDateComponent', () => {
  let component: PodcastEpisodeDateComponent;
  let fixture: ComponentFixture<PodcastEpisodeDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcastEpisodeDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastEpisodeDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
