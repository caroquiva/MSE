import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name:'filter'
})

export class FiltersByPipes implements PipeTransform{

    transform(value: any, arg: any): any{
        const result = [];
        for(const data of value){
            if(data.name.indexOf(arg) > -1){
                result.push(data);
            }
        }
        return result;
    }
}
