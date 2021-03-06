import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from 'src/app/shared/helpers/fake-backend';

import { AppComponent }  from './app.component';

import { AlertComponent, FooterComponent, HeaderComponent, FullLayoutComponent } from 'src/app/shared/components';
import { JwtInterceptor, ErrorInterceptor} from 'src/app/shared/helpers';
import { LoginComponent } from 'src/app/login';
import { RegisterComponent } from 'src/app/register';
import { AppRoutingModule } from './app.routing';
import { SharedModule } from './shared/modules/shared.module';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        LoginComponent,
        RegisterComponent,
        FooterComponent,
        FullLayoutComponent,
        HeaderComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }