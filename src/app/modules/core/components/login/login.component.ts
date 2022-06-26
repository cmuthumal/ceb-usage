import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public loginInvalid: boolean = false;
  private formSubmitAttempt: boolean = false;
  private returnUrl: string = '';
  authDataLoaded = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private coreService: CoreService
  ) {
    this.form = this.fb.group({
      username: ['sisira', Validators.required],
      password: ['sisira1', Validators.required]
    });
  }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  async onSubmit() {
    this.authDataLoaded = false;
    this.loginInvalid = false;
    this.formSubmitAttempt = false;

    if (this.form.valid) {
      try {
        let data = {
          username: this.getFormValue('username').value,
          password: this.getFormValue('password').value
        };

        if (data.username == 'sisira' && data.password == 'sisira1') {
          this.authDataLoaded = true;
          this.signin({
            firstName: "Sisira",
            lastName: "Gunasekara"
          });
          this.router.navigate(['/dashboard']);
        } else {
          this.authDataLoaded = true;
          this.loginInvalid = true;
        }

        // await this.authService.login(data).subscribe(res => {
        //   if (res && res.email) {
        //     this.authDataLoaded = true;
        //     this.signin(res);
        //   } else {
        //     this.authDataLoaded = true;
        //     this.loginInvalid = true;
        //   }
        // }, error => {
        //   if (error.status == 403) {
        //     this.authDataLoaded = true;
        //     this.loginInvalid = true;
        //   }
        // });
      } catch (err) {
        this.authDataLoaded = true;
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
      this.authDataLoaded = true;
    }
  }

  getFormValue(key: string) {
    return this.form.get(key) as FormControl;
  }

  signin(user: any) {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('token', '3ghw7-tr7935-dsvb3-er03f-pklm2');
    this.coreService.signInBehavior.next(true);
  }
}
