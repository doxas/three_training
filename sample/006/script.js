
// = 006 ======================================================================
// phong shading
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
        let renderer;
        let geometry;
        let material;
        let box;
        let directional; // directional light
        let ambient;     // ambient light

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
        // change material parameter
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

        // initialize renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(RENDERER_PARAMETER.clearColor));
        renderer.setSize(RENDERER_PARAMETER.width, RENDERER_PARAMETER.height);
        targetDOM.appendChild(renderer.domElement);

        // initialize geometry
        geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
        // change mesh type @@@
        material = new THREE.MeshPhongMaterial(MATERIAL_PARAMETER);
        box = new THREE.Mesh(geometry, material);
        scene.add(box);

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
            // math
            let s = Math.sin(count * 0.05);
            let c = Math.cos(count * 0.05);
            // translate box
            box.position.x = c;
            box.position.z = s;
            // rotate box
            box.rotation.x += 0.01;
            box.rotation.y += 0.01;
            // rendering
            renderer.render(scene, camera);
            // animation
            if(run){requestAnimationFrame(render);}
        }
    }, false);
})();



