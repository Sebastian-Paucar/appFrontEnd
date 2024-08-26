import {Component, ElementRef, HostListener, Renderer2} from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {routes} from "../../app.routes";
import {environment} from "../../environment/environment";
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterModule,CommonModule,FontAwesomeModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class sidemenuComponent {

  authorize_uri = environment.authorize_uri;
  params: any = {
    client_id: environment.client_id,
    redirect_uri: environment.redirect_uri,
    scope: environment.scope,
    response_type: environment.response_type,
    response_mode: environment.response_mode,
    code_challenge_method: environment.code_challenge_method,
    code_challenge: environment.code_challenge,
}

  isSidebarHidden = true;
  showIconsOnly = false;
  token!: string;
  public menuItems = routes
    .map(route => route.children ?? [])
    .flat()
    .map(route => [
      route,
      ...(route.children ?? []).filter(childRoute => childRoute.path && !childRoute.path.includes(':'))
    ])
    .flat()
    .filter(route => route.path && !route.path.includes(':'));

  public icons: string[] = ['fas fa-skull', 'fas fa-solid fa-pen-nib', 'fas fa-solid fa-handshake','fas fa-solid fa-user-tie', 'fab fa-leanpub', 'fas fa-book'];

  constructor(private router: Router, private eRef: ElementRef, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.eRef.nativeElement.contains(e.target) && !this.isSidebarHidden) {
        this.isSidebarHidden = true;
      }
    });
  }

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const windowWidth = (event.target as Window).innerWidth;
    this.isSidebarHidden = windowWidth < 1024;
    this.showIconsOnly = windowWidth < 768;
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.onResize({ target: window } as unknown as Event);
    }
  }

  logout() {
    // Aquí puedes agregar la lógica de logout, por ejemplo:
    // Limpiar el localStorage o las cookies
    localStorage.removeItem('token');
    // O cualquier otra información relacionada con la sesión

    // Redirigir al usuario a la página de login
    this.router.navigate(['/login']);
  }
  onLogin(): void {
    const httpParams = new HttpParams({fromObject: this.params});
    const codeUrl = this.authorize_uri + httpParams.toString();
    location.href = codeUrl;
  }
}
