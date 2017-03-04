
// = 011 ======================================================================
// drop shadow
// ============================================================================

(() => {
    window.addEventListener('load', () => {
        // variables
        let run = true;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let targetDOM = document.getElementById('webgl');

        // event
        window.addEventListener('keydown', (eve) => {
            run = eve.keyCode !== 27;
        }, false);

        // three.js class
        let scene;
        let camera;
        let controls;
        let renderer;
        let geometry;
        let material;
        let plane; // plane geometry @@@
        let box;
        let sphere;
        let cone;
        let torus;
        let group;
        let directional;
        let ambient;
        let helper // helper geometry @@@

        // parameter
        let CAMERA_PARAMETER = {
            fovy: 60,
            aspect: width / height,
            near: 0.1,
            far: 50.0, // change far @@@
            x: 0.0,
            y: 2.0,
            z: 5.0,
            lookAt: new THREE.Vector3(0.0, 0.0, 0.0)
        };
        let RENDERER_PARAMETER = {
            clearColor: 0x333333,
            width: width,
            height: height
        };
        // material parameter
        let MATERIAL_PARAMETER = {
            color: 0xff9933,
            specular: 0xffffff
        };

        // initialize scene
        scene = new THREE.Scene();

        // initialize camera
        camera = new THREE.PerspectiveCamera(
            CAMERA_PARAMETER.fovy,
            CAMERA_PARAMETER.aspect,
            CAMERA_PARAMETER.near,
            CAMERA_PARAMETER.far
        );
        camera.position.x = CAMERA_PARAMETER.x;
        camera.position.y = CAMERA_PARAMETER.y;
        camera.position.z = CAMERA_PARAMETER.z;
        camera.lookAt(CAMERA_PARAMETER.lookAt);

        // initialize controls
        controls = new THREE.OrbitControls(camera, render.domElement);

        // initialize renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(RENDERER_PARAMETER.clearColor));
        renderer.setSize(RENDERER_PARAMETER.width, RENDERER_PARAMETER.height);
        renderer.shadowMap.enabled = true; // shadow enable @@@
        targetDOM.appendChild(renderer.domElement);

        // initialize geometry
        material = new THREE.MeshPhongMaterial(MATERIAL_PARAMETER);
        // plane @@@
        geometry = new THREE.PlaneGeometry(10.0, 10.0);
        plane = new THREE.Mesh(geometry, material);
        plane.castShadow = false;   // none cast shadow @@@
        plane.receiveShadow = true; // receive shadow @@@
        plane.rotation.x = -Math.PI / 2.0;
        plane.position.set(0.0, -1.0, 0.0);
        // box
        geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
        box = new THREE.Mesh(geometry, material);
        box.castShadow = true;    // shadow @@@
        box.receiveShadow = true; // shadow @@@
        box.position.set(2.0, 0.0, 0.0);
        // sphere
        geometry = new THREE.SphereGeometry(0.5, 8, 6);
        sphere = new THREE.Mesh(geometry, material);
        sphere.castShadow = true;    // shadow @@@
        sphere.receiveShadow = true; // shadow @@@
        sphere.position.set(0.0, 0.0, 2.0);
        // cone
        geometry = new THREE.ConeGeometry(0.5, 1.0, 8);
        cone = new THREE.Mesh(geometry, material);
        cone.castShadow = true;    // shadow @@@
        cone.receiveShadow = true; // shadow @@@
        cone.position.set(-2.0, 0.0, 0.0);
        // torus
        geometry = new THREE.TorusGeometry(0.5, 0.2, 8, 10);
        torus = new THREE.Mesh(geometry, material);
        torus.castShadow = true;    // shadow @@@
        torus.receiveShadow = true; // shadow @@@
        torus.position.set(0.0, 0.0, -2.0);

        // initialize light
        directional = new THREE.DirectionalLight(0xffffff);
        directional.position.set(3.0, 3.0, 3.0);  // change light position @@@
        directional.castShadow = true;            // shadow enable @@@
        directional.shadow.mapSize.width = 1024;  // shadow map size @@@
        directional.shadow.mapSize.height = 1024; // shadow map size @@@
        directional.shadow.camera.near = 0.1;     // shadow camera near @@@
        directional.shadow.camera.far = 15.0;     // shadow camera far @@@
        ambient = new THREE.AmbientLight(0xffffff, 0.2);

        // helper @@@
        helper = new THREE.CameraHelper(directional.shadow.camera);

        // geometry add to group
        group = new THREE.Group();
        group.add(box);
        group.add(sphere);
        group.add(cone);
        group.add(torus);

        // add to scene @@@
        scene.add(directional);
        scene.add(ambient);
        scene.add(plane);
        scene.add(group);
        scene.add(helper);

        // rendering
        render();
        function render(){
            // group rotation @@@
            group.rotation.y += 0.01;
            // rendering
            renderer.render(scene, camera);
            // animation
            if(run){requestAnimationFrame(render);}
        }
    }, false);
})();



