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

  deAaZ = false;
  displayedColumns: string[] = ['tecnico', 'cliente', 'abertura', 'fechamento', 'prioridade', 'servicos', 'status', 'action'];
  dataSource = new MatTableDataSource<OS>(this.lista);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service : OsService,
    private router : Router,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private servicosService: ServicosService) {}

  ngAfterViewInit() {
    this.findAll();
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
          } if (pesquisa.toUpperCase() == x.prioridade) {
            return x
          } if (x.tecnico.toUpperCase().indexOf(pesquisa.toUpperCase()) >= 0) {
            return x
          } if (x.cliente.toUpperCase().indexOf(pesquisa.toUpperCase()) >= 0) {
            return x
          } if (pesquisa.toUpperCase() == x.status) {
            return x
          }
          return null
        })
        this.dataSource = new MatTableDataSource<OS>(listaFiltrada);
      
      }
  }

  ordenacaoCliente(ordem : boolean): void {
    var listaOrdenada = this.lista.sort((a, b) => {
      if(a.cliente > b.cliente) {
        return ordem ? 1 : -1 
      } else if(a.cliente < b.cliente) {
        return ordem ? -1 : 1 
      } else {
        return 0
      }
      })
      this.deAaZ =! ordem
      this.dataSource = new MatTableDataSource<OS>(listaOrdenada);
  }

  ordenacaoTecnico(ordem : boolean): void {
    var listaOrdenada = this.lista.sort((a, b) => {
      if(a.tecnico > b.tecnico) {
        return ordem ? 1 : -1 
      } else if(a.tecnico < b.tecnico) {
        return ordem ? -1 : 1 
      } else {
        return 0
      }
      })
      this.deAaZ =! ordem
      this.dataSource = new MatTableDataSource<OS>(listaOrdenada);
  }

  ordenacaoAbertura(ordem : boolean): void {
    var listaOrdenada = this.lista.sort((a, b) => {
      if(a.dataAbertura > b.dataAbertura) {
        return ordem ? 1 : -1 
      } else if(a.dataAbertura < b.dataAbertura) {
        return ordem ? -1 : 1 
      } else {
        return 0
      }
      })
      this.deAaZ =! ordem
      this.dataSource = new MatTableDataSource<OS>(listaOrdenada);
  }

  ordenacaoPrioridade(ordem : boolean): void {
    var listaOrdenada = this.lista.sort((a, b) => {
      if(a.prioridade > b.prioridade) {
        return ordem ? 1 : -1 
      } else if(a.prioridade < b.prioridade) {
        return ordem ? -1 : 1 
      } else {
        return 0
      }
      })
      this.deAaZ =! ordem
      this.dataSource = new MatTableDataSource<OS>(listaOrdenada);
  }

  ordenacaoServicos(ordem : boolean): void {
    var listaOrdenada = this.lista.sort((a, b) => {
      if(a.servicos > b.servicos) {
        return ordem ? 1 : -1 
      } else if(a.servicos < b.servicos) {
        return ordem ? -1 : 1 
      } else {
        return 0
      }
      })
      this.deAaZ =! ordem
      this.dataSource = new MatTableDataSource<OS>(listaOrdenada);
  }

  ordenacaoStatus(ordem : boolean): void {
    var listaOrdenada = this.lista.sort((a, b) => {
      if(a.status > b.status) {
        return ordem ? 1 : -1 
      } else if(a.status < b.status) {
        return ordem ? -1 : 1 
      } else {
        return 0
      }
      })
      this.deAaZ =! ordem
      this.dataSource = new MatTableDataSource<OS>(listaOrdenada);
  }

  }
