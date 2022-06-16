export interface HistoriaClinica {
  id:string,
  idPaciente:string,
  idEspecialista:string,
  idTurno:string,
  altura:number,
  peso:number,
  temperatura:number,
  presion:number,
  fecha:any,
  otros?: {clave:string, valor:any}[],
}
