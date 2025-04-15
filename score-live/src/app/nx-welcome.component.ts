import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { EmployeeStore } from './store/employees.store';
import { Employee } from './services/api.service';
import { SortEvent } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-nx-welcome',
  standalone: true,
  imports: [CommonModule, TableModule, InputTextModule, ButtonModule, FormsModule],
  templateUrl: `./nx-welcome.component.html`,
  styles: [],
  providers:[EmployeeStore]
})
export class NxWelcomeComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  store = inject(EmployeeStore);
  initialValue: Employee[] = this.store.employeeslist();
  isSorted = false;
  searchValue: string | undefined;

  ngOnInit(): void {
    this.store.fetchEmployeesList()
  }

  customSort(event: SortEvent) {
    if (this.isSorted === false) {
        this.isSorted = true;
        this.sortTableData(event);
    } else if (this.isSorted === true) {
        this.isSorted = false;
        this.sortTableData(event);
    }
}

sortTableData(event:any) {
  if (event.order === 0) {
    this.clearSort();
    return;
  }

  this.isSorted = true;

  event.data.sort((data1: any, data2: any) => {
    const value1 = data1[event.field];
    const value2 = data2[event.field];

    let result: number;

    if (value1 == null && value2 != null) result = -1;
    else if (value1 != null && value2 == null) result = 1;
    else if (value1 == null && value2 == null) result = 0;
    else if (typeof value1 === 'string' && typeof value2 === 'string') {
      result = value1.localeCompare(value2);
    } else {
      result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
    }

    return event.order * result;
  });
}

clearSort() {
  this.dt.sortField = '';
  this.dt.sortOrder = 0;
  this.dt.multiSortMeta = undefined;
  this.isSorted = false;
  this.searchValue = ''
  this.dt.reset();

  // Restore the original list (from store or cache)
  this.store.fetchEmployeesList(); // or use local copy
}
 }
