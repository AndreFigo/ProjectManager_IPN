import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPage } from './work-page.component';

describe('WorkPageComponent', () => {
  let component: WorkPage;
  let fixture: ComponentFixture<WorkPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
