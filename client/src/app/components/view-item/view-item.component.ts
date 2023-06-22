import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Item from 'src/app/models/item';
import { ItemsService } from 'src/app/services/items.service';

@Component({
	selector: 'app-view-item',
	templateUrl: './view-item.component.html',
	styleUrls: ['./view-item.component.css'],
})
export class ViewItemComponent implements OnInit {
	item: Item = {
		_id: '',
		name: '',
		price: 0,
		userId: '',
		createdAt: new Date(),
		updatedAt: new Date(),
	};
	errorMessage: string = '';
	infoMessage: string = '';
	loading: boolean = false;
	saving: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private itemsService: ItemsService
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.item._id = params['id'] as string;
		});
		this.loading = true;
		this.infoMessage = 'Loading item...';
		this.itemsService.getOneItem(this.item._id).subscribe({
			next: (res) => {
				this.item = res;
			},
			error: (error) => {
				this.errorMessage = error?.error?.message || error?.message;
				this.loading = false;
				this.infoMessage = '';
			},
			complete: () => {
				this.loading = false;
				this.infoMessage = '';
			},
		});
	}

	onSubmit(): void {
		this.saving = true;
		this.infoMessage = '';
		this.itemsService.updateItem(this.item).subscribe({
			next: (res) => {
				this.item = res;
			},
			error: (error) => {
				this.errorMessage = error?.error?.message || error?.message;
				this.saving = false;
			},
			complete: () => {
				this.saving = false;
				this.infoMessage = 'Item updated successfully';
			},
		});
	}
}
