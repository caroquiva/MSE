/**
 * @author Carolina Quintero Valencia
 * 
 * Muestra todas las casas que hay con la cantidad de miembros que hay
 * en cada una
 */
import { Component, Input, OnInit } from "@angular/core";
import { ApiService } from "../services/api-services.service";

@Component({
    selector: 'app-houses',
    templateUrl: 'houses.component.html',
    styleUrls: ['houses.component.css']
})

export class HousesComponent implements OnInit{

houseMagic: any[]=[]; 
listHouse: any[]=[];
count: any[]=[];
listCount: any[]=[];

    constructor(    
        private api: ApiService
    ){
       
    }

    ngOnInit(){
        this.getHousesMembers()
        }
    /**
     * se hace llamado al servicio api, para obtener el nombre de cada casa y
     * los nombres de los miembros que pertenen a ella
     */
    getHousesMembers(){
        this.api.getAllHouse().subscribe(data =>{
    
            data.forEach(element => {
                this.houseMagic.push(
                    {
                    name: element.name,
                    house: element.house
                }
            )         
            });
        this.asignarList();
        
        });
    }
    /**
     * se hace una copia de la lista para poder ser comparada con los nombres
     * y realizar el conteo de los miembros que pertenecen
     */
    asignarList(){
        this.houseMagic.forEach(element=>{
            if(!this.listHouse.includes(element.house)){
                this.listHouse.push(element.house)
            }       
        })
        this.countMembers()
    }
    /**
     * se realiza conteo de cuantos miembros pertenen a una casa en especifico
     */
    countMembers(){
        let i=0;
        this.listHouse.forEach(element=>{
            let j=1;
            this.houseMagic.forEach(element2=>{
            
                if(element2.house === element){
                    this.count[i]=j++;
            }
            })
            this.listCount.push({
                house: element,
                count: this.count[i]
            })
            i++;
        })
    }


}