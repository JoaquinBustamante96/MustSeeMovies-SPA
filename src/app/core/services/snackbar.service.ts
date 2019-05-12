import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';


@Injectable({
    providedIn: 'root'
})
export class snackbar {

    constructor(private snackBar: MatSnackBar) { }

    openSnackBar(message: string, duration: number = 3000) {
        this.snackBar.open(message, 'close', {
            duration: duration,
        });
    }

    movieCreated(){
        this.openSnackBar('Movie Created');
    }

    movieUpdated(){
        this.openSnackBar('Movie Updated')
    }

    errorCreatingOrUpdating(){
        this.openSnackBar('Error creating or updating movie try again later');
    }
    
    errorUpdatingPoster(){
        this.openSnackBar("Error updating Poster try again later");
    }

} 