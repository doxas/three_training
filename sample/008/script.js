
// = 008 ======================================================================
// geometry(object) type
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
        let materialPoint; // point material @@@
        let boxSurface;    // surface mesh @@@
        let boxLine;       // line object @@@
        let boxPoint;      // point object @@@
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
        // material parameter of point @@@
        let MATERIAL_PARAMETER_POINT = {
            color: 0xff9933,
            size: 0.1
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

        // initialize geometry @@@
        geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
        material = new THREE.MeshPhongMaterial(MATERIAL_PARAMETER);
        materialPoint = new THREE.PointsMaterial(MATERIAL_PARAMETER_POINT);
        boxSurface = new THREE.Mesh(geometry, material);
        boxLine    = new THREE.Line(geometry, material);
        boxPoint   = new THREE.Points(geometry, materialPoint);
        // object add to scene @@@
        scene.add(boxSurface);
        scene.add(boxLine);
        scene.add(boxPoint);

        // initialize light
        directional = new THREE.DirectionalLight(0xffffff);
        ambient = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(directional);
        scene.add(ambient);

        // variable
        let count = 0;
        let rad = Math.PI * 2.0 / 3.0;

        // rendering
        render();
        function render(){
            // increment counter
            count++;
            // move object @@@
            let s = Math.sin(count * 0.05) * 2.0;
            let c = Math.cos(count * 0.05) * 2.0;
            boxSurface.position.x = c;
            boxSurface.position.z = s;
            boxSurface.rotation.x += 0.01;
            boxSurface.rotation.y += 0.01;
            // line @@@
            s = Math.sin(rad + count * 0.05) * 2.0;
            c = Math.cos(rad + count * 0.05) * 2.0;
            boxLine.position.x = c;
            boxLine.position.z = s;
            boxLine.rotation.x += 0.01;
            boxLine.rotation.y += 0.01;
            // point @@@
            s = Math.sin(rad + rad + count * 0.05) * 2.0;
            c = Math.cos(rad + rad + count * 0.05) * 2.0;
            boxPoint.position.x = c;
            boxPoint.position.z = s;
            boxPoint.rotation.x += 0.01;
            boxPoint.rotation.y += 0.01;
            // rendering
            renderer.render(scene, camera);
            // animation
            if(run){requestAnimationFrame(render);}
        }
    }, false);
})();



