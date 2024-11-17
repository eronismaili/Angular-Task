import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { MatSnackBar} from "@angular/material/snack-bar";
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, HttpClientModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'avatar', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  greetingMessage: string = '';
  private greetingMessageSet = false;


  constructor(
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.setGreetingMessage();

    this.translate.onLangChange.subscribe(() => {
      this.setGreetingMessage();
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (response: any) => {
        this.dataSource.data = response.data;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  setGreetingMessage(): void {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      this.greetingMessage = this.translate.instant('greeting.morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      this.greetingMessage = this.translate.instant('greeting.afternoon');
    } else {
      this.greetingMessage = this.translate.instant('greeting.evening');
    }

    this.openDialog();
    setTimeout(() => {
      this.dialog.closeAll();
    }, 2000);
  }

  openDialog(): void {
    this.dialog.open(DialogContentComponent, {
      width: '300px',
      data: { message: this.greetingMessage }
    });
  }

  addUser(): void {
    const newUser = {
      name: 'New User',
      job: 'Developer'
    };

    this.userService.createUser(newUser).subscribe(
      (response: any) => {
        console.log('User added:', response);
        this.loadUsers();
      },
      (error: any) => {
        console.error('Error adding user:', error);
      }
    );
  }

  editUser(user: any): void {
    const updatedUser = {
      name: user.first_name,
      job: 'Updated Job'
    };

    this.userService.updateUser(user.id, updatedUser).subscribe(
      (response: any) => {
        console.log('User updated:', response);
        this.loadUsers();
      },
      (error: any) => {
        console.error('Error updating user:', error);
      }
    );
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        console.log('User deleted');
        this.loadUsers();
      },
      (error: any) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

    this.snackBar.open(this.translate.instant('logout-success.success'), 'Close', {
      duration: 3000,
    });
  }
}

@Component({
  selector: 'dialog-content',
  template: `<h2>{{ data.message }}</h2>`,
  standalone: true,
  styles: ['h2 { text-align: center; font-size: 24px; color: #4caf50; }']
})
export class DialogContentComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
