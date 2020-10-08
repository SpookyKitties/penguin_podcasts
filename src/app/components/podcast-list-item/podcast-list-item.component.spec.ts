import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastListItemComponent } from './podcast-list-item.component';

describe('PodcastListItemComponent', () => {
  let component: PodcastListItemComponent;
  let fixture: ComponentFixture<PodcastListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcastListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
