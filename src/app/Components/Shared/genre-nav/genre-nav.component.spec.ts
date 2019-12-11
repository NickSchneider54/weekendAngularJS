import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreNavComponent } from './genre-nav.component';

describe('GenreNavComponent', () => {
  let component: GenreNavComponent;
  let fixture: ComponentFixture<GenreNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
