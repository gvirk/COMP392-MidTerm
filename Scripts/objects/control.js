/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        function Control(x_rotationSpeed, y_rotationSpeed, z_rotationSpeed) {
            this.x_rotationSpeed = x_rotationSpeed;
            this.y_rotationSpeed = y_rotationSpeed;
            this.z_rotationSpeed = z_rotationSpeed;
        }
        Control.prototype.resetPosition = function () {
            this.x_rotationSpeed = 0;
            this.y_rotationSpeed = 0;
            this.z_rotationSpeed = 0;
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map