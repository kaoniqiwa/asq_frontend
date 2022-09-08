import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { convertToChinaNum } from '../tools/tool';

@Pipe({ name: 'numtochina', pure: false })
export class NumToChinaPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(content: number) {
    return convertToChinaNum(content)
  }


}
