import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Item from 'src/app/models/item';
import { ItemsService } from 'src/app/services/items.service';

@Component({
	selector: 'app-add-item',
	templateUrl: './add-item.component.html',
	styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent {
	adding: boolean = false;
	errorMessage: string = '';
	itemName: string = '';
	itemPrice: number = 1;

	@Output() itemAdded: EventEmitter<Item> = new EventEmitter<Item>();

	constructor(private itemsService: ItemsService) {}

	addItem() {
		this.adding = true;
		this.errorMessage = '';

		this.itemsService.addItem(this.itemName, this.itemPrice).subscribe({
			next: (res) => {
				this.itemAdded.emit(res as Item);
			},
			error: (error) => {
				this.errorMessage = error?.error?.message || error?.message;
				this.adding = false;
			},
			complete: () => {
				this.adding = false;
			},
		});
	}
}
