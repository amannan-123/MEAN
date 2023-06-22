import { Component, EventEmitter, Input, Output } from '@angular/core';
import Item from '../../models/item';
import { ItemsService } from 'src/app/services/items.service';
import { faClose, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
	selector: 'app-item',
	templateUrl: './item.component.html',
	styleUrls: ['./item.component.css'],
})
export class ItemComponent {
	deleting: boolean = false;
	faEdit = faEdit;
	faClose = faClose;

	@Input() item!: Item;
	@Output() itemDeleted: EventEmitter<string> =
		new EventEmitter<string>();

	constructor(private itemsService: ItemsService, private router: Router) {}

	deleteItem(itemToDelete: Item) {
		this.deleting = true;
		this.itemsService.deleteItem(itemToDelete._id).subscribe({
			next: () => {
				this.itemDeleted.emit(itemToDelete._id);
			},
			error: () => {
				this.deleting = false;
			},
			complete: () => {
				this.deleting = false;
			},
		});
	}

	viewItem(id: string) {
		this.router.navigate(['/items', id]);
	}
}
