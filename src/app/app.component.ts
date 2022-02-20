import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pwa-simple-app';
  constructor(public updates:SwUpdate) {
    updates.available.subscribe(event => {
      updates.activateUpdate().then(() => this.updateApp());
  });
  }

  updateApp(){
    document.location.reload();
    console.log("The app is updating right now");

   }
}
