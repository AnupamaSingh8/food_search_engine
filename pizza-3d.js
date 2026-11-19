// MiniGoogle 3D Interactive Pizza Engine powered by Three.js
class Pizza3DEngine {
  constructor(containerId) {
    if (typeof THREE === "undefined") {
      console.warn("Three.js not loaded yet or offline.");
      return;
    }
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.pizzaGroup = null;
    this.particles = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetRotationX = 0.45;
    this.targetRotationY = 0.4;
    this.isSpinning = false;
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    const width = this.container.clientWidth || 400;
    const height = this.container.clientHeight || 400;

    // 1. Scene setup
    this.scene = new THREE.Scene();

    // 2. Camera setup
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(0, 3.2, 5.2);

    // 3. WebGL Renderer with antialias and alpha
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.container.appendChild(this.renderer.domElement);

    // 4. Lighting
    this.setupLighting();

    // 5. Build 3D Pizza Model (Procedural High-Detail)
    this.buildPizzaModel();

    // 6. Floating Steam Particles
    this.buildSteamParticles();

    // 7. Event Listeners
    window.addEventListener("resize", () => this.onWindowResize());
    window.addEventListener("mousemove", (e) => this.onMouseMove(e));

    // Interactive click to spin
    this.container.addEventListener("click", () => this.triggerBurstSpin());

    // 8. Animation loop
    this.animate();
  }

  setupLighting() {
    // Ambient warm light
    const ambientLight = new THREE.AmbientLight(0xfff4e0, 0.9);
    this.scene.add(ambientLight);

    // Main Golden Key Light
    const keyLight = new THREE.DirectionalLight(0xffb84d, 1.8);
    keyLight.position.set(4, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    this.scene.add(keyLight);

    // Rim / Back light for crisp 3D outline
    const rimLight = new THREE.PointLight(0xff4422, 2.2, 12);
    rimLight.position.set(-3, 3, -3);
    this.scene.add(rimLight);

    // Bottom bounce light
    const fillLight = new THREE.PointLight(0xffd700, 1.2, 8);
    fillLight.position.set(0, -2, 2);
    this.scene.add(fillLight);
  }

  buildPizzaModel() {
    this.pizzaGroup = new THREE.Group();

    // Pizza parameters
    const radius = 2.0;
    const crustThickness = 0.22;
    const crustHeight = 0.28;

    // 1. Crust Base & Rim (Warm Golden-Brown Sourdough)
    const crustMat = new THREE.MeshStandardMaterial({
      color: 0xdf994a, // Baked crust tone
      roughness: 0.85,
      metalness: 0.05,
      bumpScale: 0.08
    });

    // Pizza Base Platter / Crust Disc
    const baseGeo = new THREE.CylinderGeometry(radius, radius * 0.95, crustThickness, 48);
    const baseMesh = new THREE.Mesh(baseGeo, crustMat);
    baseMesh.position.y = 0;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    this.pizzaGroup.add(baseMesh);

    // Raised Outer Dough Rim (Cornicione)
    const rimGeo = new THREE.TorusGeometry(radius * 0.93, 0.18, 18, 48);
    const rimMesh = new THREE.Mesh(rimGeo, crustMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = crustThickness * 0.6;
    rimMesh.castShadow = true;
    this.pizzaGroup.add(rimMesh);

    // 2. Rich San Marzano Tomato Sauce Layer
    const sauceMat = new THREE.MeshStandardMaterial({
      color: 0xba1d1d, // Deep tomato red
      roughness: 0.35,
      metalness: 0.1
    });
    const sauceGeo = new THREE.CylinderGeometry(radius * 0.89, radius * 0.89, 0.04, 48);
    const sauceMesh = new THREE.Mesh(sauceGeo, sauceMat);
    sauceMesh.position.y = crustThickness / 2 + 0.02;
    this.pizzaGroup.add(sauceMesh);

    // 3. Molten Mozzarella Cheese Layer (Glossy & Melted)
    const cheeseMat = new THREE.MeshStandardMaterial({
      color: 0xfff0a8, // Creamy melted cheese
      roughness: 0.25,
      metalness: 0.08,
      emissive: 0x332200,
      emissiveIntensity: 0.2
    });
    const cheeseGeo = new THREE.CylinderGeometry(radius * 0.86, radius * 0.86, 0.035, 48);
    const cheeseMesh = new THREE.Mesh(cheeseGeo, cheeseMat);
    cheeseMesh.position.y = crustThickness / 2 + 0.04;
    cheeseMesh.receiveShadow = true;
    this.pizzaGroup.add(cheeseMesh);

    // 4. Melted Cheese Drips & Pockets (Organic blobs)
    for (let i = 0; i < 9; i++) {
      const angle = (i / 9) * Math.PI * 2 + Math.random() * 0.3;
      const r = Math.random() * (radius * 0.68) + 0.2;
      const cheeseBlob = new THREE.Mesh(
        new THREE.SphereGeometry(0.12 + Math.random() * 0.08, 12, 12),
        new THREE.MeshStandardMaterial({
          color: 0xffea85,
          roughness: 0.3
        })
      );
      cheeseBlob.scale.set(1.4, 0.3, 1.2);
      cheeseBlob.position.set(Math.cos(angle) * r, crustThickness / 2 + 0.05, Math.sin(angle) * r);
      this.pizzaGroup.add(cheeseBlob);
    }

    // 5. Artisanal Pepperoni / Salami Slices
    const pepMat = new THREE.MeshStandardMaterial({
      color: 0x981d19, // Cured paprika red
      roughness: 0.5,
      metalness: 0.15
    });

    const pepPositions = [
      { r: 0.55, a: 0.3 },
      { r: 1.15, a: 0.9 },
      { r: 1.2, a: 2.1 },
      { r: 0.7, a: 3.2 },
      { r: 1.25, a: 4.1 },
      { r: 0.9, a: 5.3 },
      { r: 0.3, a: 5.8 }
    ];

    pepPositions.forEach(p => {
      const pepGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.03, 24);
      const pepMesh = new THREE.Mesh(pepGeo, pepMat);
      pepMesh.position.set(
        Math.cos(p.a) * p.r,
        crustThickness / 2 + 0.065,
        Math.sin(p.a) * p.r
      );
      pepMesh.rotation.y = Math.random() * Math.PI;
      pepMesh.rotation.z = (Math.random() - 0.5) * 0.1;
      pepMesh.castShadow = true;
      this.pizzaGroup.add(pepMesh);
    });

    // 6. Fresh Basil Leaves (Vibrant Herbal Green)
    const basilMat = new THREE.MeshStandardMaterial({
      color: 0x1faa3d,
      roughness: 0.4,
      side: THREE.DoubleSide
    });

    const basilPositions = [
      { r: 0.7, a: 1.5, rot: 0.4 },
      { r: 1.1, a: 3.6, rot: 1.2 },
      { r: 0.85, a: 4.8, rot: 2.1 },
      { r: 0.4, a: 2.7, rot: -0.5 }
    ];

    basilPositions.forEach(b => {
      const leafShape = new THREE.Shape();
      leafShape.moveTo(0, 0);
      leafShape.quadraticCurveTo(0.15, 0.18, 0, 0.36);
      leafShape.quadraticCurveTo(-0.15, 0.18, 0, 0);
      const leafGeo = new THREE.ShapeGeometry(leafShape);
      const leafMesh = new THREE.Mesh(leafGeo, basilMat);
      leafMesh.rotation.x = -Math.PI / 2 + 0.1;
      leafMesh.rotation.z = b.rot;
      leafMesh.position.set(
        Math.cos(b.a) * b.r,
        crustThickness / 2 + 0.08,
        Math.sin(b.a) * b.r
      );
      this.pizzaGroup.add(leafMesh);
    });

    // 7. Kalamata Black Olives (Torus rings)
    const oliveMat = new THREE.MeshStandardMaterial({
      color: 0x1b1c1e, // Deep olive black
      roughness: 0.35
    });

    for (let k = 0; k < 6; k++) {
      const angle = (k / 6) * Math.PI * 2 + 0.5;
      const r = 0.6 + Math.random() * 0.6;
      const oliveGeo = new THREE.TorusGeometry(0.08, 0.04, 10, 18);
      const oliveMesh = new THREE.Mesh(oliveGeo, oliveMat);
      oliveMesh.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.4;
      oliveMesh.position.set(Math.cos(angle) * r, crustThickness / 2 + 0.07, Math.sin(angle) * r);
      this.pizzaGroup.add(oliveMesh);
    }

    // 8. Savory Herb Seasonings / Oregano Flakes
    const flakeMat = new THREE.MeshBasicMaterial({ color: 0x3d702d });
    for (let f = 0; f < 30; f++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * (radius * 0.8);
      const flake = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.005, 0.02), flakeMat);
      flake.position.set(Math.cos(angle) * r, crustThickness / 2 + 0.06, Math.sin(angle) * r);
      flake.rotation.y = Math.random() * Math.PI;
      this.pizzaGroup.add(flake);
    }

    // 9. Floating Pizza Stand / Neon Shadow Ring
    const shadowGeo = new THREE.RingGeometry(1.6, 2.3, 36);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = Math.PI / 2;
    shadowMesh.position.y = -0.55;
    this.pizzaGroup.add(shadowMesh);

    // Initial tilt & position
    this.pizzaGroup.position.y = 0.1;
    this.pizzaGroup.rotation.x = 0.48; // Attractive 3D perspective angle
    this.pizzaGroup.rotation.y = 0.3;
    this.scene.add(this.pizzaGroup);
  }

  buildSteamParticles() {
    const particleCount = 45;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const r = Math.random() * 1.5;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = 0.3 + Math.random() * 2.5; // Y position
      positions[i * 3 + 2] = Math.sin(angle) * r;
      speeds[i] = 0.008 + Math.random() * 0.015;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    this.particleSpeeds = speeds;

    const mat = new THREE.PointsMaterial({
      color: 0xffecd1,
      size: 0.065,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  onMouseMove(e) {
    const rect = this.container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize coordinates -1 to 1
    const normX = (x / rect.width) * 2 - 1;
    const normY = -(y / rect.height) * 2 + 1;

    // Gentle 3D target tilt
    this.targetRotationY = normX * 0.8 + 0.4;
    this.targetRotationX = -normY * 0.5 + 0.48;
  }

  triggerBurstSpin() {
    if (this.isSpinning) return;
    this.isSpinning = true;
    let spinVelocity = 0.28;

    const spinInterval = setInterval(() => {
      this.pizzaGroup.rotation.y += spinVelocity;
      spinVelocity *= 0.94;
      if (spinVelocity < 0.005) {
        clearInterval(spinInterval);
        this.isSpinning = false;
      }
    }, 16);
  }

  onWindowResize() {
    if (!this.container) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();

    if (this.pizzaGroup) {
      // Smooth lerp towards mouse target rotation
      if (!this.isSpinning) {
        this.pizzaGroup.rotation.y += (this.targetRotationY - this.pizzaGroup.rotation.y) * 0.06;
        this.pizzaGroup.rotation.x += (this.targetRotationX - this.pizzaGroup.rotation.x) * 0.06;
        // Idle gentle float oscillation
        this.pizzaGroup.position.y = 0.1 + Math.sin(Date.now() * 0.002) * 0.08;
      }
    }

    // Animate steam particles rising
    if (this.particles) {
      const positions = this.particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3 + 1] += this.particleSpeeds[i];
        if (positions[i * 3 + 1] > 3.2) {
          positions[i * 3 + 1] = 0.2;
          const r = Math.random() * 1.4;
          const angle = Math.random() * Math.PI * 2;
          positions[i * 3] = Math.cos(angle) * r;
          positions[i * 3 + 2] = Math.sin(angle) * r;
        }
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Global initialization with resilient CDN loader
window.addEventListener("DOMContentLoaded", () => {
  let attempts = 0;
  const initEngine = () => {
    if (document.getElementById("pizza-canvas-container") && typeof THREE !== "undefined") {
      window.pizza3DInstance = new Pizza3DEngine("pizza-canvas-container");
    } else if (attempts < 10) {
      attempts++;
      setTimeout(initEngine, 200);
    }
  };
  initEngine();
});
