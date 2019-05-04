import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie } from '@app/core/models';
import { imgSizeValidatorValidator } from '@app/shared/validators/imgSizeValidator.directive';

export class MovieFormBuilder {

    private movieForm: FormGroup;
    private movieInfo: FormGroup;
    private movieLinks: FormGroup;
    private formbuilder: FormBuilder;
    private name = [];
    private genre = [];
    private director = [];
    private storyline = '';
    private releaseDate = '';
    private language = '';
    private country = '';
    private artMovement = '';
    private runtime = '';
    private color = true;
    private sound = true;
    private poster: File;
    private youtubeId = '';
    private imdb = '';

    constructor(fomrbuilder) {
        this.formbuilder = fomrbuilder;
    }

    build() {
        this.movieForm = this.formbuilder.group({
            poster: [this.poster, [Validators.required, imgSizeValidatorValidator(120000)]],
        });

        this.movieInfo = this.formbuilder.group({
            name: [this.name, Validators.required],
            genre: [this.genre, Validators.required],
            director: [this.director, Validators.required],
            storyline: [this.storyline, [Validators.required]],
            releaseDate: [this.releaseDate, Validators.required],
            language: [this.language, Validators.required],
            artMovement: [this.artMovement],
            runtime: [this.runtime, [Validators.required, Validators.maxLength(5)]],
            color: [this.color],
            sound: [this.sound],
            country: [this.country, Validators.required],
            movieLinks: this.formbuilder.group({
                youtubeId: [this.youtubeId],
                imdb: [this.imdb]
            })
        })
        this.movieForm.setControl('movieInfo', this.movieInfo);

        return this.movieForm;
    }

    setMovie(movie: Movie) {
        this.name = movie.name;
        this.genre = movie.genre;
        this.director = movie.director;
        this.storyline = movie.storyline;
        this.releaseDate = movie.releaseDate;
        this.language = movie.language;
        this.country = movie.country;
        this.runtime = movie.runtime;
        if (movie.artMovement) {
            this.artMovement = movie.artMovement;
        }
        this.color = movie.color;
        this.sound = movie.sound;

        if (movie.movieLinks) {
            if (movie.movieLinks.youtubeId) {
                this.youtubeId = movie.movieLinks.youtubeId;
            }
            if (movie.movieLinks.imdb) {
                this.imdb = movie.movieLinks.imdb;
            }
        }

        return this;
    }

    get movieInfoGroup(): FormGroup {
        return this.movieInfo;
    }

    get LinksFormGroup(): FormGroup {
        return this.movieForm.controls.movieLinks as FormGroup;
    }

}