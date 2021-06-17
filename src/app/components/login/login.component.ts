import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.userService
        .validUser(loginModel.username, loginModel.password)
        .subscribe((valid) => {
          if (valid != '') {
            window.localStorage.setItem('token', valid);
            this.toastrService.success('Giriş Başarılı.');
            this.router.navigate(['/']).then((reload) => {
              window.location.reload();
            });
          }else{
            this.toastrService.error('Kullanıcı Adı veya Parola Hatalı!');
          }
        });
    } else {
      this.toastrService.error('Formu Eksiksiz Doldurunuz!');
    }
  }
}
