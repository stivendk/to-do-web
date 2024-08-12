import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SvgService } from './svg.service';
import { environment } from 'src/environments/environment';

describe('SvgService', () => {
  let service: SvgService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SvgService]
    });

    service = TestBed.inject(SvgService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get SVG as text', () => {
    const testSvgName = 'test';
    const mockSvgContent = '<svg>...</svg>';
    const url = `${environment.svgPath}${testSvgName}.svg`;

    service.getSvg(testSvgName).subscribe(svg => {
      expect(svg).toEqual(mockSvgContent);
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockSvgContent);
  });
});
