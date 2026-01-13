import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SidenavComponent } from 'src/app/components/sidenav/sidenav.component';

@NgModule({
  declarations: [DashboardComponent, HomeComponent,
    HeaderComponent,
    SidenavComponent
  ],
  imports: [CommonModule, DashboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
MatFormFieldModule,
MatInputModule,


  ]
})
export class DashboardModule {}
