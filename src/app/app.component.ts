import { afterNextRender, afterRender, Component } from '@angular/core';
import { Route, RouterOutlet } from '@angular/router';
import { ProductsComponent } from "./components/products/products.component";
import { ProductsService } from './services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ssr-rendering-example';
  ButtonState = 'Load Products';

  constructor(private router: Router) {
    afterNextRender(() => {
      //window.alert('afterNextRender is called ');
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
      });
      console.log('afterNextRender is called ')
    });

    afterRender(() => {
      console.log('after Render is called whenever there is change in buttonState ', this.ButtonState);
    })
  }

  StateChange() {
    this.ButtonState = "Changed"
    setTimeout(() => {
      this.ButtonState = "Default";
    }, 1000)
    //this.router.navigate(['/products']);
  }
}
