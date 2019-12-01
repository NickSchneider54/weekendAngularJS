import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBilledComponent } from './top-billed.component';

describe('TopBilledComponent', () => {
  let component: TopBilledComponent;
  let fixture: ComponentFixture<TopBilledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBilledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBilledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
