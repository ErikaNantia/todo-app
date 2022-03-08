import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  @Input() task;
  categories = [];
  taskName: string;
  taskDueDate: Date;
  taskPriority;
  taskCategory: string;

  taskObject= {};

  constructor(
    public modalCtrl: ModalController,
    public todoService: TodoService) { }

  ngOnInit() {
    this.categories.push('work');
    this.categories.push('personal');
    this.categories.push('home');

    this.taskName = this.task.value.itemName;
    this.taskDueDate = this.task.value.itemDueDate;
    this.taskCategory = this.task.value.itemCategorie;
    this.taskPriority = this.task.value.itemPriority;


    console.log(this.task);

  }

  selectCategory(index) {
    this.taskCategory = this.categories[index];
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async updateTask() {
    this.taskObject = ({
      itemName: this.taskName,
      itemDueDate: this.taskDueDate,
      itemPriority: this.taskPriority,
      itemCategory: this.taskCategory
    });
    let uid = this.task.key;
    await this.todoService.updateTask(uid, this.taskObject );
    this.dismiss();
  }
}
