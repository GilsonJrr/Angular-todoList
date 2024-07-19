import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface ListItem {
  id: number;
  name: string;
  done: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'my-list-app';
  name: string = '';
  list: ListItem[] = [];
  showInputNewTask: boolean = false;

  constructor() {
    const savedList = localStorage.getItem('todoList');
    if (savedList) {
      try {
        this.list = JSON.parse(savedList);
      } catch (e) {
        console.error('Error parsing localStorage data:', e);
      }
    }
  }

  handleShowInputNewTask(): void {
    this.showInputNewTask = !this.showInputNewTask;
  }

  changeName(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.name = inputValue;
  }

  addNewTask(): void {
    if (this.name === '') {
      this.showInputNewTask = false;
      return;
    }

    const newItem: ListItem = {
      id: this.list.length,
      name: this.name,
      done: false,
    };

    this.list = [...this.list, newItem];
    localStorage.setItem('todoList', JSON.stringify(this.list));
    this.showInputNewTask = false;
    this.name = '';
  }

  updateDoneStatus(index: number, isChecked: Event) {
    const inputValue = (isChecked.target as HTMLInputElement).checked;

    this.list[index].done = inputValue;
    localStorage.setItem('todoList', JSON.stringify(this.list));
  }

  updateNameTask(index: number, event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    console.log('value', inputValue);
    if (inputValue === '') {
      this.deleteTask(index);
      localStorage.setItem('todoList', JSON.stringify(this.list));
      return;
    }

    this.list[index].name = inputValue;
    localStorage.setItem('todoList', JSON.stringify(this.list));
  }

  deleteTask(index: number): void {
    const filteredItems = this.list.filter((a) => a.id !== index);
    this.list = filteredItems;
  }
}
