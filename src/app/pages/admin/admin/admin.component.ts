import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/user/token.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  nombreUsuario: string | null;

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.nombreUsuario = this.tokenService.getUsername();
  }
}
