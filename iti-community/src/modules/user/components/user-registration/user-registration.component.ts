import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzMessageService } from "ng-zorro-antd/message";
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
  userExist: boolean = false

  constructor(
    private router: Router,
    private userService: UserService,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
  }

  async exists(): Promise<void> {
    this.userExist = await this.userService.exist(this.model.username)
  }

  isConfirmPasswordValid() {
    return this.model.password === this.model.confirmPassword
  }

  isLengthValid(value: string, min: number = 0, max: number = Infinity): boolean {
    if (!value) return false
    return value.length >= min && value.length <= max
  }

  async submit() {
    try {
      await this.exists()

      if (this.userExist) return

      await this.userService.register(this.model.username, this.model.password)
      this.goToLogin();
    } catch {
      this.nzMessageService.error("Une erreur est survenue. Veuillez réessayer plus tard");
    }
  }

  goToLogin() {
    this.router.navigate(['/splash/login']);
  }

  verifyLength(value: string, min: number = 0, max: number = Infinity) {
    return value.length >= min && value.length <= max
  }
}
