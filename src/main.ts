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
import { CreateEmployeeDetailsComponent } from './app/components/admin/Employee/create-employee-details.component';
import { EmployeeListComponent } from './app/components/admin/Employee/employee-list.component';
import { EmployeeResolver } from './app/components/admin/Employee/employee.resolver';
import { EditEmployeeComponent } from './app/components/admin/Employee/edit-employee.component';
import { ViewEmployeeComponent } from './app/components/admin/Employee/view-employee.component';
import { ViewEmployeeResolver } from './app/components/admin/Employee/view-employee.resolver';
import { EmployeeDetailsComponent } from './app/components/admin/Employee/employee-details.component';
import { EmployeeDetailsResolver } from './app/components/admin/Employee/employee-details.resolver';
import { CreateClientComponent } from './app/components/admin/client/create-client.component';
import { ClientListComponent } from './app/components/admin/client/client-list.component';
import { ClientResolver } from './app/components/admin/client/client.resolver';
import { ViewClientComponent } from './app/components/admin/client/view-client.component';
import { ViewClientResolver } from './app/components/admin/client/view-client.reslover';
import { EditClientComponent } from './app/components/admin/client/edit-client.component';
import { CreateFinanceManagerDetailsComponent } from './app/components/admin/FinanceManager/create-finance-manager-details.component';
import { CreateFinanceManagerComponent } from './app/components/admin/FinanceManager/create-finance-manager.component';
import { FinanceManagerListComponent } from './app/components/admin/FinanceManager/finance-manager-list.component';
import { FinanceManagerResolver } from './app/components/admin/FinanceManager/finance-manager.resolver';
import {ViewFinanceManagerComponent} from './app/components/admin/FinanceManager/view-finance-manager.component';
import { FinanceManagerViewResolver } from './app/components/admin/FinanceManager/view-finance-manager.resolver';
import { EditFinanceManagerComponent } from './app/components/admin/FinanceManager/edit-finance-manager.componet';
import { EditFinanceManagerAccountComponent } from './app/components/admin/FinanceManager/edit-finance-manager-account.component';
import { ProjectManagerDashboardComponent } from './app/components/ProjectManager/project-manager-dashboard.component';
import { ProjectManagerDashboardResolver } from './app/components/ProjectManager/project-manager-dashboard.reslover';
import { FinanceManagerDashboardComponent } from './app/components/FinanceManager/finance-manager-dashboard.component';
import { FinanceDashboardResolver } from './app/components/FinanceManager/finance-manager-dashboard.resolver';
import { CreateAdminDetailsComponent } from './app/components/admin/AdminManagment/create-admin-details.component';
import { CreateAdminComponent } from './app/components/admin/AdminManagment/create-admin.component';
import{ AdminListComponent } from './app/components/admin/AdminManagment/admin-list.component';
import {AdminResolver } from './app/components/admin/AdminManagment/admin.resolver';
import { EditAdminComponent } from './app/components/admin/AdminManagment/edit-admin.component';
import{ EditAdminAccountComponent } from './app/components/admin/AdminManagment/edit-admin-account.component';
import { ViewAdminComponent } from './app/components/admin/AdminManagment/view-admin.component';
import { ViewAdminResolver } from './app/components/admin/AdminManagment/view-admin.resolver';



import path from 'path';





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
{ path: 'create-employee-details', component: CreateEmployeeDetailsComponent },
  
  {
  path: 'employee-list',
  component: EmployeeListComponent,
  resolve: {
    employees: EmployeeResolver
  }
},
{ path: 'edit-employee/:id', component: EditEmployeeComponent },
{ path: 'view-employee/:id', component: ViewEmployeeComponent ,
  resolve: {
    employee: ViewEmployeeResolver
  }
 },
 {path:  'employee-details/:id', component: EmployeeDetailsComponent ,
  resolve: {
    details: EmployeeDetailsResolver
  }
},
 {path: 'create-client', component: CreateClientComponent },
 {path: 'client-list', component: ClientListComponent,
  resolve: {
    clients: ClientResolver 
  },
},
{
  path: 'view-client/:id',
  component: ViewClientComponent,
  resolve: {
    client: ViewClientResolver
  }
},
{path: 'edit-client/:id', component: EditClientComponent },
{path: 'create-finance-manager-details', component: CreateFinanceManagerDetailsComponent },
{path: 'create-finance-manager', component: CreateFinanceManagerComponent },
{
  path: 'finance-manager-list',
  component: FinanceManagerListComponent,
  resolve: {
    data: FinanceManagerResolver
  }
},
{path: 'view-finance-manager/:id', component: ViewFinanceManagerComponent ,
  resolve: {
    fm: FinanceManagerViewResolver
  }
},
{path: 'edit-finance-manager/:id', component: EditFinanceManagerComponent },
{path: 'edit-finance-manager-account/:id', component: EditFinanceManagerAccountComponent },
 {
    path: 'project-manager-dashboard/:id',
    component: ProjectManagerDashboardComponent,
    resolve: {
        pmData: ProjectManagerDashboardResolver
    }
  },
  {
  path: 'finance-manager-dashboard',
  component: FinanceManagerDashboardComponent,
  resolve: {
    worklogs: FinanceDashboardResolver
  }
},
{path: 'create-admin-details', component: CreateAdminDetailsComponent },
{path: 'create-admin', component: CreateAdminComponent },
{
  path: 'admin-list',
  component: AdminListComponent,
  resolve: {
    data: AdminResolver
  }
},
{ path: 'edit-admin/:id', component: EditAdminComponent },
{ path: 'edit-admin-account/:id', component: EditAdminAccountComponent },
{path: 'view-admin/:id', component: ViewAdminComponent ,
  resolve: {
    admin: ViewAdminResolver
  }
},
{ path: '**', redirectTo: 'login' },

  

 
    ], withHashLocation()),
    provideHttpClient(),
    
     
  ]
}).catch(err => console.error(err));