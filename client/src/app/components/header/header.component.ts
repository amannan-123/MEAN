import { Component, Input, Renderer2, OnInit } from '@angular/core';
import User from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
	loggedIn: boolean = false;
	user: string = '';

	constructor(
		private renderer: Renderer2,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		if (this.darkMode) this.renderer.addClass(document.body, 'dark');

		this.authService.getCurrentUser$().subscribe({
			next: (user: User | null) => {
				this.user = user ? `[${user?.role.toLocaleUpperCase()}] ${user?.email}` : '';
				this.loggedIn = this.user.length > 0;
			},
		});
	}

	@Input() appName: string = '';

	darkMode = true;

	toggleTheme(): void {
		this.darkMode = !this.darkMode;

		if (this.darkMode) {
			this.renderer.addClass(document.body, 'dark');
		} else {
			this.renderer.removeClass(document.body, 'dark');
		}
	}

	signOut(): void {
		this.authService.signOut();
	}
}
