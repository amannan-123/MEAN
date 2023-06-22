import { Component, Input, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	ValidatorFn,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-authform',
	templateUrl: './authform.component.html',
	styleUrls: ['./authform.component.css'],
})
export class AuthformComponent implements OnInit {
	errorMessage: string = '';
	loading: boolean = false;
	myForm!: FormGroup;

	@Input() formType: string = 'signin';

	constructor(
		private authService: AuthService,
		private router: Router,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.myForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			role: [
				'user',
				[Validators.required, Validators.pattern(/^(user|admin)$/)],
			],
			adminKey: ['', [Validators.minLength(6)]],
		});

		this.myForm.get('role')?.valueChanges.subscribe((value) => {
			const adminKeyControl = this.myForm.get('adminKey');
			if (value === 'admin') {
				adminKeyControl?.setValidators(Validators.required);
			} else {
				adminKeyControl?.clearValidators();
			}
			adminKeyControl?.updateValueAndValidity();
		});
	}

	get email() {
		return this.myForm.get('email');
	}

	get password() {
		return this.myForm.get('password');
	}

	get role() {
		return this.myForm.get('role');
	}

	get adminKey() {
		return this.myForm.get('adminKey');
	}

	onSubmit() {
		if (this.myForm.invalid) {
			this.errorMessage = "Can't submit invalid info!";
			return;
		}
		this.errorMessage = '';
		this.loading = true;
		if (this.formType === 'signin') {
			this.authService
				.signIn(this.email?.value, this.password?.value)
				.subscribe({
					error: (error) => {
						this.errorMessage =
							error?.error?.message || error?.message;
						this.loading = false;
					},
					complete: () => {
						this.loading = false;
						this.router.navigate(['/']);
					},
				});
		}
		if (this.formType === 'signup') {
			this.authService
				.signUp(
					this.email?.value,
					this.password?.value,
					this.role?.value,
					this.adminKey?.value
				)
				.subscribe({
					error: (error) => {
						this.errorMessage =
							error?.error?.message || error?.message;
						this.loading = false;
					},
					complete: () => {
						this.loading = false;
						this.router.navigate(['/']);
					},
				});
		}
	}
}
