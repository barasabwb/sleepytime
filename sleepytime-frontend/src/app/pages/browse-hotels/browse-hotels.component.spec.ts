import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseHotelsComponent } from './browse-hotels.component';

describe('BrowseHotelsComponent', () => {
  let component: BrowseHotelsComponent;
  let fixture: ComponentFixture<BrowseHotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseHotelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
