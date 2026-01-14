import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from 'src/models/student';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = environment.apiUrl + '/Student';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/GetAllStudents`);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/GetStudentById?id=${id}`);
  }
  addStudent(student: Student) {
  return this.http.post<any>(`${this.baseUrl}/CreateStudent`, student);
}

updateStudent(student: Student): Observable<any> {
  return this.http.post(`${this.baseUrl}/UpdateStudent`, student);
}


deleteStudent(id:number):Observable<any>{
return this.http.post(`${this.baseUrl}/DeleteStudent?id=${id}`,null);
}

}
