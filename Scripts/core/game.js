/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
var CScreen = config.Screen;
var CameraHelper = THREE.CameraHelper;
//Custom Game Objects
var gameObject = objects.gameObject;
// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (function () {
    // declare game objects
    var scene = new Scene();
    var renderer;
    var camera;
    var control;
    var gui;
    var stats;
    var axes;
    var spotLightHelper;
    var ambientLight;
    var spotLight;
    //cube variables
    var planeGeometry;
    var cubeGeometry;
    var downcubeGeometry;
    var midcubeGeometry;
    var topcubeGeometry;
    var upperTopcubeGeometry;
    var CNcubeGeometry;
    //material
    var planeMaterial;
    var CubeMaterial;
    var downMaterial;
    var midMaterial;
    var topMaterial;
    var upperTopMaterial;
    var CNcubeMaterial;
    //mesh
    var plane;
    var Cube;
    var down;
    var mid;
    var top;
    var upperTop;
    var CN;
    function init() {
        // Instantiate a new Scene object
        //scene = new Scene();
        setupRenderer(); // setup the default renderer
        setupCamera(); // setup the camera
        axes = new AxisHelper(15);
        axes.position.x = 0;
        axes.position.y = 0;
        axes.position.z = 0;
        scene.add(axes);
        console.log("Added Axis Helper");
        /* ENTER CODE HERE */
        ambientLight = new AmbientLight(0x090909);
        scene.add(ambientLight);
        console.log("Added an Ambient Light");
        //Spotlight for the scene
        spotLight = new SpotLight(0xffffff);
        spotLight.position.set(-40, 60, -10);
        spotLight.castShadow = true;
        scene.add(spotLight);
        console.log("Added a SpotLight Light");
        //added a plane in the scene
        planeGeometry = new PlaneGeometry(30, 35);
        planeMaterial = new LambertMaterial({ color: 0xFFFFFF });
        plane = new Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x = -0.5 * Math.PI;
        plane.rotation.z = -0.789;
        plane.position.x = 0;
        plane.position.y = 0;
        plane.position.z = 0;
        scene.add(plane);
        console.log("Added Plane Primitive");
        //tower base
        downcubeGeometry = new CubeGeometry(7, 7, 7);
        downMaterial = new LambertMaterial({ color: 0xff0000 });
        down = new Mesh(downcubeGeometry, downMaterial);
        down.castShadow = true;
        down.receiveShadow = true;
        down.position.x = 0;
        down.position.y = 0;
        down.position.z = 0;
        console.log("Added Base");
        scene.add(down);
        //tower mid
        midcubeGeometry = new CubeGeometry(2, 15, 2);
        midMaterial = new LambertMaterial({ color: 0xffffff });
        mid = new Mesh(midcubeGeometry, midMaterial);
        mid.castShadow = true;
        mid.receiveShadow = true;
        mid.position.x = 0;
        mid.position.y = 7;
        mid.position.z = 0;
        console.log("Added mid");
        scene.add(mid);
        mid.rotation.y = -100;
        //tower mid base
        CNcubeGeometry = new CubeGeometry(4, 2, 4);
        CNcubeMaterial = new LambertMaterial({ color: 0xff0000 });
        CN = new Mesh(CNcubeGeometry, CNcubeMaterial);
        CN.castShadow = true;
        CN.receiveShadow = true;
        CN.position.x = 0;
        CN.position.y = 15;
        CN.position.z = 0;
        console.log("Added mid base");
        scene.add(CN);
        //tower mid//tower base
        topcubeGeometry = new CubeGeometry(2, 2, 2);
        topMaterial = new LambertMaterial({ color: 0xffffff });
        top = new Mesh(topcubeGeometry, topMaterial);
        top.castShadow = true;
        top.receiveShadow = true;
        top.position.x = 0;
        top.position.y = 17;
        top.position.z = 0;
        console.log("Added top");
        scene.add(top);
        top.rotation.y = -100;
        // add controls
        gui = new GUI();
        control = new Control(0, 0, 0);
        addControl(control);
        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");
        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	
    }
    //Controls for user
    function addControl(controlObject) {
        var rotationFolder = gui.addFolder('Speed Control');
        rotationFolder.add(controlObject, 'y_rotationSpeed', 0, 0.3).listen();
        // rotationFolder.add(controlObject, 'resetPosition').name('Reset ');
        rotationFolder.open();
    }
    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }
    // Setup main game loop
    function gameLoop() {
        stats.update();
        //animation
        mid.rotation.y += control.y_rotationSpeed;
        top.rotation.y += control.y_rotationSpeed;
        CN.rotation.y += control.y_rotationSpeed;
        down.rotation.y += control.y_rotationSpeed;
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
        // render the scene
        renderer.render(scene, camera);
        //   updateCubes();
    }
    // Setup default renderer
    function setupRenderer() {
        renderer = new Renderer();
        renderer.setClearColor(0x404040, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }
    // Setup main camera for the scene
    function setupCamera() {
        camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 100);
        camera.position.x = 35.3;
        camera.position.y = 38.5;
        camera.position.z = -48.7;
        camera.rotation.set(-1.10305, 0.49742, -0.1396);
        camera.lookAt(new Vector3(0, 0, 0));
        console.log("Finished setting up Camera...");
    }
    window.onload = init;
    return {
        scene: scene
    };
})();
//# sourceMappingURL=game.js.map