import { NewsComponent } from './news/news.component';
import { CarouselComponent } from './carousel/carousel.component';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*Configure routes here*/
const routes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'faqs', component: FaqComponent},
    {path: 'carousel', component: CarouselComponent},
    {path: 'news', component: NewsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [FaqComponent];
