import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LogIngresos } from 'src/app/clases/logIngresos';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UsersService } from 'src/app/services/users.service';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-reporte-ingresos',
  templateUrl: './reporte-ingresos.component.html',
  styleUrls: ['./reporte-ingresos.component.scss']
})
export class ReporteIngresosComponent implements OnInit {

  chart:any;
  logIngresos:LogIngresos[] = [];
  listadoUsuarios:any[]=[];
  mostrarTabla:boolean = true;
  @Output() cerrarTabla:EventEmitter<any> = new EventEmitter<any>();

  constructor(private firestore:FirestoreService, private users:UsersService, private pdf:PdfService) { }

  ngOnInit(): void {
    this.listadoUsuarios = this.users.listadoUsuarios;
    this.firestore.obtenerTodos('logsIngreso').subscribe((logsSnapshot)=>{
      this.logIngresos = [];
      logsSnapshot.forEach((element:any)=>{
        let data = element.payload.doc.data();
        this.logIngresos.push({
          idUsuario:data.idUsuario,
          fecha:data.fecha,
          hora:data.hora,
          nombre:data.nombre,
          mail:data.mail,
          apellido:data.apellido
        })
      });
    });
  }

  Descargar()
  {
    this.pdf.descargarPdf('turnosXdia.pdf', 'htmlData');
  }

formatoHora(hora:any){

}

  volver()
  {
    this.cerrarTabla.emit('');
  }
}
