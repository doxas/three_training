
// = 014 ======================================================================
// keep gazing
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
        let plane;
        let box;
        let directional;
        let ambient;

        // parameter
        let CAMERA_PARAMETER = {
            fovy: 60,
            aspect: width / height,
            near: 0.1,
            far: 50.0,
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
        renderer.shadowMap.enabled = true; // shadow enable
        targetDOM.appendChild(renderer.domElement);

        // initialize geometry
        material = new THREE.MeshPhongMaterial(MATERIAL_PARAMETER);
        // plane
        geometry = new THREE.PlaneGeometry(10.0, 10.0);
        plane = new THREE.Mesh(geometry, material);
        plane.castShadow = false;
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2.0;
        plane.position.set(0.0, -1.0, 0.0);
        // box
        geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
        box = new THREE.Mesh(geometry, material);
        box.castShadow = true;
        box.receiveShadow = true;
        box.position.set(2.0, 0.0, 0.0);

        // initialize light
        directional = new THREE.DirectionalLight(0xffffff);
        directional.position.set(1.0, 3.0, 0.0); // change light position @@@
        directional.castShadow = true;
        directional.shadow.mapSize.width = 1024;
        directional.shadow.mapSize.height = 1024;
        directional.shadow.camera.near = 0.1;
        directional.shadow.camera.far = 15.0;
        ambient = new THREE.AmbientLight(0xffffff, 0.2);

        // add to scene
        scene.add(directional);
        scene.add(ambient);
        scene.add(plane);
        scene.add(box);

        // variables @@@
        let sin;
        let cos;
        let count = 0;

        // rendering
        render();
        function render(){
            // counter increment @@@
            ++count;
            // generate position @@@
            sin = Math.sin(count * 0.02) * 2.0;
            cos = Math.cos(count * 0.05) * 1.5;
            box.position.x = cos;
            box.position.z = sin;
            box.rotation.y += 0.01;
            box.rotation.z += 0.01;
            // camera look at box @@@
            camera.lookAt(box.position);
            // rendering
            renderer.render(scene, camera);
            // animation
            if(run){requestAnimationFrame(render);}
        }
    }, false);
})();



