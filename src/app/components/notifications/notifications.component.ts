import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {

  constructor(private swPush: SwPush) {
  }

  ngOnInit(): void {
    if (this.swPush.isEnabled && Notification.permission == 'granted') {

      this.swPush.notificationClicks.subscribe((data) => {

        console.log(data);
      })

      this.swPush.messages.subscribe((message: any) => {
        console.log(message);
        // console.log(message.notification.data.message);
      })
    }
  }

  enableNotify() {
    if (this.swPush.isEnabled) {
      try {
        if (Notification.permission != 'granted') {
          this.requestSubscription();
        } else {
          const isConfirm = confirm("Ya tiene los permisos para notificar. ¿Deseas refrescar el token?");
          if (isConfirm) this.requestSubscription();
        }
      } catch (error: any) {
        alert('No se estableció los permisos para notificar');
        console.error(error.message);
      }
    } else {
      console.error("El service worker no ha sido cargado");
    }
  }

  unsubscribe() {
    if (this.swPush.isEnabled && Notification.permission == 'granted')
      this.swPush.unsubscribe();
  }

  getToken() {
    if (this.swPush.isEnabled && Notification.permission == 'granted')
      this.swPush.subscription.subscribe((subscription) => {
        console.log(subscription);
      });
  }

  private async requestSubscription() {
    const payload = await this.swPush.requestSubscription({ serverPublicKey: environment.publicKey });
    console.log(payload.toJSON());
    //? Hacer petición para guardar token en el backend
  }

}

