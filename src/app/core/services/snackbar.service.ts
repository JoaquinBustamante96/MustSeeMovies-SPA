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
            panelClass: ['snackbar']
        });
    }

    movieCreated() {
        this.openSnackBar('Movie Created');
    }

    movieUpdated() {
        this.openSnackBar('Movie Updated')
    }

    movieEliminatedFromList(list: string) {
        this.openSnackBar('Removed from ' + list);
    }
    movieAddedToList(list: string) {
        this.openSnackBar('Added to ' + list);
    }

    error(){
        this.openSnackBar("there's been an error try again later");
    }

    errorCreatingOrUpdating() {
        this.openSnackBar('Error creating or updating movie try again later');
    }

    errorUpdatingPoster() {
        this.openSnackBar("Error updating Poster try again later");
    }

    errorConnectingWithServer() {
        this.openSnackBar("Server Error: can't connect to server");
    }

} 