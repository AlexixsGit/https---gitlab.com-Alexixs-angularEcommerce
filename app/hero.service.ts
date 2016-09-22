import {Injectable} from '@angular/core';
import {HEROES} from './mock-heroes';
import {Hero} from './hero';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {

    private heroesUrl = 'app/heroes';


    constructor(private http: Http) { }


    //Get heroes and return them as a promise
    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise().then(response => response.json().data)
            .catch(this.handleError);
    }

    //Get heroes slower than getHeroes
    //It takes two seconds for return them
    getHeroesSlowly() {
        return new Promise<Hero[]>(resolve => setTimeout(() => resolve(HEROES), 2000));
    }

    //Get hero by id
    getHero(id: number) {
        return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
    }

    //Add or update a hero
    save(hero: Hero): Promise<Hero> {
        if (hero.id) {
            return this.put(hero);
        }
        return this.post(hero);
    }

    //Delete a hero
    delete(hero: Hero) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.heroesUrl}/${hero.id}`;

        return this.http.delete(url, headers)
            .toPromise().catch(this.handleError);
    }

    //Handle an error
    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    //Insert new hero
    private post(hero: Hero): Promise<Hero> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');


        return this.http.post(this.heroesUrl, JSON.stringify(hero), { headers: headers })
            .toPromise().then(res => res.json().data)
            .catch(this.handleError);
    }

    //Update a hero
    private put(hero: Hero) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.heroesUrl}/${hero.id}`;

        return this.http.put(url, JSON.stringify(hero), { headers: headers })
            .toPromise().then(() => hero)
            .catch(this.handleError);
    }




}
