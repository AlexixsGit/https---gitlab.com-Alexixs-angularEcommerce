import {Component, Input, OnInit, OnDestroy, EventEmitter, Output} from '@angular/core';
import {Hero} from './hero';
import {HeroService} from './hero.service';
//Import ActivatedRouter service
import {ActivatedRoute} from '@angular/router';


@Component({
    selector: 'my-hero-detail',
    templateUrl: 'app/hero-detail.component.html',
    styleUrls: ['app/hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit, OnDestroy {
    @Input()
    hero: Hero;

    @Output()
    close = new EventEmitter();

    error: any;
    sub: any;
    navigated = false; // true if navigated here

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['id'] !== undefined) {
                let id = +params['id'];
                this.heroService.getHero(id).then(hero => this.hero = hero);
                this.navigated = true;
            } else {
                this.navigated = false;
                this.hero = new Hero();
            }
        })
    }

    save() {
        this.heroService.save(this.hero)
            .then(hero => {
                this.hero = hero;
                this.goBack(this.hero);
            }).catch(error => this.error = error);
    }

    goBack(savedHero: Hero = null) {
        this.close.emit(savedHero);
        if (this.navigated) {
            window.history.back();
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}