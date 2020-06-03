import { Injectable } from '@nestjs/common';
import { ApiModel } from '@angular-libs/api-model';

@Injectable()
export class AppService {
  getData(): ApiModel[] {
    return [
      {
        id: 1,
        name: "Joe Bloggs",
        address: "Some Address",
        postcode: "111558",
        country: "United Kingdom"
      },
      {
        id: 2,
        name: "Billy George",
        address: "Ghost street",
        postcode: "254875",
        country: "United States"
      },
      {
        id: 3,
        name:  "Linda daine",
        address: "Ghost Road",
        postcode: "ad157ed",
        country: "United Kingdom"
      }
    ]
  }
}
