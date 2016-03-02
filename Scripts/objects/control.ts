/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES
        public points: objects.Point[];
        public mesh: Object3D;
        public x_rotationSpeed: number;
        public y_rotationSpeed: number;
        public z_rotationSpeed: number;
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
       constructor(x_rotationSpeed: number, y_rotationSpeed: number, z_rotationSpeed: number) {
            this.x_rotationSpeed = x_rotationSpeed;
            this.y_rotationSpeed = y_rotationSpeed;
            this.z_rotationSpeed = z_rotationSpeed;
    }
    public resetPosition(): void { 
             
        this.x_rotationSpeed = 0;
        this.y_rotationSpeed= 0;
        this.z_rotationSpeed = 0;
         }  
}
}
