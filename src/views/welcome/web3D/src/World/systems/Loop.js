import { Clock } from "three";
const clock = new Clock();

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();
      // render a frame
      this.renderer.render(this.scene, this.camera);
    });
    // setInterval(() => {
    //   if (this.updatables.length > 0) {
    //     console.log("updatables is not empty");
    //   }
    // }, 1000);
  }

  stop() {
    console.log("Stopping the loop===================================>");
    this.renderer.setAnimationLoop(null);
    this.updatables.length = 0;
  }

  tick() {
    // only call the getDelta function once per frame!
    const delta = clock.getDelta();

    for (const object of this.updatables) {
      object.tick(delta);
    }
  }
}

export { Loop };
