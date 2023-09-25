import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit {
  public title = 'Details of the user';
  public user: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('id');
      if (userId) {
        this.fetchUserDetail(+userId);
      }
    });
  }

  fetchUserDetail(userId: number) {
    this.userService.getUserById(userId).subscribe(
      (response) => {
        this.user = response;
        if (this.user) {
          console.log('Détails de l\'utilisateur récupérés du backend :', this.user);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de l\'activité depuis le backend', error);
      }
    );
  }

  deleteUser() {
    if (this.user && this.user.id) {
      this.userService.deleteUser(this.user.id).subscribe(
        () => {
          console.log('Utilisateur supprimé avec succès');
          this.router.navigate(['/users']);   // Revenir à la page précédente
          window.alert('L\'utilisateur a été supprimé avec succès!');
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'utilisateur', error);
        }
      );
    }
  }



}
