import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Servicos } from 'src/app/models/servicos';
import { ServicosService } from 'src/app/services/servicos.service';

@Component({
  selector: 'app-servicos-read',
  templateUrl: './servicos-read.component.html',
  styleUrls: ['./servicos-read.component.css']
})
export class ServicosReadComponent implements AfterViewInit {

  servicos: Servicos[] = [];

  displayedColumns: string[] = ['id', 'nome', 'custo', 'telefone', 'action'];
  dataSource = new MatTableDataSource<Servicos>(this.servicos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service : ServicosService,
    private router : Router) {}

  ngAfterViewInit() {
    this.findAll();
  }

  findAll():void {
    this.service.findAll().subscribe((resposta) => {
      this.servicos = resposta;
      this.dataSource = new MatTableDataSource<Servicos>(this.servicos);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate():void {
    this.router.navigate(['servicos/create'])
  }

}

  
