import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../model/funcionario';
import { FuncionarioService } from '../service/funcionario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

    funcionario: Funcionario;
    funcionarios: Funcionario[] = [];
    msg : string ='';
    fg : FormGroup;

  constructor(private http: FuncionarioService,
              private fb: FormBuilder) {

    this.funcionario = new Funcionario();
   
  }

  ngOnInit() {
    this.fg = this.fb.group({
      id:[0, Validators.compose([Validators.required, Validators.min(5), Validators.max(5000)])],
      nome:['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern(/^[a-z A-Z]*$/)])],
      email:['', Validators.compose([Validators.required, Validators.email])],
      foto: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z//:/.]*$/)])]
    })

    this.listar();
  }


  gravar(){
    this.http.create(this.funcionario).subscribe( res=>{
      console.log("Usuario gravadi com sucesso!", this.funcionario);
      this.listar();
      if(this.funcionarios){
        this.msg="Usuario gravado com sucesso!"
      }else{
        this.msg ="usuario não gravado"
      }

      });
       
  }

  listar(){
    this.http.findAll().subscribe(res =>{
      this.funcionarios = res;
    })
  }

  private getControl(name: string){
    return this.fg.controls[name]
  }
  get id(){
    return this.getControl('id');
  }

  get nome(){
    return this.getControl('nome');
  }

  get email(){
    return this.getControl('email');
  }

  get foto(){
    return this.getControl('foto');
  }

}
