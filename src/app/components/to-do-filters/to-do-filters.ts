import {Component, Inject, OnInit, signal} from '@angular/core';
import {Filter, TASK_STATUS_LIST} from '../../data/task';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-to-do-filters',
  templateUrl: './to-do-filters.html',
  styleUrl: './to-do-filters.scss',
})
export class ToDoFilters implements OnInit {

  filters = signal<Filter[]>(TASK_STATUS_LIST);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.getQueryFilters();
  }

  toggleFilter(filter: Filter) {
    this.filters.update(()=> this.filters().map(
        item => {
          if (item.id === filter.id) {
            item.selected = !item.selected;
          }
          return item;
        }
      )
    );

    this.setQueryFilters();
  }

  isActiveFilters() {
    return this.filters().filter(item => item.selected).length;
  }

  clearFilters() {
    this.filters.set([...this.filters().map(item => {
      item.selected = false;
      return item;
    })]);
    this.setQueryFilters();
  }

  setQueryFilters() {
    let queryFilters: string[] = [];
    this.filters().forEach((filter) => {if (filter.selected) {queryFilters = [...queryFilters, filter.id]}})
    this.router.navigate([], {queryParams: {filters: queryFilters}});
  }

  getQueryFilters() {
    const params = this.route.snapshot.queryParams;
    const queryFilters: string[] = params["filters"];

    if (queryFilters) {
      this.filters().map(
        item => {
          if (queryFilters.includes(item.id)) {
            item.selected = true;
          }
          return item;
        }
      );
    }
  }
}
