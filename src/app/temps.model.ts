export interface Temps {
    code: number;
    list: List[];
}

export interface List {
    main: Main;
}

export interface Main {
    temp_min: number;
    temp_max: number; 
}