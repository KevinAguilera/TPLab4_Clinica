import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(value: any, ...args: any[]): unknown {

    let retorno = '';
    console.info('argumentos', args)
    if(!(args[1] == 1))
    {
      switch(args[0])
      {
        case 'dia':
          switch(value.getDay())
          {
            case 1:
              retorno+='Lunes';
              break;
            case 2:
              retorno+='Martes';
              break;
            case 3:
              retorno+='Miercoles';
              break;
            case 4:
              retorno+='Jueves';
              break;
            case 5:
              retorno+='Viernes';
              break;
            case 6:
              retorno+='Sabado';
              break;
          }
          break;
        case 'fecha':
          retorno = value.getFullYear();
          break;
        case 'mes':
          switch(value.getMonth()+1)
          {
            case 1:
              retorno+='/01';
              break;
            case 2:
              retorno+='/02';
              break;
            case 3:
              retorno+='/03';
              break;
            case 4:
              retorno+='/04';
              break;
            case 5:
              retorno+='/05';
              break;
            case 6:
              retorno+='/06';
              break;
            case 7:
              retorno+='/07';
              break;
            case 8:
              retorno+='/08';
              break;
            case 9:
              retorno+='/09';
              break;
            case 10:
              retorno+='/10';
              break;
            case 11:
              retorno+='/11';
              break;
            case 12:
              retorno+='/12';
              break;
          }
          break;
      }
    }
    else
    {
      switch(args[0])
      {
        case 'dia':
          retorno = value.getDay();
          break;
        case 'fecha':
          retorno = value.getDate();
          break;
        case 'mes':
          retorno = value.getMonth()+1;
          break;
      }
    }

    return retorno;
  }

}
