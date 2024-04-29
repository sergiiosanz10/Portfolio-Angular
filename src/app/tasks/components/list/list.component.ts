import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';
import { faCheck, faClock, faLock, faLockOpen, faTrashCan } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {

  @Input()
  public taskList: Task[] = [];

  @Input()
  public taskType: number | undefined


  @Output()
  public onDelete: EventEmitter<string> = new EventEmitter();

  @Output()
  public onCheck: EventEmitter<string> = new EventEmitter();

  @Output()
  public onModify: EventEmitter<string> = new EventEmitter();

  @Output()
  public onTaskType: EventEmitter<number> = new EventEmitter()

  // ICONOS
  faCheck = faCheck;
  faClock = faClock;
  faLock = faLock;
  faLockOpen = faLockOpen;
  faTrashCan = faTrashCan;



  constructor(private taskService: TaskService) { }
  isAll: boolean = false;
  isPending: boolean = false;
  isCompleted: boolean = false;
  isBlocked: boolean = false;

  ngOnInit(): void {
    switch (this.taskType) {
      case 1:

        this.isAll = true
        break;

      case 2:
        this.isPending = true
        break;

      case 3:

        this.isCompleted = true
        break;
      case 4:

        this.isBlocked = true
        break;

      default:
        break;
    }
  }


  get tasks(): Task[] {
    return this.taskService.tasks;
  }




  onDeleteId(id: string): void {
    this.taskService.deleteTaskById(id)
  }

  onCheckId(id: string | undefined): void {
    // this.onCheck.emit(id)
    this.taskService.check(id)
  }

  onBlockId(id: string): void {
    this.taskService.block(id)
  }

  onModifyId(id: string | undefined, newName: string): void {

    this.taskService.taskModify(id!, newName)
  }

  onDeleteAll(): void {
    localStorage.clear();
    location.reload()
  }

  onDeleteCompleted(): void {
    this.taskService.tasks = this.tasks.filter(task => !task.check);
    localStorage.setItem('tasks', JSON.stringify(this.taskService.tasks));
  }

  onDeletePending(): void {
    this.taskService.tasks = this.tasks.filter(task => task.check);
    localStorage.setItem('tasks', JSON.stringify(this.taskService.tasks));
  }

  onDeleteBlocked(): void {
    this.taskService.tasks = this.tasks.filter(task => !task.isBlocked);
    localStorage.setItem('tasks', JSON.stringify(this.taskService.tasks));
  }


}
