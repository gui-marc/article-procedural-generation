<script>
  import { onMount } from 'svelte';

  let NOISE_PARAMETERS = {
    seed: 2000,
    scale: 159,
    octaves: 8,
    persistence: 0.75,
    lacunarity: 1.75,
    exponentiation: 4,
    height: 70
  };

  let PARAMETERS = {
    size: 100,
    resolution: 128,
    wireframe: false,
    color: 0xffffff
  };

  onMount(async () => {
    const THREE = await import('three');
    const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
    const noise = (await import('./noise')).default;

    console.log({ noise });

    const canvas = document.getElementById('game-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
    const controls = new OrbitControls(camera, canvas);

    const terrain = new THREE.Mesh(
      new THREE.PlaneGeometry(
        PARAMETERS.size,
        PARAMETERS.size,
        PARAMETERS.resolution,
        PARAMETERS.resolution
      ),
      new THREE.MeshStandardMaterial({
        wireframe: PARAMETERS.wireframe,
        color: PARAMETERS.color,
        side: THREE.FrontSide
      })
    );

    const initControls = () => {
      controls.autoRotate = true;
      controls.rotateSpeed = 0.1;
    };

    const initTerrain = () => {
      terrain.castShadow = true;
      terrain.receiveShadow = true;
      terrain.rotation.x = -Math.PI / 2;
      scene.add(terrain);
    };

    const initLights = () => {
      let light = new THREE.DirectionalLight(0x808080, 1);
      light.position.set(-100, 100, -100);
      light.target.position.set(0, 0, 0);
      light.castShadow = true;
      scene.add(light);

      light = new THREE.AmbientLight(0x404040, 1);
      scene.add(light);
    };

    const initRenderer = () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
    };

    const initCamera = () => {
      camera.position.set(25, 25, 25);
      camera.lookAt(0, 0, 0);
    };

    const update = () => {
      renderer.render(scene, camera);
      controls.update();
      requestAnimationFrame(update);
    };

    const generateTerrain = () => {
      const positions = terrain.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);

        positions.setZ(i, noise(x, y, NOISE_PARAMETERS));
      }
    };

    const updateTerrain = () => {
      terrain.geometry = new THREE.PlaneGeometry(
        PARAMETERS.size,
        PARAMETERS.size,
        PARAMETERS.resolution,
        PARAMETERS.resolution
      );
      terrain.material = new THREE.MeshStandardMaterial({
        wireframe: PARAMETERS.wireframe,
        color: PARAMETERS.color,
        side: THREE.FrontSide
      });

      generateTerrain();
      terrain.geometry.computeVertexNormals();
      terrain.geometry.attributes.position.needsUpdate = true;
      terrain.geometry.attributes.normal.needsUpdate = true;
    };

    updateTerrain();
    initControls();
    initTerrain();
    initLights();
    initRenderer();
    initCamera();
    update();
  });
</script>

<canvas id="game-canvas" />
