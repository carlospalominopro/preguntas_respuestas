import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  loading: boolean = false;
  error: boolean = false;

  active: number = 1;

  questions: any[] = []

  objModalQuestion: any = new Object()
  objModalAnswer: any = new Object()

  formQuestions: FormGroup
  formAnswers: FormGroup

  thematics: any[] = []


  constructor(
    private spinner: NgxSpinnerService,
    private apiService: ApiService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {

    this.formQuestions = this.formBuilder.group({
      id: [],
      question: ['', [Validators.required, Validators.minLength(10)]],
      thematicId: ['', [Validators.required]],
    })

    this.formAnswers = this.formBuilder.group({
      id: [],
      questionId: [''],
      answer: ['', [Validators.required, Validators.minLength(10)]],
    })

    this.getThematics()
    this.getData()
  }

  getThematics() {

    this.thematics = []

    this.apiService.getThematics().subscribe(
      (res: any) => {
        this.thematics = res
      },
      (err: any) => {
      },
    )
  }

  getData() {

    this.spinner.show();

    this.loading = true;
    this.error = false;

    this.questions = [];

    this.apiService.getQuestions().subscribe(
      (res: any) => {

        this.questions = res

        this.error = false;
        this.loading = false;
        this.spinner.hide();
      },
      (err: any) => {

        this.error = true;
        this.loading = false;
        this.spinner.hide();
      },
    )

  }


  openQuestionModal(content: any, data: any = null) {

    this.objModalQuestion = new Object()

    if (data != null) {
      this.objModalQuestion = JSON.parse(JSON.stringify(data));
    }

    this.open(content)
  }

  openAnswerModal(content: any, data: any, id : number) {

    this.objModalAnswer = new Object()

    if (data != null) {
      this.objModalAnswer = JSON.parse(JSON.stringify(data));
      this.objModalAnswer['questionId'] = id
    }


    this.open(content)
  }

  open(content: any) {
    this.modalService.open(content, { size: 'xl', backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title' });
  }

  close() {

    this.objModalQuestion = new Object()
    this.objModalAnswer = new Object()
    this.modalService.dismissAll()
  }


  submitQuestion() {

    this.spinner.show();
    this.loading = true;    

    if(this.formQuestions.valid){

      //UPDATE
      if (this.objModalQuestion.id != null) {
        this.apiService.updateQuestion(this.objModalQuestion).subscribe(
          (res: any) => {
            this.getData()
            this.close()
          },
          (err: any) => {
            this.swAlert('error', 'Error en el servicio : ' + JSON.stringify(err.error.message) )
            this.loading = false;
            this.spinner.hide();
          },
        )
      }
  
      //CREATE
      if (this.objModalQuestion.id == null) {
  
        this.apiService.storeQuestion(this.objModalQuestion).subscribe(
          (res: any) => {
            this.getData()
            this.close()
          },
          (err: any) => {
            this.swAlert('error', 'Error en el servicio : ' + JSON.stringify(err.error.message) )
            this.loading = false;
            this.spinner.hide();
          },
        )
      }
    }else{
      this.swAlert('warning', 'Por favor ingrese todos los campos requeridos')
    }

  }
  
  submitAnswer() {


    this.spinner.show();
    this.loading = true;    

    if(this.formAnswers.valid){

      //UPDATE
      if (this.objModalAnswer.id != null) {
        this.formAnswers.value.id = this.objModalAnswer.id
        this.formAnswers.value.questionId = this.objModalAnswer.questionId
        this.apiService.updateAnswer(this.formAnswers.value).subscribe(
          (res: any) => {
            this.getData()
            this.close()
          },
          (err: any) => {
            this.swAlert('error', 'Error en el servicio : ' + JSON.stringify(err.error.message) )
            this.loading = false;
            this.spinner.hide();
          },
        )
      }
  
      //CREATE
      if (this.objModalAnswer.id == null) {
        this.formAnswers.value.id = this.objModalAnswer.id
        this.formAnswers.value.questionId = this.objModalAnswer.questionId
        this.apiService.storeAnswer(this.formAnswers.value).subscribe(
          (res: any) => {
            this.getData()
            this.close()
          },
          (err: any) => {
            this.swAlert('error', 'Error en el servicio : ' + JSON.stringify(err.error.message) )
            this.loading = false;
            this.spinner.hide();
          },
        )
      }
    }else{
      this.swAlert('warning', 'Por favor ingrese todos los campos requeridos')
    }

  }

  deleteQuestion(data : any){
    
    Swal.fire({
      title: 'Estás segur@ de eliminar pregunta?',
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      confirmButtonColor: `red`,
      denyButtonColor: `gray`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.loading = true;
    
        this.apiService.deleteQuestion(data).subscribe(
          (res: any) => {
            this.swAlert('success', 'Registro eliminado correctamente')
            this.getData()
            this.close()
          },
          (err: any) => {
            this.swAlert('error', 'Error en el servicio : ' + JSON.stringify(err.error.message) )
            this.loading = false;
            this.spinner.hide();
          },
        )
      }
    })

  }
  
  deleteAnswer(data : any){

    Swal.fire({
      title: 'Estás segur@ de eliminar respuesta?',
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      confirmButtonColor: `red`,
      denyButtonColor: `gray`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.loading = true;
    
        this.apiService.deleteAnswer(data).subscribe(
          (res: any) => {
            this.swAlert('success', 'Registro eliminado correctamente')
            this.getData()
            this.close()
          },
          (err: any) => {
            this.swAlert('error', 'Error en el servicio : ' + JSON.stringify(err.error.message) )
            this.loading = false;
            this.spinner.hide();
          },
        )
      }
    })

  }

  swAlert(type :any, text :any){
    Swal.fire({
      icon : type,
      text : text
    })
  }

}
