import { Component, ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [],
})
export class AppComponent {
  constructor(overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  onClick() {
    this.modal.alert()
        .size('sm')
        .showClose(true)
        .title('This the modal title')
        .body('<h4>This is the modal body</h4')
        .open();
  }
}
