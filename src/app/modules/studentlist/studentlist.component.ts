import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/models/student';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-studentlist',
  standalone: false,
  templateUrl: './studentlist.component.html',
  styleUrl: './studentlist.component.scss'
})
export class StudentlistComponent implements OnInit {

  students: Student[] = [];
  filteredStudents: Student[] = [];

  selectedStudent: Student | null = null;
  filterId: number | null = null;

  selectedIds: number[] = [];
  noDataFound = false;

  showForm = false;
  isEdit = false;

  newStudent: Student = { name:'', email:'', age:null };

  constructor(private studentService: StudentService,
              private snack: MatSnackBar,
            private route :ActivatedRoute,
          private router:Router) {}
          
ngOnInit() {
  this.loadStudents();
  this.route.params.subscribe(params => {
    const id = +params['id'];
    if (id && this.students.length) {
      const s = this.students.find(x => x.studentId === id);
      if (s) this.selectedStudent = s;
    }
  });
}

loadStudents() {
  this.studentService.getStudents().subscribe(res => {
    this.students = res;
    this.filteredStudents = res;

    const id = +this.route.snapshot.params['id'];
    if (id) {
      const s = this.students.find(x => x.studentId === id);
      if (s) this.selectedStudent = s;
    }
  });
}

filterById() {
  if (!this.filterId) {
    this.filteredStudents = this.students;
    this.noDataFound = false;
    return;
  }

  this.filteredStudents = this.students.filter(x =>
    x.studentId?.toString().includes(this.filterId!.toString())
  );

  this.noDataFound = this.filteredStudents.length === 0;
}
openPopup(student: Student) {
  this.selectedStudent = student;

  this.router.navigate([student.studentId], {
    relativeTo: this.route,
    replaceUrl: true
  });
}

closePopup() {
  this.selectedStudent = null;

  this.router.navigate(['../'], {
    relativeTo: this.route,
    replaceUrl: true
  });
}

startEdit() {
  this.isEdit = true;
  this.showForm = true;
  this.newStudent = { ...this.selectedStudent! };
  this.selectedStudent = null; 
  
}

  saveStudent() {

    if (!this.newStudent.name || this.newStudent.name.length < 3)
      return this.showToast('Enter valid Name','error');

    if (!this.newStudent.email || !this.newStudent.email.includes('@'))
      return this.showToast('Enter valid Email','error');

    if (!this.newStudent.age || this.newStudent.age < 15 || this.newStudent.age > 100)
      return this.showToast('Enter valid Age 15-100','info');

    if (this.isEdit) {
      this.studentService.updateStudent(this.newStudent).subscribe(() => {
        this.showToast('Updated Successfully','success');
        this.showForm = false;
        this.isEdit = false;
        this.loadStudents();
         this.closePopup(); 
      });
    } else {
      this.studentService.addStudent(this.newStudent).subscribe(() => {
        this.showToast('Student Created Successfully','success');
        this.showForm = false;
        this.newStudent = { name:'', email:'', age:null };
        this.loadStudents();
      });
    }
  }

  deleteStudent() {
    if (!this.selectedStudent) return;

    this.studentService.deleteStudent(this.selectedStudent.studentId!).subscribe(() => {
      this.showToast('Student Deleted Successfully','success');
      this.loadStudents();
      this.closePopup();
    });
  }
  //  MULTI SELECT 
  toggleSelect(student: Student) {
    const id = student.studentId!;
    if (this.selectedIds.includes(id)) {
      this.selectedIds = this.selectedIds.filter(x => x !== id);
    } else {
      this.selectedIds = [...this.selectedIds, id];
    }
  }

  deleteSelected() {
    if (this.selectedIds.length === 0)
      return this.showToast('Select at least one student','info');

    this.selectedIds.forEach(id => {
      this.studentService.deleteStudent(id).subscribe(() => this.loadStudents());
    });

    this.showToast('Selected Students Deleted','error');
    this.selectedIds = [];
  }

  clearSelection() {
    this.selectedIds = [];
    this.showToast('Selection Cleared','success');
  }

  showToast(msg: string, type: 'success' | 'error' | 'info') {
    this.snack.open(msg, 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: type
    });
  }
  applyFilterFromUrl() {

  if (!this.filterId) {
    this.filteredStudents = this.students;
    this.noDataFound = false;
    return;
  }

  this.filteredStudents =
    this.students.filter(x => x.studentId === this.filterId);
  this.noDataFound = this.filteredStudents.length === 0;
}

}
