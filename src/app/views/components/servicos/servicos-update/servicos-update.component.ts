import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicos } from 'src/app/models/servicos';
import { ServicosService } from 'src/app/services/servicos.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-servicos-update',
  templateUrl: './servicos-update.component.html',
  styleUrls: ['./servicos-update.component.css']
})
export class ServicosUpdateComponent implements OnInit {

  id_ser = ''

  servicos: Servicos = {
    id: '',
    nome: '',
    custo: '',
    telefone: ''
  }

  nome = new FormControl('', [Validators.minLength(5)])
  custo = new FormControl('', [Validators.minLength(1)])
  telefone = new FormControl('', [Validators.minLength(11)])

  constructor(
    private router: Router,
    private service: ServicosService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_ser = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  update():void {
    this.service.update(this.servicos).subscribe((resposta) => {
      this.router.navigate(['servicos'])
      this.service.message('Serviços atualizado com sucesso!')
    },  err => {
      if (err.error.error.match('já cadastrado')) {
        this.service.message(err.error.error)
      }
    })
  }

  findById(): void {
    this.service.findById(this.id_ser).subscribe(resposta => {
      this.servicos = resposta;
    })
  }

  cancel(): void {
    this.router.navigate(['servicos'])
  }

  errorValidName() {
    if (this.nome.invalid) {
      return 'O nome deve ter entre 5 e 100 caracteres!';
    }
    return false;
  }

  errorValidCusto() {
    if (this.custo.invalid) {
      return 'O Custo deve ter entre 1 e 15 caracteres!';
    }
    return false;
  }

  errorValidTelefone() {
    if (this.telefone.invalid) {
      return 'O telefone deve ter entre 11 e 18 caracteres!';
    }
    return false;
  }
}
