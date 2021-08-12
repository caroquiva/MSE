/**
 * @author Carolina Quintero Valencia
 * 
 * muestra la lista de los miembros al seleccionar la casa a la que pertenecen
 */
import { Component, Input, OnInit, Output } from "@angular/core";
import {Router} from "@angular/router";
import { HouseModel } from "src/models/entities/house-model";
import { ApiService } from "../services/api-services.service";
import {MatTableDataSource} from '@angular/material/table';


@Component({
    selector: 'app-list-members',
    templateUrl: 'list-members.component.html',
    styleUrls: ['list-members.component.css']
})

export class ListMembersComponent implements OnInit{

    @Output() member: HouseModel = new HouseModel();
    listHouse: any[]=[];
    listMembers: any[]=[];
    dataSource:MatTableDataSource<any>;
    displayedColumns: string[] = ['Picture','Name','Blood Status','Gender'];

    constructor(
        private api: ApiService
    ){
        this.dataSource=new MatTableDataSource<any>(this.listMembers);
    }

    ngOnInit(){
        this.getHouse()
    }
    /**
     * se hace llamado al servicio Api, en este caso la api que muestra todos los miembros  
     * y se asigna a una lista que solo tenga las casas sin que se repitan para que cada casa pueda
     * ser seleccionada y realizar la busqueda  
     */
    getHouse(){
        this.api.getAllHouse().subscribe(data =>{
        
            data.forEach(element => {
                
                if(!this.listHouse.includes(element.house)){
                this.listHouse.push(element.house)  
                this.member.house=element.house;           
                }        
            });
         });
    
    }
    /**
     * 
     * @param house 
     * @param condition 
     * 
     * esta funcion recibe el  nombre de una casa para ser buscada en la api, la cual
     * devuelve todos los miembros que pertenen a esa casa en especifico
     */
    loadMembers(house, condition=false){
        this.listMembers=[];
        if(condition){
            this.api.getHouse(house).subscribe(data =>{
                data.forEach(element => {
                    this.listMembers.push({
                        name: element.name,
                        house: element.house,
                        image: element.image,
                        gender: element.gender,
                        dateOfBirth: element.dateOfBirth,
                        eyeColor: element.eyeColour,
                        ancestry: element.ancestry
                    })
                });
            })
            this.dataSource=new MatTableDataSource<any>(this.listMembers);
        }
    }
    /**
     * 
     * @param event 
     * filtra los datos de la tabla por nombre
     */
    applyFilter(event: Event) {
        
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
        }
    }
    }
