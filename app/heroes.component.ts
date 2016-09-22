import { Component, OnInit } from '@angular/core';
import {Hero} from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import {HeroService} from './hero.service';
import {Router} from '@angular/router';


@Component({
    selector: 'my-heroes',
    templateUrl: 'app/heroes.component.html',
    styleUrls: ['app/heroes.component.css'],
    directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
    heroes: Hero[];
    selectedHero: Hero;
    error: any;
    addingHero: boolean;

    constructor(
        private heroService: HeroService,
        private router: Router) { }

    onSelect(hero: Hero) {
        this.selectedHero = hero;
    }

    getHeroes() {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    ngOnInit() {
        this.getHeroes();
    }

    gotoDetail() {
        let link = ['/detail', this.selectedHero.id];
        this.router.navigate(link);
    }

    addHero() {
        this.addingHero = true;
        this.selectedHero = null;
    }

    close(savedHero: Hero) {
        this.addingHero = false;
        if (savedHero) {
            this.getHeroes();
        }
    }

    deleteHero(hero: Hero, event: any) {
        event.stopPropagation();

        this.heroService.delete(hero).then(res => {
            this.heroes = this.heroes.filter(h => h !== hero);
            if (this.selectedHero === hero) {
                this.selectedHero = null;
            }
        }).catch(error => this.error = error);
    }
}
