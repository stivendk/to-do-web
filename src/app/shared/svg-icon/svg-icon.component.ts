import { Component, ElementRef, Input, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { switchMap } from 'rxjs';
import { SvgService } from '../services/svg.service';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent implements OnInit {

  @Input() svgName: string = '';
  @Input() size: string = '100px';
  @Input() color: string = '#000000';
  @Input() isCross: boolean = false;

  private svgElement: SVGSVGElement | null = null;

  constructor(
    private svgService: SvgService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.loadSvg();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['size'] || changes['color'] || changes['svgName']) {
      this.loadSvg();
    }
  }

  private loadSvg(): void {
    if (this.svgName) {
      this.svgService.getSvg(this.svgName).subscribe(svg => {
        if (this.svgElement) {
          this.renderer.removeChild(this.elementRef.nativeElement, this.svgElement);
        }

        const div = this.renderer.createElement('div');
        div.innerHTML = svg;
        this.svgElement = div.querySelector('svg') as SVGSVGElement;
        const gElement = this.svgElement.querySelector('g') as SVGSVGElement;
        
        if (this.svgElement) {
          this.renderer.setStyle(this.svgElement, 'width', this.size);
          this.renderer.setStyle(this.svgElement, 'height', this.size);
          this.renderer.setStyle(gElement, 'fill', this.color);
          
          this.renderer.addClass(this.svgElement, this.isCross ? 'cross-hover' : '');

          this.renderer.appendChild(this.elementRef.nativeElement, this.svgElement);
        }
      });
    }
  }

}
