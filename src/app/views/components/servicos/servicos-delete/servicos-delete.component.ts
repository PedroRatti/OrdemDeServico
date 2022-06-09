import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicos } from 'src/app/models/servicos';
import { ServicosService } from 'src/app/services/servicos.service';

@Component({
  selector: 'app-servicos-delete',
  templateUrl: './servicos-delete.component.html',
  styleUrls: ['./servicos-delete.component.css']
})
export class ServicosDeleteComponent implements OnInit {

  id_ser = ''

  servicos: Servicos = {
    id: '',
    nome: '',
    custo: '',
    telefone: ''
  }

  constructor(
    private router: Router,
    private service: ServicosService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_ser = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  findById(): void {
    this.service.findById(this.id_ser).subscribe(resposta => {
      this.servicos = resposta;
    })
  }

  delete():void {
    this.service.delete(this.id_ser).subscribe(resposta => {
      this.router.navigate(['servicos'])
      this.service.message('Serviço deletado com secesso!')
    }, err => {
      if (err.error.error.match('possui Ordens de Serviço')) {
        this.service.message(err.error.error);
      }
    })
  }

  cancel(): void {
    this.router.navigate(['servicos'])
  }

}