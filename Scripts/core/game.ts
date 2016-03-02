/// <reference path="_reference.ts"/>
/**
 * @author: Gursharnbir Singh
 * @midterm-comp392
 */

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
import CScreen = config.Screen;

import CameraHelper = THREE.CameraHelper;

//Custom Game Objects
import gameObject = objects.gameObject;

// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (() => {

    // declare game objects
    var scene: Scene = new Scene();
    var renderer: Renderer;
    var camera: PerspectiveCamera;
    var control: Control;
    var gui: GUI;
    var stats: Stats;
    var axes: AxisHelper;
    var spotLightHelper: CameraHelper;
    var ambientLight: AmbientLight;
    var spotLight: SpotLight;
    
    //cube variables
    var planeGeometry: PlaneGeometry;
    var cubeGeometry: CubeGeometry;
    var downcubeGeometry: CubeGeometry;
    var midcubeGeometry: CubeGeometry;
    var topcubeGeometry: CubeGeometry;
    var upperTopcubeGeometry: CubeGeometry;
    var CNcubeGeometry: CubeGeometry;
    
    
    //material
    var planeMaterial: LambertMaterial;
    var CubeMaterial: LambertMaterial;
    var downMaterial: LambertMaterial;
    var midMaterial: LambertMaterial;
    var topMaterial: LambertMaterial;
    var upperTopMaterial: LambertMaterial;
    var CNcubeMaterial: LambertMaterial;
    
    //mesh
    var plane: Mesh;
    var Cube :Mesh;
    var down:Mesh;
    var mid:Mesh;
    var top :Mesh;
    var upperTop :Mesh;
    var CN :Mesh;
    

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
        planeMaterial = new LambertMaterial({map: THREE.ImageUtils.loadTexture("img/base.jpg")});
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
        downMaterial = new LambertMaterial({map: THREE.ImageUtils.loadTexture("img/stone.jpg")});
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
        midMaterial = new LambertMaterial({map: THREE.ImageUtils.loadTexture("img/wall.jpg")});
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
        CNcubeMaterial = new LambertMaterial({map: THREE.ImageUtils.loadTexture("img/stone.jpg")});
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
        topMaterial = new LambertMaterial({map: THREE.ImageUtils.loadTexture("img/brick.jpg")});
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
function addControl(controlObject: Control): void {
       
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
   
function gameLoop(): void {
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
    function setupRenderer(): void {
        renderer = new Renderer();
        renderer.setClearColor(0x404040, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }

    // Setup main camera for the scene
    function setupCamera(): void {
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
    }

})();

