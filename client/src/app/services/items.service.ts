import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import Item from '../models/item';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root',
})
export class ItemsService {
	private API_URL = '/api/items';
	private items$ = new Subject<Item[]>();
	private errors$ = new Subject<any>();

	constructor(private http: HttpClient, private authService: AuthService) {}

	getItems(): Observable<Item[]> {
		return this.items$.asObservable();
	}

	getErrors(): Observable<any[]> {
		return this.errors$.asObservable();
	}

	private headers(): HttpHeaders {
		return new HttpHeaders({
			Authorization: `Bearer ${this.authService.getCurrentUser()?.token}`,
		});
	}

	fetchItems(
		searchTerm: string = '',
		sort: string = 'name',
		order: string = 'asc'
	): void {
		const params = new HttpParams()
			.set('search', searchTerm)
			.set('sort', sort)
			.set('order', order);
		this.http
			.get<Item[]>(this.API_URL, {
				headers: this.headers(),
				params: params,
			})
			.subscribe({
				next: (res: Item[]) => {
					this.items$.next(res);
				},
				error: (error) => {
					this.items$.next([]);
					this.errors$.next(error);
				},
			});
	}

	getOneItem(id: string): Observable<Item> {
		return this.http.get<Item>(`${this.API_URL}/${id}`, {
			headers: this.headers(),
		});
	}

	updateItem(item: Item): Observable<Item> {
		return this.http.patch<Item>(`${this.API_URL}/${item._id}`, item, {
			headers: this.headers(),
		});
	}

	deleteItem(id: string): Observable<any> {
		return this.http.delete(`${this.API_URL}/${id}`, {
			headers: this.headers(),
		});
	}

	addItem(name: string, price: number): Observable<Item> {
		return this.http.post<Item>(
			this.API_URL,
			{ name, price },
			{ headers: this.headers() }
		);
	}
}
