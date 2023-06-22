import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../models/user';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private URL = '/api/users';
	private user: User | null = null;
	private userStream$: Subject<User | null> = new Subject<User | null>();

	constructor(private http: HttpClient) {
		const token: string = localStorage.getItem('token') || '';
		this.validateToken(token);
	}

	validateToken(token: string) {
		return this.http
			.get<any>(`${this.URL}/validate`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.subscribe({
				next: (res) => {
					this.user = {
						email: res.email,
						role: res.role,
						token: token,
					};
					this.userStream$.next(this.user);
				},
				error: () => {
					this.signOut();
				},
			});
	}

	getCurrentUser(): User | null {
		return this.user;
	}

	getCurrentUser$(): Observable<User | null> {
		return this.userStream$.asObservable();
	}

	signIn(email: string, password: string) {
		return this.http
			.post<User>(`${this.URL}/login`, {
				email,
				password,
			})
			.pipe(
				tap({
					next: (res) => {
						localStorage.setItem('token', res.token);
						this.user = res;
						this.userStream$.next(res);
					},
				})
			);
	}

	signUp(email: string, password: string, role: string, adminKey: string) {
		return this.http
			.post<User>(`${this.URL}/register`, {
				email,
				password,
				role,
				adminKey,
			})
			.pipe(
				tap({
					next: (res) => {
						localStorage.setItem('token', res.token);
						this.user = res;
						this.userStream$.next(res);
					},
				})
			);
	}

	signOut() {
		localStorage.removeItem('token');
		this.user = null;
		this.userStream$.next(null);
	}
}
