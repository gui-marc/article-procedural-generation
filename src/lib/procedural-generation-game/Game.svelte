<script>
  import { onMount } from 'svelte';
  import RangeSlider from '../RangeSlider.svelte';
  import Checkbox from '../Checkbox.svelte';

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
    wireframe: true,
    color: 0xffffff
  };

  let onUpdateParameters = () => {};

  function changeParameter(parameter, value) {
    PARAMETERS[parameter] = value;
    onUpdateParameters();
  }

  function changeNoiseParameter(parameter, value) {
    NOISE_PARAMETERS[parameter] = value;
    onUpdateParameters();
  }

  onMount(async () => {
    const THREE = await import('three');
    const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
    const noise = (await import('./noise')).default;

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

    onUpdateParameters = updateTerrain;

    updateTerrain();
    initControls();
    initTerrain();
    initLights();
    initRenderer();
    initCamera();
    update();
  });
</script>

<div class="game">
  <form class="controls">
    <p><b>Opções</b></p>

    <div class="inputs">
      <Checkbox
        label="Mostrar Estrutura em Arame"
        value={PARAMETERS.wireframe}
        onChange={(e) => changeParameter('wireframe', e.target.checked)}
      />

      <RangeSlider
        label="Tamanho do Mapa"
        onChange={(ev) => changeParameter('size', ev.target.value)}
        min="10"
        max="300"
        step="1"
        value={PARAMETERS.size}
      />

      <RangeSlider
        label="Resolução da Malha"
        onChange={(ev) => changeParameter('resolution', ev.target.value)}
        min="10"
        max="300"
        step="1"
        value={PARAMETERS.resolution}
      />
    </div>

    <p><b>Parâmetros Fractal Noise</b></p>

    <div class="inputs">
      <RangeSlider
        label="Escala"
        onChange={(ev) => changeNoiseParameter('scale', ev.target.value)}
        min="50"
        max="300"
        step="1"
        value={NOISE_PARAMETERS.scale}
      />

      <RangeSlider
        label="Oitavas"
        min="1"
        max="10"
        step="1"
        value={NOISE_PARAMETERS.octaves}
        onChange={(e) => changeNoiseParameter('octaves', e.target.value)}
      />

      <RangeSlider
        label="Persistência"
        min="0"
        max="1"
        step="0.01"
        value={NOISE_PARAMETERS.persistence}
        onChange={(e) => changeNoiseParameter('persistence', e.target.value)}
      />

      <RangeSlider
        label="Lacunaridade"
        min="0"
        max="3"
        step="0.1"
        value={NOISE_PARAMETERS.lacunarity}
        onChange={(e) => changeNoiseParameter('lacunarity', e.target.value)}
      />

      <RangeSlider
        label="Exponenciação"
        min="0"
        max="10"
        step="0.1"
        value={NOISE_PARAMETERS.exponentiation}
        onChange={(e) => changeNoiseParameter('exponentiation', e.target.value)}
      />

      <RangeSlider
        label="Altura"
        min="0"
        max="150"
        step="1"
        value={NOISE_PARAMETERS.height}
        onChange={(e) => changeNoiseParameter('height', e.target.value)}
      />
    </div>
  </form>
  <canvas id="game-canvas" />
</div>

<style>
  .game {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 0;
    margin-inline: auto;
  }

  .controls {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: calc(-275px - 1rem);
    max-width: var(--text-container-width);
    margin-inline: auto;
    background-color: var(--clr-background-ui);
    border: 1px solid var(--clr-border-ui);
    border-radius: var(--radii);
    padding: 1rem;
    width: 275px;
  }

  .controls .inputs {
    margin-top: 0.5rem;
    display: grid;
    gap: 0.5rem;
  }

  .controls p {
    font-size: 0.875rem;
  }

  .controls p:not(:first-child) {
    margin-top: 1rem;
  }

  #game-canvas {
    display: block;
    margin-inline: auto;
    margin-block: 2rem;
    border: 1px solid var(--clr-border-ui);
    border-radius: var(--radii);
    width: 100%;
    height: 500px;
  }
</style>
