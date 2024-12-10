import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeServiceService as EmployeeService } from './employee-service.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  
  spinner: boolean = false;
  employees: Employee[] = [];
  selectedEmployee: Employee | undefined;
  searchTerm: string = '';

  constructor(
    private employeeService: EmployeeService,
  ) { }

  ngOnInit(): void {
    
  }

  search(): void {
    this.spinner = true
    if (this.searchTerm != '') this.getEmployeeDetails(this.searchTerm)
    else this.getEmployees()
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe({
        next: (employees) => {
          this.employees = employees;
          this.spinner = false;
        }, 
        error: () => this.handleError()
      });
  }

  getEmployeeDetails(id: string): void {
    this.employeeService.getEmployee(id)
      .subscribe({
        next: (employee) => {
          this.selectedEmployee = employee;
          this.spinner = false;
        }, 
        error: () => this.handleError()
      });
  }

  handleError(): void {
    this.spinner = false;
    setTimeout(() => {
      swal({
        title: "Algo, sucedió",
        text: "Parece que no es posible obtener los datos del servidor ahora mismo, por favor intente más tarde",
        icon: "error",
      })
    })
  }
}
