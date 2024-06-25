import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StreamService} from "../../services/stream.service";
import {StudentDto} from "../../models/student.dto";

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrl: './invite.component.css'
})
export class InviteComponent implements OnInit {
  student = {
    login: '',
    password: '',
    firstName: '',
    lastName: ''
  };

  flow = {
    name: '',
    participants: 0
  };

  code: string | undefined;
  isLoading = false;


  constructor(
    private route: ActivatedRoute,
    private streamService: StreamService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const inviteCode = this.route.snapshot.paramMap.get('code');
    this.code = inviteCode!!
    this.getStreamInfo(inviteCode!!);
  }

  getStreamInfo(code: string): void {
    this.streamService.getStreamByInviteCode(code).subscribe(data => {
      this.flow.name = data.name;
      this.flow.participants = data.peopleNum;
    })
  }

  onSubmit(): void {
    // Здесь обработка формы регистрации, например отправка данных на сервер
    console.log(this.student);
    this.isLoading = true;
    const userData: StudentDto = {
      login: this.student.login,
      name: this.student.firstName,
      password: this.student.password,
      surname: this.student.lastName,
    }
    this.streamService.registerByInviteCode(this.code!!, userData).subscribe(responce => {
      this.isLoading = false;
      this.router.navigateByUrl("").then(r => {
      })
    }, error => {
      this.isLoading = false;
    })
  }
}
