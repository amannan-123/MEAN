import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ContentComponent } from './components/content/content.component';
import { ViewItemComponent } from './components/view-item/view-item.component';

const routes: Routes = [
	{ path: '', redirectTo: '/items', pathMatch: 'full' },
	{ path: 'items', component: ContentComponent },
	{ path: 'items/:id', component: ViewItemComponent },
	{ path: 'signin', component: SigninComponent },
	{ path: 'signup', component: SignupComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
