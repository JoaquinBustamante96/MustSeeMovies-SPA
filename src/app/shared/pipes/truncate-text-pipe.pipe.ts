import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateTextPipe'
})
export class TruncateTextPipe implements PipeTransform {

  transform(text: any, maxLength?: any): any {
    if (text && text.length > maxLength) {
      text = text.substring(0, maxLength) + "...";
    }
    return text;
  
  }

}
