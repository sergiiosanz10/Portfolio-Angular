import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../../../../shared/interfaces/task.interface';



@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

  @Output()
  public onNewTask: EventEmitter<Task> = new EventEmitter();

  public task: Task = { name: '', check: false, isBlocked: false}


  emitTask():void{
    if(this.task.name.length === 0) return;

    this.onNewTask.emit(this.task)
    console.log(this.task);

    this.task = { name: '', check: false, isBlocked: false}


  }

}
