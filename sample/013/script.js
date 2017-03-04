
// = 013 ======================================================================
// ortho camera
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
        let sphere;
        let cone;
        let torus;
        let group;
        let directional;
        let ambient;

        // parameter @@@
        let CAMERA_PARAMETER = {
            fovy: 60,
            aspect: width / height,
            left: -(width / height) * 5.0,
            right: (width / height) * 5.0,
            top: 5.0,
            bottom: -5.0,
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
        camera = new THREE.OrthographicCamera(
            CAMERA_PARAMETER.left,
            CAMERA_PARAMETER.right,
            CAMERA_PARAMETER.top,
            CAMERA_PARAMETER.bottom,
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
        // sphere
        geometry = new THREE.SphereGeometry(0.5, 8, 6);
        sphere = new THREE.Mesh(geometry, material);
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        sphere.position.set(0.0, 0.0, 2.0);
        // cone
        geometry = new THREE.ConeGeometry(0.5, 1.0, 8);
        cone = new THREE.Mesh(geometry, material);
        cone.castShadow = true;
        cone.receiveShadow = true;
        cone.position.set(-2.0, 0.0, 0.0);
        // torus
        geometry = new THREE.TorusGeometry(0.5, 0.2, 8, 10);
        torus = new THREE.Mesh(geometry, material);
        torus.castShadow = true;
        torus.receiveShadow = true;
        torus.position.set(0.0, 0.0, -2.0);

        // initialize light
        directional = new THREE.DirectionalLight(0xffffff);
        directional.position.set(3.0, 3.0, 3.0);
        directional.castShadow = true;
        directional.shadow.mapSize.width = 1024;
        directional.shadow.mapSize.height = 1024;
        directional.shadow.camera.near = 0.1;
        directional.shadow.camera.far = 15.0;
        ambient = new THREE.AmbientLight(0xffffff, 0.2);

        // geometry add to group
        group = new THREE.Group();
        group.add(box);
        group.add(sphere);
        group.add(cone);
        group.add(torus);

        // add to scene
        scene.add(directional);
        scene.add(ambient);
        scene.add(plane);
        scene.add(group);

        // rendering
        render();
        function render(){
            // group rotation
            group.rotation.y += 0.01;
            // rendering
            renderer.render(scene, camera);
            // animation
            if(run){requestAnimationFrame(render);}
        }
    }, false);
})();



