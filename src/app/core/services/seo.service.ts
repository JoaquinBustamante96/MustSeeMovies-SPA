import { Meta } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { MinimumMovie } from '../../shared/models';

@Injectable({
    providedIn: 'root'
})
export class SEOService {

    constructor(private meta: Meta) { }

    addTag(name: string, content: string) {
        this.meta.addTag({ name: name, content: content });
    }

    addTagsForMovie(movie: MinimumMovie) {
        this.meta.addTag({ name: 'og:title', content: movie.name[0] });
        this.meta.addTag({ name: 'og:image', content: movie.getposterUrl() });

        this.meta.addTag({ name: 'twitter:title', content: movie.name[0] });
        this.meta.addTag({ name: 'twitter:image', content: movie.getposterUrl() });
    }

} 