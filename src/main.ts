import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { authGuard } from './app/components/guards/auth.guard';


import { App } from './app/app';
import { LoginComponent } from './app/components/login.component';
import { RegisterComponent } from './app/components/register.component';
import { DashboardComponent } from './app/components/admin/dashboard.component'; 
import { ForgotPasswordComponent } from './app/components/forgot-password.component';
import { VerifyCodeComponent } from './app/components/verify-code.component';
import { ResetPasswordComponent} from './app/components/reset-password.component';
import { ResetPasswordGuard } from './app/components/guards/reset-password.guard';
import { DashboardResolver } from './app/components/admin/dashboard.resolver';
import { CreateProjectManagerDetailsComponent } from './app/components/admin/create-project-manager-details.component';
import { CreateProjectManagerComponent } from './app/components/admin/create-project-manager.component';
import { ProjectManagerListComponent } from './app/components/admin/project-manager-list.component';


import { ProjectManagerResolver } from './app/components/admin/project-manager.resolver';
import { EditProjectManagerComponent } from './app/components/admin/edit-project-manager.component';
import { EditAccountComponent } from './app/components/admin/edit-project-manager-account.component';
import { ViewProjectManagerComponent } from './app/components/admin/view-project-manager.component';
import { ProjectManagerViewResolver } from './app/components/admin/view-project-manager.resolver';
import{ CreateProjectComponent } from './app/components/admin/Project/create-project.component';
import { ProjectListComponent } from './app/components/admin/Project/project-list.component';
import { ProjectResolver } from './app/components/admin/Project/project-resolver';
import{ViewProjectComponent} from './app/components/admin/Project/view-project.component';
import { ProjectViewResolver } from './app/components/admin/Project/project-view-resolver';
import{EditProjectComponent} from './app/components/admin/Project/edit-project.component'




bootstrapApplication(App, {
  providers: [
    provideRouter([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
     
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'verify-code', component: VerifyCodeComponent },
      { path: 'reset-password', component: ResetPasswordComponent,canActivate: [ResetPasswordGuard] },
       {
  path: 'dashboard',
  component: DashboardComponent,
  resolve: { stats: DashboardResolver },
  
},
      { path: 'project-manager-list', component: ProjectManagerListComponent,
        resolve: { data: ProjectManagerResolver } 
       },
       { path: 'create-project-manager-details', component: CreateProjectManagerDetailsComponent },
  { path: 'create-project-manager', component: CreateProjectManagerComponent },
    { path: 'edit-project-manager/:id', component: EditProjectManagerComponent },
    {path: 'edit-project-manager-account/:id', component: EditAccountComponent },
    { path  : 'view-project-manager/:id', component: ViewProjectManagerComponent,
      resolve: {
    pm: ProjectManagerViewResolver
      },
     },
     { path: 'create-project', component: CreateProjectComponent },
     {
  path: 'project-list',
  component: ProjectListComponent,
  resolve: {
    projects: ProjectResolver
  }
},
  {
  path: 'view-project/:id',
  component: ViewProjectComponent,
  resolve: {
    project: ProjectViewResolver
  }
},
{
  path: 'edit-project/:id',
  component: EditProjectComponent,
  
},
  { path: '**', redirectTo: 'login' },

 
    ], withHashLocation()),
    provideHttpClient(),
    
     
  ]
}).catch(err => console.error(err));