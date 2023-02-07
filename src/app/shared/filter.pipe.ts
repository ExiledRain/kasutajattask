import { Pipe, PipeTransform } from "@angular/core";
import { IKasutaja } from "./kasutaja/kasutaja.model";

@Pipe({
  name: 'nameFilter'
})
export class FilterPipe implements PipeTransform {
  transform(users: IKasutaja[], filterText: string) {
      if(users.length === 0 || filterText === '') {
        return users;
      } else {
        return users.filter((user) => {
          return user.name?.toLowerCase().includes(filterText.toLowerCase())
        })
      }
  }
}
