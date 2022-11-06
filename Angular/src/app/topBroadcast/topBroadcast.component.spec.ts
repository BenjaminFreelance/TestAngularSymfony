import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBroadcastComponent } from './topBroadcast.component';

describe('TopBroadcastComponent', () => {
  let component: TopBroadcastComponent;
  let fixture: ComponentFixture<TopBroadcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBroadcastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBroadcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
