import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TareasAsignadasComponent } from "./tareas-asignadas.component";
import { DashboardService } from '../../../../../shared/services/dashboard.service';
import { TaskResponse } from '../../../../../shared/interfaces/taskify.interface';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

const listTask: TaskResponse[] = [
  {
    taskId: 'tarea1',
    label: 'Mejoras',
    name: 'Task 1',
    description: 'Task 1',
    time_start: '12:00',
    time_end: '13:00',
    date: '2024-05-12',
    color: '#454545',
    status: false,
  },
  {
    taskId: 'tarea2',
    label: 'Label 2',
    name: 'Task 2',
    description: 'Task 2',
    time_start: '12:00',
    time_end: '13:00',
    date: '2024-05-18',
    color: '#454545',
    status: true,
  },
  {
    taskId: 'tarea3',
    label: 'Mejoras',
    name: 'Task 3',
    description: 'Task 3',
    time_start: '12:00',
    time_end: '13:00',
    date: '2024-05-12',
    color: '#454545',
    status: false,
  },
]

let type = 'all';
const tokenMock = 'token';

const dashboardServiceMock = {

  getTasks: (token: string) => of(listTask),
  deleteTask: (id: string, token: string) => of(null),
  modifyTask: (token: string, task: TaskResponse) => of(task),
}

const mockGroupedTasks = new Map();
const mockListDate = ['12-05-2024',];

describe("TareasAsignadasComponent", () => {
  let component: TareasAsignadasComponent;
  let fixture: ComponentFixture<TareasAsignadasComponent>;
  let myService: DashboardService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TareasAsignadasComponent],
      providers: [

        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ type: type })
          },
        },
        {
          provide: DashboardService,
          useValue: dashboardServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasAsignadasComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
    myService = TestBed.inject(DashboardService);
  });


  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  //? NG ON INIT
  it('should set the correct values and call loadTasks if type is all, pending or complete', () => {
    const spySetType = spyOn(component.type, 'set');
    const spySetFilterParam = spyOn(component.filterParam, 'set');
    const spySetTasksList = spyOn(component.tasksList, 'set');
    const spySetListDate = spyOn(component.listDate, 'set');

    component.ngOnInit();

    expect(spySetType).toHaveBeenCalledWith(type);
    expect(spySetFilterParam).toHaveBeenCalledWith('');
    expect(spySetTasksList).toHaveBeenCalledWith([]);
    expect(spySetListDate).toHaveBeenCalledWith([]);
  });

  //? LOAD TASKS
  it('should load tasks if token is present', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('token');
    spyOn(dashboardServiceMock, 'getTasks').and.returnValue(of(listTask));
    spyOn(component, 'groupTasksByDate');
    spyOn(component, 'sortTasks');

    component.loadTasks();

    expect(component.groupTasksByDate).toHaveBeenCalled();
    expect(component.sortTasks).toHaveBeenCalled();
  });


  //todo: llevar este test a su servicio
  // it('getTask get task from the subscription', () => {
  //   const spy1 = spyOn(myService, 'getTasks').and.returnValue(of(listTask));

  //   myService.getTasks(tokenMock).subscribe((tasks) => {
  //     expect(tasks).toEqual(listTask);
  //   });

  //   expect(spy1).toHaveBeenCalled();
  // });

  //? GROUP TASKS BY DATE
  it('groupTasksByDate should group tasks by date', () => {
    // Preparar
    component.tasksList.set(listTask);
    component.groupedTasks.set(mockGroupedTasks);
    component.listDate.set(mockListDate);

    spyOn(component, 'getTaskListInTheDay').and.callFake((date) => {
      return listTask.filter(task => task.date === date);
    });

    // Actuar
    component.groupTasksByDate();

    expect(component.groupedTasks()?.size).toBe(2);
    expect(component.listDate()?.length).toBe(3);
    expect(component.groupedTasks()?.get('2024-05-12')).toEqual(listTask.filter(task => task.date === '2024-05-12'));
  });

  //? GET TASK ALL IN THE DAY
  it('getTaskListInTheDay get tasks ALL in the one date', () => {
    spyOn(component, 'type').and.returnValue("all");
    component.tasksList.set(listTask);
    expect(component.getTaskListInTheDay('2024-05-12').length).toBe(2);
  });

  //? GET TASK PENDING IN THE DAY
  it('getTaskListInTheDay get tasks PENDING in the one date', () => {
    spyOn(component, 'type').and.returnValue("pending");
    component.tasksList.set(listTask);
    expect(component.getTaskListInTheDay('2024-05-18').length).toBe(0);
  });

  //? GET TASK COMPLETE IN THE DAY
  it('getTaskListInTheDay get tasks COMPLETE in the one date', () => {
    spyOn(component, 'type').and.returnValue("complete");
    component.tasksList.set(listTask);
    expect(component.getTaskListInTheDay('2024-05-18').length).toBe(1);
  });

  //? DELETE TASK
  it('deleteTask should delete a task', () => {
    const taskId = 'tarea1';
    const token = 'tokenMock';
    sessionStorage.setItem('token', token);
    component.tasksList.set(listTask);

    spyOn(dashboardServiceMock, 'deleteTask').and.returnValue(of(null));

    component.deleteTask(taskId);

    expect(dashboardServiceMock.deleteTask).toHaveBeenCalledWith(taskId, token);
    expect(component.tasksList().length).toBe(2);
    expect(component.tasksList()[0].taskId).not.toBe(taskId);
  });

  //? MODIFY TASK
  it('modifyTask should modify a task', () => {
    const token = 'tokenMock';
    const modifiedTask = { ...listTask[0], name: 'Task 1 Modified' };
    sessionStorage.setItem('token', token);

    component.tasksList.set(listTask);

    spyOn(dashboardServiceMock, 'modifyTask').and.returnValue(of(modifiedTask));

    component.modifyTask(modifiedTask);

    expect(dashboardServiceMock.modifyTask).toHaveBeenCalledWith(token, modifiedTask);
    const updatedTask = component.tasksList().find(task => task.taskId === modifiedTask.taskId);
    expect(updatedTask).toEqual(modifiedTask);
  });

  //? SORT TASKS
  it('sortTasks should sort tasks by date', () => {
    component.tasksList.set(listTask);

    component.sortTasks();

    expect(component.tasksList()[0].date).toBe('2024-05-12');
    expect(component.tasksList()[1].date).toBe('2024-05-12');
    expect(component.tasksList()[2].date).toBe('2024-05-18');
  });

  //? FILTER TASKS
  it('should set isLoading to true, set filterParam to provided label, set groupedTasks to new Map, and call loadTasks', () => {
    const label = 'test label';
    const loadTasksSpy = spyOn(component, 'loadTasks');

    component.filterByLabel(label);

    expect(component.filterParam()).toBe(label);
    expect(component.groupedTasks()).toEqual(new Map());
    expect(loadTasksSpy).toHaveBeenCalled();
  });

  //? UPDATE TASKS
  it('should set tasksList to provided data and call ngOnInit', () => {
    const data: TaskResponse[] = [
      {
        taskId: 'Nueva',
        label: 'Nueva',
        name: 'Task nueva',
        description: 'Task nueva',
        time_start: '12:00',
        time_end: '13:00',
        date: '2024-05-12',
        color: '#454545',
        status: false,
      },
    ];

    const ngOnInitSpy = spyOn(component, 'ngOnInit');

    component.actualizarTaskList(data);

    expect(component.tasksList()).toEqual(data);

    expect(ngOnInitSpy).toHaveBeenCalled();
  });

})
