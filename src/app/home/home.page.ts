import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { TodoService } from '../todo.service';
import { UpdateTaskPage } from '../update-task/update-task.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  today: number = Date.now();
  todoList = [];

  constructor(
    public modalCtrl: ModalController,
    public todoService: TodoService) {
      this.getAllTask();
    }


  async addTask() {
    const modal = await this.modalCtrl.create({
      component: AddNewTaskPage
    });

    modal.onDidDismiss().then(newTaskObj => {
      // console.log(newTaskObj.data);
      // this.todoList.push(newTaskObj.data);
      this.getAllTask();
    });
    return await modal.present();
  }

  deleteTask(key){
    this.todoService.deleteTask(key);
    this.getAllTask();
  }

  getAllTask() {
    this.todoList = this.todoService.getAllTasks();
    console.log(this.todoList);
  }

  async updateTask(selectedTask) {
    const modal = await this.modalCtrl.create( {
      component: UpdateTaskPage,
      componentProps: {task: selectedTask}
    });
    modal.onDidDismiss().then(() => {
      this.getAllTask();
    })
    return await modal.present();
  }
}
