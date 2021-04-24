export interface Address{

    houseNo:string;
    colony:string;
    city:string;
    state:string;
    pincode:number;

}

export interface Customer{

    id:number ;
    email:string ;
    password:string ;
    name:string;
    role:string;
    phone:string;
    address:Address;

    status:string;
    
}