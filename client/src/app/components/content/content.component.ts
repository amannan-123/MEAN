import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import Item from '../../models/item';
import { ItemsService } from 'src/app/services/items.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import User from 'src/app/models/user';

@Component({
	selector: 'app-content',
	templateUrl: './content.component.html',
	styleUrls: ['./content.component.css'],
	providers: [],
})
export class ContentComponent implements OnInit, OnDestroy {
	items: Item[] = [];
	loading = false;
	errorMessage = '';
	searchTerm = '';
	addModalOpen = false;
	itemsSubscription!: Subscription;
	errorSubscription!: Subscription;
	userSubscription!: Subscription;
	sortBy = 'name';
	order = 'asc';

	//FA Search icon
	faSearch = faSearch;

	constructor(
		private itemsService: ItemsService,
		private authService: AuthService,
		private location: Location,
		private router: Router
	) {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				const url = event.url;
				this.addModalOpen = url.endsWith('#add');
			}
		});
	}

	ngOnInit(): void {
		if (this.authService.getCurrentUser()) {
			this.reFetchItems();
		} else {
			this.errorMessage = 'Please Login!!';
		}
		this.subscribeUserStream();
		this.subscibeItemsStream();
		this.subscribeErrorStream();
	}

	ngOnDestroy(): void {
		this.itemsSubscription.unsubscribe();
		this.errorSubscription.unsubscribe();
		this.userSubscription.unsubscribe();
	}

	subscibeItemsStream() {
		this.itemsSubscription = this.itemsService.getItems().subscribe({
			next: (items: Item[]) => {
				this.errorMessage = '';
				this.items = items;
				this.loading = false;
			},
		});
	}

	subscribeErrorStream() {
		this.errorSubscription = this.itemsService.getErrors().subscribe({
			next: (error: any) => {
				this.errorMessage = error?.error?.message || error?.message;
				this.loading = false;
			},
		});
	}

	subscribeUserStream() {
		this.userSubscription = this.authService.getCurrentUser$().subscribe({
			next: (res: User | null) => {
				if (res) {
					this.reFetchItems();
				} else {
					this.items = [];
					this.errorMessage = 'Please Login!!';
					this.loading = false;
				}
			},
		});
	}

	reFetchItems() {
    this.loading = true;
		this.itemsService.fetchItems(this.searchTerm, this.sortBy, this.order);
	}

	itemAdded(item: Item) {
		this.location.go('/items');
		this.addModalOpen = false;
		this.reFetchItems();
	}

	itemDeleted(id: string) {
		this.reFetchItems();
	}

	searchItems() {
		this.reFetchItems();
	}

	addItem() {
		this.location.go('/items#add');
		this.addModalOpen = true;
	}

	backdropClicked(e: Event) {
		if (e.target === e.currentTarget) {
			this.location.go('/items');
			this.addModalOpen = false;
		}
	}

	filterItems() {
		this.reFetchItems();
	}
}
