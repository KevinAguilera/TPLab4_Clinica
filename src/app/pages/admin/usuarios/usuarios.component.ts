import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Workbook } from 'exceljs';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import * as fs from 'file-saver';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  listaUsuarios:any[] = [];

  constructor(private firestore:FirestoreService, private router:Router, public authSvc:AuthService, private users:UsersService) { }

  ngOnInit(): void {
    this.firestore.obtenerTodos('usuarios').subscribe((usuariosSnapshot) => {
      this.listaUsuarios = [];
      usuariosSnapshot.forEach((usuarioData: any) => {
        let data = usuarioData.payload.doc.data();
        this.listaUsuarios.push({
          nombre:data.nombre,
          apellido:data.apellido,
          edad:data.edad,
          perfil:data.perfil});
      });
    });
  }

  altaAdmin()
  {
    this.router.navigateByUrl('auth/registro/administrador');
  }
  altaPaciente()
  {
    this.router.navigateByUrl('auth/registro/paciente');
  }
  altaEspecialista()
  {
    this.router.navigateByUrl('auth/registro/especialista');
  }
  descargarExcel()
  {
    let workbook = new Workbook();

    let hojaAdmins = workbook.addWorksheet('Admins Data');
    let hojaEspecialistas = workbook.addWorksheet('Especialistas Data');
    let hojaPacientes = workbook.addWorksheet('Pacientes Data');

    let adminsHeader=['id','DNI','Nombre', 'Apellido','Edad','Perfil'];
    let EspecialistasHeader=['id','DNI','Nombre','Apellido','Aprobado','Edad','Especialidad','Foto','Email','Perfil','Verificado', 'Horarios','Dias Laborales'];
    let pacientesHeader=['id','DNI','Nombre','Apellido','Edad','Perfil','Foto1','Foto2','Obra Social', 'Email'];

    hojaAdmins.addRow(adminsHeader);
    hojaEspecialistas.addRow(EspecialistasHeader);
    hojaPacientes.addRow(pacientesHeader);

    for(let element of this.users.listadoAdministradores)
    {
      let x2=Object.keys(element);
      let temp=[];

      for(let y of x2)
      {
        temp.push(element[y])
      }

      hojaAdmins.addRow(temp);
    }

    for(let element of this.users.listadoEspecialistas)
    {
      let x2=Object.keys(element);
      let temp=[];

      for(let y of x2)
      {
        temp.push(element[y])
      }

      hojaEspecialistas.addRow(temp);
    }

    for(let element of this.users.listadoPacientes)
    {
      let x2=Object.keys(element);
      let temp=[];

      for(let y of x2)
      {
        temp.push(element[y])
      }

      hojaPacientes.addRow(temp);
    }


    let fname="UsersData";

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }

  descargarExcelDos()
  {
    let workbook = new Workbook();


    let hojaPacientes = workbook.addWorksheet('Turnos y Especialista');
    let pacientesHeader=['Turno','Nombre','Apellido', 'Especialista con el que se atendió'];
    let pacientesHeaderDos=['1','Natala','Acevedo', 'Jorge Posadas'];
 
    hojaPacientes.addRow(pacientesHeader);
    hojaPacientes.addRow(pacientesHeaderDos);




    let fname="Datos";

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }

  descargarExcelTres()
  {
    let workbook = new Workbook();


    let hojaPacientes = workbook.addWorksheet('Turnos y Especialista');
    let pacientesHeader=['Turno','Nombre','Apellido', 'Especialista con el que se atendió'];
    let pacientesHeaderDos=['1','Damian','dsasad', 'Jorge Posadas'];
    let pacientesHeaderTres=['2','Damian','dsasad', 'Jorge Posadas'];
 
    hojaPacientes.addRow(pacientesHeader);
    hojaPacientes.addRow(pacientesHeaderDos);
    hojaPacientes.addRow(pacientesHeaderTres);



    let fname="Datos";

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }

  descargarExcelCuatro()
  {
    let workbook = new Workbook();


    let hojaPacientes = workbook.addWorksheet('Turnos y Pacientes');
    let pacientesHeader=['Turno', 'Lista Pacientes atendidos'];
    let pacientesHeaderDos=['1', 'Damian, asasad'];
    let pacientesHeaderTres=['2','Damian, asasad'];
    //let pacientesHeaderCuatro=['3','Damian, asasad'];

    hojaPacientes.addRow(pacientesHeader);
    hojaPacientes.addRow(pacientesHeaderDos);
    hojaPacientes.addRow(pacientesHeaderTres);
    //hojaPacientes.addRow(pacientesHeaderCuatro);



    let fname="Datos";

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }
}
