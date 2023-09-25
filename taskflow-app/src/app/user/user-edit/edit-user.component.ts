import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  public title = 'Edit User';
  public editedUser: any = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('id');
      if (userId) {
        this.fetchTaskToEdit(+userId);
      }
    });
    console.log('editedUser.id:', this.editedUser.id);
  }

  fetchTaskToEdit(userId: number) {
    this.userService.getUserById(userId).subscribe(
      (response) => {
        this.editedUser = response;
      },
      (error) => {
        console.error('Error fetching user for editing', error);
      }
    );
  }

  saveUser() {
    // Appeler le service pour mettre à jour l'activité
    this.userService.updateUser(this.editedUser.id, this.editedUser).subscribe(
      (response) => {
        console.log('Utilisateur mis à jour avec succès :', response);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
      }
    );
    console.log('Méthode saveUser() appelée. ' + 'ID de l\'utilisateur :' + this.editedUser.id);

  }

}
