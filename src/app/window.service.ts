import {Injectable} from '@angular/core';

function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable()
export class WindowService {
  constructor() {
    console.log('why not?');
  }

  get window(): any {
    return _window();
  }
}
