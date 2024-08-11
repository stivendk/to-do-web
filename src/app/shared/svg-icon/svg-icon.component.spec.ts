import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgIconComponent } from './svg-icon.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SvgIconComponent', () => {
  let component: SvgIconComponent;
  let fixture: ComponentFixture<SvgIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgIconComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
