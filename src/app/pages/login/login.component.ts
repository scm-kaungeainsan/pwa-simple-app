import { Component, OnInit } from '@angular/core';
import {NewApiService} from '../../service/new-api-service';
import {ApiService} from '../../service/api-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private apiservice : ApiService,
    private newapiservice : NewApiService) { }

  ngOnInit(): void {
    this.getToken();
  }

  getToken() {
    console.log('getToken')
    let data = {
      "userName": "Admin",
      "Password": "InposAdmin2022$$"
    }
    this.apiservice.getRentalItems().subscribe((result: any) => {
      console.log(result)
    });

    this.newapiservice.getToken(data).subscribe((dist) => {
      console.log(dist)
    }, error => {
      console.log(error)
    });
    
  }

}
