import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'trimoffset', pure: false })
export class TrimOffsetPipe implements PipeTransform {
  constructor() { }

  transform(content: string, count: number = 1, end: boolean = true) {
    if (end && content) {
      return content.substring(0, content.length - count);
    } else {
      return content.substring(count)
    }
  }
}
