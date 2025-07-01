import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {
  private pushSubscription!: PushSubscription | null;

  constructor(private swPush: SwPush) {
  }


  ngOnInit(): void {
    this.swPush.subscription.subscribe((subscription) => {
      this.pushSubscription = subscription;
      this.onEventNotifications();
    });
  }

  enableNotify() {
    if (this.swPush.isEnabled) {
      try {
        if (Notification.permission != 'granted') {
          this.requestSubscription();
          this.onEventNotifications();
        } else {
          const isConfirm = confirm("Ya tiene los permisos para notificar. ¿Deseas refrescar el token?");
          if (isConfirm) this.requestSubscription(), this.onEventNotifications();
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
    if (this.swPush.isEnabled && Notification.permission == 'granted') {
      if (this.pushSubscription) {
        this.pushSubscription.unsubscribe();
        this.pushSubscription = null;
      }
    }
  }

  getToken() {
    if (this.swPush.isEnabled && Notification.permission == 'granted')
      this.requestSubscription();
  }

  private async requestSubscription() {
    this.pushSubscription = await this.swPush.requestSubscription({ serverPublicKey: environment.publicKey });
    console.log(this.pushSubscription.toJSON());
    //? Hacer petición para guardar token en el backend
  }

  private onEventNotifications() {
    if (this.swPush.isEnabled && Notification.permission == 'granted') {

      this.swPush.notificationClicks.subscribe((data) => {

        console.log("click", data);
      })

      this.swPush.messages.subscribe({
        next(value) {
          console.log("Mensaje recibido", value);
        },
      });
    }
  }

}

