import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Funcionario } from '../model/funcionario';

const URL: string = 'http://localhost:3000/funcionario'; 
@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private service: HttpClient) { 

  }

  findAll(){
    return this.service.get<Funcionario[]>(`${URL}`)
  }

  create(funcionario: Funcionario){
    return this.service.post<Funcionario>(`${URL}`, funcionario);
  }
}
