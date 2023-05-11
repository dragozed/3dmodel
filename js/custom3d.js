function handleChange(item, set) {
  set ? (item.visible = true) : (item.visible = false);
}
function handleColor(color) {
  yacht.traverse((object) => {
    if (object.isMesh) {
      object.material.color.set(color);
    }
  });
  pruva.traverse((object) => {
    if (object.isMesh) {
      object.material.color.set(color);
    }
  });
}
//scene and camera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-1, 1.5, -2);
camera.lookAt(scene.position);
clock = new THREE.Clock();

//load models
var loader = new THREE.GLTFLoader();

loader.load(
  "models/yacht.glb",
  function (gltf) {
    yacht = gltf.scene;
    scene.add(yacht);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
loader.load(
  "models/gunespaneli.glb",
  function (gltf) {
    gunespaneli = gltf.scene;
    scene.add(gunespaneli);
    gunespaneli.visible = false;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
loader.load(
  "models/pruva.glb",
  function (gltf) {
    pruva = gltf.scene;
    scene.add(pruva);
    pruva.visible = false;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
loader.load(
  "models/kamaracami.glb",
  function (gltf) {
    kamaracami = gltf.scene;
    scene.add(kamaracami);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
loader.load(
  "models/camtavan.glb",
  function (gltf) {
    camtavan = gltf.scene;
    scene.add(camtavan);
    camtavan.visible = false;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI * 0.4;

//light
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
hemiLight.position.set(0, 30, 0);
scene.add(hemiLight);

//window resize check
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

//animate
function animate() {
  requestAnimationFrame(animate);
  //scene.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

function cameraPositionSet(pos) {
  camera.position.set(pos[0], pos[1], pos[2]);
  camera.lookAt(scene.position);
}

let selection = document.querySelectorAll(".selection");

selection.forEach((select) => {
  select.addEventListener("click", (e) => {
    let itemName = select.id.split("-")[0];
    let itemStatus = select.id.split("-")[1];
    itemName == "color"
      ? (handleColor(Number(itemStatus)),
        document.querySelectorAll(".color").forEach((e) => {
          e.classList.remove("selected");
        }))
      : (handleChange(this[itemName], itemStatus === "true"),
        document
          .getElementById(itemName + "-" + !(itemStatus === "true"))
          .classList.remove("selected"));

    select.classList.add("selected");
  });
});
