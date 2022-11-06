import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAverageBroadcastComponent } from './topAverageBroadcast.component';

describe('TopAverageBroadcastComponent', () => {
  let component: TopAverageBroadcastComponent;
  let fixture: ComponentFixture<TopAverageBroadcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopAverageBroadcastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAverageBroadcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
