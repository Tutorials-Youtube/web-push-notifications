import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChatsComponent } from './components/chats/chats.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ChatResponseComponent } from './components/chat-response/chat-response.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'chats', children: [
      { path: '', component: ChatsComponent },
      { path: 'response', component: ChatResponseComponent }
    ]
  },
  { path: 'notifications', component: NotificationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
