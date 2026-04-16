import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {Filter, TASK_STATUS_LIST} from '../../data/task';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-to-do-filters',
  templateUrl: './to-do-filters.html',
  styleUrl: './to-do-filters.scss',
})
export class ToDoFilters implements OnInit {

  filters = signal<Filter[]>(TASK_STATUS_LIST);

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.getQueryFilters();
  }

  toggleFilter(filter: Filter) {
    this.filters.update(()=> this.filters().map(
        item => {
          return item.id === filter.id
            ? { ...item, selected: !item.selected } // новый объект
            : item
        },
      ),
    );

    this.setQueryFilters();
  }

  isActiveFilters = computed<boolean>(()=> {
    return this.filters().filter(item => item.selected).length > 0;
  })

  clearFilters() {
    this.filters.set([...this.filters().map(item => {
      item.selected = false;
      return item;
    })]);
    this.setQueryFilters();
  }

  setQueryFilters() {
    const queryFilters = this.filters()
      .filter(filter => filter.selected)
      .map(filter => filter.id);
    this.router.navigate([], {queryParams: {filters: queryFilters}});
  }

  getQueryFilters() {
    const params = this.route.snapshot.queryParams;
    const rawFilters: string[] = params["filters"];
    const queryFilters = Array.isArray(rawFilters)
      ? rawFilters
      : rawFilters
        ? [rawFilters]
        : [];

    if (queryFilters) {
      this.filters.set([...this.filters().map(
        item => {
          if (queryFilters.includes(item.id)) {
            item.selected = true;
          }
          return item;
        },
      )])
    }
  }
}
