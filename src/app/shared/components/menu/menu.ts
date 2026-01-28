import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { AuthService } from '../../../auth/servieces/auth.service';
import { Router } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { Basket } from '../../../basket/components/basket/basket';

@Component({
  selector: 'app-menu',
  imports: [Menubar,DrawerModule,Basket],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {
  items: MenuItem[] = [];
  private authService = inject(AuthService);
  private router = inject(Router);
   private isLoggedIn = false;
  private role = this.authService.getUserRole();
    visible: boolean = false;


  buildMenu(): void {
    this.items = [
      {
        icon: this.isLoggedIn ? 'pi pi-user-minus' : 'pi pi-user-plus',
        label: this.isLoggedIn ? 'התנתקות' : 'התחברות',
        command: () => {
          if (this.isLoggedIn) {
            this.authService.logout();
            this.router.navigate(['/login']);
          } else {
            this.router.navigate(['/login']);
          }
        }
      },
      {
        label: 'בית',
        icon: 'pi pi-home'
      },
      {
        label: 'כל המתנות',
        icon: 'pi pi-gift',
        command:()=>{
          this.router.navigate(['/gifts']);
        }
      }
    ];
    if(this.isLoggedIn){
      this.items.push({
        label: 'הסל שלי',  
        icon: 'pi pi-shopping-cart',
         command: () => this.visible = true
      });
    }

    if (this.isLoggedIn && this.authService.isAdmin()) {
      this.items.push({
        label: 'ניהול',
        icon: 'pi pi-slack',
        items: [
          { label: 'מתנות', icon: 'pi pi-gift' ,command: () => this.router.navigate(['/management/gift'])},
          { label: 'תורמים', icon: 'pi pi-building-columns',command:()=>this.router.navigate(['/management/donor']) },
          { label: 'רכישות', icon: 'pi pi-wallet' },
          { label: 'הגרלה', icon: 'pi pi-sparkles' }
        ]
      });
    }
  }
  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.buildMenu();
    });
    this.authService.role$.subscribe(role => {
      this.role = role;
      console.log('Menu detected role change:', role);
      
    this.buildMenu();
  });
  }
}

