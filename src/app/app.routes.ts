import { Routes } from '@angular/router';
import { MultiplicationTableComponent } from './multiplication-table/multiplication-table.component';
import { ShowBetterScoresComponent } from './show-better-scores/show-better-scores.component';

export const routes: Routes = [
  { path: 'multiplication-tables', component: MultiplicationTableComponent },
  { path: 'better-scores/:type', component: ShowBetterScoresComponent}
];
