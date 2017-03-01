
// = 010 ======================================================================
// geometry group
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
        let box;
        let sphere;
        let cone;
        let torus;
        let group; // geometry group @@@
        let directional;
        let ambient;

        // parameter
        let CAMERA_PARAMETER = {
            fovy: 60,
            aspect: width / height,
            near: 0.1,
            far: 10.0,
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
        targetDOM.appendChild(renderer.domElement);

        // initialize geometry
        material = new THREE.MeshPhongMaterial(MATERIAL_PARAMETER);
        // box
        geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
        box = new THREE.Mesh(geometry, material);
        box.position.set(2.0, 0.0, 0.0); // default position @@@
        // sphere
        geometry = new THREE.SphereGeometry(0.5, 8, 6);
        sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(0.0, 0.0, 2.0); // default position @@@
        // cone
        geometry = new THREE.ConeGeometry(0.5, 1.0, 8);
        cone = new THREE.Mesh(geometry, material);
        cone.position.set(-2.0, 0.0, 0.0); // default position @@@
        // torus
        geometry = new THREE.TorusGeometry(0.5, 0.2, 8, 10);
        torus = new THREE.Mesh(geometry, material);
        torus.position.set(0.0, 0.0, -2.0); // default position @@@

        // geometry add to group @@@
        group = new THREE.Group();
        group.add(box);
        group.add(sphere);
        group.add(cone);
        group.add(torus);

        // group add to scene @@@
        scene.add(group);

        // initialize light
        directional = new THREE.DirectionalLight(0xffffff);
        ambient = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(directional);
        scene.add(ambient);

        // variable
        let count = 0;

        // rendering
        render();
        function render(){
            // increment counter
            count++;
            // theta
            let theta = Math.PI / 2.0;
            // group transform @@@
            group.rotation.x += 0.01;
            group.rotation.y += 0.01;
            // rendering
            renderer.render(scene, camera);
            // animation
            if(run){requestAnimationFrame(render);}
        }
    }, false);
})();



