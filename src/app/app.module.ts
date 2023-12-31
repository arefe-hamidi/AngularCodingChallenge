import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { OperationsComponent } from './operations/operations.component';
import { BasicSnackbarComponent } from './basic-snackbar/basic-snackbar.component';
import { MaterialModule } from './material.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OperationsComponent,
    BasicSnackbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [BasicSnackbarComponent],
})
export class AppModule {}
