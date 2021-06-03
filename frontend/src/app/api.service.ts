import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  apiUrl : any = environment.apiLocation

  constructor(private http: HttpClient) { }

  //PREGUNTAS

  getQuestions(){
    let url = this.apiUrl + '/questions'
    return this.http.get(url)
  }

  storeQuestion(data : any){
    let url = this.apiUrl + '/question/store'
    return this.http.post(url, data)
  }
  
  updateQuestion(data : any){
    let url = this.apiUrl + '/question/update'
    return this.http.post(url, data)
  }
  
  deleteQuestion(data : any){
    let url = this.apiUrl + '/question/delete'
    return this.http.post(url, data)
  }

  //RESPUESTAS


  storeAnswer(data : any){
    let url = this.apiUrl + '/answer/store'
    return this.http.post(url, data)
  }
  
  updateAnswer(data : any){
    let url = this.apiUrl + '/answer/update'
    return this.http.post(url, data)
  }
  
  deleteAnswer(data : any){
    let url = this.apiUrl + '/answer/delete'
    return this.http.post(url, data)
  }


  //TEMATICAS
  
  getThematics(){
    let url = this.apiUrl + '/thematics'
    return this.http.get(url)
  }
  
  

}
