import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

class UserRegistrationFormModel {
  username = "";
  password = "";
  confirmPassword = "";
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.less']
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild("f")
  form: NgForm;

  model = new UserRegistrationFormModel();

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  async submit() {
    if (this.form.form.invalid
      || !this.verifyLength(this.model.username, 3, 40)
      || !this.verifyLength(this.model.password, 3, 40)
      || this.model.password !== this.model.confirmPassword) {
      return;
    }

    await this.userService.register(this.model.username, this.model.password)

    this.goToLogin();
  }

  goToLogin() {
    this.router.navigate(['/splash/login']);
  }

  verifyLength(value: string, min: number = 0, max: number = Infinity) {
    return value.length >= min && value.length <= max
  }
}
