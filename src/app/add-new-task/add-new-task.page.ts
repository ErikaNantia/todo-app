import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {
  categories = [];
  taskName: string;
  taskDueDate: Date;
  taskPriority;
  taskCategory: string;

  newTaskObject = {};

  constructor(
    public modalCtrl: ModalController,
    public todoService: TodoService
    ) { }

  ngOnInit() {
    this.categories.push('work');
    this.categories.push('personal');
    this.categories.push('home');
  }

  async dismiss() {
    await this.modalCtrl.dismiss(this.newTaskObject);
  }


  selectCategory(index) {
    this.taskCategory = this.categories[index];
  }

  async addTask() {
    this.newTaskObject = ({
      itemName: this.taskName,
      itemDueDate: this.taskDueDate,
      itemPriority: this.taskPriority,
      itemCategory: this.taskCategory
    });
    const uid = this.taskName;
    //Do not save empty tasks
    if(uid) {
      await this.todoService.addTask(uid, this.newTaskObject);
    }
    else{
      console.log('Cannot save empty task!');
    }
    this.dismiss();
  }
}
