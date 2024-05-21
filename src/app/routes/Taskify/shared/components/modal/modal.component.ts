import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../../../../shared/services/dashboard.service';
import { TaskResponse } from '../../../../../shared/interfaces/taskify.interface';

@Component({
  selector: 'shared-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {

  private fb = inject(FormBuilder);
  private DashboardService = inject(DashboardService);


  @Output()
  public datoActualizado = new EventEmitter<TaskResponse[]>()

  public tasksList = signal<TaskResponse[]>([]);


  public myForm: FormGroup = this.fb.group({
    label: [''],
    name: ['', [Validators.required]],
    description: [''],
    time_start: [''],
    time_end: [''],
    date: [''],
    color: [''],
    status: [false],
  })


  newTask() {
    const taskData = this.myForm.value;

    this.DashboardService.newTask(taskData)
      .subscribe(task => {
        this.tasksList().push(task);
        this.datoActualizado.emit(this.tasksList());
      });

    this.myForm.reset({
      label: '',
      name: '',
      description: '',
      time_start: '',
      time_end: '',
      date: '',
      color: '',
      status: false,
    });
  }

  isValidField(field: string) {
    return this.DashboardService.isValidField(this.myForm, field)
  }
}
