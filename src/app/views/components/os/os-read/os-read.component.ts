import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { ServicosService } from 'src/app/services/servicos.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-read',
  templateUrl: './os-read.component.html',
  styleUrls: ['./os-read.component.css']
})
export class OsReadComponent implements AfterViewInit {

  lista: OS[] = [];

  displayedColumns: string[] = ['tecnico', 'cliente', 'abertura', 'fechamento', 'prioridade', 'servicos', 'status', 'action'];
  dataSource = new MatTableDataSource<OS>(this.lista);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service : OsService,
    private router : Router,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private servicosService: ServicosService,
    private _liveAnnouncer: LiveAnnouncer,) {}

  ngAfterViewInit() {
    this.findAll();
    this.dataSource.sort = this.sort;
  }

  findAll():void {
    this.service.findAll().subscribe((respostas) => {
      respostas.forEach(x => {
        if (x.status != "ENCERRADO") {
          this.lista.push(x)
        }
      })
      this.listarTecnico();
      this.listaCliente();
      this.listarServicos();
      this.dataSource = new MatTableDataSource<OS>(this.lista);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate():void {
    this.router.navigate(['os/create'])
  }

  listarTecnico():void {
    this.lista.forEach(x => {
      this.tecnicoService.findById(x.tecnico).subscribe(resposta => {
        x.tecnico = resposta.nome
      })
    })
  }

  listaCliente():void {
    this.lista.forEach(x => {
      this.clienteService.findById(x.cliente).subscribe(resposta => {
        x.cliente = resposta.nome
      })
    })
  }

  listarServicos():void {
    this.lista.forEach(x => {
      this.servicosService.findById(x.servicos).subscribe(resposta => {
        x.servicos = resposta.nome
      })
    })
  }

  prioridade(x : any) {
    if (x == 'BAIXA') {
      return 'baixa'
    } else if (x == 'MEDIA') {
      return 'media'
    } else {
      return 'alta'
    }
  }

  search_service(evento : any): void {
    var pesquisa = evento.target.value;

      if (pesquisa == '') {
        this.dataSource = new MatTableDataSource<OS>(this.lista);
      
      } else {
        var listaFiltrada = this.lista.filter(x => {
          console.log(x);

          if (x.servicos.toUpperCase().indexOf(pesquisa.toUpperCase()) >= 0) {
            return x
          }
          if (pesquisa.toUpperCase() == x.prioridade) {
            return x
          }
          if (x.tecnico.toUpperCase().indexOf(pesquisa.toUpperCase()) >= 0) {
            return x
          }
          if (x.cliente.toUpperCase().indexOf(pesquisa.toUpperCase()) >= 0) {
            return x
          }
          if (pesquisa.toUpperCase() == x.status) {
            return x
          }
          return null
        })
        console.log('lista filtrada', listaFiltrada);
        this.dataSource = new MatTableDataSource<OS>(listaFiltrada);
      
      }
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: any) {
    console.log(sortState);
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }

}

  }
