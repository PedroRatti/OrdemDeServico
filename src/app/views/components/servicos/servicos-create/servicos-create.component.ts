import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Servicos } from 'src/app/models/servicos';
import { ServicosService } from 'src/app/services/servicos.service';

@Component({
  selector: 'app-servicos-create',
  templateUrl: './servicos-create.component.html',
  styleUrls: ['./servicos-create.component.css']
})
export class ServicosCreateComponent implements OnInit {

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
    private service: ServicosService) { }

  ngOnInit(): void {
  }


  cancel(): void {
    this.router.navigate(['servicos'])
  }

  create(): void {
    this.service.create(this.servicos).subscribe((resposta) => {
      this.router.navigate(['servicos'])
      this.service.message('Serviço criado com sucesso!')
    }, err => {
      if (err.error.error.match('já cadastrado')) {
        this.service.message(err.error.error)
      } else if (err.error.errors[0].message === "Valor de custo inválido"){
        this.service.message("Valor de custo inválido!")
      }
    })
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
