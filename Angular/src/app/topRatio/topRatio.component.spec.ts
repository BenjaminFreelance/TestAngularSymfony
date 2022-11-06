import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatioComponent } from './topRatio.component';

describe('TopRatioComponent', () => {
  let component: TopRatioComponent;
  let fixture: ComponentFixture<TopRatioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopRatioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
