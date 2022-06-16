import { Component, OnInit } from '@angular/core';
import { HistoriaClinica } from 'src/app/clases/historiaClinica';
import { AuthService } from 'src/app/services/auth.service';
import { HistoriaMedicaService } from 'src/app/services/historia-medica.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

// import { Img, PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// PdfMakeWrapper.setFonts(pdfFonts);
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent implements OnInit {

  historiasClinicas:HistoriaClinica[] = [];
  historiasFiltradas:HistoriaClinica[]=[];
  listadoEspecialistas:any[] = [];
  stringFiltro:string='';
  constructor(private Users:UsersService, private historiaClinica:HistoriaMedicaService, private authSvc:AuthService) { }

  ngOnInit(): void {
    this.listadoEspecialistas = this.Users.listadoEspecialistas;
    this.historiaClinica.traerTodosByPaciente(this.authSvc.currentUser.id).subscribe(historiasClinicas => {
      this.historiasClinicas = historiasClinicas;
      this.historiasFiltradas = this.historiasClinicas.slice();
    })
  }

  verDetalles(historiaClinica:any)
  {
    let html = `Altura: ${historiaClinica.altura}<br>
    Peso: ${historiaClinica.peso}<br>
    Temperatura: ${historiaClinica.temperatura}<br>
    Presion: ${historiaClinica.presion}<br>`;

    historiaClinica.otros.forEach((element:any) => {
      console.log(element);
      html+=`${element.clave}: ${element.valor}<br>`
    });

    Swal.fire({
      title:'Historia Clinica Del Paciente',
      html:html,
    });
  }

  filtrar()
  {
    if(this.stringFiltro != '')
    {
      console.log('entra aca');
      let indiceEliminar:number[]=[];
      this.historiasFiltradas.forEach((element, index) => {

        // Filtro por especialistas
        let especialista=false;
        for(let i = 0;i < this.listadoEspecialistas.length; i++)
        {
          if(element.idEspecialista == this.listadoEspecialistas[i].id && (this.listadoEspecialistas[i].nombre.toLowerCase().includes(this.stringFiltro.toLowerCase()) || this.listadoEspecialistas[i].apellido.toLowerCase().includes(this.stringFiltro.toLowerCase())))
          {
            especialista = true;
            break;
          }
        }

        if(!especialista)
        {
          indiceEliminar.push(index);
        }
      });

      let cont=0;
      indiceEliminar.forEach(element => {
        this.historiasFiltradas.splice((element-cont),1);
        cont++;
      });
    }
  }
  limpiarFiltro()
  {
    this.historiasFiltradas = this.historiasClinicas.slice();
  }
  async descargarPDF()
  {
    let tabla = this.armarTablaHistoria();
    let docDefinition:any = {
      header: {
        margin:5,
        columns: [
          {
            image: await this.getBase64ImageFromURL('../../../assets/clinica.png'),
            width:45,
            height:45,
            alignment: 'left'
          },
          {
            text:'Clinica Online, Especialista en Salud',
            alignment:'left',
          },
          {
            text:'Historia clinica de '+this.authSvc.currentUser.nombre,
            alignment:'center'
          },
          {
            text:'Fecha Emisión: '+new Date().toDateString(),
            alignment:'right'
          }
        ]
      },
      content:[
        {
          margin:40,
          layout: 'lightHorizontalLines',
          table:{
            headerRows: 1,
            widths:[ 'auto', 'auto', 'auto', 'auto', 'auto','auto','auto'],
            body:tabla,
          },
        }
      ],

      images: {
        mySuperImage: 'data:image/png;base64,...content...'
      }
    }

    pdfMake.createPdf(docDefinition).open();
  }

  getBase64ImageFromURL(url:any) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx:any = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }

  armarTablaHistoria()
  {
    let retorno:any[] = [];
    retorno.push(['Especialista', 'Especialidad', 'Fecha', 'Altura', 'Peso', 'Temperatura', 'Presion']);

    let cadaColumna:any[] = [];
    this.historiasClinicas.forEach(element => {
      // Obtengo el nombre del especialista y la especialidad
      this.listadoEspecialistas.forEach(especialista => {
        if(element.idEspecialista == especialista.id)
        {
          cadaColumna.push(especialista.apellido);
          cadaColumna.push(especialista.especialidad[0]);
        }
      });

      let fecha = new Date(element.fecha);
      cadaColumna.push(fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear()),
      cadaColumna.push(element.altura);
      cadaColumna.push(element.peso);
      cadaColumna.push(element.temperatura);
      cadaColumna.push(element.presion);

      retorno.push(cadaColumna);
      cadaColumna = [];
    });

    return retorno;
  }
}
