import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ChatsComponent } from './components/chats/chats.component';
import { HomeComponent } from './components/home/home.component';
import { ChatResponseComponent } from './components/chat-response/chat-response.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatsComponent,
    HomeComponent,
    ChatResponseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('custom-sw.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
