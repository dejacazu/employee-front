import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeServiceService as EmployeeService } from './employee-service.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  
  employees: Employee[] = [];
  selectedEmployee: Employee | undefined;
  searchTerm: string = '';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    
  }

  search(): void {
    if (this.searchTerm != '') this.getEmployeeDetails(this.searchTerm)
    else this.getEmployees()
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees);
  }

  getEmployeeDetails(id: string): void {
    this.employeeService.getEmployee(id)
      .subscribe(employee => this.selectedEmployee = employee);
  }
}
