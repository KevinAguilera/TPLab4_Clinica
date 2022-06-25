import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAgrandarGrafico]'
})
export class AgrandarGraficoDirective {

  @HostListener('mouseenter') onMouseEnter(){
    this.ResaltarColor('#e1faff');
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.ResaltarColor('');
  }
  constructor(private elemento:ElementRef) { 
   
  }

  private ResaltarColor(color:string){
    this.elemento.nativeElement.style.backgroundColor=color;
  }
}
