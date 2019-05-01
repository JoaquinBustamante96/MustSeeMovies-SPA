import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitArray'
})
export class SplitArrayPipe implements PipeTransform {

  transform(values: string[], separator: string = " | "): any {
    let splittedValues = values[0];

    for (let i = 1; i < values.length; i++) {
      splittedValues = splittedValues + separator + values[i];
    }

    return splittedValues;
  }

}
