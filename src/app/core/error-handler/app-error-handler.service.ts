import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(private router: Router) {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {
    let displayMessage = 'An error occurred.';

    if (!environment.production) {
      displayMessage += ' See console for details.';
    }

    console.error(displayMessage);

    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 401: // Unauthorized
        case 407: // Proxy authentication required
        case 511: // Network authentication required
         this.router.navigate(['']);
          break;
        default:
          break;
      }
    }

    super.handleError(error);
  }
}
