import Vector from "../services/math/vector";
import FreezeBehavior from "../world/mousefollower/freezebehavior";
import CircleBehavior from "../world/mousefollower/circlebehavior";
import ParticleEffectBehavior from "../world/mousefollower/particleeffectbehavior";
import PerfectFollowerBehavior from "../world/mousefollower/perfectfollowerbehavior";

export default {
  VIEWPORT: {
    SIZE: new Vector([1920, 1080]),
    ACTUAL_SIZE: new Vector(2),
    SCALE: 1
  },
  WORLD: {
    SIZE: new Vector([1920, 1080]),
  },
  MOVEMENT: {
    MAX_VELOCITY: 10,
    MAX_ACCELERATION: 10
  },
  MOUSE: new Vector(2),
  OBJECTS: {
    MOUSE_FOLLOWER: {
      SIZE: new Vector([20, 20]),
      BEHAVIORS: [FreezeBehavior, CircleBehavior, ParticleEffectBehavior, PerfectFollowerBehavior],
      DEFAULT_BEHAVIOR_INDEX: 1
    }
  }
};