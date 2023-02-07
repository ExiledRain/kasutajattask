import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  task = 'task';
  name = 'User controll task';

  reset() {
    localStorage.setItem('isFresh', 'true');
    location.reload();
  }
}
