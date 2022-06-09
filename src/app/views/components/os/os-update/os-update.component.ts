import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { OS } from 'src/app/models/os';
import { Servicos } from 'src/app/models/servicos';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { ServicosService } from 'src/app/services/servicos.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-update',
  templateUrl: './os-update.component.html',
  styleUrls: ['./os-update.component.css']
})
export class OsUpdateComponent implements OnInit {

  id_os = ''

  os: OS = {
    tecnico: '',
    cliente: '',
    servicos: '',
    observacoes: '',
    status: '',
    prioridade: ''
  }

  tecnicos: Tecnico[] = []
  clientes: Cliente[] = []
  servicos: Servicos[] = []

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private servicosService: ServicosService,
    private service: OsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id_os = this.route.snapshot.paramMap.get('id')!
    this.findById();
    this.listarTecnicos();
    this.listarClientes();
    this.listarServicos()
  }

  findById(): void {
    this.service.findById(this.id_os).subscribe(resposta => {
      this.os = resposta;
      this.converteDados();
    })
  }

  update(): void {
    this.service.update(this.os).subscribe(resposta => {
      this.service.message("Ordem de Serviço atualizada com sucesso!")
      this.router.navigate(['os'])
    })
  }

  cancel(): void {
    this.router.navigate(['os'])
  }

  listarTecnicos():void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  listarClientes():void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  listarServicos():void {
    this.servicosService.findAll().subscribe(resposta => {
      this.servicos = resposta;
    })
  }

  converteDados(): void {
    if (this.os.status == "ABERTO") {
      this.os.status = 0;
    } else if (this.os.status == "ANDAMENTO") {
      this.os.status = 1;
    } else {
      this.os.status = 2;
    }

    if (this.os.prioridade == "BAIXA") {
      this.os.prioridade  = 0;
    } else if (this.os.prioridade == "MEDIA") {
      this.os.prioridade = 1;
    } else {
      this.os.prioridade = 2;
    }
  }

}
