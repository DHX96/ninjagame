window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AutoDeleteMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "56ba1AD4XZHyajuEUYGJeWX", "AutoDeleteMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var AutoDeleteMgr = function(_super) {
      __extends(AutoDeleteMgr, _super);
      function AutoDeleteMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.isAnimFinishDestroy = false;
        _this.waitTime = 3;
        return _this;
      }
      AutoDeleteMgr.prototype.start = function() {
        var _this = this;
        if (this.isAnimFinishDestroy) {
          var anim = this.getComponent(cc.Animation);
          anim.play();
          anim.on("finished", this.onFinished, this);
        } else this.scheduleOnce(function() {
          _this.delete();
        }, this.waitTime);
      };
      AutoDeleteMgr.prototype.onFinished = function() {
        this.delete();
      };
      AutoDeleteMgr.prototype.delete = function() {
        if (this.node && this.node.isValid) {
          this.node.emit("autoDelete");
          this.node.destroy();
        }
      };
      __decorate([ property ], AutoDeleteMgr.prototype, "isAnimFinishDestroy", void 0);
      __decorate([ property ], AutoDeleteMgr.prototype, "waitTime", void 0);
      AutoDeleteMgr = __decorate([ ccclass ], AutoDeleteMgr);
      return AutoDeleteMgr;
    }(cc.Component);
    exports.default = AutoDeleteMgr;
    cc._RF.pop();
  }, {} ],
  AutoMovingMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "73dacEzLcFFjqHDNo5o3QwM", "AutoMovingMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var LineMovingMgr_1 = require("./LineMovingMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    exports.MoveObjectType = cc.Enum({
      Gold: 1,
      Soul: 2
    });
    var AutoMovingMgr = function(_super) {
      __extends(AutoMovingMgr, _super);
      function AutoMovingMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.goldDestNode = null;
        _this.goldPrefab = null;
        _this.soulDestNode = null;
        _this.soulPrefab = null;
        return _this;
      }
      AutoMovingMgr_1 = AutoMovingMgr;
      AutoMovingMgr.prototype.onLoad = function() {
        AutoMovingMgr_1.instance = this;
      };
      AutoMovingMgr.prototype.start = function() {};
      AutoMovingMgr.prototype.generadeMoveObject = function(moveObjectType, birthWorldPos, custDestWorldPos) {
        var prefab;
        var destWorldPos;
        if (moveObjectType === exports.MoveObjectType.Gold) {
          prefab = this.goldPrefab;
          destWorldPos = this.getNodeWorldPos(this.goldDestNode);
        } else {
          prefab = this.soulPrefab;
          destWorldPos = this.getNodeWorldPos(this.soulDestNode);
        }
        custDestWorldPos && (destWorldPos = custDestWorldPos);
        var moveNode = cc.instantiate(prefab);
        cc.director.getScene().addChild(moveNode);
        moveNode.setPosition(birthWorldPos);
        var lineMovingMgr = moveNode.getComponent(LineMovingMgr_1.default);
        lineMovingMgr.beginMove(destWorldPos);
      };
      AutoMovingMgr.prototype.getNodeWorldPos = function(selNode) {
        var worldPos = new cc.Vec2();
        worldPos = selNode.parent ? selNode.parent.convertToWorldSpaceAR(selNode.getPosition()) : selNode.getPosition();
        return worldPos;
      };
      var AutoMovingMgr_1;
      __decorate([ property(cc.Node) ], AutoMovingMgr.prototype, "goldDestNode", void 0);
      __decorate([ property(cc.Prefab) ], AutoMovingMgr.prototype, "goldPrefab", void 0);
      __decorate([ property(cc.Node) ], AutoMovingMgr.prototype, "soulDestNode", void 0);
      __decorate([ property(cc.Prefab) ], AutoMovingMgr.prototype, "soulPrefab", void 0);
      AutoMovingMgr = AutoMovingMgr_1 = __decorate([ ccclass ], AutoMovingMgr);
      return AutoMovingMgr;
    }(cc.Component);
    exports.default = AutoMovingMgr;
    cc._RF.pop();
  }, {
    "./LineMovingMgr": "LineMovingMgr"
  } ],
  1: [ function(require, module, exports) {
    var process = module.exports = {};
    var cachedSetTimeout;
    var cachedClearTimeout;
    function defaultSetTimout() {
      throw new Error("setTimeout has not been defined");
    }
    function defaultClearTimeout() {
      throw new Error("clearTimeout has not been defined");
    }
    (function() {
      try {
        cachedSetTimeout = "function" === typeof setTimeout ? setTimeout : defaultSetTimout;
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }
      try {
        cachedClearTimeout = "function" === typeof clearTimeout ? clearTimeout : defaultClearTimeout;
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    })();
    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }
      try {
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }
    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }
      try {
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          return cachedClearTimeout.call(null, marker);
        } catch (e) {
          return cachedClearTimeout.call(this, marker);
        }
      }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    function cleanUpNextTick() {
      if (!draining || !currentQueue) return;
      draining = false;
      currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1;
      queue.length && drainQueue();
    }
    function drainQueue() {
      if (draining) return;
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) currentQueue && currentQueue[queueIndex].run();
        queueIndex = -1;
        len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }
    process.nextTick = function(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
      queue.push(new Item(fun, args));
      1 !== queue.length || draining || runTimeout(drainQueue);
    };
    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    process.title = "browser";
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = "";
    process.versions = {};
    function noop() {}
    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;
    process.listeners = function(name) {
      return [];
    };
    process.binding = function(name) {
      throw new Error("process.binding is not supported");
    };
    process.cwd = function() {
      return "/";
    };
    process.chdir = function(dir) {
      throw new Error("process.chdir is not supported");
    };
    process.umask = function() {
      return 0;
    };
  }, {} ],
  CameraShakeMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9a659wmj39LyY/15eqY5l+o", "CameraShakeMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    exports.ShakeDirectionType = cc.Enum({
      Left_Right: 1,
      Up_Down: 2,
      ALL: 3
    });
    var CameraShakeMgr = function(_super) {
      __extends(CameraShakeMgr, _super);
      function CameraShakeMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.camera = null;
        return _this;
      }
      CameraShakeMgr_1 = CameraShakeMgr;
      CameraShakeMgr.prototype.onLoad = function() {
        CameraShakeMgr_1.instance = this;
      };
      CameraShakeMgr.prototype.start = function() {
        this.initPos = this.camera.node.getPosition();
      };
      CameraShakeMgr.prototype.shake = function(frequency, strength, shakeCount, directType) {
        var _this = this;
        void 0 === directType && (directType = exports.ShakeDirectionType.ALL);
        var value = strength;
        var step = strength;
        var change = 0;
        directType === exports.ShakeDirectionType.ALL || (directType === exports.ShakeDirectionType.Left_Right ? this.schedule(function() {
          change++;
          value += step;
          value <= -strength ? step = strength : value >= strength && (step = -strength);
          change >= shakeCount && (value = _this.initPos.x);
          _this.camera.node.setPosition(value, 0);
        }, frequency, shakeCount) : this.schedule(function() {
          change++;
          value += step;
          value <= -strength ? step = strength : value >= strength && (step = -strength);
          change >= shakeCount && (value = _this.initPos.y);
          _this.camera.node.setPosition(0, value);
        }, frequency, shakeCount));
      };
      var CameraShakeMgr_1;
      __decorate([ property(cc.Camera) ], CameraShakeMgr.prototype, "camera", void 0);
      CameraShakeMgr = CameraShakeMgr_1 = __decorate([ ccclass ], CameraShakeMgr);
      return CameraShakeMgr;
    }(cc.Component);
    exports.default = CameraShakeMgr;
    cc._RF.pop();
  }, {} ],
  ChangeScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5c8e7a4QgFDwpnJLjVjsqQk", "ChangeScene");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Global_1 = require("./Global");
    var ChangeScene = function(_super) {
      __extends(ChangeScene, _super);
      function ChangeScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.preloadSceneList = [];
        _this.preLoadOnLoad = true;
        return _this;
      }
      ChangeScene.prototype.onLoad = function() {
        this.node.on(Global_1.default.GlobalEventMap.ChangeScene, this._changeScene.bind(this), this.node);
        this.preloadSceneList.length <= 0 && Global_1.default.WARNING_MSG("preload scene list is null! please setup the preload scene.");
        this.preLoadOnLoad && this.preLoad();
      };
      ChangeScene.prototype._changeScene = function(event) {
        if (!event) {
          Global_1.default.ERROR_MSG("change scene failed! scene name is null!");
          return;
        }
        cc.director.loadScene(event);
      };
      ChangeScene.prototype.preLoad = function() {
        for (var i = 0; i < this.preloadSceneList.length; i++) cc.director.preloadScene(this.preloadSceneList[i], function() {});
      };
      __decorate([ property({
        tooltip: "\u9884\u52a0\u8f7d\u573a\u666f\u5217\u8868",
        type: cc.String
      }) ], ChangeScene.prototype, "preloadSceneList", void 0);
      __decorate([ property ], ChangeScene.prototype, "preLoadOnLoad", void 0);
      ChangeScene = __decorate([ ccclass ], ChangeScene);
      return ChangeScene;
    }(cc.Component);
    exports.default = ChangeScene;
    cc._RF.pop();
  }, {
    "./Global": "Global"
  } ],
  CustomMaterial: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fcf8dId8mdLboNm1EJbchz3", "CustomMaterial");
    "use strict";
    var renderEngine = cc.renderer.renderEngine;
    var renderer = renderEngine.renderer;
    var gfx = renderEngine.gfx;
    var Material = renderEngine.Material;
    var CustomMaterial = function(Material$$1) {
      function CustomMaterial(shaderName, params, defines) {
        Material$$1.call(this, false);
        var pass = new renderer.Pass(shaderName);
        pass.setDepth(false, false);
        pass.setCullMode(gfx.CULL_NONE);
        pass.setBlend(gfx.BLEND_FUNC_ADD, gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA, gfx.BLEND_FUNC_ADD, gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA);
        var techParams = [ {
          name: "texture",
          type: renderer.PARAM_TEXTURE_2D
        }, {
          name: "color",
          type: renderer.PARAM_COLOR4
        } ];
        params && (techParams = techParams.concat(params));
        var mainTech = new renderer.Technique([ "transparent" ], techParams, [ pass ]);
        this.name = shaderName;
        this._effect = new renderer.Effect([ mainTech ], {}, defines);
        this._texture = null;
        this._color = {
          r: 1,
          g: 1,
          b: 1,
          a: 1
        };
        this._mainTech = mainTech;
      }
      cc.js.extend(CustomMaterial, Material$$1);
      var prototypeAccessors = {
        effect: {
          configurable: true
        },
        texture: {
          configurable: true
        },
        color: {
          configurable: true
        }
      };
      prototypeAccessors.effect.get = function() {
        return this._effect;
      };
      prototypeAccessors.texture.get = function() {
        return this._texture;
      };
      prototypeAccessors.texture.set = function(val) {
        if (this._texture !== val) {
          this._texture = val;
          this._effect.setProperty("texture", val.getImpl());
          this._texIds["texture"] = val.getId();
        }
      };
      prototypeAccessors.color.get = function() {
        return this._color;
      };
      prototypeAccessors.color.set = function(val) {
        var color = this._color;
        color.r = val.r / 255;
        color.g = val.g / 255;
        color.b = val.b / 255;
        color.a = val.a / 255;
        this._effect.setProperty("color", color);
      };
      CustomMaterial.prototype.clone = function clone() {
        var copy = new CustomMaterial();
        copy.texture = this.texture;
        copy.color = this.color;
        copy.updateHash();
        return copy;
      };
      CustomMaterial.prototype.setParamValue = function(name, value) {
        this._effect.setProperty(name, value);
      };
      CustomMaterial.prototype.getParamValue = function(name) {
        return this._effect.getProperty(name);
      };
      CustomMaterial.prototype.setDefine = function(name, value) {
        this._effect.define(name, value);
      };
      Object.defineProperties(CustomMaterial.prototype, prototypeAccessors);
      return CustomMaterial;
    }(Material);
    var g_shaders = {};
    CustomMaterial.addShader = function(shader) {
      if (g_shaders[shader.name]) {
        console.log("addShader - shader already exist: ", shader.name);
        return;
      }
      if (cc.renderer._forward) {
        cc.renderer._forward._programLib.define(shader.name, shader.vert, shader.frag, shader.defines || []);
        g_shaders[shader.name] = shader;
      } else cc.game.once(cc.game.EVENT_ENGINE_INITED, function() {
        cc.renderer._forward._programLib.define(shader.name, shader.vert, shader.frag, shader.defines || []);
        g_shaders[shader.name] = shader;
      });
    };
    CustomMaterial.getShader = function(name) {
      return g_shaders[name];
    };
    CustomMaterial.getShaderByIndex = function(index) {
      var array = Object.values(g_shaders);
      return array[index];
    };
    CustomMaterial.getAllName = function() {
      var array = Object.keys(g_shaders);
      var result = array.map(function(name, value) {
        return {
          name: name,
          value: value
        };
      });
      return result;
    };
    var g_shaderEnum = null;
    CustomMaterial.getShaderEnum = function() {
      if (g_shaderEnum) return g_shaderEnum;
      var array = Object.keys(g_shaders);
      var obj = {};
      array.forEach(function(name, index) {
        return obj[name] = index;
      });
      g_shaderEnum = cc.Enum(obj);
      return g_shaderEnum;
    };
    module.exports = CustomMaterial;
    cc._RF.pop();
  }, {} ],
  DamagerLiuShui: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7ee7euAbsJFzLITc4AaGDyU", "DamagerLiuShui");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Damager_1 = require("./Damager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DamagerLiuShui = function(_super) {
      __extends(DamagerLiuShui, _super);
      function DamagerLiuShui() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      DamagerLiuShui.prototype.start = function() {
        var _this = this;
        this.schedule(function() {
          for (var _i = 0, _a = _this.hitMonstersList; _i < _a.length; _i++) {
            var monster = _a[_i];
            monster.hurt(_this.damage);
          }
        }, 1);
      };
      DamagerLiuShui = __decorate([ ccclass ], DamagerLiuShui);
      return DamagerLiuShui;
    }(Damager_1.default);
    exports.default = DamagerLiuShui;
    cc._RF.pop();
  }, {
    "./Damager": "Damager"
  } ],
  DamagerLongJuan: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6365eqqItlC4LniWDjeNu/8", "DamagerLongJuan");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Damager_1 = require("./Damager");
    var MonsterBase_1 = require("../../Monsters/MonsterBase");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DamagerLongJuan = function(_super) {
      __extends(DamagerLongJuan, _super);
      function DamagerLongJuan() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.angleSpeed = 50;
        _this.isClockwise = true;
        _this.circleRadius = 0;
        _this.centrePos = new cc.Vec2();
        _this.curRotValue = 0;
        _this.centreRelativePos = new cc.Vec2();
        _this.circleCount = 0;
        _this.accumulTotalValue = 0;
        return _this;
      }
      DamagerLongJuan.prototype.onCollisionEnter = function(other, self) {
        var monsterBase = other.node.getComponent(MonsterBase_1.MonsterBase);
        monsterBase && monsterBase.setStopAI(true);
      };
      DamagerLongJuan.prototype.setRadius = function(radius) {
        this.circleRadius = radius;
      };
      DamagerLongJuan.prototype.getRadius = function() {
        return this.circleRadius;
      };
      DamagerLongJuan.prototype.setCentre = function(pos) {
        this.centrePos = pos;
      };
      DamagerLongJuan.prototype.getCentre = function() {
        return this.centrePos;
      };
      DamagerLongJuan.prototype.getAngleSpeed = function() {
        return this.angleSpeed;
      };
      DamagerLongJuan.prototype.getIsClockwise = function() {
        return this.isClockwise;
      };
      __decorate([ property ], DamagerLongJuan.prototype, "angleSpeed", void 0);
      __decorate([ property ], DamagerLongJuan.prototype, "isClockwise", void 0);
      DamagerLongJuan = __decorate([ ccclass ], DamagerLongJuan);
      return DamagerLongJuan;
    }(Damager_1.default);
    exports.default = DamagerLongJuan;
    cc._RF.pop();
  }, {
    "../../Monsters/MonsterBase": "MonsterBase",
    "./Damager": "Damager"
  } ],
  Damager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "890e3b/N2BHRqu91YRnKGgY", "Damager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MonsterBase_1 = require("../../Monsters/MonsterBase");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Damager = function(_super) {
      __extends(Damager, _super);
      function Damager() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.damage = 0;
        _this.hitMonstersList = [];
        return _this;
      }
      Damager.prototype.start = function() {};
      Damager.prototype.setDamage = function(damage) {
        this.damage = damage;
      };
      Damager.prototype.getDamage = function() {
        return this.damage;
      };
      Damager.prototype.setInstigator = function(instigator) {
        this.instigator = instigator;
      };
      Damager.prototype.getInstigator = function() {
        return this.instigator;
      };
      Damager.prototype.onCollisionEnter = function(other, self) {
        var monsterBase = other.node.getComponent(MonsterBase_1.MonsterBase);
        monsterBase && this.addUniqueMonster(monsterBase) && this.firstHitMonster(monsterBase);
      };
      Damager.prototype.onCollisionExit = function(other, self) {
        var monsterBase = other.node.getComponent(MonsterBase_1.MonsterBase);
        monsterBase && this.removeMonster(monsterBase);
      };
      Damager.prototype.firstHitMonster = function(monster) {
        monster.hurt(this.damage);
      };
      Damager.prototype.addUniqueMonster = function(monster) {
        for (var _i = 0, _a = this.hitMonstersList; _i < _a.length; _i++) {
          var monsterBase = _a[_i];
          if (monsterBase === monster) return false;
        }
        this.hitMonstersList.push(monster);
        return true;
      };
      Damager.prototype.removeMonster = function(monster) {
        for (var i = 0; i < this.hitMonstersList.length; i++) if (this.hitMonstersList[i] === monster) {
          this.hitMonstersList.splice(i, 1);
          return;
        }
      };
      Damager = __decorate([ ccclass ], Damager);
      return Damager;
    }(cc.Component);
    exports.default = Damager;
    cc._RF.pop();
  }, {
    "../../Monsters/MonsterBase": "MonsterBase"
  } ],
  DartBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eec11BDVvdHELYnjHITFGwS", "DartBase");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameLogic_1 = require("../GameLogic");
    var GameRoot_1 = require("../GameRoot");
    var Global_1 = require("../Global");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DartBase = function(_super) {
      __extends(DartBase, _super);
      function DartBase() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.damage = 10;
        _this.speed = 2e3;
        _this.accSpeed = -.2;
        _this.isInit = false;
        _this.stepScaler = 1;
        return _this;
      }
      DartBase.prototype.onLoad = function() {
        this.stateMgr = GameRoot_1.default.instance.getUserInfoModule().getStateMgr();
      };
      DartBase.prototype.start = function() {};
      DartBase.prototype.init = function(dir, pool, parentNode) {
        this.isInit = true;
        this.isStop = false;
        this.node.opacity = 255;
        parentNode.addChild(this.node);
        this.node.setPosition(new cc.Vec2(0, 0));
        this.dartPool = pool;
        this.moveDir = dir;
        this.velocity = this.moveDir.normalize().mulSelf(this.speed);
        this.stepScaler = 1;
        var anim = this.node.getComponent(cc.Animation);
        this.animComp = anim;
        var animState = anim.play();
        animState.wrapMode = cc.WrapMode.Loop;
        animState.repeatCount = Infinity;
      };
      DartBase.prototype.stop = function() {
        this.isStop = true;
        this.animComp.stop();
        this.animComp.play("dartDisappear");
      };
      DartBase.prototype.update = function(dt) {
        if (!this.isInit) return;
        dt *= GameLogic_1.default.instance.getTimeScale();
        if (this.isStop) {
          this.node.y -= 150 * dt;
          return;
        }
        var moveDis = this.velocity.mul(dt * this.stepScaler);
        this.node.x += moveDis.x;
        this.node.y += moveDis.y;
        this.stepScaler += this.accSpeed * dt;
        this.stepScaler <= 0 && this.delete();
      };
      DartBase.prototype.delete = function() {
        this.node && this.node.isValid && this.node.destroy();
      };
      DartBase.prototype.onCollisionEnter = function(other, self) {
        this.delete();
      };
      DartBase.prototype.handleHitWall = function() {
        this.rebound();
      };
      DartBase.prototype.rebound = function() {
        var newV = Global_1.default.Rebound(this.velocity);
        this.velocity.x = newV.x;
        this.velocity.y = newV.y;
      };
      DartBase.prototype.hasState = function(stateType) {
        return this.stateMgr.hasState(stateType);
      };
      DartBase.prototype.getIsStop = function() {
        return this.isStop;
      };
      __decorate([ property ], DartBase.prototype, "damage", void 0);
      __decorate([ property ], DartBase.prototype, "speed", void 0);
      __decorate([ property ], DartBase.prototype, "accSpeed", void 0);
      DartBase = __decorate([ ccclass ], DartBase);
      return DartBase;
    }(cc.Component);
    exports.default = DartBase;
    cc._RF.pop();
  }, {
    "../GameLogic": "GameLogic",
    "../GameRoot": "GameRoot",
    "../Global": "Global"
  } ],
  Dissolve: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4b303dxX1pNdYA4ki4sBlIr", "Dissolve");
    "use strict";
    var renderEngine = cc.renderer.renderEngine;
    var renderer = renderEngine.renderer;
    var CustomMaterial = require("CustomMaterial");
    var shader = {
      name: "Dissolve",
      params: [ {
        name: "time",
        type: renderer.PARAM_FLOAT,
        defaultValue: 0
      } ],
      start: function start() {
        this.time = 0;
        this.flag = 1;
      },
      update: function update(sprite, material, dt) {
        dt /= 3;
        this.flag ? this.time += dt : this.time -= dt;
        this.time >= 1.2 ? this.flag = 0 : this.time <= -.2 && (this.flag = 1);
        material.setParamValue("time", this.time);
      },
      defines: [],
      vert: "\n        uniform mat4 viewProj;\n        attribute vec3 a_position;\n        attribute vec2 a_uv0;\n        varying vec2 uv0;\n        void main () {\n            vec4 pos = viewProj * vec4(a_position, 1);\n            gl_Position = pos;\n            uv0 = a_uv0;\n        }",
      frag: "\n        uniform sampler2D texture;\nuniform vec4 color;\nuniform float time;\nvarying vec2 uv0;\n\nvoid main()\n{\n    vec4 c = color * texture2D(texture,uv0);\n    float height = c.g;\n    if(height < time)\n    {\n        discard;\n    }\n    if(height < time+0.04)\n    {\n        // \u6eb6\u89e3\u989c\u8272\uff0c\u53ef\u4ee5\u81ea\u5b9a\u4e49\n        c = vec4(1, 0, 0, c.a);\n    }\n    gl_FragColor = c;\n}"
    };
    CustomMaterial.addShader(shader);
    module.exports = shader;
    cc._RF.pop();
  }, {
    CustomMaterial: "CustomMaterial"
  } ],
  DropItemTipMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3a65c7aaedGmJy/KDF/OUte", "DropItemTipMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Global_1 = require("../Global");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DropItemTipMgr = function(_super) {
      __extends(DropItemTipMgr, _super);
      function DropItemTipMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.spriteComp = null;
        _this.skinsList = [];
        return _this;
      }
      DropItemTipMgr.prototype.start = function() {};
      DropItemTipMgr.prototype.changeSkinByItemId = function(itemId) {
        var skinIndex = itemId - 1;
        if (!this.skinsList[skinIndex]) {
          Global_1.default.ERROR_MSG("drop item tip: can not find spriteFrame! index: " + skinIndex);
          return;
        }
        this.spriteComp.spriteFrame = this.skinsList[skinIndex];
      };
      __decorate([ property(cc.Sprite) ], DropItemTipMgr.prototype, "spriteComp", void 0);
      __decorate([ property(cc.SpriteFrame) ], DropItemTipMgr.prototype, "skinsList", void 0);
      DropItemTipMgr = __decorate([ ccclass ], DropItemTipMgr);
      return DropItemTipMgr;
    }(cc.Component);
    exports.default = DropItemTipMgr;
    cc._RF.pop();
  }, {
    "../Global": "Global"
  } ],
  DynamicBlurTransfer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cd72bApdUhIS6oJeWgjQUiz", "DynamicBlurTransfer");
    "use strict";
    var renderEngine = cc.renderer.renderEngine;
    var renderer = renderEngine.renderer;
    var shader = {
      name: "DynamicBlurTransfer",
      params: [ {
        name: "time",
        type: renderer.PARAM_FLOAT,
        defaultValue: 0
      } ],
      time: 0,
      update: function update(sprite, material) {
        if (this.time < 2.25) {
          this.time += .01;
          material.setParamValue("time", this.time);
        }
      },
      defines: [],
      vert: "\n    uniform mat4 viewProj;\n    attribute vec3 a_position;\n    attribute vec2 a_uv0;\n    varying vec2 uv0;\n    void main () {\n        vec4 pos = viewProj * vec4(a_position, 1);\n        gl_Position = pos;\n        uv0 = a_uv0;\n    }",
      frag: "\n    uniform sampler2D texture;\n    uniform vec4 color;\n    varying vec2 uv0;\n    uniform float time;\n\n    #define SAMPLES 10\n    #define SHARPNESS 4.0    \n    #define SAMPLES_F float(SAMPLES)\n    #define TAU  6.28318530718\n    #define HASHSCALE1 443.8975\n\n    float hash13(vec3 p3)\n    {\n        p3  = fract(p3 * HASHSCALE1);\n        p3 += dot(p3, p3.yzx + 19.19);\n        return fract((p3.x + p3.y) * p3.z);\n    }\n\n    void main()\n    {\n        float r = 0.05 + 0.05 * sin(time*.2*TAU+4.3);\n\n        float d = (r * 2.0 * uv0.x) / SAMPLES_F;\n        float lod = log2(max(d / SHARPNESS, 1.0));\n        \n        vec4 color = vec4(0.0, 0.0, 0.0, 0.0);    \n        for (int i = 0; i < SAMPLES; ++i)\n        {\n            float fi = float(i);\n            float rnd = hash13(vec3(uv0.xy, fi));\n            float f = (fi + rnd) / SAMPLES_F;\n            f = (f * 2.0 - 1.0) * r;\n            color += texture2D(texture, uv0 + vec2(f, 0.0), lod);\n        }\n        color = color / SAMPLES_F;\n        gl_FragColor = color;\n\n        gl_FragColor.w = 2.25 - time;\n\n    }"
    };
    var CustomMaterial = require("CustomMaterial");
    CustomMaterial.addShader(shader);
    cc._RF.pop();
  }, {
    CustomMaterial: "CustomMaterial"
  } ],
  EnemyFactory: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a3cd0QEQNZF16foFYy7k/7w", "EnemyFactory");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameLogic_1 = require("../GameLogic");
    var Global_1 = require("../Global");
    var GameRoot_1 = require("../GameRoot");
    var MonsterBase_1 = require("../Monsters/MonsterBase");
    var LayerMgr_1 = require("../LayerMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WAVE_ID_TAG = "waveId";
    var MONSTER_PREFAB_NAME_TAG = "prefabName";
    var DELAY_TIME_TAG = "delayTime";
    var WaveInfo = function() {
      function WaveInfo() {}
      return WaveInfo;
    }();
    exports.WaveInfo = WaveInfo;
    var EnemyFactory = function(_super) {
      __extends(EnemyFactory, _super);
      function EnemyFactory() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.monstersBirthNode = null;
        return _this;
      }
      EnemyFactory.prototype.onLoad = function() {
        this.monstersPrefabList = [];
      };
      EnemyFactory.prototype.start = function() {};
      EnemyFactory.prototype.getMonstersByWaveId = function(waveId, monstersList) {
        var newMonsters = [];
        for (var _i = 0, monstersList_1 = monstersList; _i < monstersList_1.length; _i++) {
          var monster = monstersList_1[_i];
          monster[WAVE_ID_TAG] === waveId && newMonsters.push(monster);
        }
        return newMonsters;
      };
      EnemyFactory.prototype.hasBoss = function(monstersList) {
        for (var _i = 0, monstersList_2 = monstersList; _i < monstersList_2.length; _i++) {
          var monster = monstersList_2[_i];
          if ("Pavilion" === monster[MONSTER_PREFAB_NAME_TAG]) return true;
        }
        return false;
      };
      EnemyFactory.prototype.getMainLevelWaveCountAsync = function(mainLevelId) {
        return new Promise(function(resolve, reject) {
          GameLogic_1.default.instance.getLevelAsync(mainLevelId).then(function(monstersList) {
            var totalWaveCount = 0;
            for (var _i = 0, monstersList_3 = monstersList; _i < monstersList_3.length; _i++) {
              var monster = monstersList_3[_i];
              monster[WAVE_ID_TAG] > totalWaveCount && (totalWaveCount = monster[WAVE_ID_TAG]);
            }
            resolve(totalWaveCount);
          });
        });
      };
      EnemyFactory.prototype.getMainLevelMonsterGeneradeInfoAsync = function(mainLevelId) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          GameLogic_1.default.instance.getLevelAsync(mainLevelId).then(function(monstersList) {
            var waveInfoList = [];
            var waveIndex = 0;
            for (var _i = 0, monstersList_4 = monstersList; _i < monstersList_4.length; _i++) {
              var monster = monstersList_4[_i];
              if (monster[WAVE_ID_TAG] > waveIndex) {
                waveIndex = monster[WAVE_ID_TAG];
                var waveInfo = {};
                var curWaveMonstersList = _this.getMonstersByWaveId(waveIndex, monstersList);
                waveInfo.count = curWaveMonstersList.length;
                waveInfo.delayTime = curWaveMonstersList[0][DELAY_TIME_TAG];
                waveInfo.isBoss = _this.hasBoss(curWaveMonstersList);
                waveInfoList.push(waveInfo);
              }
            }
            resolve(waveInfoList);
          });
        });
      };
      EnemyFactory.prototype.generadeEnemysAsync = function(mainLevelId, waveId) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          var beginTime = +new Date();
          GameLogic_1.default.instance.getLevelAsync(mainLevelId).then(function(levelInfo) {
            var monstersAry = _this.getMonstersByWaveId(waveId, levelInfo);
            var delayTime = monstersAry[0][DELAY_TIME_TAG];
            var promiseList = [];
            for (var _i = 0, monstersAry_1 = monstersAry; _i < monstersAry_1.length; _i++) {
              var monsterObj = monstersAry_1[_i];
              promiseList.push(_this.createMonsterAsync(monsterObj));
            }
            Promise.all(promiseList).then(function(monstersBaseList) {
              if (monstersBaseList) {
                var passTime = (+new Date() - beginTime) / 1e3;
                if (passTime >= delayTime) {
                  for (var _i = 0, monstersBaseList_1 = monstersBaseList; _i < monstersBaseList_1.length; _i++) {
                    var monsterBase = monstersBaseList_1[_i];
                    monsterBase.setActive(true);
                  }
                  resolve(monstersBaseList);
                } else {
                  var waitTime = delayTime - passTime;
                  _this.scheduleOnce(function() {
                    for (var _i = 0, monstersBaseList_2 = monstersBaseList; _i < monstersBaseList_2.length; _i++) {
                      var monsterBase = monstersBaseList_2[_i];
                      monsterBase.setActive(true);
                    }
                    resolve(monstersBaseList);
                  }, waitTime);
                }
              } else reject();
            }).catch(function(err) {
              Global_1.default.ERROR_MSG(err);
              reject();
            });
          }).catch(function(error) {
            Global_1.default.ERROR_MSG(error);
            reject();
          });
        });
      };
      EnemyFactory.prototype.getCurAliveMonsters = function() {
        var allMonsters = this.monstersBirthNode.getComponentsInChildren(MonsterBase_1.MonsterBase);
        var aliveMonsters = [];
        for (var _i = 0, allMonsters_1 = allMonsters; _i < allMonsters_1.length; _i++) {
          var monsterbase = allMonsters_1[_i];
          monsterbase.isAlive() && aliveMonsters.push(monsterbase);
        }
        return aliveMonsters;
      };
      EnemyFactory.prototype.createMonsterAsync = function(monsterData) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          var monsterName = monsterData[MONSTER_PREFAB_NAME_TAG];
          var prefab = _this.getMonsterPrefab(monsterName);
          if (prefab) {
            var monsterBase = _this.setupMonster(prefab, monsterData);
            resolve(monsterBase);
          } else GameRoot_1.default.instance.getResMgrModule().loadPrefabAsync("Monsters/" + monsterName).then(function(prefab) {
            if (prefab) {
              _this.setMonstersPrefabList(monsterName, prefab);
              var monsterBase = _this.setupMonster(prefab, monsterData);
              resolve(monsterBase);
            } else {
              Global_1.default.ERROR_MSG("can not find monster prefab! name: Monsters/" + monsterName);
              resolve();
            }
          });
        });
      };
      EnemyFactory.prototype.setupMonster = function(prefab, monsterData) {
        var monsterNode = cc.instantiate(prefab);
        monsterNode.parent = this.monstersBirthNode;
        LayerMgr_1.default.instance.addUniqueObject(monsterNode);
        var monsterBase = monsterNode.getComponent(MonsterBase_1.MonsterBase);
        monsterBase.init(new cc.Vec2(monsterData.x, monsterData.y), monsterData);
        return monsterBase;
      };
      EnemyFactory.prototype.setMonstersPrefabList = function(prefabName, prefab) {
        this.monstersPrefabList[prefabName] = prefab;
      };
      EnemyFactory.prototype.getMonsterPrefab = function(prefabName) {
        return this.monstersPrefabList[prefabName];
      };
      __decorate([ property(cc.Node) ], EnemyFactory.prototype, "monstersBirthNode", void 0);
      EnemyFactory = __decorate([ ccclass ], EnemyFactory);
      return EnemyFactory;
    }(cc.Component);
    exports.default = EnemyFactory;
    cc._RF.pop();
  }, {
    "../GameLogic": "GameLogic",
    "../GameRoot": "GameRoot",
    "../Global": "Global",
    "../LayerMgr": "LayerMgr",
    "../Monsters/MonsterBase": "MonsterBase"
  } ],
  FlashWhiteMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ec211vRgJRETbAocO+Ldljy", "FlashWhiteMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ShaderHelper = require("ShaderHelper");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var FlashWhiteMgr = function(_super) {
      __extends(FlashWhiteMgr, _super);
      function FlashWhiteMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.speed = 10;
        _this.isPlay = false;
        return _this;
      }
      FlashWhiteMgr.prototype.onLoad = function() {
        this.shaderHelper = this.getComponent(ShaderHelper);
        this.maxFrame = this.speed;
        this.middleFrame = this.maxFrame / 2;
        this.curFrame = 0;
      };
      FlashWhiteMgr.prototype.start = function() {};
      FlashWhiteMgr.prototype.play = function() {
        this.isPlay = true;
        this.curFrame = 0;
      };
      FlashWhiteMgr.prototype.setParamsValue = function(value) {
        if (this.shaderHelper) {
          this.shaderHelper.setParamsValue(1, value);
          console.log(value);
        }
      };
      FlashWhiteMgr.prototype.update = function(dt) {
        if (this.isPlay) {
          this.curFrame <= this.middleFrame ? this.curProgress = this.curFrame / this.middleFrame : this.curProgress = 2 - this.curFrame / this.middleFrame;
          this.curFrame++;
          if (this.curFrame > this.maxFrame) {
            this.curFrame = 0;
            this.isPlay = false;
          }
          this.shaderHelper.setParamsValue(1, this.curProgress);
        }
      };
      __decorate([ property({
        tooltip: "\u95ea\u767d\u7684\u64ad\u653e\u901f\u5ea6,\u503c\u8d8a\u5c0f\u64ad\u653e\u901f\u5ea6\u8d8a\u5feb"
      }) ], FlashWhiteMgr.prototype, "speed", void 0);
      FlashWhiteMgr = __decorate([ ccclass ], FlashWhiteMgr);
      return FlashWhiteMgr;
    }(cc.Component);
    exports.default = FlashWhiteMgr;
    cc._RF.pop();
  }, {
    ShaderHelper: "ShaderHelper"
  } ],
  FlashWhiteTwo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f288aIq6AlKMYK0oO2MWVs8", "FlashWhiteTwo");
    "use strict";
    var renderEngine = cc.renderer.renderEngine;
    var renderer = renderEngine.renderer;
    var shader = {
      name: "FlashWhiteTwo",
      params: [ {
        name: "uflashParam",
        type: renderer.PARAM_FLOAT
      } ],
      defines: [],
      start: function start(sprite, material, param1) {},
      update: function update(sprite, material, dt, progress) {
        material.setParamValue("uflashParam", progress);
      },
      vert: "uniform mat4 viewProj;\n    attribute vec4 a_position;\n    attribute vec2 a_uv0;\n    varying vec2 uv0;\n    void main()\n    {\n        gl_Position = viewProj * a_position;\n        uv0 = a_uv0;\n    }\n    ",
      frag: "\n    uniform sampler2D texture;\n    varying vec2 uv0;\n\n    uniform float uflashParam;\n    \n    void main()\n    {\n        vec4 fragColor = texture2D(texture, uv0);\n        gl_FragColor = vec4(fragColor.r + uflashParam, fragColor.g + uflashParam, fragColor.b + uflashParam, fragColor.a);\n    }\n    "
    };
    var CustomMaterial = require("CustomMaterial");
    CustomMaterial.addShader(shader);
    cc._RF.pop();
  }, {
    CustomMaterial: "CustomMaterial"
  } ],
  FlashWhite: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "24b3es5KL1KrLPHgSkktV44", "FlashWhite");
    "use strict";
    var renderEngine = cc.renderer.renderEngine;
    var renderer = renderEngine.renderer;
    var shader = {
      name: "FlashWhite",
      params: [ {
        name: "uflashParam",
        type: renderer.PARAM_FLOAT
      } ],
      defines: [],
      start: function start(sprite, material, param1) {},
      update: function update(sprite, material, dt, progress) {
        material.setParamValue("uflashParam", progress);
      },
      vert: "uniform mat4 viewProj;\n    attribute vec4 a_position;\n    attribute vec2 a_uv0;\n    varying vec2 uv0;\n    void main()\n    {\n        gl_Position = viewProj * a_position;\n        uv0 = a_uv0;\n    }\n    ",
      frag: "\n    uniform sampler2D texture;\n    varying vec2 uv0;\n\n    uniform float uflashParam;\n    \n    void main()\n    {\n        vec4 fragColor = texture2D(texture, uv0);\n        gl_FragColor = vec4(fragColor.r + uflashParam, fragColor.g + uflashParam, fragColor.b + uflashParam, fragColor.a);\n    }\n    "
    };
    var CustomMaterial = require("CustomMaterial");
    CustomMaterial.addShader(shader);
    cc._RF.pop();
  }, {
    CustomMaterial: "CustomMaterial"
  } ],
  FluxaySuper: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a5d989S0kBA8Jrb0NVbPq7U", "FluxaySuper");
    "use strict";
    var renderEngine = cc.renderer.renderEngine;
    var renderer = renderEngine.renderer;
    var CustomMaterial = require("CustomMaterial");
    var shader = {
      name: "FluxaySuper",
      params: [ {
        name: "time",
        type: renderer.PARAM_FLOAT,
        defaultValue: 0
      } ],
      start: function start() {
        this._start = Date.now();
      },
      update: function update(sprite, material) {
        var now = Date.now();
        var time = (now - this._start) / 1e3;
        material.setParamValue("time", time);
      },
      defines: [],
      vert: "\n        uniform mat4 viewProj;\n        attribute vec3 a_position;\n        attribute vec2 a_uv0;\n        varying vec2 uv0;\n        void main () {\n            vec4 pos = viewProj * vec4(a_position, 1);\n            gl_Position = pos;\n            uv0 = a_uv0;\n        }",
      frag: "#define TAU 6.12\n        #define MAX_ITER 5\n        uniform sampler2D texture;\n        uniform vec4 color;\n        uniform float time;\n        varying vec2 uv0;\n        \n        void main()\n        {\n            float time = time * .5+5.;\n            // uv should be the 0-1 uv of texture...\n            vec2 uv = uv0.xy;//fragCoord.xy / iResolution.xy;\n            \n            vec2 p = mod(uv*TAU, TAU)-250.0;\n        \n            vec2 i = vec2(p);\n            float c = 1.0;\n            float inten = .0045;\n        \n            for (int n = 0; n < MAX_ITER; n++) \n            {\n                float t =  time * (1.0 - (3.5 / float(n+1)));\n                i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(1.5*t + i.x));\n                c += 1.0/length(vec2(p.x / (cos(i.x+t)/inten),p.y / (cos(i.y+t)/inten)));\n            }\n            c /= float(MAX_ITER);\n            c = 1.17-pow(c, 1.4);\n            vec4 tex = texture2D(texture,uv);\n            vec3 colour = vec3(pow(abs(c), 20.0));\n            colour = clamp(colour + vec3(0.0, 0.0, .0), 0.0, tex.a);\n        \n            // \u6df7\u5408\u6ce2\u5149\n            float alpha = c*tex[3];  \n            tex[0] = tex[0] + colour[0]*alpha; \n            tex[1] = tex[1] + colour[1]*alpha; \n            tex[2] = tex[2] + colour[2]*alpha; \n            gl_FragColor = color * tex;\n        }"
    };
    CustomMaterial.addShader(shader);
    cc._RF.pop();
  }, {
    CustomMaterial: "CustomMaterial"
  } ],
  Fluxay: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "63b27gmYNVBTZMxkt4e1DLy", "Fluxay");
    "use strict";
    var renderEngine = cc.renderer.renderEngine;
    var renderer = renderEngine.renderer;
    var CustomMaterial = require("CustomMaterial");
    var shader = {
      name: "Fluxay",
      params: [ {
        name: "time",
        type: renderer.PARAM_FLOAT,
        defaultValue: 0
      } ],
      start: function start() {
        this._start = Date.now();
      },
      update: function update(sprite, material) {
        var now = Date.now();
        var time = (now - this._start) / 1e3;
        if (time >= 1.414) {
          time = 0;
          this._start = now;
        }
        material.setParamValue("time", time);
      },
      defines: [],
      vert: "\n        uniform mat4 viewProj;\n        attribute vec3 a_position;\n        attribute vec2 a_uv0;\n        varying vec2 uv0;\n        void main () {\n            vec4 pos = viewProj * vec4(a_position, 1);\n            gl_Position = pos;\n            uv0 = a_uv0;\n        }",
      frag: "uniform sampler2D texture;\n        uniform vec4 color;\n        uniform float time;\n        varying vec2 uv0;\n        \n        void main()\n        {\n            vec4 src_color = color * texture2D(texture, uv0).rgba;\n        \n            float width = 0.03;       //\u6d41\u5149\u7684\u5bbd\u5ea6\u8303\u56f4 (\u8c03\u6574\u8be5\u503c\u6539\u53d8\u6d41\u5149\u7684\u5bbd\u5ea6)\n            float start = tan(time/1.414);  //\u6d41\u5149\u7684\u8d77\u59cbx\u5750\u6807\n            float strength = 0.05;   //\u6d41\u5149\u589e\u4eae\u5f3a\u5ea6   (\u8c03\u6574\u8be5\u503c\u6539\u53d8\u6d41\u5149\u7684\u589e\u4eae\u5f3a\u5ea6)\n            float offset = 0.5;      //\u504f\u79fb\u503c         (\u8c03\u6574\u8be5\u503c\u6539\u53d8\u6d41\u5149\u7684\u503e\u659c\u7a0b\u5ea6)\n            if(uv0.x < (start - offset * uv0.y) &&  uv0.x > (start - offset * uv0.y - width))\n            {\n                vec3 improve = strength * vec3(255, 255, 255);\n                vec3 result = improve * vec3( src_color.r, src_color.g, src_color.b);\n                gl_FragColor = vec4(result, src_color.a);\n        \n            }else{\n                gl_FragColor = src_color;\n            }\n        }"
    };
    CustomMaterial.addShader(shader);
    cc._RF.pop();
  }, {
    CustomMaterial: "CustomMaterial"
  } ],
  GameEndMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2751fsWZd9OPrT+MIDFwGCR", "GameEndMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Global_1 = require("../Global");
    var GameLogic_1 = require("../GameLogic");
    var AutoMovingMgr_1 = require("../MoveingObject/AutoMovingMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameEndMgr = function(_super) {
      __extends(GameEndMgr, _super);
      function GameEndMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.goldBirthNode = null;
        _this.goldDestNode = null;
        return _this;
      }
      GameEndMgr.prototype.start = function() {};
      GameEndMgr.prototype.triggerReturn = function() {
        var _this = this;
        var birthWorldPos = this.goldBirthNode.parent.convertToWorldSpaceAR(this.goldBirthNode.getPosition());
        var destWorldPos = this.goldDestNode.parent.convertToWorldSpaceAR(this.goldDestNode.getPosition());
        AutoMovingMgr_1.default.instance.generadeMoveObject(AutoMovingMgr_1.MoveObjectType.Gold, birthWorldPos, destWorldPos);
        this.scheduleOnce(function() {
          GameLogic_1.default.instance.gameReset();
          _this.node.emit(Global_1.default.GlobalEventMap.ChangeScene, "Start");
        }, .8);
      };
      __decorate([ property(cc.Node) ], GameEndMgr.prototype, "goldBirthNode", void 0);
      __decorate([ property(cc.Node) ], GameEndMgr.prototype, "goldDestNode", void 0);
      GameEndMgr = __decorate([ ccclass ], GameEndMgr);
      return GameEndMgr;
    }(cc.Component);
    exports.default = GameEndMgr;
    cc._RF.pop();
  }, {
    "../GameLogic": "GameLogic",
    "../Global": "Global",
    "../MoveingObject/AutoMovingMgr": "AutoMovingMgr"
  } ],
  GameLogic: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2fc16dwvw9GBYwaFfjdRDbb", "GameLogic");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameRoot_1 = require("./GameRoot");
    var ItemMgr_1 = require("./Item/ItemMgr");
    var StateMgr_1 = require("./State/StateMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameLogic = function(_super) {
      __extends(GameLogic, _super);
      function GameLogic() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.timeScale = 1;
        _this.itemsPrefabList = [];
        _this.levelsInfoList = [];
        return _this;
      }
      GameLogic_1 = GameLogic;
      GameLogic.prototype.onLoad = function() {
        cc.game.addPersistRootNode(this.node);
        GameLogic_1.instance = this;
      };
      GameLogic.prototype.start = function() {
        this.scheduleOnce(function() {}, 1);
      };
      GameLogic.prototype.gameReset = function() {
        GameRoot_1.default.instance.getUserInfoModule().reset();
        this.setTimeScale(1);
      };
      GameLogic.prototype.initItemMgr = function() {
        this.itemMgr = new ItemMgr_1.default();
        this.itemMgr.init();
      };
      GameLogic.prototype.getItemMgr = function() {
        return this.itemMgr;
      };
      GameLogic.prototype.getTimeScale = function() {
        return this.timeScale;
      };
      GameLogic.prototype.setTimeScale = function(scaleTime) {
        this.timeScale = scaleTime;
        cc.director.getScheduler().setTimeScale(scaleTime);
      };
      GameLogic.prototype.stopAI = function() {
        this.timeScale = 0;
      };
      GameLogic.prototype.getLevelAsync = function(levelId) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          var levelKey = "level" + levelId.toString();
          _this.levelsInfoList[levelId] ? resolve(_this.levelsInfoList[levelId]) : GameRoot_1.default.instance.getResMgrModule().loadConfigAsync(levelKey).then(function(res) {
            if (res) {
              _this.levelsInfoList[levelId] = res;
              resolve(res);
            } else resolve();
          });
        });
      };
      GameLogic.prototype.getHitEffectPrefabAsync = function() {
        var _this = this;
        return new Promise(function(resolve, reject) {
          _this.hitEffectPrefab ? resolve(_this.hitEffectPrefab) : GameRoot_1.default.instance.getResMgrModule().loadPrefabAsync("Effect/HitEffect").then(function(res) {
            if (res) {
              _this.hitEffectPrefab = res;
              resolve(_this.hitEffectPrefab);
            } else resolve();
          });
        });
      };
      GameLogic.prototype.getBoomEffectPrefabAsync = function() {
        var _this = this;
        return new Promise(function(resolve, reject) {
          _this.boomEffectPrefab ? resolve(_this.boomEffectPrefab) : GameRoot_1.default.instance.getResMgrModule().loadPrefabAsync("Effect/BoomEffect").then(function(res) {
            if (res) {
              _this.boomEffectPrefab = res;
              resolve(_this.boomEffectPrefab);
            } else resolve();
          });
        });
      };
      GameLogic.prototype.getDropItemTipAsync = function() {
        var _this = this;
        return new Promise(function(resolve, reject) {
          _this.dropItemTipPrefab ? resolve(_this.dropItemTipPrefab) : GameRoot_1.default.instance.getResMgrModule().loadPrefabAsync("Item/DropItemTip").then(function(res) {
            if (res) {
              _this.dropItemTipPrefab = res;
              resolve(_this.dropItemTipPrefab);
            } else resolve();
          });
        });
      };
      GameLogic.prototype.preloadAllDropItems = function() {
        var _this = this;
        GameRoot_1.default.instance.getResMgrModule().loadPrefabDirAsync("Item/DropItems").then(function(resList) {
          for (var _i = 0, resList_1 = resList; _i < resList_1.length; _i++) {
            var prefab = resList_1[_i];
            _this.itemsPrefabList[prefab.name] = prefab;
          }
        });
      };
      GameLogic.prototype.getItemPrefabNameById = function(itemId) {
        if (1 === itemId) return "ItemRebound";
        if (2 === itemId) return "ItemScatter";
        if (3 === itemId) return "ItemSoaring";
        if (4 === itemId) return "ItemDecSpeed";
        if (5 === itemId) return "ItemExplosion";
      };
      GameLogic.prototype.getDropItemPrefabAsync = function(itemId) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          var name = _this.getItemPrefabNameById(itemId);
          var prefab = _this.itemsPrefabList[name];
          if (prefab) resolve(prefab); else {
            var callback_1 = function() {
              if (this.itemsPrefabList[name]) {
                this.unschedule(callback_1);
                resolve(this.itemsPrefabList[name]);
              }
            };
            _this.schedule(callback_1, .05);
          }
        });
      };
      GameLogic.prototype.useItem = function(itemId) {
        var stateMgr = GameRoot_1.default.instance.getUserInfoModule().getStateMgr();
        var durationTime = 7;
        this.node.emit("useItem", itemId, durationTime);
        if (1 === itemId) {
          stateMgr.addState(StateMgr_1.StateType.Pass, durationTime);
          return;
        }
        if (2 === itemId) {
          stateMgr.addState(StateMgr_1.StateType.Scatter, durationTime);
          return;
        }
        if (3 === itemId) return "ItemSoaring";
        if (4 === itemId) return "ItemDecSpeed";
        if (5 === itemId) return "ItemExplosion";
      };
      GameLogic.prototype.getItemNameById = function(itemId) {
        if (1 === itemId) return "\u7a7f";
        if (2 === itemId) return "\u6563";
        if (3 === itemId) return "";
        if (4 === itemId) return "";
        if (5 === itemId) return "";
      };
      var GameLogic_1;
      GameLogic.instance = null;
      GameLogic = GameLogic_1 = __decorate([ ccclass ], GameLogic);
      return GameLogic;
    }(cc.Component);
    exports.default = GameLogic;
    cc._RF.pop();
  }, {
    "./GameRoot": "GameRoot",
    "./Item/ItemMgr": "ItemMgr",
    "./State/StateMgr": "StateMgr"
  } ],
  GameMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9ed68yk1YtOAIxVU3IHY29G", "GameMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DartBase_1 = require("../Darts/DartBase");
    var EnemyFactory_1 = require("./EnemyFactory");
    var GameUI_1 = require("./GameUI");
    var GameRoot_1 = require("../GameRoot");
    var Global_1 = require("../Global");
    var StateMgr_1 = require("../State/StateMgr");
    var GameLogic_1 = require("../GameLogic");
    var MusicController_1 = require("../module/Music/MusicController");
    var CameraShakeMgr_1 = require("../CameraShakeMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var EventDevicemotion = function(_super) {
      __extends(EventDevicemotion, _super);
      function EventDevicemotion() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      return EventDevicemotion;
    }(cc.Event);
    var OperationType = cc.Enum({
      NONE: 1,
      TOUCH_START: 2,
      TOUCH_OUT: 3
    });
    var GameMgr = function(_super) {
      __extends(GameMgr, _super);
      function GameMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.gameUI = null;
        _this.roleBirthNode = null;
        _this.roleNode = null;
        _this.skillNode = null;
        _this.inputNode = null;
        _this.dartBirth = null;
        _this.attackInterval = .8;
        _this.autoAttackIntervalDelta = .2;
        _this.monsterCountsWave = 10;
        _this.bossBgMusicController = null;
        _this.gameEndMusicController = null;
        _this.autoFightAnim = null;
        _this.beginWorldPos = new cc.Vec2();
        _this.lastWorldPos = new cc.Vec2();
        _this.preShotDir = new cc.Vec2();
        _this.isGameOver = false;
        _this.mainLevelId = 1;
        _this.enableSkillBtn = true;
        _this.isShotDart = false;
        _this.shotAccTime = 0;
        _this.isGamePlay = true;
        _this.gameStartAccTime = 0;
        _this.isAutoFight = false;
        return _this;
      }
      GameMgr.prototype.onLoad = function() {
        this.manager = cc.director.getCollisionManager();
        this.manager.enabled = true;
        this.enemyFactory = this.getComponent(EnemyFactory_1.default);
        this.bgMusicController = this.getComponent(MusicController_1.default);
      };
      GameMgr.prototype.start = function() {
        var self = this;
        this.initDartBirth();
        this.loadPool();
        this.bindInputEvent();
        this.initRole();
        this.initLevelProgress();
        GameLogic_1.default.instance.initItemMgr();
        this.gameUI.setAtkIntervalProgress(1);
        this.generadeMonsters();
      };
      GameMgr.prototype.update = function(dt) {
        dt *= GameLogic_1.default.instance.getTimeScale();
        this.gameStartAccTime += dt;
        this.gameUI.setLevelProgress(this.gameStartAccTime);
        if (this.isShotDart) {
          this.shotAccTime += dt;
          var timeInterval = void 0;
          timeInterval = this.isAutoFight ? this.attackInterval + this.autoAttackIntervalDelta : this.attackInterval;
          if (this.shotAccTime >= timeInterval) {
            this.gameUI.setAtkIntervalProgress(1);
            this.isShotDart = false;
            this.curOperationType = OperationType.NONE;
          } else this.gameUI.setAtkIntervalProgress(this.shotAccTime / this.attackInterval);
        } else {
          var isUseSkill = GameRoot_1.default.instance.getUserInfoModule().getIsUsingSkill();
          if (this.isAutoFight && !isUseSkill) {
            var dir = this.lastWorldPos.sub(this.worldBirthPos);
            dir.y > 0 ? this.triggerShot(dir) : this.triggerShot(this.preShotDir);
          }
        }
      };
      GameMgr.prototype.generadeMonsters = function() {
        var _this = this;
        this.enemyFactory.getMainLevelWaveCountAsync(this.mainLevelId).then(function(totalWaveCount) {
          var promiseList = [];
          for (var i = 1; i <= totalWaveCount; i++) promiseList.push(_this.enemyFactory.generadeEnemysAsync(_this.mainLevelId, i));
          Promise.all(promiseList).then(function(monstersBaseArrayList) {
            var callback = function() {
              var isAllDead = true;
              var lastMonstersAry = monstersBaseArrayList[monstersBaseArrayList.length - 1];
              for (var _i = 0, lastMonstersAry_1 = lastMonstersAry; _i < lastMonstersAry_1.length; _i++) {
                var monstersBase = lastMonstersAry_1[_i];
                if (monstersBase.node && monstersBase.node.isValid) {
                  isAllDead = false;
                  break;
                }
              }
              if (isAllDead) {
                this.unschedule(callback);
                this.gameIsOver();
              }
            };
            _this.schedule(callback, .2);
            var lastMonstersList = monstersBaseArrayList[monstersBaseArrayList.length - 1];
            if (_this.checkHasBoss(lastMonstersList)) {
              CameraShakeMgr_1.default.instance.shake(.02, 20, 20, CameraShakeMgr_1.ShakeDirectionType.Left_Right);
              _this.changeMusic(_this.bgMusicController, _this.bossBgMusicController, 3);
              _this.generadeBossWarning();
            }
          }).catch(function(err) {});
        });
      };
      GameMgr.prototype.gameIsOver = function() {
        this.isGameOver = true;
        this.mainLevelId % 10 === 0 && GameRoot_1.default.instance.getUserInfoModule().unLockNextOysterSkill();
        GameRoot_1.default.instance.getResMgrModule().loadPrefabAsync("Tips/GameEnd").then(function(prefab) {
          var gameEndNode = cc.instantiate(prefab);
          cc.director.getScene().addChild(gameEndNode);
        });
        this.changeMusic(this.bossBgMusicController, this.gameEndMusicController, .2);
      };
      GameMgr.prototype.checkHasBoss = function(monstersList) {
        for (var _i = 0, monstersList_1 = monstersList; _i < monstersList_1.length; _i++) {
          var monstersBase = monstersList_1[_i];
          if (monstersBase.node && monstersBase.node.isValid && monstersBase.getIsBoss()) return true;
        }
        return false;
      };
      GameMgr.prototype.generadeBossWarning = function() {
        GameRoot_1.default.instance.getResMgrModule().loadPrefabAsync("Tips/BossComing").then(function(prefab) {
          var bossWarningNode = cc.instantiate(prefab);
          cc.director.getScene().addChild(bossWarningNode);
        });
      };
      GameMgr.prototype.changeMusic = function(oldMusicControl, newMusicControl, costTime) {
        var callback = function() {
          accTime += unitTime;
          if (accTime >= costTime) {
            this.unschedule(callback);
            newMusicControl.play();
          } else oldMusicControl.setBgMusicVolume(1 - accTime / costTime);
        };
        var accTime = 0;
        var unitTime = .1;
        this.schedule(callback, unitTime);
      };
      GameMgr.prototype.onDeviceMotion = function(objNode, delic, step, time) {
        var self = this;
        var curStep;
        cc.systemEvent.setAccelerometerEnabled(true);
        function slide() {
          objNode.x += curStep;
          console.info("run");
          if (objNode.x >= self.node.width / 2 - objNode.width / 2 || objNode.x < -self.node.width / 2 + objNode.width / 2) {
            console.info("stop");
            objNode.x = curStep < 0 ? -self.node.width / 2 + objNode.width / 2 : self.node.width / 2 - objNode.width / 2;
            self.unschedule(slide);
            return;
          }
        }
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, function(e) {
          if (Math.abs(e.acc.x) <= delic) {
            curStep = 0;
            return;
          }
          console.info("ok");
          curStep = step * e.acc.x;
          self.schedule(slide, time);
        }, this);
      };
      GameMgr.prototype.initDartBirth = function() {
        var birthPos = this.dartBirth.getPosition();
        this.worldBirthPos = this.gameUI.node.convertToWorldSpaceAR(birthPos);
      };
      GameMgr.prototype.createDarts = function() {
        var dartsNode = null;
        var curWeaponPrefab = GameRoot_1.default.instance.getUserInfoModule().getCurWeaponPrefab();
        dartsNode = this.dartPool.size() > 0 && "NormalDart" === curWeaponPrefab.name ? this.dartPool.get() : cc.instantiate(curWeaponPrefab);
        return dartsNode;
      };
      GameMgr.prototype.bindInputEvent = function() {
        var _this = this;
        this.curOperationType = OperationType.NONE;
        this.inputNode.on("touchstart", function(event) {
          if (_this.curOperationType === OperationType.NONE) {
            _this.curOperationType = OperationType.TOUCH_START;
            _this.beginWorldPos = event.touch.getLocation();
            _this.lastWorldPos = _this.beginWorldPos;
            _this.isAutoFight || _this.scheduleOnce(function() {
              var deltaY = _this.lastWorldPos.y - _this.beginWorldPos.y;
              if (deltaY <= 0) {
                _this.curOperationType = OperationType.NONE;
                return;
              }
              var deltaX = _this.lastWorldPos.x - _this.beginWorldPos.x;
              var dirV = new cc.Vec2(deltaX, deltaY);
              _this.triggerShot(dirV);
            }, .1);
          }
        }, this);
        this.inputNode.on("touchmove", function(event) {
          _this.lastWorldPos = event.touch.getLocation();
        }, this);
      };
      GameMgr.prototype.touchEnd = function() {};
      GameMgr.prototype.triggerShot = function(dir) {
        this.isShotDart = true;
        this.shotAccTime = 0;
        this.roleMusicController.play();
        this.roleAnim.playAdditive("Role_Atk");
        if (!this.isAutoFight) {
          var adjustDir = this.autoAdjustThrowDirection(this.worldBirthPos, dir);
          adjustDir && (dir = adjustDir);
        }
        this.preShotDir = dir;
        var has = GameRoot_1.default.instance.getUserInfoModule().getStateMgr().hasState(StateMgr_1.StateType.Scatter);
        var createDart = function() {
          if (has) {
            var dirList = [];
            dirList.push(dir);
            var radians = Global_1.default.AngleToRadians(15);
            dirList.push(dir.rotate(radians));
            dirList.push(dir.rotate(-radians));
            for (var _i = 0, dirList_1 = dirList; _i < dirList_1.length; _i++) {
              var newDir = dirList_1[_i];
              var dartNode = this.createDarts();
              var dartCtrl = dartNode.getComponent(DartBase_1.default);
              dartCtrl.init(newDir, this.dartPool, this.dartBirth);
            }
          } else {
            var dartNode = this.createDarts();
            var dartCtrl = dartNode.getComponent(DartBase_1.default);
            dartCtrl.init(dir, this.dartPool, this.dartBirth);
          }
        }.bind(this);
        createDart();
        this.schedule(createDart, .05, 1);
      };
      GameMgr.prototype.loadPool = function() {
        this.dartPool = new cc.NodePool();
        var initCount = 50;
        var curWeaponPrefab = GameRoot_1.default.instance.getUserInfoModule().getCurWeaponPrefab();
        for (var i = 0; i < initCount; ++i) {
          var dart = cc.instantiate(curWeaponPrefab);
          this.dartPool.put(dart);
        }
      };
      GameMgr.prototype.onDestroy = function() {
        this.dartPool.clear();
        GameRoot_1.default.instance.node.off("pauseRoleAI", this.pauseRoleAI, this);
        GameRoot_1.default.instance.node.off("resumeRoleAI", this.resumeRoleAI, this);
      };
      GameMgr.prototype.autoAdjustThrowDirection = function(birthPos, dir) {
        var adjustAngle;
        adjustAngle = this.mainLevelId <= 10 ? 15 : this.mainLevelId <= 20 ? 10 : 5;
        var unitAdjustAngle = 3;
        var colliderRects = [];
        var monsterBaseAry = this.enemyFactory.getCurAliveMonsters();
        for (var _i = 0, monsterBaseAry_1 = monsterBaseAry; _i < monsterBaseAry_1.length; _i++) {
          var monsterBase = monsterBaseAry_1[_i];
          var rect = monsterBase.getWorldColliderRect();
          colliderRects.push(rect);
        }
        var dropItemsAry = GameLogic_1.default.instance.getItemMgr().getGameDropItems();
        for (var _a = 0, dropItemsAry_1 = dropItemsAry; _a < dropItemsAry_1.length; _a++) {
          var itemBase = dropItemsAry_1[_a];
          var rect = itemBase.getWorldColliderRect();
          colliderRects.push(rect);
        }
        if (this.checkIntersectionRect(birthPos, dir, colliderRects)) return;
        var curAngle = unitAdjustAngle;
        while (curAngle <= adjustAngle) {
          curAngle += unitAdjustAngle;
          var curRadians = Global_1.default.AngleToRadians(curAngle);
          var adjustDir = dir.rotate(curRadians);
          if (this.checkIntersectionRect(birthPos, adjustDir, colliderRects)) return adjustDir;
        }
        curAngle = -unitAdjustAngle;
        while (curAngle >= -adjustAngle) {
          curAngle -= unitAdjustAngle;
          var curRadians = Global_1.default.AngleToRadians(curAngle);
          var adjustDir = dir.rotate(curRadians);
          if (this.checkIntersectionRect(birthPos, adjustDir, colliderRects)) return adjustDir;
        }
      };
      GameMgr.prototype.checkIntersectionRect = function(startPos, dir, colliderRects) {
        dir.normalizeSelf();
        var endV = startPos.add(dir.mul(cc.view.getVisibleSize().height - 100));
        var isHit = false;
        for (var _i = 0, colliderRects_1 = colliderRects; _i < colliderRects_1.length; _i++) {
          var rect = colliderRects_1[_i];
          if (cc.Intersection.lineRect(startPos, endV, rect)) {
            isHit = true;
            break;
          }
        }
        return isHit;
      };
      GameMgr.prototype.triggerSkillBtn = function() {
        var _this = this;
        if (!this.enableSkillBtn) return;
        this.enableSkillBtn = false;
        GameRoot_1.default.instance.getUserInfoModule().useSkillAsync(this.worldBirthPos).then(function(suc) {
          _this.enableSkillBtn = true;
          if (!suc) {
            _this.gameUI.showRoleTips("\u5965\u4e49\u503c\u672a\u6ee1");
            GameRoot_1.default.instance.getPlatformMgrModule().getPlatform().vibrateLong(null);
          }
        });
      };
      GameMgr.prototype.initRole = function() {
        var _this = this;
        GameRoot_1.default.instance.node.on("pauseRoleAI", this.pauseRoleAI, this);
        GameRoot_1.default.instance.node.on("resumeRoleAI", this.resumeRoleAI, this);
        this.roleAnim = this.roleNode.getComponent(cc.Animation);
        var animState = this.roleAnim.play();
        animState.speed = 1;
        this.roleMusicController = this.roleBirthNode.getComponent(MusicController_1.default);
        this.skillNode.on("touchstart", function(event) {
          _this.triggerSkillBtn();
        }, this);
      };
      GameMgr.prototype.pauseRoleAI = function(event) {
        this.roleAnim.stop();
      };
      GameMgr.prototype.resumeRoleAI = function(event) {
        this.roleAnim.play();
      };
      GameMgr.prototype.triggerPausePlay = function() {
        this.isGamePlay = !this.isGamePlay;
        this.gameUI.setPausePlayGameState(this.isGamePlay);
        this.pauseGame(!this.isGamePlay);
      };
      GameMgr.prototype.pauseGame = function(isPause) {
        var _this = this;
        if (isPause) {
          cc.director.pause();
          GameRoot_1.default.instance.getResMgrModule().loadPrefabAsync("Tips/PauseTips").then(function(prefab) {
            _this.bannerAdNode = cc.instantiate(prefab);
            cc.director.getScene().addChild(_this.bannerAdNode);
            var newPos = _this.gameUI.node.convertToWorldSpaceAR(new cc.Vec2(0, 0));
            _this.bannerAdNode.setPosition(newPos);
          });
        } else {
          cc.director.resume();
          this.bannerAdNode && this.bannerAdNode.isValid && this.bannerAdNode.destroy();
        }
      };
      GameMgr.prototype.initLevelProgress = function() {
        var _this = this;
        this.gameStartAccTime = 0;
        this.enemyFactory.getMainLevelMonsterGeneradeInfoAsync(this.mainLevelId).then(function(waveInfoList) {
          _this.gameUI.initLevelProgress(waveInfoList, _this.monsterCountsWave);
        });
      };
      GameMgr.prototype.triggerAutoFight = function() {
        this.isAutoFight = !this.isAutoFight;
        if (this.isAutoFight) {
          this.autoFightAnim.play();
          this.lastWorldPos.x = this.worldBirthPos.x;
          this.lastWorldPos.y = this.worldBirthPos.y + 1;
        } else this.autoFightAnim.stop();
      };
      __decorate([ property(GameUI_1.default) ], GameMgr.prototype, "gameUI", void 0);
      __decorate([ property(cc.Node) ], GameMgr.prototype, "roleBirthNode", void 0);
      __decorate([ property(cc.Node) ], GameMgr.prototype, "roleNode", void 0);
      __decorate([ property(cc.Node) ], GameMgr.prototype, "skillNode", void 0);
      __decorate([ property(cc.Node) ], GameMgr.prototype, "inputNode", void 0);
      __decorate([ property(cc.Node) ], GameMgr.prototype, "dartBirth", void 0);
      __decorate([ property ], GameMgr.prototype, "attackInterval", void 0);
      __decorate([ property({
        tooltip: "\u81ea\u52a8\u653b\u51fb\u6bd4\u624b\u52a8\u6162\u7684\u65f6\u95f4\u95f4\u9694"
      }) ], GameMgr.prototype, "autoAttackIntervalDelta", void 0);
      __decorate([ property({
        tooltip: "\u6bcf\u6ce2\u602a\u7269\u6570\u91cf\u5927\u4e8e\u7b49\u4e8e\u6b64\u503c\u624d\u4f1a\u663e\u793a\u5728\u8fdb\u5ea6\u6761\u4e0a"
      }) ], GameMgr.prototype, "monsterCountsWave", void 0);
      __decorate([ property(MusicController_1.default) ], GameMgr.prototype, "bossBgMusicController", void 0);
      __decorate([ property(MusicController_1.default) ], GameMgr.prototype, "gameEndMusicController", void 0);
      __decorate([ property(cc.Animation) ], GameMgr.prototype, "autoFightAnim", void 0);
      GameMgr = __decorate([ ccclass ], GameMgr);
      return GameMgr;
    }(cc.Component);
    exports.default = GameMgr;
    cc._RF.pop();
  }, {
    "../CameraShakeMgr": "CameraShakeMgr",
    "../Darts/DartBase": "DartBase",
    "../GameLogic": "GameLogic",
    "../GameRoot": "GameRoot",
    "../Global": "Global",
    "../State/StateMgr": "StateMgr",
    "../module/Music/MusicController": "MusicController",
    "./EnemyFactory": "EnemyFactory",
    "./GameUI": "GameUI"
  } ],
  GameRoot: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "827c1x8vqdJWpy8joBlCT0T", "GameRoot");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ResMgr_1 = require("./module/ResLoad/ResMgr");
    var UserInfo_1 = require("./module/UserInfo");
    var PlatformMgr_1 = require("./module/Platform/PlatformMgr");
    var NetworkMgr_1 = require("./module/Network/NetworkMgr");
    var MusicMgr_1 = require("./module/Music/MusicMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder;
    var GameRoot = function(_super) {
      __extends(GameRoot, _super);
      function GameRoot() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.testHeadImage = null;
        _this.testName = "hello";
        _this.testId = "001";
        _this.enableHeartCheck = true;
        _this.dartBasePrefab = null;
        return _this;
      }
      GameRoot_1 = GameRoot;
      GameRoot.prototype.onLoad = function() {
        cc.debug.setDisplayStats(false);
        cc.game.addPersistRootNode(this.node);
        GameRoot_1.instance = this;
        this.initModules();
      };
      GameRoot.prototype.start = function() {};
      GameRoot.prototype.update = function(dt) {
        this.userInfoModule.update(dt);
      };
      GameRoot.prototype.initModules = function() {
        this.resMgrModule = new ResMgr_1.default();
        this.resMgrModule.init({});
        this.platformMgrModule = new PlatformMgr_1.default();
        this.platformMgrModule.init({
          testHeadImage: this.testHeadImage,
          testName: this.testName,
          testId: this.testId
        });
        this.userInfoModule = new UserInfo_1.default();
        this.userInfoModule.init({
          dartBasePrefab: this.dartBasePrefab
        });
        this.musicMgrModule = new MusicMgr_1.default();
        this.musicMgrModule.init({});
      };
      GameRoot.prototype.getResMgrModule = function() {
        return this.resMgrModule;
      };
      GameRoot.prototype.getUserInfoModule = function() {
        return this.userInfoModule;
      };
      GameRoot.prototype.getPlatformMgrModule = function() {
        return this.platformMgrModule;
      };
      GameRoot.prototype.getNetworkMgrModule = function() {
        return this.networkMgrModule;
      };
      GameRoot.prototype.getMsgMap = function() {
        return NetworkMgr_1.MSG_MAP;
      };
      GameRoot.prototype.getMusicMgrModule = function() {
        return this.musicMgrModule;
      };
      GameRoot.prototype.fireEvent = function(name, data) {
        this.node.emit(name, data);
      };
      var GameRoot_1;
      GameRoot.instance = null;
      __decorate([ executionOrder(-10), property({
        tooltip: "\u6b63\u5e38\u73af\u5883\u4e0b\u7684\u6d4b\u8bd5\u5934\u50cf",
        type: cc.SpriteFrame
      }) ], GameRoot.prototype, "testHeadImage", void 0);
      __decorate([ property({
        tooltip: "\u6b63\u5e38\u73af\u5883\u4e0b\u7684\u6d4b\u8bd5\u540d\u5b57"
      }) ], GameRoot.prototype, "testName", void 0);
      __decorate([ property({
        tooltip: "\u6b63\u5e38\u73af\u5883\u4e0b\u7684\u6d4b\u8bd5ID"
      }) ], GameRoot.prototype, "testId", void 0);
      __decorate([ property({
        tooltip: "\u662f\u5426\u5f00\u542f\u5fc3\u8df3\u5305"
      }) ], GameRoot.prototype, "enableHeartCheck", void 0);
      __decorate([ property(cc.Prefab) ], GameRoot.prototype, "dartBasePrefab", void 0);
      GameRoot = GameRoot_1 = __decorate([ ccclass ], GameRoot);
      return GameRoot;
    }(cc.Component);
    exports.default = GameRoot;
    cc._RF.pop();
  }, {
    "./module/Music/MusicMgr": "MusicMgr",
    "./module/Network/NetworkMgr": "NetworkMgr",
    "./module/Platform/PlatformMgr": "PlatformMgr",
    "./module/ResLoad/ResMgr": "ResMgr",
    "./module/UserInfo": "UserInfo"
  } ],
  GameUIBgMoveMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c7151e94a5KWqopKIYEEJlG", "GameUIBgMoveMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameLogic_1 = require("../GameLogic");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameUIBgMoveMgr = function(_super) {
      __extends(GameUIBgMoveMgr, _super);
      function GameUIBgMoveMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.moveBgList = [];
        _this.moveSpeed = 100;
        _this.curMoveBgIndex = 0;
        return _this;
      }
      GameUIBgMoveMgr.prototype.start = function() {
        var size = cc.view.getVisibleSize();
        this.winHeight = size.height;
      };
      GameUIBgMoveMgr.prototype.update = function(dt) {
        dt *= GameLogic_1.default.instance.getTimeScale();
        this.updateBgMoving(dt);
      };
      GameUIBgMoveMgr.prototype.updateBgMoving = function(dt) {
        var velocity = this.moveSpeed * dt;
        for (var _i = 0, _a = this.moveBgList; _i < _a.length; _i++) {
          var bgNode = _a[_i];
          bgNode.y -= velocity;
        }
        if (this.moveBgList[this.curMoveBgIndex].y <= -this.winHeight) {
          this.moveBgList[this.curMoveBgIndex].y = this.winHeight;
          this.curMoveBgIndex++;
          this.curMoveBgIndex >= this.moveBgList.length && (this.curMoveBgIndex = 0);
        }
      };
      __decorate([ property(cc.Node) ], GameUIBgMoveMgr.prototype, "moveBgList", void 0);
      __decorate([ property ], GameUIBgMoveMgr.prototype, "moveSpeed", void 0);
      GameUIBgMoveMgr = __decorate([ ccclass ], GameUIBgMoveMgr);
      return GameUIBgMoveMgr;
    }(cc.Component);
    exports.default = GameUIBgMoveMgr;
    cc._RF.pop();
  }, {
    "../GameLogic": "GameLogic"
  } ],
  GameUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3e9dakcMbJFk7mg+T4HJ0ky", "GameUI");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameRoot_1 = require("../GameRoot");
    var GameLogic_1 = require("../GameLogic");
    var RoleTipsMgr_1 = require("../Tips/RoleTipsMgr");
    var ItemUIMgr_1 = require("../gameScene/ItemUIMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameUI = function(_super) {
      __extends(GameUI, _super);
      function GameUI() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.roleTipsPrefab = null;
        _this.roleNode = null;
        _this.skillPointProgress = null;
        _this.skillRenNode = null;
        _this.renAnim = null;
        _this.itemUIPrefab = null;
        _this.itemUIParent = null;
        _this.atkIntervalProgress = null;
        _this.pauseStateNode = null;
        _this.playStateNode = null;
        _this.smallMonsterPrefab = null;
        _this.smallBossPrefab = null;
        _this.monsterProgressStart = null;
        _this.monsterProgressEnd = null;
        _this.levelProgress = null;
        _this.monsterProgressTotalTime = 0;
        _this.monsterProgressTotalLength = 0;
        _this.isInitLevelProgress = false;
        return _this;
      }
      GameUI.prototype.start = function() {
        this.initRoleSkillPoints();
        this.initItemUI();
      };
      GameUI.prototype.initLevelProgress = function(waveInfoList, monsterCountsWave) {
        this.isInitLevelProgress = true;
        this.monsterProgressTotalTime = waveInfoList[waveInfoList.length - 1].delayTime;
        this.monsterProgressTotalLength = this.monsterProgressEnd.x - this.monsterProgressStart.x;
        for (var i = 0; i < waveInfoList.length; i++) {
          var waveInfo = waveInfoList[i];
          var newNode = void 0;
          waveInfo.isBoss ? newNode = cc.instantiate(this.smallBossPrefab) : waveInfo.count >= monsterCountsWave && (newNode = cc.instantiate(this.smallMonsterPrefab));
          if (newNode) {
            newNode.parent = this.monsterProgressStart;
            var percent = waveInfo.delayTime / this.monsterProgressTotalTime;
            var curPosX = this.monsterProgressTotalLength * percent;
            newNode.setPosition(new cc.Vec2(curPosX, 0));
          }
        }
      };
      GameUI.prototype.setLevelProgress = function(gameStartAccTime) {
        this.isInitLevelProgress && (gameStartAccTime >= this.monsterProgressTotalTime ? this.levelProgress.progress = 1 : this.levelProgress.progress = gameStartAccTime / this.monsterProgressTotalTime);
      };
      GameUI.prototype.setAtkIntervalProgress = function(percent) {
        this.atkIntervalProgress.progress = percent;
      };
      GameUI.prototype.setPausePlayGameState = function(isGamePlay) {
        this.pauseStateNode.active = isGamePlay;
        this.playStateNode.active = !isGamePlay;
      };
      GameUI.prototype.initItemUI = function() {
        GameLogic_1.default.instance.node.on("useItem", this.addItemUI, this);
      };
      GameUI.prototype.addItemUI = function(itemId, durationTime) {
        var oldItemUIMgr = this.getItemUIMgrByItemId(itemId);
        if (oldItemUIMgr) oldItemUIMgr.reset(); else {
          var itemUINode = cc.instantiate(this.itemUIPrefab);
          itemUINode.parent = this.itemUIParent;
          var itemUIMgr = itemUINode.getComponent(ItemUIMgr_1.default);
          itemUIMgr.setup(itemId, durationTime);
        }
      };
      GameUI.prototype.getItemUIMgrByItemId = function(itemId) {
        var itemUIMgrList = this.itemUIParent.getComponentsInChildren(ItemUIMgr_1.default);
        if (itemUIMgrList.length <= 0) return null;
        for (var _i = 0, itemUIMgrList_1 = itemUIMgrList; _i < itemUIMgrList_1.length; _i++) {
          var itemUIMgr = itemUIMgrList_1[_i];
          if (itemUIMgr.getItemId() === itemId) return itemUIMgr;
        }
        return null;
      };
      GameUI.prototype.initRoleSkillPoints = function() {
        this.skillPointProgress.progress = 0;
        this.skillRenNode.active = false;
        this.renAnimState = this.renAnim.getAnimationState("renScale");
        GameRoot_1.default.instance.node.on("oysterChange", this.oysterChange, this);
        GameRoot_1.default.instance.node.on("beginUseSkill", this.beginUseSkill, this);
      };
      GameUI.prototype.oysterChange = function(event) {
        var maxValue = GameRoot_1.default.instance.getUserInfoModule().getOysterMaxValue();
        if (0 === maxValue) {
          this.skillPointProgress.progress = 1;
          this.skillRenNode.active = true;
          this.renAnimState.isPlaying || this.renAnim.play();
          return;
        }
        var curValue = GameRoot_1.default.instance.getUserInfoModule().getOysterValue();
        this.skillPointProgress.progress = curValue / maxValue;
        if (this.skillPointProgress.progress >= 1) {
          this.skillRenNode.active = true;
          this.renAnimState.isPlaying || this.renAnim.play();
        }
      };
      GameUI.prototype.beginUseSkill = function(event) {
        var skillObj = event.skillObj;
        var callback = function() {
          if (skillObj && skillObj.node && skillObj.node.isValid) this.skillPointProgress.progress = 1 - skillObj.getUsePercentTime(); else {
            this.unschedule(callback);
            this.skillPointProgress.progress = 0;
            this.skillRenNode.active = false;
            this.renAnim.stop();
          }
        };
        this.schedule(callback, .05);
      };
      GameUI.prototype.showRoleTips = function(text) {
        this.deleteRoleTips();
        this.roleTipsNode = cc.instantiate(this.roleTipsPrefab);
        this.roleTipsNode.parent = this.roleNode;
        var roleTipsMgr = this.roleTipsNode.getComponent(RoleTipsMgr_1.default);
        roleTipsMgr.showText(text);
        this.unschedule(this.deleteRoleTips);
        this.scheduleOnce(this.deleteRoleTips, 3);
      };
      GameUI.prototype.deleteRoleTips = function() {
        this.roleTipsNode && this.roleTipsNode.isValid && this.roleTipsNode.destroy();
      };
      GameUI.prototype.onDestroy = function() {
        GameRoot_1.default.instance.node.off("oysterChange", this.oysterChange, this);
        GameRoot_1.default.instance.node.off("beginUseSkill", this.beginUseSkill, this);
        GameLogic_1.default.instance.node.off("useItem", this.addItemUI, this);
      };
      __decorate([ property(cc.Prefab) ], GameUI.prototype, "roleTipsPrefab", void 0);
      __decorate([ property(cc.Node) ], GameUI.prototype, "roleNode", void 0);
      __decorate([ property(cc.ProgressBar) ], GameUI.prototype, "skillPointProgress", void 0);
      __decorate([ property(cc.Node) ], GameUI.prototype, "skillRenNode", void 0);
      __decorate([ property(cc.Animation) ], GameUI.prototype, "renAnim", void 0);
      __decorate([ property(cc.Prefab) ], GameUI.prototype, "itemUIPrefab", void 0);
      __decorate([ property(cc.Node) ], GameUI.prototype, "itemUIParent", void 0);
      __decorate([ property(cc.ProgressBar) ], GameUI.prototype, "atkIntervalProgress", void 0);
      __decorate([ property(cc.Node) ], GameUI.prototype, "pauseStateNode", void 0);
      __decorate([ property(cc.Node) ], GameUI.prototype, "playStateNode", void 0);
      __decorate([ property(cc.Prefab) ], GameUI.prototype, "smallMonsterPrefab", void 0);
      __decorate([ property(cc.Prefab) ], GameUI.prototype, "smallBossPrefab", void 0);
      __decorate([ property(cc.Node) ], GameUI.prototype, "monsterProgressStart", void 0);
      __decorate([ property(cc.Node) ], GameUI.prototype, "monsterProgressEnd", void 0);
      __decorate([ property(cc.ProgressBar) ], GameUI.prototype, "levelProgress", void 0);
      GameUI = __decorate([ ccclass ], GameUI);
      return GameUI;
    }(cc.Component);
    exports.default = GameUI;
    cc._RF.pop();
  }, {
    "../GameLogic": "GameLogic",
    "../GameRoot": "GameRoot",
    "../Tips/RoleTipsMgr": "RoleTipsMgr",
    "../gameScene/ItemUIMgr": "ItemUIMgr"
  } ],
  GaussBlurs: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "98e26DAKlhKXpXEb3tTRAZF", "GaussBlurs");
    "use strict";
    var renderEngine = cc.renderer.renderEngine;
    var renderer = renderEngine.renderer;
    var shader = {
      name: "GaussBlurs",
      defines: [],
      params: [ {
        name: "bluramount",
        type: renderer.PARAM_FLOAT,
        defaultValue: .5
      } ],
      vert: "uniform mat4 viewProj;\n        attribute vec3 a_position;\n        attribute vec2 a_uv0;\n        varying vec2 uv0;\n        void main () {\n            vec4 pos = viewProj * vec4(a_position, 1);\n            gl_Position = pos;\n            uv0 = a_uv0;\n        }\n        ",
      frag: "uniform sampler2D texture;\n    varying vec2 uv0;\n    uniform float bluramount;\n\n    vec4 draw(vec2 uv) {\n        return texture2D(texture, uv).rgba; \n    }\n\n    float grid(float var, float size) {\n        return floor(var*size)/size;\n    }\n\n    float rand(vec2 co){\n        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n    }\n\n    void mainImage( out vec4 fragColor, in vec2 uv0 )\n    {\n        vec2 uv = uv0.xy;\n        vec4 blurred_image = vec4(0.);\n        #define repeats 5.\n        for (float i = 0.; i < repeats; i++) { \n            vec2 q = vec2(cos(degrees((i/repeats)*360.)),sin(degrees((i/repeats)*360.))) * (rand(vec2(i,uv.x+uv.y))+bluramount); \n            vec2 uv2 = uv+(q*bluramount);\n            blurred_image += draw(uv2)/2.;\n            q = vec2(cos(degrees((i/repeats)*360.)),sin(degrees((i/repeats)*360.))) * (rand(vec2(i+2.,uv.x+uv.y+24.))+bluramount); \n            uv2 = uv+(q*bluramount);\n            blurred_image += draw(uv2)/2.;\n        }\n        blurred_image /= repeats;\n        fragColor = vec4(blurred_image);\n    }\n\n    void main()\n    {\n        mainImage(gl_FragColor, uv0.xy);\n    }"
    };
    var CustomMaterial = require("CustomMaterial");
    CustomMaterial.addShader(shader);
    cc._RF.pop();
  }, {
    CustomMaterial: "CustomMaterial"
  } ],
  Global: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "66ce9r7VFBBor4DBNnWpLXU", "Global");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Global = function() {
      function Global() {}
      Global.AngleToRadians = function(angle) {
        return angle * Math.PI / 180;
      };
      Global.RadiansToAngle = function(radians) {
        return 180 * radians / Math.PI;
      };
      Global.Lerp = function(start, end, time) {
        return start + time * (end - start);
      };
      Global.GB_IsUseClientData = false;
      Global.GlobalEventMap = {
        ChangeScene: "ChangeScene"
      };
      Global.INFO_MSG = function(s) {
        console.info(s);
      };
      Global.DEBUG_MSG = function(s) {
        console.debug(s);
      };
      Global.ERROR_MSG = function(s) {
        console.error(s);
      };
      Global.WARNING_MSG = function(s) {
        console.warn(s);
      };
      Global.IsNullObject = function(obj) {
        for (var i in obj) return false;
        return true;
      };
      Global.GetRandomInt = function(min, max) {
        var ratio = Math.random();
        return min + Math.floor((max - min) * ratio);
      };
      Global.Rebound = function(velocity) {
        var outV = new cc.Vec2();
        var normalV = new cc.Vec2(1, 0);
        normalV.normalizeSelf();
        var nV = new cc.Vec2();
        nV.x = -(velocity.x * normalV.x + velocity.y * normalV.y) * normalV.x;
        nV.y = -(velocity.x * normalV.x + velocity.y * normalV.y) * normalV.y;
        var tV = velocity.add(nV);
        var fV = tV.mul(2).sub(velocity);
        outV.x = fV.x;
        outV.y = fV.y;
        return outV;
      };
      return Global;
    }();
    exports.default = Global;
    cc._RF.pop();
  }, {} ],
  Glowing: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "80af1OQIxFDrZFhUCExK1zY", "Glowing");
    "use strict";
    var renderEngine = cc.renderer.renderEngine;
    var renderer = renderEngine.renderer;
    var shader = {
      name: "Glowing",
      params: [ {
        name: "iResolution",
        type: renderer.PARAM_FLOAT3
      } ],
      defines: [],
      start: function start(sprite, material) {
        sprite.node.color = cc.color("#1A7ADC");
        var iResolution = new cc.Vec3(sprite.node.width, sprite.node.height, 0);
        material.setParamValue("iResolution", iResolution);
        this._start = Date.now();
      },
      update: function update(sprite, material) {
        var now = Date.now();
        var time = (now - this._start) / 1e3;
        material.setParamValue("iTime", time);
      },
      vert: "uniform mat4 viewProj;\n        attribute vec3 a_position;\n        attribute vec2 a_uv0;\n        varying vec2 uv0;\n        void main () {\n            vec4 pos = viewProj * vec4(a_position, 1);\n            gl_Position = pos;\n            uv0 = a_uv0;\n        }\n        ",
      frag: "uniform sampler2D texture;\n    uniform vec3 iResolution;\n    uniform float iTime;\n    uniform vec4 color;\n    varying vec2 uv0;\n\n    const float radius = 4.0;\n\n    void mainImage( out vec4 fragColor, in vec2 fragCoord )\n    {\n        vec2 uv = fragCoord.xy;\n        vec2 unit = 1.0 / iResolution.xy;\n        vec4 texel = texture2D(texture, uv);\n        vec4 finalColor = vec4(0.0);\n        float density = 0.0;\n\n        if(texel.a >= 1.0)\n        {\n            finalColor = texel;\n        }\n        else\n        {\n            for(int i = 0; i < int(radius); ++i)\n            {\n                density += texture2D(texture, vec2(uv.x + unit.x * float(i), uv.y + unit.y * float(i))).a;\n                density += texture2D(texture, vec2(uv.x - unit.x * float(i), uv.y + unit.y * float(i))).a;\n                density += texture2D(texture, vec2(uv.x - unit.x * float(i), uv.y - unit.y * float(i))).a;\n                density += texture2D(texture, vec2(uv.x + unit.x * float(i), uv.y - unit.y * float(i))).a;\n            }\n            density = density / radius;\n            finalColor = vec4(color.rgb * density, density);\n            finalColor += vec4(texel.rgb * texel.a, texel.a);\n        }\n        fragColor = finalColor;\n    }\n\n    void main()\n    {\n        mainImage(gl_FragColor, uv0.xy);\n    }"
    };
    var CustomMaterial = require("CustomMaterial");
    CustomMaterial.addShader(shader);
    cc._RF.pop();
  }, {
    CustomMaterial: "CustomMaterial"
  } ],
  ItemBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "02ab3hNSANMvbP9nX00yOku", "ItemBase");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DartBase_1 = require("../Darts/DartBase");
    var GameRoot_1 = require("../GameRoot");
    var GameLogic_1 = require("../GameLogic");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ItemBase = function(_super) {
      __extends(ItemBase, _super);
      function ItemBase() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.disappearTime = 15;
        _this.durationTime = 10;
        return _this;
      }
      ItemBase.prototype.start = function() {
        this.stateMgr = GameRoot_1.default.instance.getUserInfoModule().getStateMgr();
        this.collider = this.getComponent(cc.CircleCollider);
        this.anim = this.getComponent(cc.Animation);
        this.autoDisappear();
      };
      ItemBase.prototype.setup = function(itemId) {
        this.itemId = itemId;
      };
      ItemBase.prototype.autoDisappear = function() {
        var _this = this;
        var timeDown = 5;
        var waitTime = this.disappearTime - timeDown;
        waitTime < 0 && (waitTime = 0);
        this.scheduleOnce(function() {
          _this.anim.play();
          _this.scheduleOnce(function() {
            _this.delete();
          }, timeDown);
        }, waitTime);
      };
      ItemBase.prototype.onCollisionEnter = function(other, self) {
        var dartBase = other.node.getComponent(DartBase_1.default);
        dartBase && this.use();
      };
      ItemBase.prototype.use = function() {
        this.delete();
      };
      ItemBase.prototype.delete = function() {
        GameLogic_1.default.instance.getItemMgr().removeGameDropItem(this);
        this.node && this.node.isValid && this.node.destroy();
      };
      ItemBase.prototype.getWorldColliderRect = function() {
        return new cc.Rect(this.node.x - this.collider.radius, this.node.y - this.collider.radius, 2 * this.collider.radius, 2 * this.collider.radius);
      };
      __decorate([ property ], ItemBase.prototype, "disappearTime", void 0);
      __decorate([ property ], ItemBase.prototype, "durationTime", void 0);
      ItemBase = __decorate([ ccclass ], ItemBase);
      return ItemBase;
    }(cc.Component);
    exports.default = ItemBase;
    cc._RF.pop();
  }, {
    "../Darts/DartBase": "DartBase",
    "../GameLogic": "GameLogic",
    "../GameRoot": "GameRoot"
  } ],
  ItemMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c75e7S0lNhLpqjhzNIKxy/j", "ItemMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ItemMgr = function() {
      function ItemMgr() {}
      ItemMgr.prototype.init = function() {
        this.gameItemsList = [];
      };
      ItemMgr.prototype.addGameDropItem = function(itemBase) {
        this.gameItemsList.push(itemBase);
      };
      ItemMgr.prototype.removeGameDropItem = function(itemBase) {
        for (var i = 0; i < this.gameItemsList.length; i++) if (this.gameItemsList[i] === itemBase) {
          this.gameItemsList.splice(i, 1);
          break;
        }
      };
      ItemMgr.prototype.getGameDropItems = function() {
        return this.gameItemsList;
      };
      ItemMgr = __decorate([ ccclass ], ItemMgr);
      return ItemMgr;
    }();
    exports.default = ItemMgr;
    cc._RF.pop();
  }, {} ],
  ItemRebound: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0c0dfBpWq5CwrvH4RNxx4/6", "ItemRebound");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ItemBase_1 = require("./ItemBase");
    var StateMgr_1 = require("../State/StateMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ItemRebound = function(_super) {
      __extends(ItemRebound, _super);
      function ItemRebound() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ItemRebound.prototype.use = function() {
        this.stateMgr.addState(StateMgr_1.StateType.Rebound, this.durationTime);
        this.delete();
      };
      ItemRebound = __decorate([ ccclass ], ItemRebound);
      return ItemRebound;
    }(ItemBase_1.default);
    exports.default = ItemRebound;
    cc._RF.pop();
  }, {
    "../State/StateMgr": "StateMgr",
    "./ItemBase": "ItemBase"
  } ],
  ItemScatter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "79041cDMZpNkLzsPp/N+uBo", "ItemScatter");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ItemBase_1 = require("./ItemBase");
    var StateMgr_1 = require("../State/StateMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ItemScatter = function(_super) {
      __extends(ItemScatter, _super);
      function ItemScatter() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ItemScatter.prototype.use = function() {
        this.stateMgr.addState(StateMgr_1.StateType.Scatter, this.durationTime);
        this.delete();
      };
      ItemScatter = __decorate([ ccclass ], ItemScatter);
      return ItemScatter;
    }(ItemBase_1.default);
    exports.default = ItemScatter;
    cc._RF.pop();
  }, {
    "../State/StateMgr": "StateMgr",
    "./ItemBase": "ItemBase"
  } ],
  ItemUIMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3f987THjcNOj55fDEnMxZU5", "ItemUIMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DropItemTipMgr_1 = require("../Item/DropItemTipMgr");
    var GameLogic_1 = require("../GameLogic");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ItemUIMgr = function(_super) {
      __extends(ItemUIMgr, _super);
      function ItemUIMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.leftTimeProgress = null;
        _this.nameLabel = null;
        _this.accTime = 0;
        _this.itemId = 0;
        return _this;
      }
      ItemUIMgr.prototype.start = function() {};
      ItemUIMgr.prototype.setup = function(itemId, durationTime) {
        var dropItemTipMgr = this.getComponent(DropItemTipMgr_1.default);
        dropItemTipMgr.changeSkinByItemId(itemId);
        this.nameLabel.string = GameLogic_1.default.instance.getItemNameById(itemId);
        this.itemId = itemId;
        this.durationTime = durationTime;
        this.accTime = 0;
        this.leftTimeProgress.progress = 1;
      };
      ItemUIMgr.prototype.getItemId = function() {
        return this.itemId;
      };
      ItemUIMgr.prototype.reset = function() {
        this.accTime = 0;
      };
      ItemUIMgr.prototype.update = function(dt) {
        this.accTime += dt;
        if (this.accTime > this.durationTime) this.delete(); else {
          var percent = this.accTime / this.durationTime;
          this.leftTimeProgress.progress = 1 - percent;
        }
      };
      ItemUIMgr.prototype.delete = function() {
        this.node && this.node.isValid && this.node.destroy();
      };
      __decorate([ property(cc.ProgressBar) ], ItemUIMgr.prototype, "leftTimeProgress", void 0);
      __decorate([ property(cc.Label) ], ItemUIMgr.prototype, "nameLabel", void 0);
      ItemUIMgr = __decorate([ ccclass ], ItemUIMgr);
      return ItemUIMgr;
    }(cc.Component);
    exports.default = ItemUIMgr;
    cc._RF.pop();
  }, {
    "../GameLogic": "GameLogic",
    "../Item/DropItemTipMgr": "DropItemTipMgr"
  } ],
  LandMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "718c1Zx1btKgpGC6TofOHPn", "LandMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MonsterBase_1 = require("../Monsters/MonsterBase");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LandMgr = function(_super) {
      __extends(LandMgr, _super);
      function LandMgr() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      LandMgr.prototype.onCollisionEnter = function(other, self) {
        var monsterBase = other.node.getComponent(MonsterBase_1.MonsterBase);
        monsterBase && monsterBase.dead(false);
      };
      LandMgr = __decorate([ ccclass ], LandMgr);
      return LandMgr;
    }(cc.Component);
    exports.default = LandMgr;
    cc._RF.pop();
  }, {
    "../Monsters/MonsterBase": "MonsterBase"
  } ],
  LayerMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6759ei/j7ZIeKsekdxt9uod", "LayerMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LayerMgr = function(_super) {
      __extends(LayerMgr, _super);
      function LayerMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.objectsList = [];
        return _this;
      }
      LayerMgr_1 = LayerMgr;
      LayerMgr.prototype.onLoad = function() {
        LayerMgr_1.instance = this;
      };
      LayerMgr.prototype.start = function() {};
      LayerMgr.prototype.reset = function() {
        this.objectsList = [];
      };
      LayerMgr.prototype.addUniqueObject = function(object) {
        for (var _i = 0, _a = this.objectsList; _i < _a.length; _i++) {
          var obj = _a[_i];
          if (obj === object) return false;
        }
        this.objectsList.push(object);
        return true;
      };
      LayerMgr.prototype.removeOneDestroyObject = function() {
        for (var i = 0; i < this.objectsList.length; i++) {
          var curNode = this.objectsList[i];
          if (!curNode || !curNode.isValid) {
            this.objectsList.splice(i, 1);
            return true;
          }
        }
        return false;
      };
      LayerMgr.prototype.removeAllDestroyObject = function() {
        var isCheck = true;
        while (isCheck) isCheck = this.removeOneDestroyObject();
      };
      LayerMgr.prototype.handleLayerByY = function() {
        this.objectsList.sort(function(a, b) {
          return b.y - a.y;
        });
        for (var i = 1; i <= this.objectsList.length; i++) this.objectsList[i - 1].zIndex = i;
      };
      LayerMgr.prototype.update = function(dt) {
        if (this.objectsList.length > 0) {
          this.removeAllDestroyObject();
          this.handleLayerByY();
        }
      };
      var LayerMgr_1;
      LayerMgr = LayerMgr_1 = __decorate([ ccclass ], LayerMgr);
      return LayerMgr;
    }(cc.Component);
    exports.default = LayerMgr;
    cc._RF.pop();
  }, {} ],
  LineMovingMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "36b77HjtS1F7ojabxWvzCJd", "LineMovingMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LineMovingMgr = function(_super) {
      __extends(LineMovingMgr, _super);
      function LineMovingMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.speed = 100;
        _this.accSpeed = .2;
        _this.isBeginMove = false;
        _this.stepScaler = 1;
        return _this;
      }
      LineMovingMgr.prototype.start = function() {};
      LineMovingMgr.prototype.beginMove = function(pos) {
        var _this = this;
        this.destWorldPos = pos;
        var dir = this.destWorldPos.sub(this.node.getPosition());
        this.velocity = dir.normalize().mul(this.speed);
        this.scheduleOnce(function() {
          _this.isBeginMove = true;
        }, .2);
        this.scheduleOnce(function() {
          _this.delete();
        }, 3);
      };
      LineMovingMgr.prototype.update = function(dt) {
        if (this.isBeginMove) {
          var moveDis = this.velocity.mul(dt * this.stepScaler);
          this.node.x += moveDis.x;
          this.node.y += moveDis.y;
          this.stepScaler += this.accSpeed * dt;
          var deltaLength = this.node.getPosition().sub(this.destWorldPos).mag();
          deltaLength <= 50 && this.delete();
        }
      };
      LineMovingMgr.prototype.delete = function() {
        this.node && this.node.isValid && this.node.destroy();
      };
      __decorate([ property ], LineMovingMgr.prototype, "speed", void 0);
      __decorate([ property ], LineMovingMgr.prototype, "accSpeed", void 0);
      LineMovingMgr = __decorate([ ccclass ], LineMovingMgr);
      return LineMovingMgr;
    }(cc.Component);
    exports.default = LineMovingMgr;
    cc._RF.pop();
  }, {} ],
  MaskShader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ff865DMY+hLe6zyhrIX2YAn", "MaskShader");
    "use strict";
    var renderEngine = cc.renderer.renderEngine;
    var renderer = renderEngine.renderer;
    var CustomMaterial = require("CustomMaterial");
    var shader = {
      name: "Mask",
      params: [ {
        name: "u_edge",
        type: renderer.PARAM_FLOAT,
        defaultValue: .5
      } ],
      defines: [],
      vert: "\n        uniform mat4 viewProj;\n        attribute vec3 a_position;\n        attribute vec2 a_uv0;\n        varying vec2 uv0;\n        void main () {\n            vec4 pos = viewProj * vec4(a_position, 1);\n            gl_Position = pos;\n            uv0 = a_uv0;\n        }",
      frag: "\n        uniform sampler2D texture;\n        varying vec2 uv0;\n    \n        uniform float u_edge;\n    \n        void main()\n        {\n            float edge = u_edge;\n            float dis = 0.0;\n            vec2 texCoord = uv0;\n            if ( texCoord.x < edge )\n            {\n                if ( texCoord.y < edge )\n                {\n                    dis = distance( texCoord, vec2(edge, edge) );\n                }\n                if ( texCoord.y > (1.0 - edge) )\n                {\n                    dis = distance( texCoord, vec2(edge, (1.0 - edge)) );\n                }\n            }\n            else if ( texCoord.x > (1.0 - edge) )\n            {\n                if ( texCoord.y < edge )\n                {\n                    dis = distance( texCoord, vec2((1.0 - edge), edge ) );\n                }\n                if ( texCoord.y > (1.0 - edge) )\n                {\n                    dis = distance( texCoord, vec2((1.0 - edge), (1.0 - edge) ) );\n                }\n            }\n      \n            if(dis > 0.001)\n            {\n                // \u5916\u5708\u6c9f\n                float gap = edge * 0.02;\n                if(dis <= edge - gap)\n                {\n                    gl_FragColor = texture2D( texture,texCoord);\n                }\n                else if(dis <= edge)\n                {\n                    // \u5e73\u6ed1\u8fc7\u6e21\n                    float t = smoothstep(0.,gap,edge-dis);\n                    vec4 color = texture2D( texture,texCoord);\n                    gl_FragColor = vec4(color.rgb,t);\n                }else{\n                    gl_FragColor = vec4(0.,0.,0.,0.);\n                }\n            }\n            else\n            {\n                gl_FragColor = texture2D( texture,texCoord);\n            }\n        }\n        "
    };
    CustomMaterial.addShader(shader);
    cc._RF.pop();
  }, {
    CustomMaterial: "CustomMaterial"
  } ],
  ModulesBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "32d45nFxZlDboflVOKzwyC5", "ModulesBase");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameRoot_1 = require("../GameRoot");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ModulesBase = function() {
      function ModulesBase() {}
      ModulesBase.prototype.init = function(data) {};
      ModulesBase.prototype.fireEvent = function(name, data) {
        GameRoot_1.default.instance.fireEvent(name, data);
      };
      ModulesBase.prototype.update = function(dt) {};
      ModulesBase = __decorate([ ccclass ], ModulesBase);
      return ModulesBase;
    }();
    exports.default = ModulesBase;
    cc._RF.pop();
  }, {
    "../GameRoot": "GameRoot"
  } ],
  MonsterBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "53160N3VcpPGIyoSXQuAnhy", "MonsterBase");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameLogic_1 = require("../GameLogic");
    var GameRoot_1 = require("../GameRoot");
    var MusicController_1 = require("../module/Music/MusicController");
    var DropItemTipMgr_1 = require("../Item/DropItemTipMgr");
    var AutoMovingMgr_1 = require("../MoveingObject/AutoMovingMgr");
    var CameraShakeMgr_1 = require("../CameraShakeMgr");
    var Global_1 = require("../Global");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MOVE_DIR_X_TAG = "moveDirX";
    var MOVE_DIR_Y_TAG = "moveDirY";
    var DROP_ITEM_ID_TAG = "dropItemId";
    var MonsterBase = function(_super) {
      __extends(MonsterBase, _super);
      function MonsterBase() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.hp = 10;
        _this.speed = 100;
        _this.awardOyster = 5;
        _this.awardGold = 5;
        _this.isBoss = false;
        _this.isActive = false;
        _this.isDead = false;
        _this.isStopAI = false;
        return _this;
      }
      MonsterBase.prototype.start = function() {
        this.curHp = this.hp;
        this.musicController = this.getComponent(MusicController_1.default);
        this.animController = this.getComponent(cc.Animation);
      };
      MonsterBase.prototype.init = function(birthPos, monsterData) {
        this.isInit = true;
        this.setActive(false);
        this.boxCollider = this.getComponent(cc.BoxCollider);
        this.node.setPosition(birthPos);
        var moveDirX = monsterData[MOVE_DIR_X_TAG];
        var moveDirY = monsterData[MOVE_DIR_Y_TAG];
        if (0 !== moveDirX || 0 !== moveDirY) {
          this.moveDir = new cc.Vec2();
          this.velocity = new cc.Vec2();
          this.moveDir.x = moveDirX;
          this.moveDir.y = moveDirY;
          this.velocity = this.moveDir.normalize().mul(this.speed);
        }
        this.dropItemId = monsterData[DROP_ITEM_ID_TAG];
        0 !== this.dropItemId && this.showDropItemTip(true);
      };
      MonsterBase.prototype.setActive = function(isActive) {
        this.isActive = isActive;
        this.node.active = isActive;
      };
      MonsterBase.prototype.isAlive = function() {
        if (this.isActive && this.node.isValid) return true;
        return false;
      };
      MonsterBase.prototype.getWorldColliderRect = function() {
        var worldPos = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
        return new cc.Rect(worldPos.x - this.boxCollider.size.width / 2, worldPos.y - this.boxCollider.size.height / 2, this.boxCollider.size.width, this.boxCollider.size.height);
      };
      MonsterBase.prototype.update = function(dt) {
        if (!this.isInit || !this.isActive) return;
        if (this.getIsStopAI()) return;
        dt *= GameLogic_1.default.instance.getTimeScale();
        if (this.velocity) {
          var moveDis = this.velocity.mul(dt);
          this.node.x += moveDis.x;
          this.node.y += moveDis.y;
        } else this.node.y -= this.speed * dt;
      };
      MonsterBase.prototype.fallBack = function() {
        var upAction = cc.moveBy(.1, new cc.Vec2(0, 70));
        var downAction = cc.moveBy(.05, new cc.Vec2(0, -20));
        var action = cc.sequence(upAction, downAction);
        action.easing(cc.easeOut(3));
        this.node.runAction(action);
      };
      MonsterBase.prototype.getVelocity = function() {
        return this.velocity;
      };
      MonsterBase.prototype.setVelocity = function(velocity) {
        if (this.velocity) {
          this.velocity.x = velocity.x;
          this.velocity.y = velocity.y;
        }
      };
      MonsterBase.prototype.hurt = function(damage) {
        this.curHp -= damage;
        this.musicController.play();
        this.createHitEffect();
        this.fallBack();
        this.curHp <= 0 && this.dead(true);
      };
      MonsterBase.prototype.delete = function() {
        this.node && this.node.isValid && this.node.destroy();
      };
      MonsterBase.prototype.dead = function(isUserKill) {
        var _this = this;
        void 0 === isUserKill && (isUserKill = true);
        if (this.isDead) return;
        this.isDead = true;
        if (isUserKill) {
          CameraShakeMgr_1.default.instance.shake(.02, 2, 5, CameraShakeMgr_1.ShakeDirectionType.Up_Down);
          var worldPos = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
          this.dropGold(worldPos, 1);
          this.dropSoul(worldPos, 1);
          0 !== this.dropItemId && this.handleDropItem(worldPos);
        }
        this.showDropItemTip(false);
        this.scheduleOnce(function() {
          _this.delete();
        }, .2);
      };
      MonsterBase.prototype.dropGold = function(worldPos, dropNum, min, max) {
        void 0 === min && (min = 0);
        void 0 === max && (max = 0);
        if (this.awardGold <= 0) return;
        AutoMovingMgr_1.default.instance.generadeMoveObject(AutoMovingMgr_1.MoveObjectType.Gold, worldPos);
        for (var i = 1; i < dropNum; i++) {
          var curPos = worldPos;
          var randomInt = Global_1.default.GetRandomInt(min, max);
          curPos.x = worldPos.x + randomInt;
          curPos.y = worldPos.y + randomInt;
          AutoMovingMgr_1.default.instance.generadeMoveObject(AutoMovingMgr_1.MoveObjectType.Gold, worldPos);
        }
      };
      MonsterBase.prototype.dropSoul = function(worldPos, dropNum, min, max) {
        void 0 === min && (min = 0);
        void 0 === max && (max = 0);
        if (this.awardOyster <= 0) return;
        GameRoot_1.default.instance.getUserInfoModule().addOyster(this.awardOyster);
        AutoMovingMgr_1.default.instance.generadeMoveObject(AutoMovingMgr_1.MoveObjectType.Soul, worldPos);
        for (var i = 1; i < dropNum; i++) {
          var curPos = worldPos;
          var randomInt = Global_1.default.GetRandomInt(min, max);
          curPos.x = worldPos.x + randomInt;
          curPos.y = worldPos.y + randomInt;
          AutoMovingMgr_1.default.instance.generadeMoveObject(AutoMovingMgr_1.MoveObjectType.Soul, worldPos);
        }
      };
      MonsterBase.prototype.showDropItemTip = function(isShow) {
        var _this = this;
        isShow ? GameLogic_1.default.instance.getDropItemTipAsync().then(function(prefab) {
          if (prefab) {
            _this.dropItemTipNode = cc.instantiate(prefab);
            var dropItemTipMgr = _this.dropItemTipNode.getComponent(DropItemTipMgr_1.default);
            dropItemTipMgr.changeSkinByItemId(_this.dropItemId);
            _this.dropItemTipNode.parent = _this.node;
            _this.dropItemTipNode.zIndex = -1;
          }
        }) : this.dropItemTipNode && this.dropItemTipNode.isValid && this.dropItemTipNode.destroy();
      };
      MonsterBase.prototype.createHitEffect = function() {
        var _this = this;
        GameLogic_1.default.instance.getHitEffectPrefabAsync().then(function(prefab) {
          if (prefab) {
            var hitEffectNode = cc.instantiate(prefab);
            hitEffectNode.parent = _this.node;
          }
        });
      };
      MonsterBase.prototype.handleDropItem = function(birthPos) {
        GameLogic_1.default.instance.useItem(this.dropItemId);
      };
      MonsterBase.prototype.setStopAI = function(isStopAI) {
        this.isStopAI = isStopAI;
      };
      MonsterBase.prototype.getIsStopAI = function() {
        return this.isStopAI;
      };
      MonsterBase.prototype.getIsBoss = function() {
        return this.isBoss;
      };
      __decorate([ property ], MonsterBase.prototype, "hp", void 0);
      __decorate([ property ], MonsterBase.prototype, "speed", void 0);
      __decorate([ property ], MonsterBase.prototype, "awardOyster", void 0);
      __decorate([ property ], MonsterBase.prototype, "awardGold", void 0);
      __decorate([ property ], MonsterBase.prototype, "isBoss", void 0);
      MonsterBase = __decorate([ ccclass ], MonsterBase);
      return MonsterBase;
    }(cc.Component);
    exports.MonsterBase = MonsterBase;
    cc._RF.pop();
  }, {
    "../CameraShakeMgr": "CameraShakeMgr",
    "../GameLogic": "GameLogic",
    "../GameRoot": "GameRoot",
    "../Global": "Global",
    "../Item/DropItemTipMgr": "DropItemTipMgr",
    "../MoveingObject/AutoMovingMgr": "AutoMovingMgr",
    "../module/Music/MusicController": "MusicController"
  } ],
  MonstersBallMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "788caMSbe9GBZlByzd4jZUa", "MonstersBallMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MonsterBase_1 = require("../MonsterBase");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MonstersBall = function(_super) {
      __extends(MonstersBall, _super);
      function MonstersBall() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      MonstersBall = __decorate([ ccclass ], MonstersBall);
      return MonstersBall;
    }(MonsterBase_1.MonsterBase);
    exports.default = MonstersBall;
    cc._RF.pop();
  }, {
    "../MonsterBase": "MonsterBase"
  } ],
  MonstersDartMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8df2bZb0blIN77i9RKJ4aJj", "MonstersDartMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameLogic_1 = require("../../GameLogic");
    var MonsterBase_1 = require("../MonsterBase");
    var ShaderHelper = require("../../module/Shader/ShaderHelper");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MonstersDart = function(_super) {
      __extends(MonstersDart, _super);
      function MonstersDart() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.damageSpeed = 10;
        _this.returnSpeed = 150;
        _this.canHurt = false;
        return _this;
      }
      MonstersDart.prototype.start = function() {
        _super.prototype.start.call(this);
        this.aniControl = this.getComponentInChildren(cc.Animation);
        var animState = this.aniControl.play();
        animState.speed = .5;
        this.beginY = this.node.y;
        this.canHurt = true;
      };
      MonstersDart.prototype.hurt = function(damage) {
        if (!this.canHurt) return;
        this.createHitEffect();
        this.musicController.play();
        if (this.speed <= 0) {
          this.canHurt = false;
          this.speed = -this.returnSpeed;
          return;
        }
        this.speed -= this.damageSpeed;
      };
      MonstersDart.prototype.delete = function() {
        if (this.node && this.node.isValid) {
          this.node.emit("dartDead");
          this.node.destroy();
        }
      };
      MonstersDart.prototype.dead = function(isUserKill) {
        void 0 === isUserKill && (isUserKill = true);
        isUserKill ? this.delete() : this.node.destroy();
      };
      MonstersDart.prototype.update = function(dt) {
        this.node.y > this.beginY && this.dead(true);
        dt *= GameLogic_1.default.instance.getTimeScale();
        if (this.velocity) {
          var moveDis = this.velocity.mul(dt);
          this.node.x += moveDis.x;
          this.node.y += moveDis.y;
        } else this.node.y -= this.speed * dt;
      };
      __decorate([ property({
        tooltip: "\u653b\u51fb\u540e\u98de\u9556\u51cf\u901f\u7684\u5e45\u5ea6"
      }) ], MonstersDart.prototype, "damageSpeed", void 0);
      __decorate([ property({
        tooltip: "\u98de\u9556\u8fd4\u56de\u65f6\u7684\u901f\u5ea6"
      }) ], MonstersDart.prototype, "returnSpeed", void 0);
      MonstersDart = __decorate([ ccclass ], MonstersDart);
      return MonstersDart;
    }(MonsterBase_1.MonsterBase);
    exports.default = MonstersDart;
    cc._RF.pop();
  }, {
    "../../GameLogic": "GameLogic",
    "../../module/Shader/ShaderHelper": "ShaderHelper",
    "../MonsterBase": "MonsterBase"
  } ],
  MonstersDoorMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4e6a0AxpsZHj6U2ljE0IhtU", "MonstersDoorMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MonsterBase_1 = require("../MonsterBase");
    var EnemyFactory_1 = require("../../gameScene/EnemyFactory");
    var FlashWhiteMgr_1 = require("../../FlashWhiteMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MonstersDoor = function(_super) {
      __extends(MonstersDoor, _super);
      function MonstersDoor() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.delayGeneradeMonster = 3;
        _this.levelId = 1e4;
        _this.delayLoopGeneradeMonster = 5;
        _this.flashWhiteMgr = null;
        _this.curHitCount = 0;
        _this.canHurt = false;
        return _this;
      }
      MonstersDoor.prototype.start = function() {
        var _this = this;
        _super.prototype.start.call(this);
        this.enemyFactory = this.getComponent(EnemyFactory_1.default);
        this.scheduleOnce(function() {
          _this.beginGeneradeMonsters();
        }, this.delayGeneradeMonster);
      };
      MonstersDoor.prototype.hurt = function(damage) {
        if (!this.canHurt) return;
        this.curHp -= damage;
        if (this.curHp <= 0) {
          this.canHurt = false;
          this.dead(true);
        }
        this.playHurtAnim();
      };
      MonstersDoor.prototype.playHurtAnim = function() {
        this.musicController.play();
        this.flashWhiteMgr.play();
      };
      MonstersDoor.prototype.delete = function() {
        if (this.node && this.node.isValid) {
          this.node.emit("doorDestroy");
          this.node.destroy();
        }
      };
      MonstersDoor.prototype.dead = function(isUserKill) {
        void 0 === isUserKill && (isUserKill = true);
        this.delete();
      };
      MonstersDoor.prototype.beginGeneradeMonsters = function() {
        var _this = this;
        this.enemyFactory.getMainLevelWaveCountAsync(this.levelId).then(function(totalWaveCount) {
          var promiseList = [];
          for (var i = 1; i <= totalWaveCount; i++) promiseList.push(_this.enemyFactory.generadeEnemysAsync(_this.levelId, i));
          Promise.all(promiseList).then(function(monstersBaseArrayList) {
            _this.generaderMonstersFinish();
          }).catch(function(err) {});
        });
      };
      MonstersDoor.prototype.generaderMonstersFinish = function() {
        var _this = this;
        this.scheduleOnce(function() {
          _this.beginGeneradeMonsters();
        }, this.delayLoopGeneradeMonster);
      };
      __decorate([ property({
        tooltip: "\u5ef6\u8fdf\u591a\u5c11\u79d2\u5f00\u59cb\u751f\u6210\u602a\u7269"
      }) ], MonstersDoor.prototype, "delayGeneradeMonster", void 0);
      __decorate([ property({
        tooltip: "\u751f\u6210\u602a\u7269\u5173\u5361\u6587\u4ef6\u7684id"
      }) ], MonstersDoor.prototype, "levelId", void 0);
      __decorate([ property({
        tooltip: "\u5ef6\u8fdf\u591a\u5c11\u79d2\u5faa\u73af\u751f\u6210\u602a\u7269"
      }) ], MonstersDoor.prototype, "delayLoopGeneradeMonster", void 0);
      __decorate([ property(FlashWhiteMgr_1.default) ], MonstersDoor.prototype, "flashWhiteMgr", void 0);
      MonstersDoor = __decorate([ ccclass ], MonstersDoor);
      return MonstersDoor;
    }(MonsterBase_1.MonsterBase);
    exports.default = MonstersDoor;
    cc._RF.pop();
  }, {
    "../../FlashWhiteMgr": "FlashWhiteMgr",
    "../../gameScene/EnemyFactory": "EnemyFactory",
    "../MonsterBase": "MonsterBase"
  } ],
  Mosaic: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a73f8ih8ixF3oFOfCSJarUr", "Mosaic");
    "use strict";
    var renderEngine = cc.renderer.renderEngine;
    var renderer = renderEngine.renderer;
    var shader = {
      name: "Mosaic",
      params: [ {
        name: "iResolution",
        type: renderer.PARAM_FLOAT3
      }, {
        name: "mosaicSize",
        type: renderer.PARAM_FLOAT
      } ],
      defines: [],
      start: function start(sprite, material) {
        var iResolution = new cc.Vec3(sprite.node.width, sprite.node.height, 0);
        material.setParamValue("iResolution", iResolution);
        material.setParamValue("mosaicSize", 16);
      },
      vert: "uniform mat4 viewProj;\n        attribute vec3 a_position;\n        attribute vec2 a_uv0;\n        varying vec2 uv0;\n        void main () {\n            vec4 pos = viewProj * vec4(a_position, 1);\n            gl_Position = pos;\n            uv0 = a_uv0;\n        }\n        ",
      frag: "uniform sampler2D texture;\n    uniform vec3 iResolution;\n    uniform float mosaicSize;\n    varying vec2 uv0;\n     \n    void main(void)\n    {\n        vec4 color;\n        vec2 xy = vec2(uv0.x * iResolution.x, uv0.y * iResolution.y);\n        vec2 xyMosaic = vec2(floor(xy.x / mosaicSize) * mosaicSize, floor(xy.y / mosaicSize) * mosaicSize);\n        vec2 xyFloor = vec2(floor(mod(xy.x, mosaicSize)), floor(mod(xy.y, mosaicSize)));\n        vec2 uvMosaic = vec2(xyMosaic.x / iResolution.x, xyMosaic.y / iResolution.y);\n        color = texture2D( texture, uvMosaic);\n        gl_FragColor = color; \n    }"
    };
    var CustomMaterial = require("CustomMaterial");
    CustomMaterial.addShader(shader);
    cc._RF.pop();
  }, {
    CustomMaterial: "CustomMaterial"
  } ],
  MusicController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "347dfhrqSlIAJtOMO8wCQQo", "MusicController");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameRoot_1 = require("../../GameRoot");
    var Global_1 = require("../../Global");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MusicController = function(_super) {
      __extends(MusicController, _super);
      function MusicController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.clipList = [];
        _this.isBgMusic = false;
        _this.volume = 1;
        _this.loop = false;
        _this.playOnLoad = false;
        _this.playOnClick = false;
        return _this;
      }
      MusicController.prototype.start = function() {
        this.playOnLoad && this.play();
        this.playOnClick && this.listenToClick();
      };
      MusicController.prototype.listenToClick = function() {
        var self = this;
        this.node.on("click", function() {
          self.stop();
          self.play();
        });
        this.node.on("toggle", function() {
          self.stop();
          self.play();
        });
      };
      MusicController.prototype.onDestroy = function() {
        GameRoot_1.default.instance.getMusicMgrModule().removeSoundEffectCtrl(this);
        this.stop();
      };
      MusicController.prototype.setBgMusicVolume = function(value) {
        var musicMgr = GameRoot_1.default.instance.getMusicMgrModule();
        musicMgr.getCanPlay(this.isBgMusic) && this.isBgMusic && cc.audioEngine.setMusicVolume(value);
      };
      MusicController.prototype.play = function() {
        var musicMgr = GameRoot_1.default.instance.getMusicMgrModule();
        if (musicMgr.getCanPlay(this.isBgMusic)) {
          var curClip = this.randomGetClip();
          if (!curClip) {
            Global_1.default.ERROR_MSG("music clip list is null!");
            return;
          }
          if (this.isBgMusic) {
            this.audioID = cc.audioEngine.playMusic(curClip, this.loop);
            cc.audioEngine.setMusicVolume(this.volume);
          } else this.audioID = cc.audioEngine.play(curClip, this.loop, this.volume);
        }
        this.isBgMusic ? musicMgr.setBGMusicController(this) : musicMgr.addSoundEffectCtrl(this);
      };
      MusicController.prototype.stop = function() {
        this.isBgMusic ? cc.audioEngine.stopMusic() : void 0 !== this.audioID && cc.audioEngine.stop(this.audioID);
      };
      MusicController.prototype.randomGetClip = function() {
        if (this.clipList.length <= 1) return this.clipList[0];
        var index = Global_1.default.GetRandomInt(0, this.clipList.length);
        return this.clipList[index];
      };
      __decorate([ property({
        type: cc.AudioClip
      }) ], MusicController.prototype, "clipList", void 0);
      __decorate([ property ], MusicController.prototype, "isBgMusic", void 0);
      __decorate([ property({
        tooltip: "\u97f3\u91cf\u5927\u5c0f(0-1)"
      }) ], MusicController.prototype, "volume", void 0);
      __decorate([ property({
        tooltip: "\u662f\u5426\u5faa\u73af\u64ad\u653e"
      }) ], MusicController.prototype, "loop", void 0);
      __decorate([ property({
        tooltip: "\u662f\u5426\u5728\u8fd0\u884c\u6e38\u620f\u540e\u81ea\u52a8\u64ad\u653e"
      }) ], MusicController.prototype, "playOnLoad", void 0);
      __decorate([ property({
        tooltip: "\u662f\u5426\u6536\u5230\u70b9\u51fb\u4e8b\u4ef6\u540e\u81ea\u52a8\u64ad\u653e"
      }) ], MusicController.prototype, "playOnClick", void 0);
      MusicController = __decorate([ ccclass ], MusicController);
      return MusicController;
    }(cc.Component);
    exports.default = MusicController;
    cc._RF.pop();
  }, {
    "../../GameRoot": "GameRoot",
    "../../Global": "Global"
  } ],
  MusicMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9837dv9MWhBcYhprkOqNDvb", "MusicMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ModulesBase_1 = require("../ModulesBase");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MusicMgr = function(_super) {
      __extends(MusicMgr, _super);
      function MusicMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.enableEffects = true;
        _this.enableBGMusic = true;
        return _this;
      }
      MusicMgr.prototype.init = function(data) {
        this.soundEffectCtrl = [];
      };
      MusicMgr.prototype.getCanPlay = function(isBgMusic) {
        if (!this.enableEffects && !isBgMusic) return false;
        if (!this.enableBGMusic && isBgMusic) return false;
        return true;
      };
      MusicMgr.prototype.addSoundEffectCtrl = function(controller) {
        this.soundEffectCtrl.push(controller);
      };
      MusicMgr.prototype.removeSoundEffectCtrl = function(controller) {
        for (var i = 0; i < this.soundEffectCtrl.length; i++) if (this.soundEffectCtrl[i] === controller) {
          this.soundEffectCtrl.splice(i, 1);
          return;
        }
      };
      MusicMgr.prototype.setBGMusicController = function(controller) {
        this.curBGMusicController = controller;
      };
      MusicMgr.prototype.getBGMusicController = function() {
        return this.curBGMusicController;
      };
      MusicMgr.prototype.bgMusicControllerIsValid = function() {
        if (this.getBGMusicController() && this.getBGMusicController().node && this.getBGMusicController().node.isValid) return true;
        return false;
      };
      MusicMgr.prototype.enableMusic = function(enable) {
        this.enableBGMusic = enable;
        if (this.bgMusicControllerIsValid()) {
          var musicController = this.getBGMusicController();
          enable ? musicController.play() : musicController.stop();
        }
      };
      MusicMgr.prototype.enableEffect = function(enable) {
        this.enableEffects = enable;
        if (enable) ; else for (var i = 0; i < this.soundEffectCtrl.length; i++) this.soundEffectCtrl[i].stop();
      };
      MusicMgr = __decorate([ ccclass ], MusicMgr);
      return MusicMgr;
    }(ModulesBase_1.default);
    exports.default = MusicMgr;
    cc._RF.pop();
  }, {
    "../ModulesBase": "ModulesBase"
  } ],
  NetControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "03994iFhDFHQorkDSGC/ThE", "NetControl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var onfire = require("./libs/onfire/onfire");
    var netControl = function(_super) {
      __extends(netControl, _super);
      function netControl() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._sock = null;
        _this._host = "";
        _this._port = "";
        return _this;
      }
      netControl.prototype.connect = function(host, port) {
        if (null == this._sock || 1 !== this._sock.readyState) {
          this._host = host;
          this._port = port;
          this._sock = new WebSocket(this._host + ":" + this._port);
          this._sock.onopen = this._onOpen.bind(this);
          this._sock.onclose = this._onClose.bind(this);
          this._sock.onmessage = this._onMessage.bind(this);
          this._sock.binaryType = "arraybuffer";
        }
        return this;
      };
      netControl.prototype.disconnect = function() {
        this._sock && this._sock.close();
      };
      netControl.prototype._onOpen = function() {
        onfire.fire("onopen");
      };
      netControl.prototype._onClose = function(err) {
        onfire.fire("onclose", err);
      };
      netControl.prototype._onMessage = function(obj) {
        onfire.fire("onmessage", obj);
      };
      netControl.prototype.send = function(msg) {
        1 == this._sock.readyState && this._sock.send(msg);
      };
      netControl.prototype.protoBufAddtag = function(tag, buffer) {
        var addtag_buffer = new Uint8Array(buffer.length + 2);
        var buf = new ArrayBuffer(2);
        var buf1 = new DataView(buf);
        buf1.setInt16(0, tag);
        var tagArray = new Uint8Array(buf1.buffer);
        addtag_buffer.set(tagArray, 0);
        addtag_buffer.set(buffer.subarray(0, buffer.length), 2);
        return addtag_buffer;
      };
      netControl.prototype.parseProtoBufId = function(obj) {
        var arrayBuffer = obj.data;
        var id = new DataView(arrayBuffer).getInt16(0, false);
        var dataUnit8Array = new Uint8Array(arrayBuffer);
        Uint8Array.prototype.slice || Object.defineProperty(Uint8Array.prototype, "slice", {
          value: Array.prototype.slice
        });
        dataUnit8Array = dataUnit8Array.slice(2);
        return {
          id: id,
          data: dataUnit8Array
        };
      };
      netControl = __decorate([ ccclass ], netControl);
      return netControl;
    }(cc.Component);
    exports.netControl = netControl;
    cc._RF.pop();
  }, {
    "./libs/onfire/onfire": "onfire"
  } ],
  NetworkMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "31b0c0mwJBNrpO3RIhcj3yS", "NetworkMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NetControl_1 = require("./protocol/NetControl");
    var onfire = require("./protocol/libs/onfire/onfire");
    var Global_1 = require("../../Global");
    var ModulesBase_1 = require("../ModulesBase");
    var GameRoot_1 = require("../../GameRoot");
    var pbkiller = require("./pbkiller/src/pbkiller");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder;
    exports.MSG_MAP = {
      Login: 0,
      ClientPing: 115,
      ZiJieLogin: 120,
      ZiJieLoginResult: 121
    };
    var NetworkMgr = function(_super) {
      __extends(NetworkMgr, _super);
      function NetworkMgr() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NetworkMgr.prototype.init = function(data) {
        var _this = this;
        this.enableHeartCheck = data.enableHeartCheck;
        this._isConnect = false;
        if (!Global_1.default.GB_IsUseClientData) {
          this.netControl = new NetControl_1.netControl();
          this.enableHeartCheck && (this.heartCheck = new HeartCheck());
          cc.loader.loadRes("config/serverInfo", function(err, res) {
            if (err) console.log(err); else {
              _this.host = res.json.host;
              _this.port = res.json.port;
              _this.eventConnectSuc = onfire.on("onopen", _this.connectSuc.bind(_this));
              _this.netControl.connect(_this.host, _this.port);
              pbkiller.preload(function() {
                _this.loadMessage();
              });
            }
          });
        }
        this.startLogin();
      };
      NetworkMgr.prototype.loadMessage = function() {
        if (cc.sys.isNative) {
          cc.log("jsb.fileUtils=" + jsb.fileUtils);
          jsb.fileUtils.addSearchPath("res/raw-assets/resources", true);
        }
        this.messageList = [];
        var pb = pbkiller.loadAll("proto", "msg");
        this.pb = pb;
        for (var key in exports.MSG_MAP) {
          var msgInfo = {
            object: {},
            name: ""
          };
          msgInfo.name = key;
          msgInfo.object = new pb[msgInfo.name]();
          var msgId = exports.MSG_MAP[key];
          this.messageList[msgId] = msgInfo;
        }
      };
      NetworkMgr.prototype.startLogin = function() {
        var platformObj = GameRoot_1.default.instance.getPlatformMgrModule().getPlatform();
        this.username = platformObj.getPlayerName();
        this.userId = platformObj.getPlayerId();
        this.photoUrl = platformObj.getHeadURL();
        this.eventMessageFire = onfire.on("onmessage", this.onMessage.bind(this));
        Global_1.default.GB_IsUseClientData || (this.timerCheckLoadMessage = setInterval(this.checkLoadMessageFinish.bind(this), 20));
      };
      NetworkMgr.prototype.checkLoadMessageFinish = function() {
        var _this = this;
        if (!this.messageList) return;
        var isLoadFinish = false;
        var msgOKCount = 0;
        for (var key in this.messageList) void 0 !== this.messageList[key] && msgOKCount++;
        msgOKCount === Object.keys(exports.MSG_MAP).length && (isLoadFinish = true);
        if (isLoadFinish && this.isConnect()) {
          clearInterval(this.timerCheckLoadMessage);
          this.heartCheck && this.heartCheck.start();
          Global_1.default.INFO_MSG("Login Request.Time is " + new Date());
          var self = this;
          if (GameRoot_1.default.instance.getPlatformMgrModule().userInfoIsAsync()) {
            console.log("userInfoIsAsync: before login");
            var platformObj_1 = GameRoot_1.default.instance.getPlatformMgrModule().getPlatform();
            platformObj_1.login();
            platformObj_1.getUserInfoAsync().then(function(userInfo) {
              _this.username = platformObj_1.getPlayerName();
              _this.userId = platformObj_1.getPlayerId();
              _this.photoUrl = platformObj_1.getHeadURL();
              _this.sendMsg(exports.MSG_MAP.Login, {
                name: userInfo.userName,
                uid: userInfo.playerID,
                photoUrl: userInfo.headUrl
              });
            });
          } else {
            console.log("useInfoNotAsync: before login");
            this.sendMsg(exports.MSG_MAP.Login, {
              name: this.username,
              uid: this.userId,
              photoUrl: this.photoUrl
            });
          }
        }
      };
      NetworkMgr.prototype.connectSuc = function() {
        this._isConnect = true;
      };
      NetworkMgr.prototype.sendMsg = function(msgType, msgObj, includeUserId) {
        void 0 === includeUserId && (includeUserId = true);
        includeUserId && (msgObj.uid = this.userId);
        var messageObject = this.messageList[msgType].object;
        for (var key in msgObj) {
          if (void 0 === messageObject[key]) {
            Global_1.default.ERROR_MSG("message data setup is error! id =" + msgType + ",key = " + key);
            continue;
          }
          messageObject[key] = msgObj[key];
        }
        var buffer = messageObject.toArrayBuffer();
        var data = new Uint8Array(buffer);
        var addtag_buffer = this.netControl.protoBufAddtag(msgType, data);
        this.netControl.send(addtag_buffer.buffer);
      };
      NetworkMgr.prototype.disConnect = function() {
        this.heartCheck && this.heartCheck.reset();
        this._isConnect = false;
        this.netControl && this.netControl.disconnect();
      };
      NetworkMgr.prototype.onMessage = function(obj) {
        if (obj.data instanceof ArrayBuffer) {
          var retdata = this.netControl.parseProtoBufId(obj);
          var id = retdata.id;
          var data = retdata.data;
          this.OnGameMessage(id, data);
        }
      };
      NetworkMgr.prototype.OnGameMessage = function(id, data) {
        var msgName = this.messageList[id].name;
        var gameMsg = this.pb[msgName].decode(data);
        onfire.fire(msgName, gameMsg);
      };
      NetworkMgr.prototype.bindMessage = function(msgType, calback) {
        if (Global_1.default.GB_IsUseClientData) return;
        return onfire.on(this.messageList[msgType].name, calback);
      };
      NetworkMgr.prototype.unbindMessage = function(msgObject) {
        onfire.un(msgObject);
      };
      NetworkMgr.prototype.onDestroy = function() {
        onfire.un(this.eventMessageFire);
        onfire.un(this.eventConnectSuc);
      };
      NetworkMgr.prototype.isConnect = function() {
        return this._isConnect;
      };
      NetworkMgr = __decorate([ ccclass ], NetworkMgr);
      return NetworkMgr;
    }(ModulesBase_1.default);
    exports.NetworkMgr = NetworkMgr;
    var HeartCheck = function() {
      function HeartCheck() {
        this.timeout = 7e3;
      }
      HeartCheck.prototype.reset = function() {
        clearInterval(this.timeoutObj);
      };
      HeartCheck.prototype.start = function() {
        this.reset();
        this.timeoutObj = setInterval(function() {
          GameRoot_1.default.instance.getNetworkMgrModule().sendMsg(exports.MSG_MAP.ClientPing, {}, false);
        }, this.timeout);
      };
      return HeartCheck;
    }();
    cc._RF.pop();
  }, {
    "../../GameRoot": "GameRoot",
    "../../Global": "Global",
    "../ModulesBase": "ModulesBase",
    "./pbkiller/src/pbkiller": "pbkiller",
    "./protocol/NetControl": "NetControl",
    "./protocol/libs/onfire/onfire": "onfire"
  } ],
  NormalDart: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9dbecDRGPpJHY0Rk2J1XHVY", "NormalDart");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DartBase_1 = require("./DartBase");
    var MonsterBase_1 = require("../Monsters/MonsterBase");
    var StateMgr_1 = require("../State/StateMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NormalDart = function(_super) {
      __extends(NormalDart, _super);
      function NormalDart() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NormalDart.prototype.onCollisionEnter = function(other, self) {
        if (this.isStop) return;
        if (-1 !== other.node.name.indexOf("Wall")) this.handleHitWall(); else {
          var monsterBase = other.node.getComponent(MonsterBase_1.MonsterBase);
          if (monsterBase) if (this.hasState(StateMgr_1.StateType.Pass) && !monsterBase.getIsBoss()) monsterBase.hurt(.8 * this.damage); else {
            monsterBase.hurt(this.damage);
            this.delete();
          }
        }
      };
      NormalDart.prototype.delete = function() {
        this.dartPool.put(this.node);
      };
      NormalDart = __decorate([ ccclass ], NormalDart);
      return NormalDart;
    }(DartBase_1.default);
    exports.default = NormalDart;
    cc._RF.pop();
  }, {
    "../Monsters/MonsterBase": "MonsterBase",
    "../State/StateMgr": "StateMgr",
    "./DartBase": "DartBase"
  } ],
  NormalNinja: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "66cdfHVpB9EQov0ti8/8dLC", "NormalNinja");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MonsterBase_1 = require("./MonsterBase");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NormalNinja = function(_super) {
      __extends(NormalNinja, _super);
      function NormalNinja() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NormalNinja = __decorate([ ccclass ], NormalNinja);
      return NormalNinja;
    }(MonsterBase_1.MonsterBase);
    exports.default = NormalNinja;
    cc._RF.pop();
  }, {
    "./MonsterBase": "MonsterBase"
  } ],
  Outline: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "13b6eK8WSdFNIyTgJCek75e", "Outline");
    "use strict";
    var renderEngine = cc.renderer.renderEngine;
    var renderer = renderEngine.renderer;
    var shader = {
      name: "Outline",
      params: [ {
        name: "iResolution",
        type: renderer.PARAM_FLOAT3
      } ],
      defines: [],
      start: function start(sprite, material) {
        var iResolution = new cc.Vec3(sprite.node.width, sprite.node.height, 0);
        material.setParamValue("iResolution", iResolution);
      },
      vert: "uniform mat4 viewProj;\n        attribute vec3 a_position;\n        attribute vec2 a_uv0;\n        varying vec2 uv0;\n        void main () {\n            vec4 pos = viewProj * vec4(a_position, 1);\n            gl_Position = pos;\n            uv0 = a_uv0;\n        }\n        ",
      frag: "uniform sampler2D texture;\n    varying vec2 uv0;\n    uniform vec3 iResolution;\n\n    void main()\n    {\n        vec2 onePixel = vec2(1.0 / iResolution.x, 1.0 / iResolution.y);\n\n        vec4 color = texture2D(texture, uv0.xy);\n        vec4 colorRight = texture2D(texture, uv0.xy + vec2(0,onePixel.t));\n        vec4 colorBottom = texture2D(texture, uv0.xy + vec2(onePixel.s,0));\n\n        color.r = 3.0* sqrt( (color.r - colorRight.r) * (color.r - colorRight.r) + (color.r - colorBottom.r) * (color.r - colorBottom.r) );\n        color.g = 3.0* sqrt( (color.g - colorRight.g) * (color.g - colorRight.g) + (color.g - colorBottom.g) * (color.g - colorBottom.g) );\n        color.b = 3.0* sqrt( (color.b - colorRight.b) * (color.b - colorRight.b) + (color.b - colorBottom.b) * (color.b - colorBottom.b) );\n\n        color.r >1.0 ? 1.0 : color.r;\n        color.g >1.0 ? 1.0 : color.g;\n        color.b >1.0 ? 1.0 : color.b;\n        gl_FragColor = vec4(color.rgb, 1);\n    }"
    };
    var CustomMaterial = require("CustomMaterial");
    CustomMaterial.addShader(shader);
    cc._RF.pop();
  }, {
    CustomMaterial: "CustomMaterial"
  } ],
  OverlayShader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "32fe433G9ZIOoShlClVhtgx", "OverlayShader");
    "use strict";
    var shader = {
      name: "overlay",
      defines: [],
      start: function start(sprite) {
        sprite.node.color = cc.color("#FBC00C");
      },
      vert: "uniform mat4 viewProj;\n        attribute vec3 a_position;\n        attribute vec2 a_uv0;\n        varying vec2 uv0;\n        void main () {\n            vec4 pos = viewProj * vec4(a_position, 1);\n            gl_Position = pos;\n            uv0 = a_uv0;\n        }\n        ",
      frag: "uniform sampler2D texture;\n        varying vec2 uv0;\n        uniform vec4 color;\n        void main() \n        { \n            vec4 texColor = texture2D(texture, uv0);  \n            if (texColor.r <= 0.5)\n            gl_FragColor.r = 2.0 * texColor.r * color.r;\n            else\n            gl_FragColor.r = 1.0 - 2.0 * (1.0 - texColor.r) * (1.0 - color.r);\n            if (texColor.g <= 0.5)\n            gl_FragColor.g = 2.0 * texColor.g * color.g;\n            else\n            gl_FragColor.g = 1.0 - 2.0 * (1.0 - texColor.g) * (1.0 - color.g);\n            if (texColor.b <= 0.5)\n            gl_FragColor.b = 2.0 * texColor.b * color.b;\n            else\n            gl_FragColor.b = 1.0 - 2.0 * (1.0 - texColor.b) * (1.0 - color.b);\n            gl_FragColor.a = texColor.a * color.a;\n        }"
    };
    var CustomMaterial = require("CustomMaterial");
    CustomMaterial.addShader(shader);
    cc._RF.pop();
  }, {
    CustomMaterial: "CustomMaterial"
  } ],
  Pavilion: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dc0f4v75zVGH7HmRGYwTY3d", "Pavilion");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MonsterBase_1 = require("./MonsterBase");
    var GameLogic_1 = require("../GameLogic");
    var EnemyFactory_1 = require("../gameScene/EnemyFactory");
    var FlashWhiteMgr_1 = require("../FlashWhiteMgr");
    var MonstersDoorMgr_1 = require("./Boss/MonstersDoorMgr");
    var MusicController_1 = require("../module/Music/MusicController");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var lightBallBirthJson = function() {
      function lightBallBirthJson() {}
      return lightBallBirthJson;
    }();
    var Pavilion = function(_super) {
      __extends(Pavilion, _super);
      function Pavilion() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.stopY = -300;
        _this.bottomLeft = null;
        _this.bottomRight = null;
        _this.MonstersDart = null;
        _this.delayGeneradeMonster = 3;
        _this.levelId = 1e4;
        _this.delayLoopGeneradeMonster = 5;
        _this.flashWhiteMgr = null;
        _this.midHeart = null;
        _this.topHeart = null;
        _this.ballBirth = null;
        _this.boomEffect = null;
        _this.lightBallBirthJson = [];
        _this.move = true;
        _this.door = 0;
        _this.canHurt = false;
        _this.isLastCore = false;
        return _this;
      }
      Pavilion.prototype.start = function() {
        _super.prototype.start.call(this);
        this.aniControl = this.getComponentInChildren(cc.Animation);
        this.aniControl.playAdditive("tank_Run");
        this.musicController.play();
        this.hurtMusic = this.midHeart.getComponent(MusicController_1.default);
        this.bottomLeft.on("doorDestroy", function() {
          var _this = this;
          var dir = this.bottomLeft.getPosition();
          this.createBoomEffect(2, dir).then(function(boomEffct) {
            boomEffct.on("autoDelete", function() {
              _this.doorDestroy();
            });
          });
        }, this);
        this.bottomRight.on("doorDestroy", function() {
          var _this = this;
          var dir = this.bottomRight.getPosition();
          this.createBoomEffect(2, dir).then(function(boomEffct) {
            boomEffct.on("autoDelete", function() {
              _this.doorDestroy();
            });
          });
        }, this);
      };
      Pavilion.prototype.doorDestroy = function() {
        this.door >= 1 ? this.showMidHeart() : this.door += 1;
      };
      Pavilion.prototype.hurt = function(damage) {
        if (!this.canHurt || this.isLastCore) return;
        this.curHp -= damage;
        this.curHp <= 5 && this.showTopHeart();
        this.playHurtAnim();
      };
      Pavilion.prototype.showMidHeart = function() {
        var core = this.aniControl.playAdditive("Pavilion_Open_01");
        core.on("finished", function() {
          core.off("finished");
          this.aniControl.play("Pavilion_Move");
          this.aniControl.playAdditive("tank_Run");
          this.aniControl.playAdditive("Pavilion_Stand_02");
          this.canHurt = true;
          this.shootBall();
        }, this);
      };
      Pavilion.prototype.showTopHeart = function() {
        var _this = this;
        this.canHurt = false;
        this.isLastCore = true;
        var size = new cc.Size(0, 0);
        this.boxCollider.size = size;
        this.ballBirth.destroy();
        var midDir = this.midHeart.getPosition();
        this.createBoomEffect(2.5, midDir).then(function(boomEffct) {
          boomEffct.on("autoDelete", function() {
            var core2 = _this.aniControl.playAdditive("Pavilion_Open_02");
            core2.on("finished", _this.shootBigDart, _this);
          });
        });
      };
      Pavilion.prototype.initParts = function(part, birthDir, zIndex) {
        void 0 === zIndex && (zIndex = 999);
        var partNode = null;
        if (part) {
          partNode = cc.instantiate(part);
          partNode.setPosition(birthDir);
          this.node.addChild(partNode, zIndex);
        }
        return partNode;
      };
      Pavilion.prototype.createBoomEffect = function(scaleNum, birthDir) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          GameLogic_1.default.instance.getBoomEffectPrefabAsync().then(function(prefab) {
            if (prefab) {
              var boomEffectNode = cc.instantiate(prefab);
              boomEffectNode.parent = _this.node;
              boomEffectNode.setScale(scaleNum);
              boomEffectNode.setPosition(birthDir);
              resolve(boomEffectNode);
            }
          });
        });
      };
      Pavilion.prototype.playHurtAnim = function() {
        this.hurtMusic.play();
        this.flashWhiteMgr.play();
      };
      Pavilion.prototype.playDeadFlash = function(boomTime, waitTime) {
        var self = this;
        var time = 1;
        var topDir = this.topHeart.getPosition();
        this.createBoomEffect(4, topDir);
        function loopBoom() {
          self.scheduleOnce(function() {
            if (time >= boomTime) {
              self.dead(true);
              return;
            }
            time += 1;
            var randomDir = topDir;
            randomDir.x = randomDir.x + (300 - 600 * Math.random());
            randomDir.y = randomDir.y + (200 - 250 * Math.random());
            self.createBoomEffect(4, randomDir);
            loopBoom();
          }, waitTime);
        }
        loopBoom();
      };
      Pavilion.prototype.shootBall = function() {
        var _this = this;
        this.enemyFactory = this.midHeart.getComponentInChildren(EnemyFactory_1.default);
        this.scheduleOnce(function() {
          _this.beginGeneradeMonsters();
        }, this.delayGeneradeMonster);
      };
      Pavilion.prototype.beginGeneradeMonsters = function() {
        var _this = this;
        this.enemyFactory.getMainLevelWaveCountAsync(this.levelId).then(function(totalWaveCount) {
          var promiseList = [];
          for (var i = 1; i <= totalWaveCount; i++) promiseList.push(_this.enemyFactory.generadeEnemysAsync(_this.levelId, i));
          Promise.all(promiseList).then(function(monstersBaseArrayList) {
            _this.generaderMonstersFinish();
          }).catch(function(err) {});
        });
      };
      Pavilion.prototype.generaderMonstersFinish = function() {
        var _this = this;
        this.scheduleOnce(function() {
          if (_this.isLastCore) return;
          _this.beginGeneradeMonsters();
        }, this.delayLoopGeneradeMonster);
      };
      Pavilion.prototype.shootBigDart = function() {
        this.aniControl.play("Pavilion_Move");
        this.aniControl.playAdditive("tank_Run");
        this.aniControl.playAdditive("Pavilion_Stand_03");
        var vec = new cc.Vec2(0, 0);
        var dart = this.initParts(this.MonstersDart, vec);
        dart.on("dartDead", function() {
          this.canHurt = false;
          this.playDeadFlash(3, 2);
        }, this);
      };
      Pavilion.prototype.update = function(dt) {
        if (!this.move) return;
        dt *= GameLogic_1.default.instance.getTimeScale();
        if (this.velocity) {
          var moveDis = this.velocity.mul(dt);
          this.node.x += moveDis.x;
          this.node.y += moveDis.y;
        } else this.node.y -= this.speed * dt;
        this.node.y <= this.stopY && this.moveEnd();
      };
      Pavilion.prototype.moveEnd = function() {
        this.musicController.stop();
        this.move = false;
        var doorMgr = this.bottomLeft.getComponent(MonstersDoorMgr_1.default);
        var doorMgr2 = this.bottomRight.getComponent(MonstersDoorMgr_1.default);
        doorMgr.canHurt = true;
        doorMgr2.canHurt = true;
        this.aniControl.playAdditive("Pavilion_Move");
      };
      Pavilion.prototype.dead = function(isUserKill) {
        var _this = this;
        void 0 === isUserKill && (isUserKill = true);
        if (this.isDead) return;
        this.isDead = true;
        if (isUserKill) {
          var worldPos = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
          this.dropGold(worldPos, 20, -50, 50);
          this.dropSoul(worldPos, 20, -50, 50);
          0 !== this.dropItemId && this.handleDropItem(worldPos);
        }
        this.showDropItemTip(false);
        this.scheduleOnce(function() {
          _this.delete();
        }, .2);
      };
      __decorate([ property({
        tooltip: "BOSS\u505c\u6b62\u7684\u5730\u70b9"
      }) ], Pavilion.prototype, "stopY", void 0);
      __decorate([ property(cc.Node) ], Pavilion.prototype, "bottomLeft", void 0);
      __decorate([ property(cc.Node) ], Pavilion.prototype, "bottomRight", void 0);
      __decorate([ property(cc.Prefab) ], Pavilion.prototype, "MonstersDart", void 0);
      __decorate([ property({
        tooltip: "\u5ef6\u8fdf\u591a\u5c11\u79d2\u5f00\u59cb\u53d1\u5c04\u5149\u7403"
      }) ], Pavilion.prototype, "delayGeneradeMonster", void 0);
      __decorate([ property({
        tooltip: "\u53d1\u5c04\u5149\u7403\u6587\u4ef6\u7684id"
      }) ], Pavilion.prototype, "levelId", void 0);
      __decorate([ property({
        tooltip: "\u53d1\u5c04\u5149\u7403\u7684\u95f4\u9694"
      }) ], Pavilion.prototype, "delayLoopGeneradeMonster", void 0);
      __decorate([ property(FlashWhiteMgr_1.default) ], Pavilion.prototype, "flashWhiteMgr", void 0);
      __decorate([ property(cc.Node) ], Pavilion.prototype, "midHeart", void 0);
      __decorate([ property(cc.Node) ], Pavilion.prototype, "topHeart", void 0);
      __decorate([ property(cc.Node) ], Pavilion.prototype, "ballBirth", void 0);
      __decorate([ property(cc.Prefab) ], Pavilion.prototype, "boomEffect", void 0);
      __decorate([ property([ cc.Vec2 ]) ], Pavilion.prototype, "lightBallBirthJson", void 0);
      Pavilion = __decorate([ ccclass ], Pavilion);
      return Pavilion;
    }(MonsterBase_1.MonsterBase);
    exports.Pavilion = Pavilion;
    cc._RF.pop();
  }, {
    "../FlashWhiteMgr": "FlashWhiteMgr",
    "../GameLogic": "GameLogic",
    "../gameScene/EnemyFactory": "EnemyFactory",
    "../module/Music/MusicController": "MusicController",
    "./Boss/MonstersDoorMgr": "MonstersDoorMgr",
    "./MonsterBase": "MonsterBase"
  } ],
  PlatformBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b3f70uuW3NL7p6zsHPxSEMI", "PlatformBase");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Global_1 = require("../../Global");
    var PlatformBase = function() {
      function PlatformBase() {}
      PlatformBase.prototype.init = function() {};
      PlatformBase.prototype.login = function() {};
      PlatformBase.prototype.getUserInfoAsync = function() {
        return new Promise(function(resolve, reject) {
          resolve();
        });
      };
      PlatformBase.prototype.onPause = function() {
        Global_1.default.INFO_MSG("Pause event was triggered!");
      };
      PlatformBase.prototype.setHeadSprite = function(head) {
        this.headSprite = head;
      };
      PlatformBase.prototype.getHeadSprite = function() {
        return this.headSprite;
      };
      PlatformBase.prototype.setPlayerId = function(id) {
        this.playerID = id;
      };
      PlatformBase.prototype.getPlayerId = function() {
        return this.playerID;
      };
      PlatformBase.prototype.setPlayerName = function(name) {
        this.playerName = name;
      };
      PlatformBase.prototype.getPlayerName = function() {
        return this.playerName;
      };
      PlatformBase.prototype.setHeadURL = function(url) {
        this.headURL = url;
      };
      PlatformBase.prototype.getHeadURL = function() {
        return this.headURL;
      };
      PlatformBase.prototype.resURLIsValid = function(url) {
        if ("test" === url || "" === url || void 0 === url) return false;
        return true;
      };
      PlatformBase.prototype.getLocale = function() {
        return this.locale;
      };
      PlatformBase.prototype.getPlatform = function() {
        return this.platform;
      };
      PlatformBase.prototype.getConnectedFriendsAsync = function(callback) {};
      PlatformBase.prototype.getPlayersAsync = function(callback) {};
      PlatformBase.prototype.quitGame = function() {
        cc.director.loadScene("Start");
      };
      PlatformBase.prototype.preLoadInterstitialAdAsync = function(callback) {};
      PlatformBase.prototype.showInterstitialAdAsync = function(ad, callback) {};
      PlatformBase.prototype.preLoadRewardedVideo = function(placementId, callback) {};
      PlatformBase.prototype.showRewardedVideo = function(rewarded, callback) {};
      PlatformBase.prototype.canSupportPaymentsPurchase = function() {
        return false;
      };
      PlatformBase.prototype.purchaseAsync = function(productID, callback) {};
      PlatformBase.prototype.consumePurchaseAsync = function(purchaseToken, callback) {};
      PlatformBase.prototype.inviteFriends = function(text, imageBase64, callback, entryPointData) {
        void 0 === entryPointData && (entryPointData = null);
      };
      PlatformBase.prototype.shareGame = function(text, imageBase64, callback) {};
      PlatformBase.prototype.getEntryPointData = function() {};
      PlatformBase.prototype.leaderboardSetScoreAsync = function(boardName, score, callback, extraData) {};
      PlatformBase.prototype.getLeaderboardEntriesAsync = function(boardName, callback, count, offset) {
        void 0 === count && (count = 10);
        void 0 === offset && (offset = 0);
      };
      PlatformBase.prototype.getLeaderboardConnectedPlayerAsync = function(boardName, callback, count, offset) {
        void 0 === count && (count = 10);
        void 0 === offset && (offset = 0);
      };
      PlatformBase.prototype.getLeaderboardPlayerEntryAsync = function(boardName, callback) {};
      PlatformBase.prototype.vibrateShort = function(callback) {};
      PlatformBase.prototype.vibrateLong = function(callback) {};
      PlatformBase.prototype.createVideo = function(videoEntry) {
        return null;
      };
      PlatformBase.prototype.startRecordGame = function() {};
      PlatformBase.prototype.endRecordGame = function(callback) {};
      PlatformBase.prototype.shareVideo = function(path) {};
      PlatformBase = __decorate([ ccclass ], PlatformBase);
      return PlatformBase;
    }();
    exports.PlatformBase = PlatformBase;
    cc._RF.pop();
  }, {
    "../../Global": "Global"
  } ],
  PlatformMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6c1b0HWwYJEg5sfNN5biN2t", "PlatformMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Global_1 = require("../../Global");
    var ModulesBase_1 = require("../ModulesBase");
    var PlatformBase_1 = require("./PlatformBase");
    var PlatformWechat_1 = require("./PlatformWechat");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executionOrder = _a.executionOrder;
    var PlatformMgr = function(_super) {
      __extends(PlatformMgr, _super);
      function PlatformMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.curPlatformObj = null;
        _this.onPCTest = false;
        return _this;
      }
      PlatformMgr.prototype.init = function(data) {
        this.testHeadImage = data.testHeadImage;
        this.testName = data.testName;
        this.testId = data.testId;
        this.curPlatformObj = this.createPlatformObject();
        if (!this.curPlatformObj) {
          Global_1.default.ERROR_MSG("can not find platform object!");
          return;
        }
        this.curPlatformObj.init();
      };
      PlatformMgr.prototype.createPlatformObject = function() {
        if (this.isWeChatPlatform()) {
          Global_1.default.INFO_MSG("current platform context is wechat!");
          return new PlatformWechat_1.PlatformWechat();
        }
        var baseObj = new PlatformBase_1.PlatformBase();
        baseObj.setHeadSprite(this.testHeadImage);
        baseObj.setPlayerName(this.testName);
        baseObj.setPlayerId(this.testId);
        baseObj.setHeadURL("test");
        this.onPCTest = true;
        return baseObj;
      };
      PlatformMgr.prototype.isNativePlatform = function() {
        return cc.sys.isNative;
      };
      PlatformMgr.prototype.isWeChatPlatform = function() {
        return cc.sys.platform === cc.sys.WECHAT_GAME;
      };
      PlatformMgr.prototype.getPlatform = function() {
        return this.curPlatformObj;
      };
      PlatformMgr.prototype.isOnPCTest = function() {
        return this.onPCTest;
      };
      PlatformMgr.prototype.userInfoIsAsync = function() {
        if (this.isOnPCTest()) return false;
        return true;
      };
      PlatformMgr = __decorate([ ccclass ], PlatformMgr);
      return PlatformMgr;
    }(ModulesBase_1.default);
    exports.default = PlatformMgr;
    cc._RF.pop();
  }, {
    "../../Global": "Global",
    "../ModulesBase": "ModulesBase",
    "./PlatformBase": "PlatformBase",
    "./PlatformWechat": "PlatformWechat"
  } ],
  PlatformWechat: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "170f7rx3PRJnp9lM38CGZBG", "PlatformWechat");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MD_PlatformBase = require("./PlatformBase");
    var GameRoot_1 = require("../../GameRoot");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PlatformWechat = function(_super) {
      __extends(PlatformWechat, _super);
      function PlatformWechat() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.openidIsReady = false;
        _this.otherUserInfoIsReady = false;
        _this.appid = "wxd035af8337c5d071";
        _this.appSecret = "bdc35312551e2c3de8f5081ce740cfa4";
        return _this;
      }
      PlatformWechat.prototype.init = function() {};
      PlatformWechat.prototype.login = function() {
        var _this = this;
        var self = this;
        wx.login({
          success: function(res) {
            if (res.code) {
              console.log("wx.login\u8c03\u7528\u6210\u529f");
              var networkModule = GameRoot_1.default.instance.getNetworkMgrModule();
              var msgMap = GameRoot_1.default.instance.getMsgMap();
              networkModule.bindMessage(msgMap.ZiJieLoginResult, self.receiveLoginResult.bind(self));
              networkModule.sendMsg(msgMap.ZiJieLogin, {
                appid: _this.appid,
                secret: _this.appSecret,
                LoginCode: res.code,
                platform: 1
              }, false);
              _this.wxGetUserState();
            } else console.log("\u83b7\u53d6\u7528\u6237\u767b\u5f55\u6001\u5931\u8d25!" + res.errMsg);
          },
          fail: function(res) {
            console.log("login\u8c03\u7528\u5931\u8d25");
          }
        });
      };
      PlatformWechat.prototype.getUserInfoAsync = function() {
        var _this = this;
        return new Promise(function(resolve, reject) {
          var timerHandle = setInterval(function() {
            if (_this.openidIsReady && _this.otherUserInfoIsReady) {
              clearInterval(timerHandle);
              resolve({
                playerID: _this.playerID,
                userName: _this.playerName,
                headUrl: _this.headURL
              });
              return;
            }
          }, 20);
        });
      };
      PlatformWechat.prototype.receiveLoginResult = function(data) {
        this.playerID = data.openid;
        this.openidIsReady = true;
      };
      PlatformWechat.prototype.wxGetUserState = function() {
        wx.getSetting({
          fail: function(res) {
            this.wxGetUserInfo();
          }.bind(this),
          success: function(res) {
            res.authSetting["scope.userInfo"] ? this.getUserInfo() : this.wxGetUserInfo();
          }.bind(this)
        });
      };
      PlatformWechat.prototype.wxGetUserInfo = function() {
        var _this = this;
        var width = 200;
        var height = 40;
        var left = (cc.view.getFrameSize().width - width) / 2;
        var top = (cc.view.getFrameSize().height - height) / 2;
        var WXInfoButton = wx.createUserInfoButton({
          type: "text",
          text: "\u83b7\u53d6\u7528\u6237\u4fe1\u606f",
          style: {
            left: left,
            top: top,
            width: width,
            height: height,
            lineHeight: 40,
            backgroundColor: "#FFFFFF",
            color: "#000000",
            textAlign: "center",
            fontSize: 16,
            borderRadius: 4
          }
        });
        WXInfoButton.onTap(function(res) {
          res.errMsg.indexOf("auth deny") > -1 || res.errMsg.indexOf("auth denied") > -1 ? _this.guideActive() : _this.setUserData(res);
        });
        WXInfoButton.show();
      };
      PlatformWechat.prototype.getUserInfo = function() {
        wx.getUserInfo({
          fail: function(res) {
            (res.errMsg.indexOf("auth deny") > -1 || res.errMsg.indexOf("auth denied") > -1) && this.guideActive();
          }.bind(this),
          success: function(res) {
            this.setUserData(res);
          }.bind(this)
        });
      };
      PlatformWechat.prototype.guideActive = function() {
        wx.showModal({
          title: "\u8b66\u544a",
          content: "\u62d2\u7edd\u6388\u6743\u5c06\u65e0\u6cd5\u6b63\u5e38\u6e38\u620f",
          cancelText: "\u53d6\u6d88",
          showCancel: true,
          confirmText: "\u8bbe\u7f6e",
          success: function(res) {
            res.confirm && wx.openSetting({
              success: function(res) {
                true === res.authSetting["scope.userInfo"] && this.getUserInfo();
              }.bind(this)
            });
          }.bind(this)
        });
      };
      PlatformWechat.prototype.setUserData = function(res) {
        var _this = this;
        this.otherUserInfoIsReady = true;
        var userInfo = res.userInfo;
        this.playerName = userInfo.nickName;
        this.headURL = userInfo.avatarUrl;
        this.headURL && cc.loader.load({
          url: this.headURL,
          type: "png"
        }, function(err, texture) {
          _this.headSprite = new cc.SpriteFrame(texture);
        });
      };
      PlatformWechat.prototype.vibrateShort = function(callback) {
        wx.vibrateShort({
          success: function() {
            console.log("vibrateShort success.");
          },
          fail: function() {
            console.log("vibrateShort failed.");
          }
        });
      };
      PlatformWechat.prototype.vibrateLong = function(callback) {
        wx.vibrateLong({
          success: function() {
            console.log("vibrateLong success.");
          },
          fail: function() {
            console.log("vibrateLong failed.");
          }
        });
      };
      PlatformWechat.prototype.createVideo = function(videoEntry) {
        return wx.createVideo({
          x: videoEntry.x ? videoEntry.x : 0,
          y: videoEntry.y ? videoEntry.y : 0,
          width: videoEntry.width ? videoEntry.width : 300,
          height: videoEntry.height ? videoEntry.height : 150,
          src: videoEntry.src,
          poster: videoEntry.poster,
          initialTime: videoEntry.initialTime ? videoEntry.initialTime : 0,
          playbackRate: videoEntry.playbackRate ? videoEntry.playbackRate : 1,
          live: !!videoEntry.live && videoEntry.live,
          objectFit: videoEntry.objectFit ? videoEntry.objectFit : "contain",
          controls: !!videoEntry.controls && videoEntry.controls,
          autoplay: !!videoEntry.autoplay && videoEntry.autoplay,
          loop: !!videoEntry.loop && videoEntry.loop,
          muted: !!videoEntry.muted && videoEntry.muted,
          enableProgressGesture: !!videoEntry.enableProgressGesture && videoEntry.enableProgressGesture,
          showCenterPlayBtn: !!videoEntry.showCenterPlayBtn && videoEntry.showCenterPlayBtn
        });
      };
      PlatformWechat = __decorate([ ccclass ], PlatformWechat);
      return PlatformWechat;
    }(MD_PlatformBase.PlatformBase);
    exports.PlatformWechat = PlatformWechat;
    cc._RF.pop();
  }, {
    "../../GameRoot": "GameRoot",
    "./PlatformBase": "PlatformBase"
  } ],
  RadialBlur: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a6deevVAuFJz7YAa/SeTQ8x", "RadialBlur");
    "use strict";
    var renderEngine = cc.renderer.renderEngine;
    var renderer = renderEngine.renderer;
    var shader = {
      name: "RadialBlur",
      params: [ {
        name: "iCenter",
        type: renderer.PARAM_FLOAT2
      }, {
        name: "iResolution",
        type: renderer.PARAM_FLOAT3
      } ],
      defines: [],
      start: function start(sprite, material) {
        var iResolution = new cc.Vec3(sprite.node.width, sprite.node.height, 0);
        material.setParamValue("iResolution", iResolution);
        material.setParamValue("iCenter", new cc.Vec2(.5, .5));
      },
      vert: "uniform mat4 viewProj;\n        attribute vec3 a_position;\n        attribute vec2 a_uv0;\n        varying vec2 uv0;\n        void main () {\n            vec4 pos = viewProj * vec4(a_position, 1);\n            gl_Position = pos;\n            uv0 = a_uv0;\n        }\n        ",
      frag: "\n    uniform sampler2D texture;\n    uniform vec3 iResolution;\n    uniform vec2 iCenter;\n    varying vec2 uv0;\n\n    void mainImage( out vec4 fragColor, in vec2 fragCoord )\n    {\n        const float Strength = 0.125;    \n        const int Samples = 64; //multiple of 2\n        \n        vec2 uv = fragCoord.xy;\n        \n        vec2 dir = (fragCoord.xy-iCenter.xy);\n    \n        vec4 color = vec4(0.0,0.0,0.0,0.0);\n        \n        for (int i = 0; i < Samples; i += 2) //operating at 2 samples for better performance\n        {\n            color += texture2D(texture,uv+float(i)/float(Samples)*dir*Strength);\n            color += texture2D(texture,uv+float(i+1)/float(Samples)*dir*Strength);\n        }   \n        \n        fragColor = color/float(Samples);\n    }\n     \n    void main(void)\n    {\n        mainImage(gl_FragColor, uv0);\n    }"
    };
    var CustomMaterial = require("CustomMaterial");
    CustomMaterial.addShader(shader);
    cc._RF.pop();
  }, {
    CustomMaterial: "CustomMaterial"
  } ],
  RainShader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "866e882L49MHYV1HQyk9xS6", "RainShader");
    "use strict";
    var renderEngine = cc.renderer.renderEngine;
    var renderer = renderEngine.renderer;
    var shader = {
      name: "rainheart",
      defines: [ {
        name: "HAS_HEART",
        value: true
      }, {
        name: "USE_POST_PROCESSING",
        value: false
      } ],
      params: [ {
        name: "texSize",
        type: renderer.PARAM_FLOAT2
      }, {
        name: "iResolution",
        type: renderer.PARAM_FLOAT3
      }, {
        name: "iTime",
        type: renderer.PARAM_FLOAT
      } ],
      start: function start(sprite, material) {
        var iResolution = new cc.Vec3(sprite.node.width, sprite.node.height, 0);
        var texSize = new cc.Vec2(sprite.node.width, sprite.node.height);
        material.setParamValue("iResolution", iResolution);
        material.setParamValue("texSize", texSize);
        this._start = Date.now();
      },
      update: function update(sprite, material) {
        var now = Date.now();
        var time = (now - this._start) / 1e3;
        material.setParamValue("iTime", time);
      },
      vert: "\nuniform mat4 viewProj;\nuniform mat4 model;\nattribute vec3 a_position;\nattribute vec2 a_uv0;\nvarying vec2 uv0;\nvoid main () {\n    mat4 mvp;\n    mvp = viewProj * model;\n\n    vec4 pos = mvp * vec4(a_position, 1);\n    gl_Position = pos;\n    uv0 = a_uv0;\n}\n",
      frag: "\n// Heartfelt - by Martijn Steinrucken aka BigWings - 2017\n// countfrolic@gmail.com\n// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.\n\n// I revisited the rain effect I did for another shader. This one is better in multiple ways:\n// 1. The glass gets foggy.\n// 2. Drops cut trails in the fog on the glass.\n// 3. The amount of rain is adjustable (with Mouse.y)\n\n// To have full control over the rain, uncomment the HAS_HEART define \n\n// A video of the effect can be found here:\n// https://www.youtube.com/watch?v=uiF5Tlw22PI&feature=youtu.be\n\n// Music - Alone In The Dark - Vadim Kiselev\n// https://soundcloud.com/ahmed-gado-1/sad-piano-alone-in-the-dark\n// Rain sounds:\n// https://soundcloud.com/elirtmusic/sleeping-sound-rain-and-thunder-1-hours\n\n#define S(a, b, t) smoothstep(a, b, t)\n//#define CHEAP_NORMALS\n\nuniform sampler2D texture;\nuniform vec4 color;\nuniform vec3 iResolution;\nuniform float iTime;\nuniform vec2 texSize;\nvarying vec2 uv0;\n\nvec3 N13(float p) {\n    //  from DAVE HOSKINS\n   vec3 p3 = fract(vec3(p) * vec3(.1031,.11369,.13787));\n   p3 += dot(p3, p3.yzx + 19.19);\n   return fract(vec3((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y, (p3.y+p3.z)*p3.x));\n}\n\nvec4 N14(float t) {\n\treturn fract(sin(t*vec4(123., 1024., 1456., 264.))*vec4(6547., 345., 8799., 1564.));\n}\nfloat N(float t) {\n    return fract(sin(t*12345.564)*7658.76);\n}\n\nfloat Saw(float b, float t) {\n\treturn S(0., b, t)*S(1., b, t);\n}\n\nvec2 DropLayer2(vec2 uv, float t) {\n    vec2 UV = uv;\n    \n    uv.y += t*0.75;\n    vec2 a = vec2(6., 1.);\n    vec2 grid = a*2.;\n    vec2 id = floor(uv*grid);\n    \n    float colShift = N(id.x); \n    uv.y += colShift;\n    \n    id = floor(uv*grid);\n    vec3 n = N13(id.x*35.2+id.y*2376.1);\n    vec2 st = fract(uv*grid)-vec2(.5, 0);\n    \n    float x = n.x-.5;\n    \n    float y = UV.y*20.;\n    float wiggle = sin(y+sin(y));\n    x += wiggle*(.5-abs(x))*(n.z-.5);\n    x *= .7;\n    float ti = fract(t+n.z);\n    y = (Saw(.85, ti)-.5)*.9+.5;\n    vec2 p = vec2(x, y);\n    \n    float d = length((st-p)*a.yx);\n    \n    float mainDrop = S(.4, .0, d);\n    \n    float r = sqrt(S(1., y, st.y));\n    float cd = abs(st.x-x);\n    float trail = S(.23*r, .15*r*r, cd);\n    float trailFront = S(-.02, .02, st.y-y);\n    trail *= trailFront*r*r;\n    \n    y = UV.y;\n    float trail2 = S(.2*r, .0, cd);\n    float droplets = max(0., (sin(y*(1.-y)*120.)-st.y))*trail2*trailFront*n.z;\n    y = fract(y*10.)+(st.y-.5);\n    float dd = length(st-vec2(x, y));\n    droplets = S(.3, 0., dd);\n    float m = mainDrop+droplets*r*trailFront;\n    \n    //m += st.x>a.y*.45 || st.y>a.x*.165 ? 1.2 : 0.;\n    return vec2(m, trail);\n}\n\nfloat StaticDrops(vec2 uv, float t) {\n\tuv *= 40.;\n    \n    vec2 id = floor(uv);\n    uv = fract(uv)-.5;\n    vec3 n = N13(id.x*107.45+id.y*3543.654);\n    vec2 p = (n.xy-.5)*.7;\n    float d = length(uv-p);\n    \n    float fade = Saw(.025, fract(t+n.z));\n    float c = S(.3, 0., d)*fract(n.z*10.)*fade;\n    return c;\n}\n\nvec2 Drops(vec2 uv, float t, float l0, float l1, float l2) {\n    float s = StaticDrops(uv, t)*l0; \n    vec2 m1 = DropLayer2(uv, t)*l1;\n    vec2 m2 = DropLayer2(uv*1.85, t)*l2;\n    \n    float c = s+m1.x+m2.x;\n    c = S(.3, 1., c);\n    \n    return vec2(c, max(m1.y*l0, m2.y*l1));\n}\n\nvoid main()\n{\n    vec4 iMouse = vec4(0.0, 0.0, 0.0, 0.0);\n    vec2 fragCoord = vec2(uv0.x * texSize.x - 0.5 * texSize.x, 0.5 * texSize.y - uv0.y * texSize.y);\n\n\tvec2 uv = fragCoord.xy / iResolution.y;\n    vec2 UV = (fragCoord.xy+.5*iResolution.xy) / iResolution.xy;\n    vec3 M = iMouse.xyz/iResolution.xyz;\n    float T = iTime+M.x*2.;\n    \n    #ifdef HAS_HEART\n        T = mod(iTime, 102.);\n        T = mix(T, M.x*102., M.z>0.?1.:0.);\n    #endif\n    \n    float t = T*.2;\n    \n    float rainAmount = iMouse.z>0. ? M.y : sin(T*.05)*.3+.7;\n    \n    float maxBlur = mix(3., 6., rainAmount);\n    float minBlur = 2.;\n    \n    float story = 0.;\n    float heart = 0.;\n    \n    #ifdef HAS_HEART\n        story = S(0., 70., T);\n        \n        t = min(1., T/70.);\t\t\t\t\t\t// remap drop time so it goes slower when it freezes\n        t = 1.-t;\n        t = (1.-t*t)*70.;\n        \n        float zoom= mix(.3, 1.2, story);\t\t// slowly zoom out\n        uv *=zoom;\n        minBlur = 4.+S(.5, 1., story)*3.;\t\t// more opaque glass towards the end\n        maxBlur = 6.+S(.5, 1., story)*1.5;\n        \n        vec2 hv = uv-vec2(.0, -.1);\t\t\t\t// build heart\n        hv.x *= .5;\n        float s = S(110., 70., T);\t\t\t\t// heart gets smaller and fades towards the end\n        hv.y-=sqrt(abs(hv.x))*.5*s;\n        heart = length(hv);\n        heart = S(.4*s, .2*s, heart)*s;\n        rainAmount = heart;\t\t\t\t\t\t// the rain is where the heart is\n        \n        maxBlur-=heart;\t\t\t\t\t\t\t// inside the heart slighly less foggy\n        uv *= 1.5;\t\t\t\t\t\t\t\t// zoom out a bit more\n        t *= .25;\n    #else\n        float zoom = -cos(T*.2);\n        uv *= .7+zoom*.3;\n    #endif\n    UV = (UV-.5)*(.9+zoom*.1)+.5;\n    \n    float staticDrops = S(-.5, 1., rainAmount)*2.;\n    float layer1 = S(.25, .75, rainAmount);\n    float layer2 = S(.0, .5, rainAmount);\n    \n    vec2 c = Drops(uv, t, staticDrops, layer1, layer2);\n    #ifdef CHEAP_NORMALS\n    \tvec2 n = vec2(dFdx(c.x), dFdy(c.x));// cheap normals (3x cheaper, but 2 times shittier ;))\n    #else\n    \tvec2 e = vec2(.001, 0.);\n    \tfloat cx = Drops(uv+e, t, staticDrops, layer1, layer2).x;\n    \tfloat cy = Drops(uv+e.yx, t, staticDrops, layer1, layer2).x;\n    \tvec2 n = vec2(cx-c.x, cy-c.x);\t\t// expensive normals\n    #endif\n\n    #ifdef HAS_HEART\n        n *= 1.-S(60., 85., T);\n        c.y *= 1.-S(80., 100., T)*.8;\n    #endif\n\n    float focus = mix(maxBlur-c.y, minBlur, S(.1, .2, c.x));\n    vec3 col = texture2D(texture, UV+n).rgb;\n    \t\t\t\t\t\t// make time sync with first lightnoing\n\n    #ifdef USE_POST_PROCESSING\n        t = (T+3.)*.5;\t\t\t\n        float colFade = sin(t*.2)*.5+.5+story;\n        col *= mix(vec3(1.), vec3(.8, .9, 1.3), colFade);\t// subtle color shift\n        float fade = S(0., 10., T);\t\t\t\t\t\t\t// fade in at the start\n        float lightning = sin(t*sin(t*10.));\t\t\t\t// lighting flicker\n        lightning *= pow(max(0., sin(t+sin(t))), 10.);\t\t// lightning flash\n        col *= 1.+lightning*fade*mix(1., .1, story*story);\t// composite lightning\n        col *= 1.-dot(UV-=.5, UV);\t\t\t\t\t\t\t// vignette\n\n        #ifdef HAS_HEART\n            col = mix(pow(col, vec3(1.2)), col, heart);\n            fade *= S(102., 97., T);\n        #endif\n\n        col *= fade;\t\t\t\t\t\t\t\t\t\t// composite start and end fade\n    #endif\n\n    //col = vec3(heart);\n    gl_FragColor = vec4(col, 1.);\n}\n"
    };
    var CustomMaterial = require("CustomMaterial");
    CustomMaterial.addShader(shader);
    cc._RF.pop();
  }, {
    CustomMaterial: "CustomMaterial"
  } ],
  ReboundDart: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "af50clqp7dJLI/WEOSQjx3l", "ReboundDart");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DartBase_1 = require("./DartBase");
    var Global_1 = require("../Global");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ReboundDart = function(_super) {
      __extends(ReboundDart, _super);
      function ReboundDart() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ReboundDart.prototype.onCollisionEnter = function(other, self) {
        if (-1 !== other.node.name.indexOf("Wall")) {
          var newV = Global_1.default.Rebound(this.velocity);
          this.velocity.x = newV.x;
          this.velocity.y = newV.y;
        } else this.delete();
      };
      ReboundDart = __decorate([ ccclass ], ReboundDart);
      return ReboundDart;
    }(DartBase_1.default);
    exports.default = ReboundDart;
    cc._RF.pop();
  }, {
    "../Global": "Global",
    "./DartBase": "DartBase"
  } ],
  ResMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4f5dcVktrJGrbELDdt5MS+b", "ResMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ModulesBase_1 = require("../ModulesBase");
    var Global_1 = require("../../Global");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ResMgr = function(_super) {
      __extends(ResMgr, _super);
      function ResMgr() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ResMgr.prototype.init = function(data) {};
      ResMgr.prototype.update = function(dt) {};
      ResMgr.prototype.loadConfigAsync = function(name) {
        return new Promise(function(resolve, reject) {
          cc.loader.loadRes("config/" + name, function(err, res) {
            if (err) {
              Global_1.default.ERROR_MSG("name:" + name + ", " + err);
              resolve();
            } else resolve(res.json);
          });
        });
      };
      ResMgr.prototype.loadPrefabAsync = function(path) {
        return new Promise(function(resolve, reject) {
          cc.loader.loadRes("prefab/" + path, function(err, res) {
            if (err) {
              Global_1.default.ERROR_MSG("name:" + path + ", " + err);
              resolve();
            } else resolve(res);
          });
        });
      };
      ResMgr.prototype.loadPrefabDirAsync = function(path) {
        return new Promise(function(resolve, reject) {
          cc.loader.loadResDir("prefab/" + path, function(err, res) {
            if (err) {
              Global_1.default.ERROR_MSG("name:" + path + ", " + err);
              resolve();
            } else resolve(res);
          });
        });
      };
      ResMgr = __decorate([ ccclass ], ResMgr);
      return ResMgr;
    }(ModulesBase_1.default);
    exports.default = ResMgr;
    cc._RF.pop();
  }, {
    "../../Global": "Global",
    "../ModulesBase": "ModulesBase"
  } ],
  RoleTipsMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a3970n8DyhMwZ8kRGWkb7D5", "RoleTipsMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var RoleTipsMgr = function(_super) {
      __extends(RoleTipsMgr, _super);
      function RoleTipsMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.tipLabel = null;
        return _this;
      }
      RoleTipsMgr.prototype.start = function() {};
      RoleTipsMgr.prototype.showText = function(text) {
        this.tipLabel.string = text;
      };
      __decorate([ property(cc.Label) ], RoleTipsMgr.prototype, "tipLabel", void 0);
      RoleTipsMgr = __decorate([ ccclass ], RoleTipsMgr);
      return RoleTipsMgr;
    }(cc.Component);
    exports.default = RoleTipsMgr;
    cc._RF.pop();
  }, {} ],
  ScrollLoop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "05dd2l73c5PrJM4tUv0oJj4", "ScrollLoop");
    "use strict";
    var renderEngine = cc.renderer.renderEngine;
    var renderer = renderEngine.renderer;
    var shader = {
      name: "ScrollLoop",
      params: [ {
        name: "u_offset",
        type: renderer.PARAM_FLOAT2
      } ],
      defines: [],
      start: function start(sprite, material, param1) {
        sprite.spriteFrame.getTexture().setWrapMode(cc.Texture2D.WrapMode.REPEAT, cc.Texture2D.WrapMode.REPEAT);
        this._speed = param1;
        this._curMoveValue = 0;
        this._u_offset = new cc.Vec2(0, 0);
      },
      update: function update(sprite, material, dt) {
        this._curMoveValue += dt * this._speed;
        this._curMoveValue = this._curMoveValue % 1;
        this._u_offset.y = this._curMoveValue;
        material.setParamValue("u_offset", this._u_offset);
      },
      vert: "uniform mat4 viewProj;\n    attribute vec4 a_position;\n    attribute vec2 a_uv0;\n    varying vec2 uv0;\n    uniform vec2 u_offset;\n    void main()\n    {\n        gl_Position = viewProj * a_position;\n        uv0 = a_uv0 + u_offset;\n    }\n    ",
      frag: "\n    uniform sampler2D texture;\n    varying vec2 uv0;\n    \n    void main()\n    {\n        gl_FragColor = texture2D(texture, uv0);\n    }\n    "
    };
    var CustomMaterial = require("CustomMaterial");
    CustomMaterial.addShader(shader);
    cc._RF.pop();
  }, {
    CustomMaterial: "CustomMaterial"
  } ],
  SequenceFramesMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d32efmn63JPL7s5FtJUojlJ", "SequenceFramesMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SequenceFramesMgr = function(_super) {
      __extends(SequenceFramesMgr, _super);
      function SequenceFramesMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.animSpeed = 1;
        return _this;
      }
      SequenceFramesMgr.prototype.onLoad = function() {
        this.anim = this.getComponent(cc.Animation);
      };
      SequenceFramesMgr.prototype.start = function() {};
      SequenceFramesMgr.prototype.play = function(name) {
        name ? this.anim.play(name) : this.anim.play();
      };
      __decorate([ property ], SequenceFramesMgr.prototype, "animSpeed", void 0);
      SequenceFramesMgr = __decorate([ ccclass ], SequenceFramesMgr);
      return SequenceFramesMgr;
    }(cc.Component);
    exports.default = SequenceFramesMgr;
    cc._RF.pop();
  }, {} ],
  ShaderHelper: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "172acsdfu5B7ZAvcnw9RvZH", "ShaderHelper");
    "use strict";
    var CustomMaterial = require("CustomMaterial");
    var GameLogic = require("../../GameLogic");
    var ShaderEnum = cc.Enum({});
    var ShaderHelper = cc.Class({
      extends: cc.Component,
      editor: false,
      properties: {
        _shaderObject: null,
        program: {
          type: ShaderEnum,
          default: 0,
          notify: function notify(oldValue) {
            if (this.program === oldValue) return;
            this.applyShader();
          }
        },
        params1: {
          default: .05
        },
        params2: {
          default: 0
        }
      },
      __preload: function __preload() {
        var array = CustomMaterial.getAllName();
        ShaderHelper.ShaderEnum = CustomMaterial.getShaderEnum();
        cc.Class.Attr.setClassAttr(ShaderHelper, "program", "enumList", array);
      },
      onLoad: function onLoad() {
        this.sprite = this.getComponent(cc.Sprite);
        this.applyShader();
      },
      update: function update(dt) {
        false;
        dt *= GameLogic.default.instance.getTimeScale();
        this._shaderObject && this._shaderObject.update && this._shaderObject.update(this.sprite, this.material, dt, this.params2);
      },
      setParamsValue: function setParamsValue(index, value) {
        0 === index ? this.params1 = value : this.params2 = value;
      },
      applyShader: function applyShader() {
        false;
        this._shaderObject = CustomMaterial.getShaderByIndex(this.program);
        var sprite = this.sprite;
        var params = this._shaderObject.params;
        var defines = this._shaderObject.defines;
        var material = sprite.getMaterial(this._shaderObject.name);
        if (!material) {
          material = new CustomMaterial(this._shaderObject.name, params, defines || []);
          sprite.setMaterial(this._shaderObject.name, material);
        }
        this.material = material;
        sprite.activateMaterial(this._shaderObject.name);
        params && params.forEach(function(item) {
          void 0 !== item.defaultValue && material.setParamValue(item.name, item.defaultValue);
        });
        this._shaderObject.start && this._shaderObject.start(sprite, material, this.params1);
      }
    });
    module.exports = ShaderHelper;
    cc._RF.pop();
  }, {
    "../../GameLogic": "GameLogic",
    CustomMaterial: "CustomMaterial"
  } ],
  ShaderHook: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aa8e9IMEEFLwKhN05UGf55B", "ShaderHook");
    "use strict";
    var renderEngine = cc.renderer.renderEngine;
    var SpriteMaterial = renderEngine.SpriteMaterial;
    var GraySpriteMaterial = renderEngine.GraySpriteMaterial;
    var STATE_CUSTOM = 101;
    cc.Sprite.prototype.getMaterial = function(name) {
      return this._materials ? this._materials[name] : void 0;
    };
    cc.Sprite.prototype.setMaterial = function(name, mat) {
      this._materials || (this._materials = {});
      this._materials[name] = mat;
    };
    cc.Sprite.prototype.activateMaterial = function(name) {
      var mat = this.getMaterial(name);
      if (mat && mat !== this._currMaterial) if (mat) {
        this.node && (mat.color = this.node.color);
        this.spriteFrame && (mat.texture = this.spriteFrame.getTexture());
        this.node._renderFlag |= cc.RenderFlow.FLAG_COLOR;
        this._currMaterial = mat;
        this._currMaterial.name = name;
        this._state = STATE_CUSTOM;
        this._activateMaterial();
      } else console.error("activateMaterial - unknwon material: ", name);
    };
    cc.Sprite.prototype.getCurrMaterial = function() {
      if (this._state === STATE_CUSTOM) return this._currMaterial;
    };
    cc.Sprite.prototype._activateMaterial = function() {
      var spriteFrame = this._spriteFrame;
      if (cc.game.renderType !== cc.game.RENDER_TYPE_CANVAS) {
        var material = void 0;
        if (this._state === cc.Sprite.State.GRAY) {
          if (!this._graySpriteMaterial) {
            this._graySpriteMaterial = new GraySpriteMaterial();
            this.node._renderFlag |= cc.RenderFlow.FLAG_COLOR;
          }
          material = this._graySpriteMaterial;
          this._currMaterial = null;
        } else if (this._state === STATE_CUSTOM) {
          if (!this._currMaterial) {
            console.error("_activateMaterial: _currMaterial undefined!");
            return;
          }
          material = this._currMaterial;
        } else {
          if (!this._spriteMaterial) {
            this._spriteMaterial = new SpriteMaterial();
            this.node._renderFlag |= cc.RenderFlow.FLAG_COLOR;
          }
          material = this._spriteMaterial;
          this._currMaterial = null;
        }
        if (spriteFrame && spriteFrame.textureLoaded()) {
          var texture = spriteFrame.getTexture();
          if (material.texture !== texture) {
            material.texture = texture;
            this._updateMaterial(material);
          } else material !== this._material && this._updateMaterial(material);
          this._renderData && (this._renderData.material = material);
          this.markForUpdateRenderData(true);
          this.markForRender(true);
        } else this.disableRender();
      }
    };
    cc._RF.pop();
  }, {} ],
  SkillBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4e9a35+y49EjaSmFmBZYmRC", "SkillBase");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameLogic_1 = require("../GameLogic");
    var GameRoot_1 = require("../GameRoot");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SkillBase = function(_super) {
      __extends(SkillBase, _super);
      function SkillBase() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.damage = 10;
        _this.lastTime = 10;
        _this.slowMotionScale = .3;
        _this.isUsing = false;
        _this.useAccTime = 0;
        return _this;
      }
      SkillBase.prototype.start = function() {};
      SkillBase.prototype.init = function(worldBirthPos) {};
      SkillBase.prototype.use = function() {
        this.isUsing = true;
        this.useAccTime = 0;
        GameLogic_1.default.instance.setTimeScale(1);
        GameRoot_1.default.instance.getUserInfoModule().beginUseSkill(this);
      };
      SkillBase.prototype.delete = function() {
        GameRoot_1.default.instance.getUserInfoModule().useSkillFinish();
        this.node && this.node.isValid && this.node.destroy();
      };
      SkillBase.prototype.getUsePercentTime = function() {
        return this.useAccTime / this.lastTime;
      };
      SkillBase.prototype.update = function(dt) {
        if (this.isUsing) {
          this.useAccTime += dt;
          this.useAccTime >= this.lastTime && this.delete();
        }
      };
      __decorate([ property ], SkillBase.prototype, "damage", void 0);
      __decorate([ property ], SkillBase.prototype, "lastTime", void 0);
      __decorate([ property ], SkillBase.prototype, "slowMotionScale", void 0);
      SkillBase = __decorate([ ccclass ], SkillBase);
      return SkillBase;
    }(cc.Component);
    exports.default = SkillBase;
    cc._RF.pop();
  }, {
    "../GameLogic": "GameLogic",
    "../GameRoot": "GameRoot"
  } ],
  SkillBeginShowMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6a657bCJUlDPYncDNah/1us", "SkillBeginShowMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SkillBeginShowMgr = function(_super) {
      __extends(SkillBeginShowMgr, _super);
      function SkillBeginShowMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.anim = null;
        return _this;
      }
      SkillBeginShowMgr.prototype.start = function() {};
      SkillBeginShowMgr.prototype.play = function() {
        this.anim.on("finished", this.onFinished, this);
        var animState = this.anim.play();
        return animState.duration;
      };
      SkillBeginShowMgr.prototype.onFinished = function() {
        this.node && this.node.isValid && this.node.destroy();
      };
      __decorate([ property(cc.Animation) ], SkillBeginShowMgr.prototype, "anim", void 0);
      SkillBeginShowMgr = __decorate([ ccclass ], SkillBeginShowMgr);
      return SkillBeginShowMgr;
    }(cc.Component);
    exports.default = SkillBeginShowMgr;
    cc._RF.pop();
  }, {} ],
  SkillLiuShui: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5c42aZaCelNF76QExsjOooU", "SkillLiuShui");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SkillBase_1 = require("./SkillBase");
    var Global_1 = require("../Global");
    var Damager_1 = require("./Dmager/Damager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var OperationType = cc.Enum({
      NONE: 1,
      TOUCH_START: 2,
      TOUCH_OUT: 3
    });
    var SkillLiuShui = function(_super) {
      __extends(SkillLiuShui, _super);
      function SkillLiuShui() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.inputNode = null;
        _this.pushTime = 3;
        _this.bgNode = null;
        _this.laserPrefab = null;
        _this.laserSpeed = 100;
        _this.pushProgressBar = null;
        _this.worldBirthPos = new cc.Vec2();
        _this.lastWorldPos = new cc.Vec2();
        return _this;
      }
      SkillLiuShui.prototype.init = function(worldBirthPos) {
        this.curOperationType = OperationType.NONE;
        this.passTime = 0;
        this.isUsing = false;
        this.worldBirthPos = worldBirthPos;
        this.lastWorldPos.x = this.worldBirthPos.x;
        this.lastWorldPos.y = this.worldBirthPos.y + 1;
        this.bindInputEvent();
        this.use();
      };
      SkillLiuShui.prototype.bindInputEvent = function() {
        var _this = this;
        this.inputNode.on("touchstart", function(event) {
          _this.curOperationType = OperationType.TOUCH_START;
          _this.passTime = 0;
          _this.lastWorldPos = event.touch.getLocation();
        }, this);
        this.inputNode.on("touchmove", function(event) {
          _this.lastWorldPos = event.touch.getLocation();
        }, this);
        this.inputNode.on("touchend", function(event) {
          _this.touchEnd();
        }, this);
        this.inputNode.on("touchcancel", function(event) {
          _this.touchEnd();
        }, this);
      };
      SkillLiuShui.prototype.touchEnd = function() {
        this.curOperationType = OperationType.TOUCH_OUT;
        this.passTime = 0;
        this.pushProgressBar.progress = 0;
      };
      SkillLiuShui.prototype.delete = function() {
        this.laserNode && this.laserNode.isValid && this.laserNode.destroy();
        _super.prototype.delete.call(this);
      };
      SkillLiuShui.prototype.update = function(dt) {
        _super.prototype.update.call(this, dt);
        if (this.isUsing) this.updateLaser(dt); else if (this.curOperationType === OperationType.TOUCH_START) {
          this.passTime += dt;
          var percent = this.passTime / this.pushTime;
          this.pushProgressBar.progress = percent;
          this.passTime >= this.pushTime && this.use();
        }
      };
      SkillLiuShui.prototype.use = function() {
        _super.prototype.use.call(this);
        this.bgNode.active = false;
        this.laserNode = cc.instantiate(this.laserPrefab);
        cc.director.getScene().addChild(this.laserNode);
        this.laserNode.zIndex = 100;
        this.laserNode.setPosition(this.worldBirthPos);
        var damagerComp = this.laserNode.getComponent(Damager_1.default);
        damagerComp.setDamage(this.damage);
        damagerComp.setInstigator(this);
      };
      SkillLiuShui.prototype.updateLaser = function(dt) {
        var destAngle;
        if (this.lastWorldPos.y <= this.worldBirthPos.y) destAngle = this.lastWorldPos.x < this.worldBirthPos.x ? -180 : 0; else {
          var dir = this.lastWorldPos.sub(this.worldBirthPos);
          destAngle = -1 * Global_1.default.RadiansToAngle(Math.atan2(dir.y, dir.x));
        }
        if (destAngle === this.laserNode.rotation) return;
        var velocity = this.laserSpeed * dt;
        if (destAngle > this.laserNode.rotation) {
          this.laserNode.rotation += velocity;
          this.laserNode.rotation >= destAngle && (this.laserNode.rotation = destAngle);
        } else {
          this.laserNode.rotation -= velocity;
          this.laserNode.rotation <= destAngle && (this.laserNode.rotation = destAngle);
        }
      };
      __decorate([ property(cc.Node) ], SkillLiuShui.prototype, "inputNode", void 0);
      __decorate([ property({
        tooltip: "\u957f\u6309\u591a\u4e45\u89e6\u53d1"
      }) ], SkillLiuShui.prototype, "pushTime", void 0);
      __decorate([ property(cc.Node) ], SkillLiuShui.prototype, "bgNode", void 0);
      __decorate([ property(cc.Prefab) ], SkillLiuShui.prototype, "laserPrefab", void 0);
      __decorate([ property ], SkillLiuShui.prototype, "laserSpeed", void 0);
      __decorate([ property(cc.ProgressBar) ], SkillLiuShui.prototype, "pushProgressBar", void 0);
      SkillLiuShui = __decorate([ ccclass ], SkillLiuShui);
      return SkillLiuShui;
    }(SkillBase_1.default);
    exports.default = SkillLiuShui;
    cc._RF.pop();
  }, {
    "../Global": "Global",
    "./Dmager/Damager": "Damager",
    "./SkillBase": "SkillBase"
  } ],
  SkillLongJuan: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9ca14XZ381KNrbdfZg9YXDN", "SkillLongJuan");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SkillBase_1 = require("./SkillBase");
    var DamagerLongJuan_1 = require("./Dmager/DamagerLongJuan");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var OperationType = cc.Enum({
      NONE: 1,
      TOUCH_START: 2,
      TOUCH_MOVE: 3,
      TOUCH_OUT: 4
    });
    var SkillLongJuan = function(_super) {
      __extends(SkillLongJuan, _super);
      function SkillLongJuan() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.inputNode = null;
        _this.unitCircleCostTime = 1.2;
        _this.unitTimeGetPoint = .1;
        _this.radiusPrecision = 200;
        _this.pointsCount = 3;
        _this.bgNode = null;
        _this.damagerPrefab = null;
        _this.centerPos = new cc.Vec2();
        _this.circleRadius = 0;
        _this.beginTime = 0;
        _this.betweenTime = 0;
        return _this;
      }
      SkillLongJuan.prototype.init = function(worldBirthPos) {
        this.curOperationType = OperationType.NONE;
        this.isUsing = false;
        this.bindInputEvent();
      };
      SkillLongJuan.prototype.bindInputEvent = function() {
        var _this = this;
        this.inputNode.on("touchstart", function(event) {
          _this.curOperationType = OperationType.TOUCH_START;
          _this.beginWorldPos = event.touch.getLocation();
          _this.beginTime = 0;
          _this.betweenTime = 0;
          _this.posVecList = [];
          _this.distanceList = [];
        }, this);
        this.inputNode.on("touchmove", function(event) {
          _this.curOperationType = OperationType.TOUCH_MOVE;
          _this.lastWorldPos = event.touch.getLocation();
        }, this);
        this.inputNode.on("touchend", function(event) {
          _this.touchEnd(event);
        }, this);
        this.inputNode.on("touchcancel", function(event) {
          _this.touchEnd(event);
        }, this);
      };
      SkillLongJuan.prototype.touchEnd = function(event) {
        if (this.isUsing) return;
        this.curOperationType = OperationType.TOUCH_OUT;
        this.beginTime = 0;
        this.betweenTime = 0;
        this.endWorldPos = event.touch.getLocation();
        if (this.distanceList.length <= 0) return;
        var maxIndex = 0;
        for (var i = 1; i < this.distanceList.length; i++) this.distanceList[i] > this.distanceList[maxIndex] && (maxIndex = i);
        var radius = this.distanceList[maxIndex] / 2;
        this.circleRadius = radius;
        console.log("radius: " + radius);
        var centrePos = this.beginWorldPos.add(this.posVecList[maxIndex]);
        centrePos.x /= 2;
        centrePos.y /= 2;
        this.centerPos = centrePos;
        var num = 0;
        for (var _i = 0, _a = this.posVecList; _i < _a.length; _i++) {
          var pos = _a[_i];
          Math.abs(pos.sub(centrePos).mag() - radius) < this.radiusPrecision && num++;
        }
        console.log(num + "\u4e2a\u70b9\u5728\u534a\u5f84\u5dee\u503c\u8303\u56f4\u5185");
        var isValid = false;
        num >= this.pointsCount && (isValid = true);
        if (isValid) {
          console.log("\u753b\u4e86\u4e00\u4e2a\u5706");
          this.use();
        }
      };
      SkillLongJuan.prototype.delete = function() {
        this.damagerNode && this.damagerNode.isValid && this.damagerNode.destroy();
        _super.prototype.delete.call(this);
      };
      SkillLongJuan.prototype.update = function(dt) {
        _super.prototype.update.call(this, dt);
        if (!this.isUsing && this.curOperationType === OperationType.TOUCH_MOVE) {
          this.beginTime += dt;
          if (this.beginTime >= this.unitCircleCostTime) this.beginTime = 0; else {
            this.betweenTime += dt;
            if (this.betweenTime >= this.unitTimeGetPoint) {
              this.posVecList.push(this.lastWorldPos);
              var newV = this.lastWorldPos.sub(this.beginWorldPos);
              this.distanceList.push(newV.mag());
              this.betweenTime = 0;
            }
          }
        }
      };
      SkillLongJuan.prototype.use = function() {
        _super.prototype.use.call(this);
        this.bgNode.active = false;
        this.damagerNode = cc.instantiate(this.damagerPrefab);
        cc.director.getScene().addChild(this.damagerNode);
        this.damagerNode.setPosition(this.centerPos);
        var damagerComp = this.damagerNode.getComponent(DamagerLongJuan_1.default);
        damagerComp.setDamage(this.damage);
        damagerComp.setInstigator(this);
        damagerComp.setRadius(this.circleRadius);
        damagerComp.setCentre(this.centerPos);
      };
      __decorate([ property(cc.Node) ], SkillLongJuan.prototype, "inputNode", void 0);
      __decorate([ property({
        tooltip: "\u753b\u4e00\u4e2a\u5706\u7b49\u5f85\u65f6\u95f4"
      }) ], SkillLongJuan.prototype, "unitCircleCostTime", void 0);
      __decorate([ property({
        tooltip: "\u6bcf\u9694\u591a\u4e45\u53d6\u4e00\u4e2a\u70b9"
      }) ], SkillLongJuan.prototype, "unitTimeGetPoint", void 0);
      __decorate([ property({
        tooltip: "\u753b\u5706\u7684\u7cbe\u5ea6\u5dee\u503c,\u503c\u8d8a\u4f4e\u8981\u6c42\u753b\u7684\u8d8a\u5706"
      }) ], SkillLongJuan.prototype, "radiusPrecision", void 0);
      __decorate([ property({
        tooltip: "\u753b\u5706\u7684\u7cbe\u5ea6\u70b9\u6570,\u503c\u8d8a\u9ad8\u8981\u6c42\u753b\u7684\u8d8a\u5706"
      }) ], SkillLongJuan.prototype, "pointsCount", void 0);
      __decorate([ property(cc.Node) ], SkillLongJuan.prototype, "bgNode", void 0);
      __decorate([ property(cc.Prefab) ], SkillLongJuan.prototype, "damagerPrefab", void 0);
      SkillLongJuan = __decorate([ ccclass ], SkillLongJuan);
      return SkillLongJuan;
    }(SkillBase_1.default);
    exports.default = SkillLongJuan;
    cc._RF.pop();
  }, {
    "./Dmager/DamagerLongJuan": "DamagerLongJuan",
    "./SkillBase": "SkillBase"
  } ],
  StartMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9f924eQhMJI8In3g2bhdImm", "StartMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Global_1 = require("../Global");
    var ChangeScene_1 = require("../ChangeScene");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StartMgr = function(_super) {
      __extends(StartMgr, _super);
      function StartMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.startInputNode = null;
        _this.isMove = false;
        _this.isStartGame = false;
        return _this;
      }
      StartMgr.prototype.start = function() {
        var changeSceneMgr = this.getComponent(ChangeScene_1.default);
        this.scheduleOnce(function() {
          changeSceneMgr.preLoad();
        }, .5);
        this.bindInputEvent(this.startInputNode);
      };
      StartMgr.prototype.bindInputEvent = function(inputNode) {
        var _this = this;
        inputNode.on("touchstart", function(e) {
          if (_this.isMove) return;
          _this.isMove = true;
          _this.touchBeginPos = e.touch.getLocation();
        }, this);
        inputNode.on("touchmove", function(e) {
          if (_this.isMove) {
            _this.touchEndPos = e.touch.getLocation();
            var y = _this.touchEndPos.y - _this.touchBeginPos.y;
            if (y <= 0) return;
            _this.startGame();
          }
        });
        inputNode.on("touchend", function(event) {
          _this.isMove = false;
        }, this);
        inputNode.on("touchcancel", function(event) {
          _this.isMove = false;
        }, this);
      };
      StartMgr.prototype.startGame = function() {
        if (this.isStartGame) return;
        this.isStartGame = true;
        this.node.emit(Global_1.default.GlobalEventMap.ChangeScene, "Game");
      };
      __decorate([ property(cc.Node) ], StartMgr.prototype, "startInputNode", void 0);
      StartMgr = __decorate([ ccclass ], StartMgr);
      return StartMgr;
    }(cc.Component);
    exports.default = StartMgr;
    cc._RF.pop();
  }, {
    "../ChangeScene": "ChangeScene",
    "../Global": "Global"
  } ],
  StartUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "57f12He9eZBurE0QRc8KW+p", "StartUI");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var StartUI = function(_super) {
      __extends(StartUI, _super);
      function StartUI() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      StartUI.prototype.start = function() {};
      StartUI = __decorate([ ccclass ], StartUI);
      return StartUI;
    }(cc.Component);
    exports.default = StartUI;
    cc._RF.pop();
  }, {} ],
  StateMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0d750bSc1tF+46Opov0pUVY", "StateMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    exports.StateType = cc.Enum({
      Rebound: 1,
      Scatter: 2,
      Pass: 3
    });
    var StateMgr = function() {
      function StateMgr() {}
      StateMgr.prototype.init = function() {
        this.statesInfoList = [];
      };
      StateMgr.prototype.update = function(dt) {
        if (this.statesInfoList.length > 0) {
          var now = +new Date();
          for (var _i = 0, _a = this.statesInfoList; _i < _a.length; _i++) {
            var stateInfo = _a[_i];
            var passTime = (now - stateInfo.beginTime) / 1e3;
            passTime >= stateInfo.durationTime && this.removeState(stateInfo.type);
          }
        }
      };
      StateMgr.prototype.addState = function(stateType, durationTime) {
        if (this.hasState(stateType)) {
          var stateInfo = this.getStateInfoByType(stateType);
          stateInfo.beginTime = +new Date();
          stateInfo.durationTime = durationTime;
        } else {
          var newStateInfo = {};
          newStateInfo.type = stateType;
          newStateInfo.beginTime = +new Date();
          newStateInfo.durationTime = durationTime;
          this.statesInfoList.push(newStateInfo);
        }
      };
      StateMgr.prototype.removeState = function(stateType) {
        for (var i = 0; i < this.statesInfoList.length; i++) if (this.statesInfoList[i].type === stateType) {
          this.statesInfoList.splice(i, 1);
          break;
        }
      };
      StateMgr.prototype.getStateInfoByType = function(stateType) {
        for (var _i = 0, _a = this.statesInfoList; _i < _a.length; _i++) {
          var stateInfo = _a[_i];
          if (stateInfo.type === stateType) return stateInfo;
        }
        return null;
      };
      StateMgr.prototype.hasState = function(stateType) {
        for (var _i = 0, _a = this.statesInfoList; _i < _a.length; _i++) {
          var stateInfo = _a[_i];
          if (stateInfo.type === stateType) return true;
        }
        return false;
      };
      StateMgr = __decorate([ ccclass ], StateMgr);
      return StateMgr;
    }();
    exports.StateMgr = StateMgr;
    cc._RF.pop();
  }, {} ],
  Transfer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "92206mWJfxH752fFrzb8rff", "Transfer");
    "use strict";
    var renderEngine = cc.renderer.renderEngine;
    var renderer = renderEngine.renderer;
    var shader = {
      name: "Transfer",
      params: [ {
        name: "time",
        type: renderer.PARAM_FLOAT,
        defaultValue: 0
      } ],
      time: 0,
      update: function update(sprite, material) {
        this.time += .005;
        this.time > 1 && (this.time = 0);
        cc.log(this.time);
        material.setParamValue("time", this.time);
      },
      defines: [],
      vert: "\n        uniform mat4 viewProj;\n        attribute vec3 a_position;\n        attribute vec2 a_uv0;\n        varying vec2 uv0;\n        void main () {\n            vec4 pos = viewProj * vec4(a_position, 1);\n            gl_Position = pos;\n            uv0 = a_uv0;\n        }",
      frag: "\n        uniform sampler2D texture;\n        uniform vec4 color;\n        uniform float time;\n        varying vec2 uv0;\n        \n        void main()\n        {\n            vec4 c = color * texture2D(texture, uv0);\n            gl_FragColor = c;\n    \n            float temp = uv0.x - time;\n            if (temp <= 0.0) {\n                float temp2 = abs(temp);\n                if (temp2 <= 0.2) {\n                    gl_FragColor.w = 1.0 - temp2/0.2;\n                } else {\n                    gl_FragColor.w = 0.0;\n                }\n            } else {\n                gl_FragColor.w = 1.0;\n            }\n        }"
    };
    var CustomMaterial = require("CustomMaterial");
    CustomMaterial.addShader(shader);
    cc._RF.pop();
  }, {
    CustomMaterial: "CustomMaterial"
  } ],
  UnfoldTransfer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5b19fxD7BdK1KuSH0/RyTuL", "UnfoldTransfer");
    "use strict";
    var renderEngine = cc.renderer.renderEngine;
    var renderer = renderEngine.renderer;
    var shader = {
      name: "UnfoldTransfer",
      params: [ {
        name: "time",
        type: renderer.PARAM_FLOAT,
        defaultValue: 0
      } ],
      time: 0,
      flag: 1,
      update: function update(sprite, material) {
        if (1 == this.flag) {
          this.time += .01;
          cc.log(this.time);
          if (this.time >= 1) {
            this.flag = 0;
            this.time = .9999;
          }
          material.setParamValue("time", this.time);
        }
      },
      defines: [],
      vert: "\n        uniform mat4 viewProj;\n        attribute vec3 a_position;\n        attribute vec2 a_uv0;\n        varying vec2 uv0;\n        void main () {\n            vec4 pos = viewProj * vec4(a_position, 1);\n            gl_Position = pos;\n            uv0 = a_uv0;\n        }",
      frag: "\n        uniform sampler2D texture;\n        uniform vec4 color;\n        uniform float time;\n        varying vec2 uv0;\n        \n        void main()\n        {\n            vec4 result = vec4(1.0,1.0,1.0,1.0);\n            vec2 translate = vec2(uv0.x,uv0.y);\n            result = texture2D(texture, uv0);\n            \n            // Calculate modulo to decide even and odd row\n            float div = 2.0;\n            float num = floor(uv0.y * 10.0);\n            float odd = num - (div * floor(num/div));\n            \n            float t = mod(time,1.0);\n            \n            //Only do the odd number\n            if( odd == 0.0){\n                translate.x = translate.x - t;        \n                result = texture2D(texture,translate);\n                if(translate.x < 0.0){\n                    result.w = 0.0;\n                }\n            }\n            else{\n                translate.x = translate.x + t;        \n                result = texture2D(texture,translate);\n                if(translate.x > 1.0){\n                    result.w = 0.0;\n                }\n            }\n            \n            // Output to screen\n            gl_FragColor = result;\n        }"
    };
    var CustomMaterial = require("CustomMaterial");
    CustomMaterial.addShader(shader);
    cc._RF.pop();
  }, {
    CustomMaterial: "CustomMaterial"
  } ],
  UserInfo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b255cMD5n1GMZP/0T1sQ597", "UserInfo");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ModulesBase_1 = require("./ModulesBase");
    var GameRoot_1 = require("../GameRoot");
    var SkillBase_1 = require("../Skill/SkillBase");
    var SkillBeginShowMgr_1 = require("../Skill/SkillBeginShowMgr");
    var GameLogic_1 = require("../GameLogic");
    var StateMgr_1 = require("../State/StateMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MAX_OYSTER_VALUE = 100;
    var UserInfo = function(_super) {
      __extends(UserInfo, _super);
      function UserInfo() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.curUnlockSkillIndex = 0;
        _this.curSelSkillIndex = 0;
        _this.isUsingSkill = false;
        return _this;
      }
      UserInfo.prototype.init = function(data) {
        this.initBaseProperty();
        this.initOysterSkill();
        this.initStateMgr();
        this.curWeaponPrefab = data.dartBasePrefab;
        this.preWeaponPrefab = this.curWeaponPrefab;
      };
      UserInfo.prototype.reset = function() {
        this.initBaseProperty();
        this.initStateMgr();
      };
      UserInfo.prototype.initBaseProperty = function() {
        this.baseProperty = {};
        this.baseProperty.oyster = 0;
      };
      UserInfo.prototype.initStateMgr = function() {
        this.stateMgr = new StateMgr_1.StateMgr();
        this.stateMgr.init();
      };
      UserInfo.prototype.initOysterSkill = function() {
        var _this = this;
        this.oysterSkillList = [ {
          prefabName: "SkillLiuShui",
          isLock: false,
          prefab: null
        }, {
          prefabName: "SkillLongJuan",
          isLock: false,
          prefab: null
        } ];
        for (var _i = 0, _a = this.oysterSkillList; _i < _a.length; _i++) {
          var oysterSkill = _a[_i];
          (function(skillObj) {
            skillObj.isLock || skillObj.prefab || GameRoot_1.default.instance.getResMgrModule().loadPrefabAsync("Skill/" + skillObj.prefabName).then(function(prefab) {
              prefab && (skillObj.prefab = prefab);
            });
          })(oysterSkill);
        }
        GameRoot_1.default.instance.getResMgrModule().loadPrefabAsync("Skill/SkillBeginShow").then(function(prefab) {
          prefab && (_this.skillBeginPrefab = prefab);
        });
      };
      UserInfo.prototype.changeWeapon = function(newWeaponPrefab) {
        if (newWeaponPrefab !== this.curWeaponPrefab) {
          this.preWeaponPrefab = this.curWeaponPrefab;
          this.curWeaponPrefab = newWeaponPrefab;
        }
      };
      UserInfo.prototype.restoreWeapon = function() {
        this.curWeaponPrefab = this.preWeaponPrefab;
      };
      UserInfo.prototype.getCurWeaponPrefab = function() {
        return this.curWeaponPrefab;
      };
      UserInfo.prototype.addOyster = function(addValue) {
        if (this.getIsUsingSkill()) return;
        this.baseProperty.oyster += addValue;
        this.baseProperty.oyster > MAX_OYSTER_VALUE && (this.baseProperty.oyster = MAX_OYSTER_VALUE);
        this.fireEvent("oysterChange");
      };
      UserInfo.prototype.resetOyster = function() {
        this.baseProperty.oyster = 0;
      };
      UserInfo.prototype.oysterIsMax = function() {
        return this.baseProperty.oyster >= MAX_OYSTER_VALUE;
      };
      UserInfo.prototype.getOysterValue = function() {
        return this.baseProperty.oyster;
      };
      UserInfo.prototype.getOysterMaxValue = function() {
        return MAX_OYSTER_VALUE;
      };
      UserInfo.prototype.unLockNextOysterSkill = function() {
        var _this = this;
        this.curUnlockSkillIndex++;
        if (this.curUnlockSkillIndex >= this.oysterSkillList.length) {
          this.curUnlockSkillIndex--;
          return;
        }
        this.oysterSkillList[this.curUnlockSkillIndex].isLock = false;
        this.oysterSkillList[this.curUnlockSkillIndex].prefab || GameRoot_1.default.instance.getResMgrModule().loadPrefabAsync("Skill/" + this.oysterSkillList[this.curUnlockSkillIndex].prefabName).then(function(prefab) {
          prefab && (_this.oysterSkillList[_this.curUnlockSkillIndex].prefab = prefab);
        });
      };
      UserInfo.prototype.getCurSkillPrefabAsync = function() {
        var _this = this;
        return new Promise(function(resolve, reject) {
          var prefab = _this.oysterSkillList[_this.curSelSkillIndex].prefab;
          if (prefab) resolve(prefab); else {
            var timerId_1;
            var callback = function() {
              var skillPrefab = this.oysterSkillList[this.curSelSkillIndex].prefab;
              if (skillPrefab) {
                clearInterval(timerId_1);
                resolve(skillPrefab);
              }
            };
            timerId_1 = setInterval(callback, 50);
          }
        });
      };
      UserInfo.prototype.getSkillBeginPrefabAsync = function() {
        var _this = this;
        return new Promise(function(resolve, reject) {
          if (_this.skillBeginPrefab) resolve(_this.skillBeginPrefab); else {
            var timerId_2;
            var callback = function() {
              if (this.skillBeginPrefab) {
                clearInterval(timerId_2);
                resolve(this.skillBeginPrefab);
              }
            };
            timerId_2 = setInterval(callback, 50);
          }
        });
      };
      UserInfo.prototype.useSkillAsync = function(worldBirthPos) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          if (!_this.oysterIsMax() || _this.isUsingSkill) resolve(); else {
            _this.isUsingSkill = true;
            _this.getSkillBeginPrefabAsync().then(function(prefab) {
              var skillBeginShowNode = cc.instantiate(prefab);
              cc.director.getScene().addChild(skillBeginShowNode);
              skillBeginShowNode.zIndex = 1e3;
              var skillBeginShowMgr = skillBeginShowNode.getComponent(SkillBeginShowMgr_1.default);
              var durationTime = skillBeginShowMgr.play();
              GameLogic_1.default.instance.stopAI();
              _this.pauseRoleAI();
              setTimeout(function() {
                _this.resumeRoleAI();
                _this.resetOyster();
                _this.getCurSkillPrefabAsync().then(function(prefab) {
                  var skillNode = cc.instantiate(prefab);
                  cc.director.getScene().addChild(skillNode);
                  skillNode.zIndex = 1e3;
                  var skillBaseComp = skillNode.getComponent(SkillBase_1.default);
                  skillBaseComp.init(worldBirthPos);
                  resolve(true);
                });
              }, 1e3 * (durationTime + .5));
            });
          }
        });
      };
      UserInfo.prototype.pauseRoleAI = function() {
        this.fireEvent("pauseRoleAI", {});
      };
      UserInfo.prototype.resumeRoleAI = function() {
        this.fireEvent("resumeRoleAI", {});
      };
      UserInfo.prototype.beginUseSkill = function(skillObj) {
        this.fireEvent("beginUseSkill", {
          skillObj: skillObj
        });
      };
      UserInfo.prototype.getIsUsingSkill = function() {
        return this.isUsingSkill;
      };
      UserInfo.prototype.useSkillFinish = function() {
        this.isUsingSkill = false;
      };
      UserInfo.prototype.getStateMgr = function() {
        return this.stateMgr;
      };
      UserInfo.prototype.update = function(dt) {
        this.stateMgr.update(dt);
      };
      UserInfo = __decorate([ ccclass ], UserInfo);
      return UserInfo;
    }(ModulesBase_1.default);
    exports.default = UserInfo;
    cc._RF.pop();
  }, {
    "../GameLogic": "GameLogic",
    "../GameRoot": "GameRoot",
    "../Skill/SkillBase": "SkillBase",
    "../Skill/SkillBeginShowMgr": "SkillBeginShowMgr",
    "../State/StateMgr": "StateMgr",
    "./ModulesBase": "ModulesBase"
  } ],
  WallMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e2967uI6bBDyLicnQOB2iPp", "WallMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MonsterBase_1 = require("../Monsters/MonsterBase");
    var Global_1 = require("../Global");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WallMgr = function(_super) {
      __extends(WallMgr, _super);
      function WallMgr() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      WallMgr.prototype.onCollisionEnter = function(other, self) {
        var monsterBase = other.node.getComponent(MonsterBase_1.MonsterBase);
        if (monsterBase) {
          var vel = monsterBase.getVelocity();
          if (vel) {
            var newV = Global_1.default.Rebound(vel);
            monsterBase.setVelocity(newV);
          }
        }
      };
      WallMgr = __decorate([ ccclass ], WallMgr);
      return WallMgr;
    }(cc.Component);
    exports.default = WallMgr;
    cc._RF.pop();
  }, {
    "../Global": "Global",
    "../Monsters/MonsterBase": "MonsterBase"
  } ],
  Water: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b6766RLdyNEoZDebcNKmclw", "Water");
    "use strict";
    var renderEngine = cc.renderer.renderEngine;
    var renderer = renderEngine.renderer;
    var shader = {
      name: "Water",
      params: [ {
        name: "iResolution",
        type: renderer.PARAM_FLOAT3
      }, {
        name: "iTime",
        type: renderer.PARAM_FLOAT
      } ],
      defines: [],
      start: function start(sprite, material) {
        var iResolution = new cc.Vec3(sprite.node.width, sprite.node.height, 0);
        material.setParamValue("iResolution", iResolution);
        this._start = Date.now();
      },
      update: function update(sprite, material) {
        var now = Date.now();
        var time = (now - this._start) / 500;
        material.setParamValue("iTime", time);
      },
      vert: "uniform mat4 viewProj;\n        attribute vec3 a_position;\n        attribute vec2 a_uv0;\n        varying vec2 uv0;\n        void main () {\n            vec4 pos = viewProj * vec4(a_position, 1);\n            gl_Position = pos;\n            uv0 = a_uv0;\n        }\n        ",
      frag: "uniform sampler2D texture;\n    uniform vec3 iResolution;\n    uniform float iTime;\n    varying vec2 uv0;\n\n    #define F cos(x-y)*cos(y),sin(x+y)*sin(y)\n\n    vec2 s(vec2 p)\n    {\n        float d=iTime*0.2,x=8.*(p.x+d),y=8.*(p.y+d);\n        return vec2(F);\n    }\n    void mainImage( out vec4 fragColor, in vec2 fragCoord )\n    {\n        // \u6362\u6210resolution\n        vec2 rs = iResolution.xy;\n        // \u6362\u6210\u7eb9\u7406\u5750\u6807v_texCoord.xy\n        vec2 uv = fragCoord;\n        vec2 q = uv+2./iResolution.x*(s(uv)-s(uv+rs));\n        //\u53cd\u8f6cy\n        //q.y=1.-q.y;\n        fragColor = texture2D(texture, q);\n    }\n    void main()\n    {\n        mainImage(gl_FragColor, uv0.xy);\n    }"
    };
    var CustomMaterial = require("CustomMaterial");
    CustomMaterial.addShader(shader);
    cc._RF.pop();
  }, {
    CustomMaterial: "CustomMaterial"
  } ],
  WaveShader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "250f5LyVohKj60NALNnOff6", "WaveShader");
    "use strict";
    var renderEngine = cc.renderer.renderEngine;
    var renderer = renderEngine.renderer;
    var shader = {
      name: "wave",
      params: [ {
        name: "iTime",
        type: renderer.PARAM_FLOAT
      }, {
        name: "iOffset",
        type: renderer.PARAM_FLOAT2
      } ],
      defines: [],
      start: function start(sprite, material) {
        material.setParamValue("iOffset", new cc.Vec2(.2, .2));
        this._start = Date.now();
      },
      update: function update(sprite, material) {
        var now = Date.now();
        var time = (now - this._start) / 1e3;
        material.setParamValue("iTime", time);
      },
      vert: "uniform mat4 viewProj;\n        attribute vec4 a_position;\n        attribute vec2 a_uv0;\n        varying vec2 uv0;\n\n        void main()\n        {\n            gl_Position = viewProj * a_position;\n            uv0 = a_uv0;\n        }\n        ",
      frag: "\n        uniform sampler2D texture;\n        uniform vec3 iResolution;\n        uniform float iTime;\n        uniform vec2 iOffset;\n        varying vec2 uv0;\n        \n        void main() {\n            vec2 coord = uv0;\n            coord.x += (sin(coord.y * 30.0 + iTime * 3.0) / 30.0 * iOffset[0]);\n            coord.y += (sin(coord.x * 30.0 + iTime * 3.0) / 30.0 * iOffset[1]);\n            gl_FragColor = texture2D(texture, coord);\n        }"
    };
    var CustomMaterial = require("CustomMaterial");
    CustomMaterial.addShader(shader);
    cc._RF.pop();
  }, {
    CustomMaterial: "CustomMaterial"
  } ],
  WindowTransfer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "83198IlhUNC8LBMttMFSNGa", "WindowTransfer");
    "use strict";
    var renderEngine = cc.renderer.renderEngine;
    var renderer = renderEngine.renderer;
    var shader = {
      name: "WindowTransfer",
      params: [ {
        name: "time",
        type: renderer.PARAM_FLOAT,
        defaultValue: 0
      } ],
      time: 2,
      update: function update(sprite, material) {
        if (this.time < 4) {
          this.time += .02;
          material.setParamValue("time", this.time);
        }
      },
      defines: [],
      vert: "\n    uniform mat4 viewProj;\n    attribute vec3 a_position;\n    attribute vec2 a_uv0;\n    varying vec2 uv0;\n    void main () {\n        vec4 pos = viewProj * vec4(a_position, 1);\n        gl_Position = pos;\n        uv0 = a_uv0;\n    }",
      frag: "\n    uniform sampler2D texture;\n    uniform vec4 color;\n    varying vec2 uv0;\n    uniform float time;\n\n\n    void main()\n    {\n\n        float dur = 2.;\n        float dim = 7.;\n        vec2 v = uv0;\n        v.y=1.-v.y;\n        vec2 x = mod(1.-v.xx, 1./dim)+floor(v*dim)/dim;\n        float a = .5*(abs(x.x)+abs(x.y));\n        float b = fract(time/dur);\n        a=a>b?0.:1.;\n        bool mt = mod(floor(time/dur),2.)==0.;\n        float cd = a;\n        if (mt)\n        {\n            cd=1.-cd;    \n        }\n        vec4 colore = vec4(0.5,0.2,0.3, 0.01);\n        gl_FragColor = mix(vec4(a),(mix(texture2D(texture, uv0), colore, cd)), 1.);\n\n    }"
    };
    var CustomMaterial = require("CustomMaterial");
    CustomMaterial.addShader(shader);
    cc._RF.pop();
  }, {
    CustomMaterial: "CustomMaterial"
  } ],
  ZoomBlurTransfer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a4d6bhbL4pAf4dXem+lTcP3", "ZoomBlurTransfer");
    "use strict";
    var renderEngine = cc.renderer.renderEngine;
    var renderer = renderEngine.renderer;
    var shader = {
      name: "ZoomBlurTransfer",
      params: [ {
        name: "time",
        type: renderer.PARAM_FLOAT,
        defaultValue: 0
      } ],
      time: 10,
      update: function update(sprite, material) {
        this.time < 14 && (this.time = this.time + .05);
        material.setParamValue("time", this.time);
      },
      defines: [],
      vert: "\n    uniform mat4 viewProj;\n    attribute vec3 a_position;\n    attribute vec2 a_uv0;\n    varying vec2 uv0;\n    void main () {\n        vec4 pos = viewProj * vec4(a_position, 1);\n        gl_Position = pos;\n        uv0 = a_uv0;\n    }",
      frag: "\n    uniform sampler2D texture;\n    uniform vec4 color;\n    varying vec2 uv0;\n    uniform float time;\n\n    const float strength = 0.3;\n    const float PI = 3.141592653589793;\n\n    float Linear_ease(in float begin, in float change, in float duration, in float time) {\n        return change * time / duration + begin;\n    }\n\n    float Exponential_easeInOut(in float begin, in float change, in float duration, in float time) {\n        if (time == 0.0)\n            return begin;\n        else if (time == duration)\n            return begin + change;\n        time = time / (duration / 2.0);\n        if (time < 1.0)\n             return change / 2.0 * pow(2.0, 10.0 * (time - 1.0)) + begin;\n        return change / 2.0 * (-pow(2.0, -10.0 * (time - 1.0)) + 2.0) + begin;\n    }\n\n    float Sinusoidal_easeInOut(in float begin, in float change, in float duration, in float time) {\n        return -change / 2.0 * (cos(PI * time / duration) - 1.0) + begin;\n    }\n\n    float random(in vec3 scale, in float seed) {\n        return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n    }\n\n    vec4 crossFade(in vec2 uv, in float dissolve) {\n        vec4 colore = vec4(0.0,0.0,0.0,0.0);\n        return mix(texture2D(texture, uv), colore, dissolve);\n    }\n\n    void main()\n    {\n        float progress = sin(time*0.5) * 0.5 + 0.5;\n        vec2 center = vec2(Linear_ease(0.5, 0.0, 1.0, progress),0.5);\n        float dissolve = Exponential_easeInOut(0.0, 1.0, 1.0, progress);\n    \n        float strength = Sinusoidal_easeInOut(0.0, strength, 0.5, progress);\n    \n        vec4 colorx = vec4(0.0);\n        float total = 0.0;\n        vec2 toCenter = center - uv0;\n\n        float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0)*0.5;\n    \n        for (float t = 0.0; t <= 20.0; t++) {\n            float percent = (t + offset) / 20.0;\n            float weight = 1.0 * (percent - percent * percent);\n            colorx += crossFade(uv0 + toCenter * percent * strength, dissolve) * weight;\n            total += weight;\n        }\n        gl_FragColor = colorx / total;\n    }"
    };
    var CustomMaterial = require("CustomMaterial");
    CustomMaterial.addShader(shader);
    cc._RF.pop();
  }, {
    CustomMaterial: "CustomMaterial"
  } ],
  boomEffectMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c19fc4CWShM4qBVvfUDJZeM", "boomEffectMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var boomEffectMgr = function(_super) {
      __extends(boomEffectMgr, _super);
      function boomEffectMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.isAnimFinishDestroy = false;
        _this.waitTime = 3;
        _this.boomTime = 3;
        return _this;
      }
      boomEffectMgr.prototype.start = function() {
        var clip = [ "boom_Effect", "boom_Effect2", "boom_Effect3", "boom_Effect4", "boom_Effect5", "boom_Effect6" ];
        var anim = this.getComponent(cc.Animation);
        anim.play("boom_Effect");
        anim.play("boom_Effect2");
        anim.play("boom_Effect3");
        anim.play("boom_Effect4");
        anim.play("boom_Effect5");
      };
      boomEffectMgr.prototype.onFinished = function() {
        this.delete();
      };
      boomEffectMgr.prototype.delete = function() {
        this.node && this.node.isValid && this.node.destroy();
      };
      __decorate([ property ], boomEffectMgr.prototype, "isAnimFinishDestroy", void 0);
      __decorate([ property ], boomEffectMgr.prototype, "waitTime", void 0);
      __decorate([ property ], boomEffectMgr.prototype, "boomTime", void 0);
      boomEffectMgr = __decorate([ ccclass ], boomEffectMgr);
      return boomEffectMgr;
    }(cc.Component);
    exports.default = boomEffectMgr;
    cc._RF.pop();
  }, {} ],
  bytebuffer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fb991ulYfNJNJClMexTWK8G", "bytebuffer");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    (function(global, factory) {
      "function" === typeof define && define["amd"] ? define([ "long" ], factory) : "function" === typeof require && "object" === ("undefined" === typeof module ? "undefined" : _typeof(module)) && module && module["exports"] ? module["exports"] = function() {
        var Long;
        try {
          Long = require("./long");
        } catch (e) {}
        return factory(Long);
      }() : (global["dcodeIO"] = global["dcodeIO"] || {})["ByteBuffer"] = factory(global["dcodeIO"]["Long"]);
    })(void 0, function(Long) {
      var ByteBuffer = function ByteBuffer(capacity, littleEndian, noAssert) {
        "undefined" === typeof capacity && (capacity = ByteBuffer.DEFAULT_CAPACITY);
        "undefined" === typeof littleEndian && (littleEndian = ByteBuffer.DEFAULT_ENDIAN);
        "undefined" === typeof noAssert && (noAssert = ByteBuffer.DEFAULT_NOASSERT);
        if (!noAssert) {
          capacity |= 0;
          if (capacity < 0) throw RangeError("Illegal capacity");
          littleEndian = !!littleEndian;
          noAssert = !!noAssert;
        }
        this.buffer = 0 === capacity ? EMPTY_BUFFER : new ArrayBuffer(capacity);
        this.view = 0 === capacity ? null : new Uint8Array(this.buffer);
        this.offset = 0;
        this.markedOffset = -1;
        this.limit = capacity;
        this.littleEndian = littleEndian;
        this.noAssert = noAssert;
      };
      ByteBuffer.VERSION = "5.0.1";
      ByteBuffer.LITTLE_ENDIAN = true;
      ByteBuffer.BIG_ENDIAN = false;
      ByteBuffer.DEFAULT_CAPACITY = 16;
      ByteBuffer.DEFAULT_ENDIAN = ByteBuffer.BIG_ENDIAN;
      ByteBuffer.DEFAULT_NOASSERT = false;
      ByteBuffer.Long = Long || null;
      var ByteBufferPrototype = ByteBuffer.prototype;
      ByteBufferPrototype.__isByteBuffer__;
      Object.defineProperty(ByteBufferPrototype, "__isByteBuffer__", {
        value: true,
        enumerable: false,
        configurable: false
      });
      var EMPTY_BUFFER = new ArrayBuffer(0);
      var stringFromCharCode = String.fromCharCode;
      function stringSource(s) {
        var i = 0;
        return function() {
          return i < s.length ? s.charCodeAt(i++) : null;
        };
      }
      function stringDestination() {
        var cs = [], ps = [];
        return function() {
          if (0 === arguments.length) return ps.join("") + stringFromCharCode.apply(String, cs);
          cs.length + arguments.length > 1024 && (ps.push(stringFromCharCode.apply(String, cs)), 
          cs.length = 0);
          Array.prototype.push.apply(cs, arguments);
        };
      }
      ByteBuffer.accessor = function() {
        return Uint8Array;
      };
      ByteBuffer.allocate = function(capacity, littleEndian, noAssert) {
        return new ByteBuffer(capacity, littleEndian, noAssert);
      };
      ByteBuffer.concat = function(buffers, encoding, littleEndian, noAssert) {
        if ("boolean" === typeof encoding || "string" !== typeof encoding) {
          noAssert = littleEndian;
          littleEndian = encoding;
          encoding = void 0;
        }
        var capacity = 0;
        for (var i = 0, k = buffers.length, length; i < k; ++i) {
          ByteBuffer.isByteBuffer(buffers[i]) || (buffers[i] = ByteBuffer.wrap(buffers[i], encoding));
          length = buffers[i].limit - buffers[i].offset;
          length > 0 && (capacity += length);
        }
        if (0 === capacity) return new ByteBuffer(0, littleEndian, noAssert);
        var bb = new ByteBuffer(capacity, littleEndian, noAssert), bi;
        i = 0;
        while (i < k) {
          bi = buffers[i++];
          length = bi.limit - bi.offset;
          if (length <= 0) continue;
          bb.view.set(bi.view.subarray(bi.offset, bi.limit), bb.offset);
          bb.offset += length;
        }
        bb.limit = bb.offset;
        bb.offset = 0;
        return bb;
      };
      ByteBuffer.isByteBuffer = function(bb) {
        return true === (bb && bb["__isByteBuffer__"]);
      };
      ByteBuffer.type = function() {
        return ArrayBuffer;
      };
      ByteBuffer.wrap = function(buffer, encoding, littleEndian, noAssert) {
        if ("string" !== typeof encoding) {
          noAssert = littleEndian;
          littleEndian = encoding;
          encoding = void 0;
        }
        if ("string" === typeof buffer) {
          "undefined" === typeof encoding && (encoding = "utf8");
          switch (encoding) {
           case "base64":
            return ByteBuffer.fromBase64(buffer, littleEndian);

           case "hex":
            return ByteBuffer.fromHex(buffer, littleEndian);

           case "binary":
            return ByteBuffer.fromBinary(buffer, littleEndian);

           case "utf8":
            return ByteBuffer.fromUTF8(buffer, littleEndian);

           case "debug":
            return ByteBuffer.fromDebug(buffer, littleEndian);

           default:
            throw Error("Unsupported encoding: " + encoding);
          }
        }
        if (null === buffer || "object" !== ("undefined" === typeof buffer ? "undefined" : _typeof(buffer))) throw TypeError("Illegal buffer");
        var bb;
        if (ByteBuffer.isByteBuffer(buffer)) {
          bb = ByteBufferPrototype.clone.call(buffer);
          bb.markedOffset = -1;
          return bb;
        }
        if (buffer instanceof Uint8Array) {
          bb = new ByteBuffer(0, littleEndian, noAssert);
          if (buffer.length > 0) {
            bb.buffer = buffer.buffer;
            bb.offset = buffer.byteOffset;
            bb.limit = buffer.byteOffset + buffer.byteLength;
            bb.view = new Uint8Array(buffer.buffer);
          }
        } else if (buffer instanceof ArrayBuffer) {
          bb = new ByteBuffer(0, littleEndian, noAssert);
          if (buffer.byteLength > 0) {
            bb.buffer = buffer;
            bb.offset = 0;
            bb.limit = buffer.byteLength;
            bb.view = buffer.byteLength > 0 ? new Uint8Array(buffer) : null;
          }
        } else {
          if ("[object Array]" !== Object.prototype.toString.call(buffer)) throw TypeError("Illegal buffer");
          bb = new ByteBuffer(buffer.length, littleEndian, noAssert);
          bb.limit = buffer.length;
          for (var i = 0; i < buffer.length; ++i) bb.view[i] = buffer[i];
        }
        return bb;
      };
      ByteBufferPrototype.writeBitSet = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if (!(value instanceof Array)) throw TypeError("Illegal BitSet: Not an array");
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        var start = offset, bits = value.length, bytes = bits >> 3, bit = 0, k;
        offset += this.writeVarint32(bits, offset);
        while (bytes--) {
          k = 1 & !!value[bit++] | (1 & !!value[bit++]) << 1 | (1 & !!value[bit++]) << 2 | (1 & !!value[bit++]) << 3 | (1 & !!value[bit++]) << 4 | (1 & !!value[bit++]) << 5 | (1 & !!value[bit++]) << 6 | (1 & !!value[bit++]) << 7;
          this.writeByte(k, offset++);
        }
        if (bit < bits) {
          var m = 0;
          k = 0;
          while (bit < bits) k |= (1 & !!value[bit++]) << m++;
          this.writeByte(k, offset++);
        }
        if (relative) {
          this.offset = offset;
          return this;
        }
        return offset - start;
      };
      ByteBufferPrototype.readBitSet = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        var ret = this.readVarint32(offset), bits = ret.value, bytes = bits >> 3, bit = 0, value = [], k;
        offset += ret.length;
        while (bytes--) {
          k = this.readByte(offset++);
          value[bit++] = !!(1 & k);
          value[bit++] = !!(2 & k);
          value[bit++] = !!(4 & k);
          value[bit++] = !!(8 & k);
          value[bit++] = !!(16 & k);
          value[bit++] = !!(32 & k);
          value[bit++] = !!(64 & k);
          value[bit++] = !!(128 & k);
        }
        if (bit < bits) {
          var m = 0;
          k = this.readByte(offset++);
          while (bit < bits) value[bit++] = !!(k >> m++ & 1);
        }
        relative && (this.offset = offset);
        return value;
      };
      ByteBufferPrototype.readBytes = function(length, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + length > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + length + ") <= " + this.buffer.byteLength);
        }
        var slice = this.slice(offset, offset + length);
        relative && (this.offset += length);
        return slice;
      };
      ByteBufferPrototype.writeBytes = ByteBufferPrototype.append;
      ByteBufferPrototype.writeInt8 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value |= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 1;
        var capacity0 = this.buffer.byteLength;
        offset > capacity0 && this.resize((capacity0 *= 2) > offset ? capacity0 : offset);
        offset -= 1;
        this.view[offset] = value;
        relative && (this.offset += 1);
        return this;
      };
      ByteBufferPrototype.writeByte = ByteBufferPrototype.writeInt8;
      ByteBufferPrototype.readInt8 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
        }
        var value = this.view[offset];
        128 === (128 & value) && (value = -(255 - value + 1));
        relative && (this.offset += 1);
        return value;
      };
      ByteBufferPrototype.readByte = ByteBufferPrototype.readInt8;
      ByteBufferPrototype.writeUint8 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value >>>= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 1;
        var capacity1 = this.buffer.byteLength;
        offset > capacity1 && this.resize((capacity1 *= 2) > offset ? capacity1 : offset);
        offset -= 1;
        this.view[offset] = value;
        relative && (this.offset += 1);
        return this;
      };
      ByteBufferPrototype.writeUInt8 = ByteBufferPrototype.writeUint8;
      ByteBufferPrototype.readUint8 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
        }
        var value = this.view[offset];
        relative && (this.offset += 1);
        return value;
      };
      ByteBufferPrototype.readUInt8 = ByteBufferPrototype.readUint8;
      ByteBufferPrototype.writeInt16 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value |= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 2;
        var capacity2 = this.buffer.byteLength;
        offset > capacity2 && this.resize((capacity2 *= 2) > offset ? capacity2 : offset);
        offset -= 2;
        if (this.littleEndian) {
          this.view[offset + 1] = (65280 & value) >>> 8;
          this.view[offset] = 255 & value;
        } else {
          this.view[offset] = (65280 & value) >>> 8;
          this.view[offset + 1] = 255 & value;
        }
        relative && (this.offset += 2);
        return this;
      };
      ByteBufferPrototype.writeShort = ByteBufferPrototype.writeInt16;
      ByteBufferPrototype.readInt16 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 2 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+2) <= " + this.buffer.byteLength);
        }
        var value = 0;
        if (this.littleEndian) {
          value = this.view[offset];
          value |= this.view[offset + 1] << 8;
        } else {
          value = this.view[offset] << 8;
          value |= this.view[offset + 1];
        }
        32768 === (32768 & value) && (value = -(65535 - value + 1));
        relative && (this.offset += 2);
        return value;
      };
      ByteBufferPrototype.readShort = ByteBufferPrototype.readInt16;
      ByteBufferPrototype.writeUint16 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value >>>= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 2;
        var capacity3 = this.buffer.byteLength;
        offset > capacity3 && this.resize((capacity3 *= 2) > offset ? capacity3 : offset);
        offset -= 2;
        if (this.littleEndian) {
          this.view[offset + 1] = (65280 & value) >>> 8;
          this.view[offset] = 255 & value;
        } else {
          this.view[offset] = (65280 & value) >>> 8;
          this.view[offset + 1] = 255 & value;
        }
        relative && (this.offset += 2);
        return this;
      };
      ByteBufferPrototype.writeUInt16 = ByteBufferPrototype.writeUint16;
      ByteBufferPrototype.readUint16 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 2 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+2) <= " + this.buffer.byteLength);
        }
        var value = 0;
        if (this.littleEndian) {
          value = this.view[offset];
          value |= this.view[offset + 1] << 8;
        } else {
          value = this.view[offset] << 8;
          value |= this.view[offset + 1];
        }
        relative && (this.offset += 2);
        return value;
      };
      ByteBufferPrototype.readUInt16 = ByteBufferPrototype.readUint16;
      ByteBufferPrototype.writeInt32 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value |= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 4;
        var capacity4 = this.buffer.byteLength;
        offset > capacity4 && this.resize((capacity4 *= 2) > offset ? capacity4 : offset);
        offset -= 4;
        if (this.littleEndian) {
          this.view[offset + 3] = value >>> 24 & 255;
          this.view[offset + 2] = value >>> 16 & 255;
          this.view[offset + 1] = value >>> 8 & 255;
          this.view[offset] = 255 & value;
        } else {
          this.view[offset] = value >>> 24 & 255;
          this.view[offset + 1] = value >>> 16 & 255;
          this.view[offset + 2] = value >>> 8 & 255;
          this.view[offset + 3] = 255 & value;
        }
        relative && (this.offset += 4);
        return this;
      };
      ByteBufferPrototype.writeInt = ByteBufferPrototype.writeInt32;
      ByteBufferPrototype.readInt32 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+4) <= " + this.buffer.byteLength);
        }
        var value = 0;
        if (this.littleEndian) {
          value = this.view[offset + 2] << 16;
          value |= this.view[offset + 1] << 8;
          value |= this.view[offset];
          value += this.view[offset + 3] << 24 >>> 0;
        } else {
          value = this.view[offset + 1] << 16;
          value |= this.view[offset + 2] << 8;
          value |= this.view[offset + 3];
          value += this.view[offset] << 24 >>> 0;
        }
        value |= 0;
        relative && (this.offset += 4);
        return value;
      };
      ByteBufferPrototype.readInt = ByteBufferPrototype.readInt32;
      ByteBufferPrototype.writeUint32 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value >>>= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 4;
        var capacity5 = this.buffer.byteLength;
        offset > capacity5 && this.resize((capacity5 *= 2) > offset ? capacity5 : offset);
        offset -= 4;
        if (this.littleEndian) {
          this.view[offset + 3] = value >>> 24 & 255;
          this.view[offset + 2] = value >>> 16 & 255;
          this.view[offset + 1] = value >>> 8 & 255;
          this.view[offset] = 255 & value;
        } else {
          this.view[offset] = value >>> 24 & 255;
          this.view[offset + 1] = value >>> 16 & 255;
          this.view[offset + 2] = value >>> 8 & 255;
          this.view[offset + 3] = 255 & value;
        }
        relative && (this.offset += 4);
        return this;
      };
      ByteBufferPrototype.writeUInt32 = ByteBufferPrototype.writeUint32;
      ByteBufferPrototype.readUint32 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+4) <= " + this.buffer.byteLength);
        }
        var value = 0;
        if (this.littleEndian) {
          value = this.view[offset + 2] << 16;
          value |= this.view[offset + 1] << 8;
          value |= this.view[offset];
          value += this.view[offset + 3] << 24 >>> 0;
        } else {
          value = this.view[offset + 1] << 16;
          value |= this.view[offset + 2] << 8;
          value |= this.view[offset + 3];
          value += this.view[offset] << 24 >>> 0;
        }
        relative && (this.offset += 4);
        return value;
      };
      ByteBufferPrototype.readUInt32 = ByteBufferPrototype.readUint32;
      if (Long) {
        ByteBufferPrototype.writeInt64 = function(value, offset) {
          var relative = "undefined" === typeof offset;
          relative && (offset = this.offset);
          if (!this.noAssert) {
            if ("number" === typeof value) value = Long.fromNumber(value); else if ("string" === typeof value) value = Long.fromString(value); else if (!(value && value instanceof Long)) throw TypeError("Illegal value: " + value + " (not an integer or Long)");
            if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
          }
          "number" === typeof value ? value = Long.fromNumber(value) : "string" === typeof value && (value = Long.fromString(value));
          offset += 8;
          var capacity6 = this.buffer.byteLength;
          offset > capacity6 && this.resize((capacity6 *= 2) > offset ? capacity6 : offset);
          offset -= 8;
          var lo = value.low, hi = value.high;
          if (this.littleEndian) {
            this.view[offset + 3] = lo >>> 24 & 255;
            this.view[offset + 2] = lo >>> 16 & 255;
            this.view[offset + 1] = lo >>> 8 & 255;
            this.view[offset] = 255 & lo;
            offset += 4;
            this.view[offset + 3] = hi >>> 24 & 255;
            this.view[offset + 2] = hi >>> 16 & 255;
            this.view[offset + 1] = hi >>> 8 & 255;
            this.view[offset] = 255 & hi;
          } else {
            this.view[offset] = hi >>> 24 & 255;
            this.view[offset + 1] = hi >>> 16 & 255;
            this.view[offset + 2] = hi >>> 8 & 255;
            this.view[offset + 3] = 255 & hi;
            offset += 4;
            this.view[offset] = lo >>> 24 & 255;
            this.view[offset + 1] = lo >>> 16 & 255;
            this.view[offset + 2] = lo >>> 8 & 255;
            this.view[offset + 3] = 255 & lo;
          }
          relative && (this.offset += 8);
          return this;
        };
        ByteBufferPrototype.writeLong = ByteBufferPrototype.writeInt64;
        ByteBufferPrototype.readInt64 = function(offset) {
          var relative = "undefined" === typeof offset;
          relative && (offset = this.offset);
          if (!this.noAssert) {
            if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+8) <= " + this.buffer.byteLength);
          }
          var lo = 0, hi = 0;
          if (this.littleEndian) {
            lo = this.view[offset + 2] << 16;
            lo |= this.view[offset + 1] << 8;
            lo |= this.view[offset];
            lo += this.view[offset + 3] << 24 >>> 0;
            offset += 4;
            hi = this.view[offset + 2] << 16;
            hi |= this.view[offset + 1] << 8;
            hi |= this.view[offset];
            hi += this.view[offset + 3] << 24 >>> 0;
          } else {
            hi = this.view[offset + 1] << 16;
            hi |= this.view[offset + 2] << 8;
            hi |= this.view[offset + 3];
            hi += this.view[offset] << 24 >>> 0;
            offset += 4;
            lo = this.view[offset + 1] << 16;
            lo |= this.view[offset + 2] << 8;
            lo |= this.view[offset + 3];
            lo += this.view[offset] << 24 >>> 0;
          }
          var value = new Long(lo, hi, false);
          relative && (this.offset += 8);
          return value;
        };
        ByteBufferPrototype.readLong = ByteBufferPrototype.readInt64;
        ByteBufferPrototype.writeUint64 = function(value, offset) {
          var relative = "undefined" === typeof offset;
          relative && (offset = this.offset);
          if (!this.noAssert) {
            if ("number" === typeof value) value = Long.fromNumber(value); else if ("string" === typeof value) value = Long.fromString(value); else if (!(value && value instanceof Long)) throw TypeError("Illegal value: " + value + " (not an integer or Long)");
            if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
          }
          "number" === typeof value ? value = Long.fromNumber(value) : "string" === typeof value && (value = Long.fromString(value));
          offset += 8;
          var capacity7 = this.buffer.byteLength;
          offset > capacity7 && this.resize((capacity7 *= 2) > offset ? capacity7 : offset);
          offset -= 8;
          var lo = value.low, hi = value.high;
          if (this.littleEndian) {
            this.view[offset + 3] = lo >>> 24 & 255;
            this.view[offset + 2] = lo >>> 16 & 255;
            this.view[offset + 1] = lo >>> 8 & 255;
            this.view[offset] = 255 & lo;
            offset += 4;
            this.view[offset + 3] = hi >>> 24 & 255;
            this.view[offset + 2] = hi >>> 16 & 255;
            this.view[offset + 1] = hi >>> 8 & 255;
            this.view[offset] = 255 & hi;
          } else {
            this.view[offset] = hi >>> 24 & 255;
            this.view[offset + 1] = hi >>> 16 & 255;
            this.view[offset + 2] = hi >>> 8 & 255;
            this.view[offset + 3] = 255 & hi;
            offset += 4;
            this.view[offset] = lo >>> 24 & 255;
            this.view[offset + 1] = lo >>> 16 & 255;
            this.view[offset + 2] = lo >>> 8 & 255;
            this.view[offset + 3] = 255 & lo;
          }
          relative && (this.offset += 8);
          return this;
        };
        ByteBufferPrototype.writeUInt64 = ByteBufferPrototype.writeUint64;
        ByteBufferPrototype.readUint64 = function(offset) {
          var relative = "undefined" === typeof offset;
          relative && (offset = this.offset);
          if (!this.noAssert) {
            if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+8) <= " + this.buffer.byteLength);
          }
          var lo = 0, hi = 0;
          if (this.littleEndian) {
            lo = this.view[offset + 2] << 16;
            lo |= this.view[offset + 1] << 8;
            lo |= this.view[offset];
            lo += this.view[offset + 3] << 24 >>> 0;
            offset += 4;
            hi = this.view[offset + 2] << 16;
            hi |= this.view[offset + 1] << 8;
            hi |= this.view[offset];
            hi += this.view[offset + 3] << 24 >>> 0;
          } else {
            hi = this.view[offset + 1] << 16;
            hi |= this.view[offset + 2] << 8;
            hi |= this.view[offset + 3];
            hi += this.view[offset] << 24 >>> 0;
            offset += 4;
            lo = this.view[offset + 1] << 16;
            lo |= this.view[offset + 2] << 8;
            lo |= this.view[offset + 3];
            lo += this.view[offset] << 24 >>> 0;
          }
          var value = new Long(lo, hi, true);
          relative && (this.offset += 8);
          return value;
        };
        ByteBufferPrototype.readUInt64 = ByteBufferPrototype.readUint64;
      }
      function ieee754_read(buffer, offset, isLE, mLen, nBytes) {
        var e, m, eLen = 8 * nBytes - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, nBits = -7, i = isLE ? nBytes - 1 : 0, d = isLE ? -1 : 1, s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (;nBits > 0; e = 256 * e + buffer[offset + i], i += d, nBits -= 8) ;
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (;nBits > 0; m = 256 * m + buffer[offset + i], i += d, nBits -= 8) ;
        if (0 === e) e = 1 - eBias; else {
          if (e === eMax) return m ? NaN : Infinity * (s ? -1 : 1);
          m += Math.pow(2, mLen);
          e -= eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      }
      function ieee754_write(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c, eLen = 8 * nBytes - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, rt = 23 === mLen ? Math.pow(2, -24) - Math.pow(2, -77) : 0, i = isLE ? 0 : nBytes - 1, d = isLE ? 1 : -1, s = value < 0 || 0 === value && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || Infinity === value) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          value += e + eBias >= 1 ? rt / c : rt * Math.pow(2, 1 - eBias);
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e += eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (;mLen >= 8; buffer[offset + i] = 255 & m, i += d, m /= 256, mLen -= 8) ;
        e = e << mLen | m;
        eLen += mLen;
        for (;eLen > 0; buffer[offset + i] = 255 & e, i += d, e /= 256, eLen -= 8) ;
        buffer[offset + i - d] |= 128 * s;
      }
      ByteBufferPrototype.writeFloat32 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value) throw TypeError("Illegal value: " + value + " (not a number)");
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 4;
        var capacity8 = this.buffer.byteLength;
        offset > capacity8 && this.resize((capacity8 *= 2) > offset ? capacity8 : offset);
        offset -= 4;
        ieee754_write(this.view, value, offset, this.littleEndian, 23, 4);
        relative && (this.offset += 4);
        return this;
      };
      ByteBufferPrototype.writeFloat = ByteBufferPrototype.writeFloat32;
      ByteBufferPrototype.readFloat32 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+4) <= " + this.buffer.byteLength);
        }
        var value = ieee754_read(this.view, offset, this.littleEndian, 23, 4);
        relative && (this.offset += 4);
        return value;
      };
      ByteBufferPrototype.readFloat = ByteBufferPrototype.readFloat32;
      ByteBufferPrototype.writeFloat64 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value) throw TypeError("Illegal value: " + value + " (not a number)");
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        offset += 8;
        var capacity9 = this.buffer.byteLength;
        offset > capacity9 && this.resize((capacity9 *= 2) > offset ? capacity9 : offset);
        offset -= 8;
        ieee754_write(this.view, value, offset, this.littleEndian, 52, 8);
        relative && (this.offset += 8);
        return this;
      };
      ByteBufferPrototype.writeDouble = ByteBufferPrototype.writeFloat64;
      ByteBufferPrototype.readFloat64 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+8) <= " + this.buffer.byteLength);
        }
        var value = ieee754_read(this.view, offset, this.littleEndian, 52, 8);
        relative && (this.offset += 8);
        return value;
      };
      ByteBufferPrototype.readDouble = ByteBufferPrototype.readFloat64;
      ByteBuffer.MAX_VARINT32_BYTES = 5;
      ByteBuffer.calculateVarint32 = function(value) {
        value >>>= 0;
        return value < 128 ? 1 : value < 16384 ? 2 : value < 1 << 21 ? 3 : value < 1 << 28 ? 4 : 5;
      };
      ByteBuffer.zigZagEncode32 = function(n) {
        return ((n |= 0) << 1 ^ n >> 31) >>> 0;
      };
      ByteBuffer.zigZagDecode32 = function(n) {
        return n >>> 1 ^ -(1 & n) | 0;
      };
      ByteBufferPrototype.writeVarint32 = function(value, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value |= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        var size = ByteBuffer.calculateVarint32(value), b;
        offset += size;
        var capacity10 = this.buffer.byteLength;
        offset > capacity10 && this.resize((capacity10 *= 2) > offset ? capacity10 : offset);
        offset -= size;
        value >>>= 0;
        while (value >= 128) {
          b = 127 & value | 128;
          this.view[offset++] = b;
          value >>>= 7;
        }
        this.view[offset++] = value;
        if (relative) {
          this.offset = offset;
          return this;
        }
        return size;
      };
      ByteBufferPrototype.writeVarint32ZigZag = function(value, offset) {
        return this.writeVarint32(ByteBuffer.zigZagEncode32(value), offset);
      };
      ByteBufferPrototype.readVarint32 = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
        }
        var c = 0, value = 0, b;
        do {
          if (!this.noAssert && offset > this.limit) {
            var err = Error("Truncated");
            err["truncated"] = true;
            throw err;
          }
          b = this.view[offset++];
          c < 5 && (value |= (127 & b) << 7 * c);
          ++c;
        } while (0 !== (128 & b));
        value |= 0;
        if (relative) {
          this.offset = offset;
          return value;
        }
        return {
          value: value,
          length: c
        };
      };
      ByteBufferPrototype.readVarint32ZigZag = function(offset) {
        var val = this.readVarint32(offset);
        "object" === ("undefined" === typeof val ? "undefined" : _typeof(val)) ? val["value"] = ByteBuffer.zigZagDecode32(val["value"]) : val = ByteBuffer.zigZagDecode32(val);
        return val;
      };
      if (Long) {
        ByteBuffer.MAX_VARINT64_BYTES = 10;
        ByteBuffer.calculateVarint64 = function(value) {
          "number" === typeof value ? value = Long.fromNumber(value) : "string" === typeof value && (value = Long.fromString(value));
          var part0 = value.toInt() >>> 0, part1 = value.shiftRightUnsigned(28).toInt() >>> 0, part2 = value.shiftRightUnsigned(56).toInt() >>> 0;
          return 0 == part2 ? 0 == part1 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 1 << 21 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 1 << 21 ? 7 : 8 : part2 < 128 ? 9 : 10;
        };
        ByteBuffer.zigZagEncode64 = function(value) {
          "number" === typeof value ? value = Long.fromNumber(value, false) : "string" === typeof value ? value = Long.fromString(value, false) : false !== value.unsigned && (value = value.toSigned());
          return value.shiftLeft(1).xor(value.shiftRight(63)).toUnsigned();
        };
        ByteBuffer.zigZagDecode64 = function(value) {
          "number" === typeof value ? value = Long.fromNumber(value, false) : "string" === typeof value ? value = Long.fromString(value, false) : false !== value.unsigned && (value = value.toSigned());
          return value.shiftRightUnsigned(1).xor(value.and(Long.ONE).toSigned().negate()).toSigned();
        };
        ByteBufferPrototype.writeVarint64 = function(value, offset) {
          var relative = "undefined" === typeof offset;
          relative && (offset = this.offset);
          if (!this.noAssert) {
            if ("number" === typeof value) value = Long.fromNumber(value); else if ("string" === typeof value) value = Long.fromString(value); else if (!(value && value instanceof Long)) throw TypeError("Illegal value: " + value + " (not an integer or Long)");
            if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
          }
          "number" === typeof value ? value = Long.fromNumber(value, false) : "string" === typeof value ? value = Long.fromString(value, false) : false !== value.unsigned && (value = value.toSigned());
          var size = ByteBuffer.calculateVarint64(value), part0 = value.toInt() >>> 0, part1 = value.shiftRightUnsigned(28).toInt() >>> 0, part2 = value.shiftRightUnsigned(56).toInt() >>> 0;
          offset += size;
          var capacity11 = this.buffer.byteLength;
          offset > capacity11 && this.resize((capacity11 *= 2) > offset ? capacity11 : offset);
          offset -= size;
          switch (size) {
           case 10:
            this.view[offset + 9] = part2 >>> 7 & 1;

           case 9:
            this.view[offset + 8] = 9 !== size ? 128 | part2 : 127 & part2;

           case 8:
            this.view[offset + 7] = 8 !== size ? part1 >>> 21 | 128 : part1 >>> 21 & 127;

           case 7:
            this.view[offset + 6] = 7 !== size ? part1 >>> 14 | 128 : part1 >>> 14 & 127;

           case 6:
            this.view[offset + 5] = 6 !== size ? part1 >>> 7 | 128 : part1 >>> 7 & 127;

           case 5:
            this.view[offset + 4] = 5 !== size ? 128 | part1 : 127 & part1;

           case 4:
            this.view[offset + 3] = 4 !== size ? part0 >>> 21 | 128 : part0 >>> 21 & 127;

           case 3:
            this.view[offset + 2] = 3 !== size ? part0 >>> 14 | 128 : part0 >>> 14 & 127;

           case 2:
            this.view[offset + 1] = 2 !== size ? part0 >>> 7 | 128 : part0 >>> 7 & 127;

           case 1:
            this.view[offset] = 1 !== size ? 128 | part0 : 127 & part0;
          }
          if (relative) {
            this.offset += size;
            return this;
          }
          return size;
        };
        ByteBufferPrototype.writeVarint64ZigZag = function(value, offset) {
          return this.writeVarint64(ByteBuffer.zigZagEncode64(value), offset);
        };
        ByteBufferPrototype.readVarint64 = function(offset) {
          var relative = "undefined" === typeof offset;
          relative && (offset = this.offset);
          if (!this.noAssert) {
            if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
          }
          var start = offset, part0 = 0, part1 = 0, part2 = 0, b = 0;
          b = this.view[offset++];
          part0 = 127 & b;
          if (128 & b) {
            b = this.view[offset++];
            part0 |= (127 & b) << 7;
            if (128 & b || this.noAssert && "undefined" === typeof b) {
              b = this.view[offset++];
              part0 |= (127 & b) << 14;
              if (128 & b || this.noAssert && "undefined" === typeof b) {
                b = this.view[offset++];
                part0 |= (127 & b) << 21;
                if (128 & b || this.noAssert && "undefined" === typeof b) {
                  b = this.view[offset++];
                  part1 = 127 & b;
                  if (128 & b || this.noAssert && "undefined" === typeof b) {
                    b = this.view[offset++];
                    part1 |= (127 & b) << 7;
                    if (128 & b || this.noAssert && "undefined" === typeof b) {
                      b = this.view[offset++];
                      part1 |= (127 & b) << 14;
                      if (128 & b || this.noAssert && "undefined" === typeof b) {
                        b = this.view[offset++];
                        part1 |= (127 & b) << 21;
                        if (128 & b || this.noAssert && "undefined" === typeof b) {
                          b = this.view[offset++];
                          part2 = 127 & b;
                          if (128 & b || this.noAssert && "undefined" === typeof b) {
                            b = this.view[offset++];
                            part2 |= (127 & b) << 7;
                            if (128 & b || this.noAssert && "undefined" === typeof b) throw Error("Buffer overrun");
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          var value = Long.fromBits(part0 | part1 << 28, part1 >>> 4 | part2 << 24, false);
          if (relative) {
            this.offset = offset;
            return value;
          }
          return {
            value: value,
            length: offset - start
          };
        };
        ByteBufferPrototype.readVarint64ZigZag = function(offset) {
          var val = this.readVarint64(offset);
          val && val["value"] instanceof Long ? val["value"] = ByteBuffer.zigZagDecode64(val["value"]) : val = ByteBuffer.zigZagDecode64(val);
          return val;
        };
      }
      ByteBufferPrototype.writeCString = function(str, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        var i, k = str.length;
        if (!this.noAssert) {
          if ("string" !== typeof str) throw TypeError("Illegal str: Not a string");
          for (i = 0; i < k; ++i) if (0 === str.charCodeAt(i)) throw RangeError("Illegal str: Contains NULL-characters");
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        k = utfx.calculateUTF16asUTF8(stringSource(str))[1];
        offset += k + 1;
        var capacity12 = this.buffer.byteLength;
        offset > capacity12 && this.resize((capacity12 *= 2) > offset ? capacity12 : offset);
        offset -= k + 1;
        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
          this.view[offset++] = b;
        }.bind(this));
        this.view[offset++] = 0;
        if (relative) {
          this.offset = offset;
          return this;
        }
        return k;
      };
      ByteBufferPrototype.readCString = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
        }
        var start = offset, temp;
        var sd, b = -1;
        utfx.decodeUTF8toUTF16(function() {
          if (0 === b) return null;
          if (offset >= this.limit) throw RangeError("Illegal range: Truncated data, " + offset + " < " + this.limit);
          b = this.view[offset++];
          return 0 === b ? null : b;
        }.bind(this), sd = stringDestination(), true);
        if (relative) {
          this.offset = offset;
          return sd();
        }
        return {
          string: sd(),
          length: offset - start
        };
      };
      ByteBufferPrototype.writeIString = function(str, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("string" !== typeof str) throw TypeError("Illegal str: Not a string");
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        var start = offset, k;
        k = utfx.calculateUTF16asUTF8(stringSource(str), this.noAssert)[1];
        offset += 4 + k;
        var capacity13 = this.buffer.byteLength;
        offset > capacity13 && this.resize((capacity13 *= 2) > offset ? capacity13 : offset);
        offset -= 4 + k;
        if (this.littleEndian) {
          this.view[offset + 3] = k >>> 24 & 255;
          this.view[offset + 2] = k >>> 16 & 255;
          this.view[offset + 1] = k >>> 8 & 255;
          this.view[offset] = 255 & k;
        } else {
          this.view[offset] = k >>> 24 & 255;
          this.view[offset + 1] = k >>> 16 & 255;
          this.view[offset + 2] = k >>> 8 & 255;
          this.view[offset + 3] = 255 & k;
        }
        offset += 4;
        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
          this.view[offset++] = b;
        }.bind(this));
        if (offset !== start + 4 + k) throw RangeError("Illegal range: Truncated data, " + offset + " == " + (offset + 4 + k));
        if (relative) {
          this.offset = offset;
          return this;
        }
        return offset - start;
      };
      ByteBufferPrototype.readIString = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+4) <= " + this.buffer.byteLength);
        }
        var start = offset;
        var len = this.readUint32(offset);
        var str = this.readUTF8String(len, ByteBuffer.METRICS_BYTES, offset += 4);
        offset += str["length"];
        if (relative) {
          this.offset = offset;
          return str["string"];
        }
        return {
          string: str["string"],
          length: offset - start
        };
      };
      ByteBuffer.METRICS_CHARS = "c";
      ByteBuffer.METRICS_BYTES = "b";
      ByteBufferPrototype.writeUTF8String = function(str, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        var k;
        var start = offset;
        k = utfx.calculateUTF16asUTF8(stringSource(str))[1];
        offset += k;
        var capacity14 = this.buffer.byteLength;
        offset > capacity14 && this.resize((capacity14 *= 2) > offset ? capacity14 : offset);
        offset -= k;
        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
          this.view[offset++] = b;
        }.bind(this));
        if (relative) {
          this.offset = offset;
          return this;
        }
        return offset - start;
      };
      ByteBufferPrototype.writeString = ByteBufferPrototype.writeUTF8String;
      ByteBuffer.calculateUTF8Chars = function(str) {
        return utfx.calculateUTF16asUTF8(stringSource(str))[0];
      };
      ByteBuffer.calculateUTF8Bytes = function(str) {
        return utfx.calculateUTF16asUTF8(stringSource(str))[1];
      };
      ByteBuffer.calculateString = ByteBuffer.calculateUTF8Bytes;
      ByteBufferPrototype.readUTF8String = function(length, metrics, offset) {
        if ("number" === typeof metrics) {
          offset = metrics;
          metrics = void 0;
        }
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        "undefined" === typeof metrics && (metrics = ByteBuffer.METRICS_CHARS);
        if (!this.noAssert) {
          if ("number" !== typeof length || length % 1 !== 0) throw TypeError("Illegal length: " + length + " (not an integer)");
          length |= 0;
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        var i = 0, start = offset, sd;
        if (metrics === ByteBuffer.METRICS_CHARS) {
          sd = stringDestination();
          utfx.decodeUTF8(function() {
            return i < length && offset < this.limit ? this.view[offset++] : null;
          }.bind(this), function(cp) {
            ++i;
            utfx.UTF8toUTF16(cp, sd);
          });
          if (i !== length) throw RangeError("Illegal range: Truncated data, " + i + " == " + length);
          if (relative) {
            this.offset = offset;
            return sd();
          }
          return {
            string: sd(),
            length: offset - start
          };
        }
        if (metrics === ByteBuffer.METRICS_BYTES) {
          if (!this.noAssert) {
            if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + length > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + length + ") <= " + this.buffer.byteLength);
          }
          var k = offset + length;
          utfx.decodeUTF8toUTF16(function() {
            return offset < k ? this.view[offset++] : null;
          }.bind(this), sd = stringDestination(), this.noAssert);
          if (offset !== k) throw RangeError("Illegal range: Truncated data, " + offset + " == " + k);
          if (relative) {
            this.offset = offset;
            return sd();
          }
          return {
            string: sd(),
            length: offset - start
          };
        }
        throw TypeError("Unsupported metrics: " + metrics);
      };
      ByteBufferPrototype.readString = ByteBufferPrototype.readUTF8String;
      ByteBufferPrototype.writeVString = function(str, offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("string" !== typeof str) throw TypeError("Illegal str: Not a string");
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        var start = offset, k, l;
        k = utfx.calculateUTF16asUTF8(stringSource(str), this.noAssert)[1];
        l = ByteBuffer.calculateVarint32(k);
        offset += l + k;
        var capacity15 = this.buffer.byteLength;
        offset > capacity15 && this.resize((capacity15 *= 2) > offset ? capacity15 : offset);
        offset -= l + k;
        offset += this.writeVarint32(k, offset);
        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
          this.view[offset++] = b;
        }.bind(this));
        if (offset !== start + k + l) throw RangeError("Illegal range: Truncated data, " + offset + " == " + (offset + k + l));
        if (relative) {
          this.offset = offset;
          return this;
        }
        return offset - start;
      };
      ByteBufferPrototype.readVString = function(offset) {
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
        }
        var start = offset;
        var len = this.readVarint32(offset);
        var str = this.readUTF8String(len["value"], ByteBuffer.METRICS_BYTES, offset += len["length"]);
        offset += str["length"];
        if (relative) {
          this.offset = offset;
          return str["string"];
        }
        return {
          string: str["string"],
          length: offset - start
        };
      };
      ByteBufferPrototype.append = function(source, encoding, offset) {
        if ("number" === typeof encoding || "string" !== typeof encoding) {
          offset = encoding;
          encoding = void 0;
        }
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        source instanceof ByteBuffer || (source = ByteBuffer.wrap(source, encoding));
        var length = source.limit - source.offset;
        if (length <= 0) return this;
        offset += length;
        var capacity16 = this.buffer.byteLength;
        offset > capacity16 && this.resize((capacity16 *= 2) > offset ? capacity16 : offset);
        offset -= length;
        this.view.set(source.view.subarray(source.offset, source.limit), offset);
        source.offset += length;
        relative && (this.offset += length);
        return this;
      };
      ByteBufferPrototype.appendTo = function(target, offset) {
        target.append(this, offset);
        return this;
      };
      ByteBufferPrototype.assert = function(assert) {
        this.noAssert = !assert;
        return this;
      };
      ByteBufferPrototype.capacity = function() {
        return this.buffer.byteLength;
      };
      ByteBufferPrototype.clear = function() {
        this.offset = 0;
        this.limit = this.buffer.byteLength;
        this.markedOffset = -1;
        return this;
      };
      ByteBufferPrototype.clone = function(copy) {
        var bb = new ByteBuffer(0, this.littleEndian, this.noAssert);
        if (copy) {
          bb.buffer = new ArrayBuffer(this.buffer.byteLength);
          bb.view = new Uint8Array(bb.buffer);
        } else {
          bb.buffer = this.buffer;
          bb.view = this.view;
        }
        bb.offset = this.offset;
        bb.markedOffset = this.markedOffset;
        bb.limit = this.limit;
        return bb;
      };
      ByteBufferPrototype.compact = function(begin, end) {
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        if (!this.noAssert) {
          if ("number" !== typeof begin || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
          begin >>>= 0;
          if ("number" !== typeof end || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
          end >>>= 0;
          if (begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
        }
        if (0 === begin && end === this.buffer.byteLength) return this;
        var len = end - begin;
        if (0 === len) {
          this.buffer = EMPTY_BUFFER;
          this.view = null;
          this.markedOffset >= 0 && (this.markedOffset -= begin);
          this.offset = 0;
          this.limit = 0;
          return this;
        }
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        view.set(this.view.subarray(begin, end));
        this.buffer = buffer;
        this.view = view;
        this.markedOffset >= 0 && (this.markedOffset -= begin);
        this.offset = 0;
        this.limit = len;
        return this;
      };
      ByteBufferPrototype.copy = function(begin, end) {
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        if (!this.noAssert) {
          if ("number" !== typeof begin || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
          begin >>>= 0;
          if ("number" !== typeof end || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
          end >>>= 0;
          if (begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
        }
        if (begin === end) return new ByteBuffer(0, this.littleEndian, this.noAssert);
        var capacity = end - begin, bb = new ByteBuffer(capacity, this.littleEndian, this.noAssert);
        bb.offset = 0;
        bb.limit = capacity;
        bb.markedOffset >= 0 && (bb.markedOffset -= begin);
        this.copyTo(bb, 0, begin, end);
        return bb;
      };
      ByteBufferPrototype.copyTo = function(target, targetOffset, sourceOffset, sourceLimit) {
        var relative, targetRelative;
        if (!this.noAssert && !ByteBuffer.isByteBuffer(target)) throw TypeError("Illegal target: Not a ByteBuffer");
        targetOffset = (targetRelative = "undefined" === typeof targetOffset) ? target.offset : 0 | targetOffset;
        sourceOffset = (relative = "undefined" === typeof sourceOffset) ? this.offset : 0 | sourceOffset;
        sourceLimit = "undefined" === typeof sourceLimit ? this.limit : 0 | sourceLimit;
        if (targetOffset < 0 || targetOffset > target.buffer.byteLength) throw RangeError("Illegal target range: 0 <= " + targetOffset + " <= " + target.buffer.byteLength);
        if (sourceOffset < 0 || sourceLimit > this.buffer.byteLength) throw RangeError("Illegal source range: 0 <= " + sourceOffset + " <= " + this.buffer.byteLength);
        var len = sourceLimit - sourceOffset;
        if (0 === len) return target;
        target.ensureCapacity(targetOffset + len);
        target.view.set(this.view.subarray(sourceOffset, sourceLimit), targetOffset);
        relative && (this.offset += len);
        targetRelative && (target.offset += len);
        return this;
      };
      ByteBufferPrototype.ensureCapacity = function(capacity) {
        var current = this.buffer.byteLength;
        if (current < capacity) return this.resize((current *= 2) > capacity ? current : capacity);
        return this;
      };
      ByteBufferPrototype.fill = function(value, begin, end) {
        var relative = "undefined" === typeof begin;
        relative && (begin = this.offset);
        "string" === typeof value && value.length > 0 && (value = value.charCodeAt(0));
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        if (!this.noAssert) {
          if ("number" !== typeof value || value % 1 !== 0) throw TypeError("Illegal value: " + value + " (not an integer)");
          value |= 0;
          if ("number" !== typeof begin || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
          begin >>>= 0;
          if ("number" !== typeof end || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
          end >>>= 0;
          if (begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
        }
        if (begin >= end) return this;
        while (begin < end) this.view[begin++] = value;
        relative && (this.offset = begin);
        return this;
      };
      ByteBufferPrototype.flip = function() {
        this.limit = this.offset;
        this.offset = 0;
        return this;
      };
      ByteBufferPrototype.mark = function(offset) {
        offset = "undefined" === typeof offset ? this.offset : offset;
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        this.markedOffset = offset;
        return this;
      };
      ByteBufferPrototype.order = function(littleEndian) {
        if (!this.noAssert && "boolean" !== typeof littleEndian) throw TypeError("Illegal littleEndian: Not a boolean");
        this.littleEndian = !!littleEndian;
        return this;
      };
      ByteBufferPrototype.LE = function(littleEndian) {
        this.littleEndian = "undefined" === typeof littleEndian || !!littleEndian;
        return this;
      };
      ByteBufferPrototype.BE = function(bigEndian) {
        this.littleEndian = "undefined" !== typeof bigEndian && !bigEndian;
        return this;
      };
      ByteBufferPrototype.prepend = function(source, encoding, offset) {
        if ("number" === typeof encoding || "string" !== typeof encoding) {
          offset = encoding;
          encoding = void 0;
        }
        var relative = "undefined" === typeof offset;
        relative && (offset = this.offset);
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
          offset >>>= 0;
          if (offset < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
        }
        source instanceof ByteBuffer || (source = ByteBuffer.wrap(source, encoding));
        var len = source.limit - source.offset;
        if (len <= 0) return this;
        var diff = len - offset;
        if (diff > 0) {
          var buffer = new ArrayBuffer(this.buffer.byteLength + diff);
          var view = new Uint8Array(buffer);
          view.set(this.view.subarray(offset, this.buffer.byteLength), len);
          this.buffer = buffer;
          this.view = view;
          this.offset += diff;
          this.markedOffset >= 0 && (this.markedOffset += diff);
          this.limit += diff;
          offset += diff;
        } else var arrayView = new Uint8Array(this.buffer);
        this.view.set(source.view.subarray(source.offset, source.limit), offset - len);
        source.offset = source.limit;
        relative && (this.offset -= len);
        return this;
      };
      ByteBufferPrototype.prependTo = function(target, offset) {
        target.prepend(this, offset);
        return this;
      };
      ByteBufferPrototype.printDebug = function(out) {
        "function" !== typeof out && (out = console.log.bind(console));
        out(this.toString() + "\n-------------------------------------------------------------------\n" + this.toDebug(true));
      };
      ByteBufferPrototype.remaining = function() {
        return this.limit - this.offset;
      };
      ByteBufferPrototype.reset = function() {
        if (this.markedOffset >= 0) {
          this.offset = this.markedOffset;
          this.markedOffset = -1;
        } else this.offset = 0;
        return this;
      };
      ByteBufferPrototype.resize = function(capacity) {
        if (!this.noAssert) {
          if ("number" !== typeof capacity || capacity % 1 !== 0) throw TypeError("Illegal capacity: " + capacity + " (not an integer)");
          capacity |= 0;
          if (capacity < 0) throw RangeError("Illegal capacity: 0 <= " + capacity);
        }
        if (this.buffer.byteLength < capacity) {
          var buffer = new ArrayBuffer(capacity);
          var view = new Uint8Array(buffer);
          view.set(this.view);
          this.buffer = buffer;
          this.view = view;
        }
        return this;
      };
      ByteBufferPrototype.reverse = function(begin, end) {
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        if (!this.noAssert) {
          if ("number" !== typeof begin || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
          begin >>>= 0;
          if ("number" !== typeof end || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
          end >>>= 0;
          if (begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
        }
        if (begin === end) return this;
        Array.prototype.reverse.call(this.view.subarray(begin, end));
        return this;
      };
      ByteBufferPrototype.skip = function(length) {
        if (!this.noAssert) {
          if ("number" !== typeof length || length % 1 !== 0) throw TypeError("Illegal length: " + length + " (not an integer)");
          length |= 0;
        }
        var offset = this.offset + length;
        if (!this.noAssert && (offset < 0 || offset > this.buffer.byteLength)) throw RangeError("Illegal length: 0 <= " + this.offset + " + " + length + " <= " + this.buffer.byteLength);
        this.offset = offset;
        return this;
      };
      ByteBufferPrototype.slice = function(begin, end) {
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        if (!this.noAssert) {
          if ("number" !== typeof begin || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
          begin >>>= 0;
          if ("number" !== typeof end || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
          end >>>= 0;
          if (begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
        }
        var bb = this.clone();
        bb.offset = begin;
        bb.limit = end;
        return bb;
      };
      ByteBufferPrototype.toBuffer = function(forceCopy) {
        var offset = this.offset, limit = this.limit;
        if (!this.noAssert) {
          if ("number" !== typeof offset || offset % 1 !== 0) throw TypeError("Illegal offset: Not an integer");
          offset >>>= 0;
          if ("number" !== typeof limit || limit % 1 !== 0) throw TypeError("Illegal limit: Not an integer");
          limit >>>= 0;
          if (offset < 0 || offset > limit || limit > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + offset + " <= " + limit + " <= " + this.buffer.byteLength);
        }
        if (!forceCopy && 0 === offset && limit === this.buffer.byteLength) return this.buffer;
        if (offset === limit) return EMPTY_BUFFER;
        var buffer = new ArrayBuffer(limit - offset);
        new Uint8Array(buffer).set(new Uint8Array(this.buffer).subarray(offset, limit), 0);
        return buffer;
      };
      ByteBufferPrototype.toArrayBuffer = ByteBufferPrototype.toBuffer;
      ByteBufferPrototype.toString = function(encoding, begin, end) {
        if ("undefined" === typeof encoding) return "ByteBufferAB(offset=" + this.offset + ",markedOffset=" + this.markedOffset + ",limit=" + this.limit + ",capacity=" + this.capacity() + ")";
        "number" === typeof encoding && (encoding = "utf8", begin = encoding, end = begin);
        switch (encoding) {
         case "utf8":
          return this.toUTF8(begin, end);

         case "base64":
          return this.toBase64(begin, end);

         case "hex":
          return this.toHex(begin, end);

         case "binary":
          return this.toBinary(begin, end);

         case "debug":
          return this.toDebug();

         case "columns":
          return this.toColumns();

         default:
          throw Error("Unsupported encoding: " + encoding);
        }
      };
      var lxiv = function() {
        var lxiv = {};
        var aout = [ 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47 ];
        var ain = [];
        for (var i = 0, k = aout.length; i < k; ++i) ain[aout[i]] = i;
        lxiv.encode = function(src, dst) {
          var b, t;
          while (null !== (b = src())) {
            dst(aout[b >> 2 & 63]);
            t = (3 & b) << 4;
            if (null !== (b = src())) {
              t |= b >> 4 & 15;
              dst(aout[63 & (t | b >> 4 & 15)]);
              t = (15 & b) << 2;
              null !== (b = src()) ? (dst(aout[63 & (t | b >> 6 & 3)]), dst(aout[63 & b])) : (dst(aout[63 & t]), 
              dst(61));
            } else dst(aout[63 & t]), dst(61), dst(61);
          }
        };
        lxiv.decode = function(src, dst) {
          var c, t1, t2;
          function fail(c) {
            throw Error("Illegal character code: " + c);
          }
          while (null !== (c = src())) {
            t1 = ain[c];
            "undefined" === typeof t1 && fail(c);
            if (null !== (c = src())) {
              t2 = ain[c];
              "undefined" === typeof t2 && fail(c);
              dst(t1 << 2 >>> 0 | (48 & t2) >> 4);
              if (null !== (c = src())) {
                t1 = ain[c];
                if ("undefined" === typeof t1) {
                  if (61 === c) break;
                  fail(c);
                }
                dst((15 & t2) << 4 >>> 0 | (60 & t1) >> 2);
                if (null !== (c = src())) {
                  t2 = ain[c];
                  if ("undefined" === typeof t2) {
                    if (61 === c) break;
                    fail(c);
                  }
                  dst((3 & t1) << 6 >>> 0 | t2);
                }
              }
            }
          }
        };
        lxiv.test = function(str) {
          return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(str);
        };
        return lxiv;
      }();
      ByteBufferPrototype.toBase64 = function(begin, end) {
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        begin |= 0;
        end |= 0;
        if (begin < 0 || end > this.capacity || begin > end) throw RangeError("begin, end");
        var sd;
        lxiv.encode(function() {
          return begin < end ? this.view[begin++] : null;
        }.bind(this), sd = stringDestination());
        return sd();
      };
      ByteBuffer.fromBase64 = function(str, littleEndian) {
        if ("string" !== typeof str) throw TypeError("str");
        var bb = new ByteBuffer(str.length / 4 * 3, littleEndian), i = 0;
        lxiv.decode(stringSource(str), function(b) {
          bb.view[i++] = b;
        });
        bb.limit = i;
        return bb;
      };
      ByteBuffer.btoa = function(str) {
        return ByteBuffer.fromBinary(str).toBase64();
      };
      ByteBuffer.atob = function(b64) {
        return ByteBuffer.fromBase64(b64).toBinary();
      };
      ByteBufferPrototype.toBinary = function(begin, end) {
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        begin |= 0;
        end |= 0;
        if (begin < 0 || end > this.capacity() || begin > end) throw RangeError("begin, end");
        if (begin === end) return "";
        var chars = [], parts = [];
        while (begin < end) {
          chars.push(this.view[begin++]);
          chars.length >= 1024 && (parts.push(String.fromCharCode.apply(String, chars)), chars = []);
        }
        return parts.join("") + String.fromCharCode.apply(String, chars);
      };
      ByteBuffer.fromBinary = function(str, littleEndian) {
        if ("string" !== typeof str) throw TypeError("str");
        var i = 0, k = str.length, charCode, bb = new ByteBuffer(k, littleEndian);
        while (i < k) {
          charCode = str.charCodeAt(i);
          if (charCode > 255) throw RangeError("illegal char code: " + charCode);
          bb.view[i++] = charCode;
        }
        bb.limit = k;
        return bb;
      };
      ByteBufferPrototype.toDebug = function(columns) {
        var i = -1, k = this.buffer.byteLength, b, hex = "", asc = "", out = "";
        while (i < k) {
          if (-1 !== i) {
            b = this.view[i];
            hex += b < 16 ? "0" + b.toString(16).toUpperCase() : b.toString(16).toUpperCase();
            columns && (asc += b > 32 && b < 127 ? String.fromCharCode(b) : ".");
          }
          ++i;
          if (columns && i > 0 && i % 16 === 0 && i !== k) {
            while (hex.length < 51) hex += " ";
            out += hex + asc + "\n";
            hex = asc = "";
          }
          i === this.offset && i === this.limit ? hex += i === this.markedOffset ? "!" : "|" : i === this.offset ? hex += i === this.markedOffset ? "[" : "<" : i === this.limit ? hex += i === this.markedOffset ? "]" : ">" : hex += i === this.markedOffset ? "'" : columns || 0 !== i && i !== k ? " " : "";
        }
        if (columns && " " !== hex) {
          while (hex.length < 51) hex += " ";
          out += hex + asc + "\n";
        }
        return columns ? out : hex;
      };
      ByteBuffer.fromDebug = function(str, littleEndian, noAssert) {
        var k = str.length, bb = new ByteBuffer((k + 1) / 3 | 0, littleEndian, noAssert);
        var i = 0, j = 0, ch, b, rs = false, ho = false, hm = false, hl = false, fail = false;
        while (i < k) {
          switch (ch = str.charAt(i++)) {
           case "!":
            if (!noAssert) {
              if (ho || hm || hl) {
                fail = true;
                break;
              }
              ho = hm = hl = true;
            }
            bb.offset = bb.markedOffset = bb.limit = j;
            rs = false;
            break;

           case "|":
            if (!noAssert) {
              if (ho || hl) {
                fail = true;
                break;
              }
              ho = hl = true;
            }
            bb.offset = bb.limit = j;
            rs = false;
            break;

           case "[":
            if (!noAssert) {
              if (ho || hm) {
                fail = true;
                break;
              }
              ho = hm = true;
            }
            bb.offset = bb.markedOffset = j;
            rs = false;
            break;

           case "<":
            if (!noAssert) {
              if (ho) {
                fail = true;
                break;
              }
              ho = true;
            }
            bb.offset = j;
            rs = false;
            break;

           case "]":
            if (!noAssert) {
              if (hl || hm) {
                fail = true;
                break;
              }
              hl = hm = true;
            }
            bb.limit = bb.markedOffset = j;
            rs = false;
            break;

           case ">":
            if (!noAssert) {
              if (hl) {
                fail = true;
                break;
              }
              hl = true;
            }
            bb.limit = j;
            rs = false;
            break;

           case "'":
            if (!noAssert) {
              if (hm) {
                fail = true;
                break;
              }
              hm = true;
            }
            bb.markedOffset = j;
            rs = false;
            break;

           case " ":
            rs = false;
            break;

           default:
            if (!noAssert && rs) {
              fail = true;
              break;
            }
            b = parseInt(ch + str.charAt(i++), 16);
            if (!noAssert && (isNaN(b) || b < 0 || b > 255)) throw TypeError("Illegal str: Not a debug encoded string");
            bb.view[j++] = b;
            rs = true;
          }
          if (fail) throw TypeError("Illegal str: Invalid symbol at " + i);
        }
        if (!noAssert) {
          if (!ho || !hl) throw TypeError("Illegal str: Missing offset or limit");
          if (j < bb.buffer.byteLength) throw TypeError("Illegal str: Not a debug encoded string (is it hex?) " + j + " < " + k);
        }
        return bb;
      };
      ByteBufferPrototype.toHex = function(begin, end) {
        begin = "undefined" === typeof begin ? this.offset : begin;
        end = "undefined" === typeof end ? this.limit : end;
        if (!this.noAssert) {
          if ("number" !== typeof begin || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
          begin >>>= 0;
          if ("number" !== typeof end || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
          end >>>= 0;
          if (begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
        }
        var out = new Array(end - begin), b;
        while (begin < end) {
          b = this.view[begin++];
          b < 16 ? out.push("0", b.toString(16)) : out.push(b.toString(16));
        }
        return out.join("");
      };
      ByteBuffer.fromHex = function(str, littleEndian, noAssert) {
        if (!noAssert) {
          if ("string" !== typeof str) throw TypeError("Illegal str: Not a string");
          if (str.length % 2 !== 0) throw TypeError("Illegal str: Length not a multiple of 2");
        }
        var k = str.length, bb = new ByteBuffer(k / 2 | 0, littleEndian), b;
        for (var i = 0, j = 0; i < k; i += 2) {
          b = parseInt(str.substring(i, i + 2), 16);
          if (!noAssert && (!isFinite(b) || b < 0 || b > 255)) throw TypeError("Illegal str: Contains non-hex characters");
          bb.view[j++] = b;
        }
        bb.limit = j;
        return bb;
      };
      var utfx = function() {
        var utfx = {};
        utfx.MAX_CODEPOINT = 1114111;
        utfx.encodeUTF8 = function(src, dst) {
          var cp = null;
          "number" === typeof src && (cp = src, src = function src() {
            return null;
          });
          while (null !== cp || null !== (cp = src())) {
            cp < 128 ? dst(127 & cp) : cp < 2048 ? (dst(cp >> 6 & 31 | 192), dst(63 & cp | 128)) : cp < 65536 ? (dst(cp >> 12 & 15 | 224), 
            dst(cp >> 6 & 63 | 128), dst(63 & cp | 128)) : (dst(cp >> 18 & 7 | 240), dst(cp >> 12 & 63 | 128), 
            dst(cp >> 6 & 63 | 128), dst(63 & cp | 128));
            cp = null;
          }
        };
        utfx.decodeUTF8 = function(src, dst) {
          var a, b, c, d, fail = function fail(b) {
            b = b.slice(0, b.indexOf(null));
            var err = Error(b.toString());
            err.name = "TruncatedError";
            err["bytes"] = b;
            throw err;
          };
          while (null !== (a = src())) if (0 === (128 & a)) dst(a); else if (192 === (224 & a)) null === (b = src()) && fail([ a, b ]), 
          dst((31 & a) << 6 | 63 & b); else if (224 === (240 & a)) (null === (b = src()) || null === (c = src())) && fail([ a, b, c ]), 
          dst((15 & a) << 12 | (63 & b) << 6 | 63 & c); else {
            if (240 !== (248 & a)) throw RangeError("Illegal starting byte: " + a);
            (null === (b = src()) || null === (c = src()) || null === (d = src())) && fail([ a, b, c, d ]), 
            dst((7 & a) << 18 | (63 & b) << 12 | (63 & c) << 6 | 63 & d);
          }
        };
        utfx.UTF16toUTF8 = function(src, dst) {
          var c1, c2 = null;
          while (true) {
            if (null === (c1 = null !== c2 ? c2 : src())) break;
            if (c1 >= 55296 && c1 <= 57343 && null !== (c2 = src()) && c2 >= 56320 && c2 <= 57343) {
              dst(1024 * (c1 - 55296) + c2 - 56320 + 65536);
              c2 = null;
              continue;
            }
            dst(c1);
          }
          null !== c2 && dst(c2);
        };
        utfx.UTF8toUTF16 = function(src, dst) {
          var cp = null;
          "number" === typeof src && (cp = src, src = function src() {
            return null;
          });
          while (null !== cp || null !== (cp = src())) {
            cp <= 65535 ? dst(cp) : (cp -= 65536, dst(55296 + (cp >> 10)), dst(cp % 1024 + 56320));
            cp = null;
          }
        };
        utfx.encodeUTF16toUTF8 = function(src, dst) {
          utfx.UTF16toUTF8(src, function(cp) {
            utfx.encodeUTF8(cp, dst);
          });
        };
        utfx.decodeUTF8toUTF16 = function(src, dst) {
          utfx.decodeUTF8(src, function(cp) {
            utfx.UTF8toUTF16(cp, dst);
          });
        };
        utfx.calculateCodePoint = function(cp) {
          return cp < 128 ? 1 : cp < 2048 ? 2 : cp < 65536 ? 3 : 4;
        };
        utfx.calculateUTF8 = function(src) {
          var cp, l = 0;
          while (null !== (cp = src())) l += cp < 128 ? 1 : cp < 2048 ? 2 : cp < 65536 ? 3 : 4;
          return l;
        };
        utfx.calculateUTF16asUTF8 = function(src) {
          var n = 0, l = 0;
          utfx.UTF16toUTF8(src, function(cp) {
            ++n;
            l += cp < 128 ? 1 : cp < 2048 ? 2 : cp < 65536 ? 3 : 4;
          });
          return [ n, l ];
        };
        return utfx;
      }();
      ByteBufferPrototype.toUTF8 = function(begin, end) {
        "undefined" === typeof begin && (begin = this.offset);
        "undefined" === typeof end && (end = this.limit);
        if (!this.noAssert) {
          if ("number" !== typeof begin || begin % 1 !== 0) throw TypeError("Illegal begin: Not an integer");
          begin >>>= 0;
          if ("number" !== typeof end || end % 1 !== 0) throw TypeError("Illegal end: Not an integer");
          end >>>= 0;
          if (begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
        }
        var sd;
        try {
          utfx.decodeUTF8toUTF16(function() {
            return begin < end ? this.view[begin++] : null;
          }.bind(this), sd = stringDestination());
        } catch (e) {
          if (begin !== end) throw RangeError("Illegal range: Truncated data, " + begin + " != " + end);
        }
        return sd();
      };
      ByteBuffer.fromUTF8 = function(str, littleEndian, noAssert) {
        if (!noAssert && "string" !== typeof str) throw TypeError("Illegal str: Not a string");
        var bb = new ByteBuffer(utfx.calculateUTF16asUTF8(stringSource(str), true)[1], littleEndian, noAssert), i = 0;
        utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
          bb.view[i++] = b;
        });
        bb.limit = i;
        return bb;
      };
      return ByteBuffer;
    });
    cc._RF.pop();
  }, {
    "./long": "long"
  } ],
  fs: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cdc96HNqJBFo66kNlf8yz0W", "fs");
    "use strict";
    module.exports = {
      readFile: function readFile(path, cb) {
        var str = jsb.fileUtils.getStringFromFile(path);
        cb(null, str);
      },
      readFileSync: function readFileSync(path) {
        return jsb.fileUtils.getStringFromFile(path);
      }
    };
    cc._RF.pop();
  }, {} ],
  long: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "586deJaoz9OLLRnTrPgEPnz", "long");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    (function(global, factory) {
      "function" === typeof define && define["amd"] ? define([], factory) : "function" === typeof require && "object" === ("undefined" === typeof module ? "undefined" : _typeof(module)) && module && module["exports"] ? module["exports"] = factory() : (global["dcodeIO"] = global["dcodeIO"] || {})["Long"] = factory();
    })(void 0, function() {
      function Long(low, high, unsigned) {
        this.low = 0 | low;
        this.high = 0 | high;
        this.unsigned = !!unsigned;
      }
      Long.prototype.__isLong__;
      Object.defineProperty(Long.prototype, "__isLong__", {
        value: true,
        enumerable: false,
        configurable: false
      });
      function isLong(obj) {
        return true === (obj && obj["__isLong__"]);
      }
      Long.isLong = isLong;
      var INT_CACHE = {};
      var UINT_CACHE = {};
      function fromInt(value, unsigned) {
        var obj, cachedObj, cache;
        if (unsigned) {
          value >>>= 0;
          if (cache = 0 <= value && value < 256) {
            cachedObj = UINT_CACHE[value];
            if (cachedObj) return cachedObj;
          }
          obj = fromBits(value, (0 | value) < 0 ? -1 : 0, true);
          cache && (UINT_CACHE[value] = obj);
          return obj;
        }
        value |= 0;
        if (cache = -128 <= value && value < 128) {
          cachedObj = INT_CACHE[value];
          if (cachedObj) return cachedObj;
        }
        obj = fromBits(value, value < 0 ? -1 : 0, false);
        cache && (INT_CACHE[value] = obj);
        return obj;
      }
      Long.fromInt = fromInt;
      function fromNumber(value, unsigned) {
        if (isNaN(value) || !isFinite(value)) return unsigned ? UZERO : ZERO;
        if (unsigned) {
          if (value < 0) return UZERO;
          if (value >= TWO_PWR_64_DBL) return MAX_UNSIGNED_VALUE;
        } else {
          if (value <= -TWO_PWR_63_DBL) return MIN_VALUE;
          if (value + 1 >= TWO_PWR_63_DBL) return MAX_VALUE;
        }
        if (value < 0) return fromNumber(-value, unsigned).neg();
        return fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
      }
      Long.fromNumber = fromNumber;
      function fromBits(lowBits, highBits, unsigned) {
        return new Long(lowBits, highBits, unsigned);
      }
      Long.fromBits = fromBits;
      var pow_dbl = Math.pow;
      function fromString(str, unsigned, radix) {
        if (0 === str.length) throw Error("empty string");
        if ("NaN" === str || "Infinity" === str || "+Infinity" === str || "-Infinity" === str) return ZERO;
        "number" === typeof unsigned ? (radix = unsigned, unsigned = false) : unsigned = !!unsigned;
        radix = radix || 10;
        if (radix < 2 || 36 < radix) throw RangeError("radix");
        var p;
        if ((p = str.indexOf("-")) > 0) throw Error("interior hyphen");
        if (0 === p) return fromString(str.substring(1), unsigned, radix).neg();
        var radixToPower = fromNumber(pow_dbl(radix, 8));
        var result = ZERO;
        for (var i = 0; i < str.length; i += 8) {
          var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
          if (size < 8) {
            var power = fromNumber(pow_dbl(radix, size));
            result = result.mul(power).add(fromNumber(value));
          } else {
            result = result.mul(radixToPower);
            result = result.add(fromNumber(value));
          }
        }
        result.unsigned = unsigned;
        return result;
      }
      Long.fromString = fromString;
      function fromValue(val) {
        if (val instanceof Long) return val;
        if ("number" === typeof val) return fromNumber(val);
        if ("string" === typeof val) return fromString(val);
        return fromBits(val.low, val.high, val.unsigned);
      }
      Long.fromValue = fromValue;
      var TWO_PWR_16_DBL = 65536;
      var TWO_PWR_24_DBL = 1 << 24;
      var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
      var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
      var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
      var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
      var ZERO = fromInt(0);
      Long.ZERO = ZERO;
      var UZERO = fromInt(0, true);
      Long.UZERO = UZERO;
      var ONE = fromInt(1);
      Long.ONE = ONE;
      var UONE = fromInt(1, true);
      Long.UONE = UONE;
      var NEG_ONE = fromInt(-1);
      Long.NEG_ONE = NEG_ONE;
      var MAX_VALUE = fromBits(-1, 2147483647, false);
      Long.MAX_VALUE = MAX_VALUE;
      var MAX_UNSIGNED_VALUE = fromBits(-1, -1, true);
      Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
      var MIN_VALUE = fromBits(0, -2147483648, false);
      Long.MIN_VALUE = MIN_VALUE;
      var LongPrototype = Long.prototype;
      LongPrototype.toInt = function toInt() {
        return this.unsigned ? this.low >>> 0 : this.low;
      };
      LongPrototype.toNumber = function toNumber() {
        if (this.unsigned) return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
        return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
      };
      LongPrototype.toString = function toString(radix) {
        radix = radix || 10;
        if (radix < 2 || 36 < radix) throw RangeError("radix");
        if (this.isZero()) return "0";
        if (this.isNegative()) {
          if (this.eq(MIN_VALUE)) {
            var radixLong = fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
            return div.toString(radix) + rem1.toInt().toString(radix);
          }
          return "-" + this.neg().toString(radix);
        }
        var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this;
        var result = "";
        while (true) {
          var remDiv = rem.div(radixToPower), intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0, digits = intval.toString(radix);
          rem = remDiv;
          if (rem.isZero()) return digits + result;
          while (digits.length < 6) digits = "0" + digits;
          result = "" + digits + result;
        }
      };
      LongPrototype.getHighBits = function getHighBits() {
        return this.high;
      };
      LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
        return this.high >>> 0;
      };
      LongPrototype.getLowBits = function getLowBits() {
        return this.low;
      };
      LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
        return this.low >>> 0;
      };
      LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
        if (this.isNegative()) return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
        var val = 0 != this.high ? this.high : this.low;
        for (var bit = 31; bit > 0; bit--) if (0 != (val & 1 << bit)) break;
        return 0 != this.high ? bit + 33 : bit + 1;
      };
      LongPrototype.isZero = function isZero() {
        return 0 === this.high && 0 === this.low;
      };
      LongPrototype.isNegative = function isNegative() {
        return !this.unsigned && this.high < 0;
      };
      LongPrototype.isPositive = function isPositive() {
        return this.unsigned || this.high >= 0;
      };
      LongPrototype.isOdd = function isOdd() {
        return 1 === (1 & this.low);
      };
      LongPrototype.isEven = function isEven() {
        return 0 === (1 & this.low);
      };
      LongPrototype.equals = function equals(other) {
        isLong(other) || (other = fromValue(other));
        if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1) return false;
        return this.high === other.high && this.low === other.low;
      };
      LongPrototype.eq = LongPrototype.equals;
      LongPrototype.notEquals = function notEquals(other) {
        return !this.eq(other);
      };
      LongPrototype.neq = LongPrototype.notEquals;
      LongPrototype.lessThan = function lessThan(other) {
        return this.comp(other) < 0;
      };
      LongPrototype.lt = LongPrototype.lessThan;
      LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
        return this.comp(other) <= 0;
      };
      LongPrototype.lte = LongPrototype.lessThanOrEqual;
      LongPrototype.greaterThan = function greaterThan(other) {
        return this.comp(other) > 0;
      };
      LongPrototype.gt = LongPrototype.greaterThan;
      LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
        return this.comp(other) >= 0;
      };
      LongPrototype.gte = LongPrototype.greaterThanOrEqual;
      LongPrototype.compare = function compare(other) {
        isLong(other) || (other = fromValue(other));
        if (this.eq(other)) return 0;
        var thisNeg = this.isNegative(), otherNeg = other.isNegative();
        if (thisNeg && !otherNeg) return -1;
        if (!thisNeg && otherNeg) return 1;
        if (!this.unsigned) return this.sub(other).isNegative() ? -1 : 1;
        return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
      };
      LongPrototype.comp = LongPrototype.compare;
      LongPrototype.negate = function negate() {
        if (!this.unsigned && this.eq(MIN_VALUE)) return MIN_VALUE;
        return this.not().add(ONE);
      };
      LongPrototype.neg = LongPrototype.negate;
      LongPrototype.add = function add(addend) {
        isLong(addend) || (addend = fromValue(addend));
        var a48 = this.high >>> 16;
        var a32 = 65535 & this.high;
        var a16 = this.low >>> 16;
        var a00 = 65535 & this.low;
        var b48 = addend.high >>> 16;
        var b32 = 65535 & addend.high;
        var b16 = addend.low >>> 16;
        var b00 = 65535 & addend.low;
        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 + b00;
        c16 += c00 >>> 16;
        c00 &= 65535;
        c16 += a16 + b16;
        c32 += c16 >>> 16;
        c16 &= 65535;
        c32 += a32 + b32;
        c48 += c32 >>> 16;
        c32 &= 65535;
        c48 += a48 + b48;
        c48 &= 65535;
        return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
      };
      LongPrototype.subtract = function subtract(subtrahend) {
        isLong(subtrahend) || (subtrahend = fromValue(subtrahend));
        return this.add(subtrahend.neg());
      };
      LongPrototype.sub = LongPrototype.subtract;
      LongPrototype.multiply = function multiply(multiplier) {
        if (this.isZero()) return ZERO;
        isLong(multiplier) || (multiplier = fromValue(multiplier));
        if (multiplier.isZero()) return ZERO;
        if (this.eq(MIN_VALUE)) return multiplier.isOdd() ? MIN_VALUE : ZERO;
        if (multiplier.eq(MIN_VALUE)) return this.isOdd() ? MIN_VALUE : ZERO;
        if (this.isNegative()) return multiplier.isNegative() ? this.neg().mul(multiplier.neg()) : this.neg().mul(multiplier).neg();
        if (multiplier.isNegative()) return this.mul(multiplier.neg()).neg();
        if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24)) return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
        var a48 = this.high >>> 16;
        var a32 = 65535 & this.high;
        var a16 = this.low >>> 16;
        var a00 = 65535 & this.low;
        var b48 = multiplier.high >>> 16;
        var b32 = 65535 & multiplier.high;
        var b16 = multiplier.low >>> 16;
        var b00 = 65535 & multiplier.low;
        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 * b00;
        c16 += c00 >>> 16;
        c00 &= 65535;
        c16 += a16 * b00;
        c32 += c16 >>> 16;
        c16 &= 65535;
        c16 += a00 * b16;
        c32 += c16 >>> 16;
        c16 &= 65535;
        c32 += a32 * b00;
        c48 += c32 >>> 16;
        c32 &= 65535;
        c32 += a16 * b16;
        c48 += c32 >>> 16;
        c32 &= 65535;
        c32 += a00 * b32;
        c48 += c32 >>> 16;
        c32 &= 65535;
        c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
        c48 &= 65535;
        return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
      };
      LongPrototype.mul = LongPrototype.multiply;
      LongPrototype.divide = function divide(divisor) {
        isLong(divisor) || (divisor = fromValue(divisor));
        if (divisor.isZero()) throw Error("division by zero");
        if (this.isZero()) return this.unsigned ? UZERO : ZERO;
        var approx, rem, res;
        if (this.unsigned) {
          divisor.unsigned || (divisor = divisor.toUnsigned());
          if (divisor.gt(this)) return UZERO;
          if (divisor.gt(this.shru(1))) return UONE;
          res = UZERO;
        } else {
          if (this.eq(MIN_VALUE)) {
            if (divisor.eq(ONE) || divisor.eq(NEG_ONE)) return MIN_VALUE;
            if (divisor.eq(MIN_VALUE)) return ONE;
            var halfThis = this.shr(1);
            approx = halfThis.div(divisor).shl(1);
            if (approx.eq(ZERO)) return divisor.isNegative() ? ONE : NEG_ONE;
            rem = this.sub(divisor.mul(approx));
            res = approx.add(rem.div(divisor));
            return res;
          }
          if (divisor.eq(MIN_VALUE)) return this.unsigned ? UZERO : ZERO;
          if (this.isNegative()) {
            if (divisor.isNegative()) return this.neg().div(divisor.neg());
            return this.neg().div(divisor).neg();
          }
          if (divisor.isNegative()) return this.div(divisor.neg()).neg();
          res = ZERO;
        }
        rem = this;
        while (rem.gte(divisor)) {
          approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
          var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48), approxRes = fromNumber(approx), approxRem = approxRes.mul(divisor);
          while (approxRem.isNegative() || approxRem.gt(rem)) {
            approx -= delta;
            approxRes = fromNumber(approx, this.unsigned);
            approxRem = approxRes.mul(divisor);
          }
          approxRes.isZero() && (approxRes = ONE);
          res = res.add(approxRes);
          rem = rem.sub(approxRem);
        }
        return res;
      };
      LongPrototype.div = LongPrototype.divide;
      LongPrototype.modulo = function modulo(divisor) {
        isLong(divisor) || (divisor = fromValue(divisor));
        return this.sub(this.div(divisor).mul(divisor));
      };
      LongPrototype.mod = LongPrototype.modulo;
      LongPrototype.not = function not() {
        return fromBits(~this.low, ~this.high, this.unsigned);
      };
      LongPrototype.and = function and(other) {
        isLong(other) || (other = fromValue(other));
        return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
      };
      LongPrototype.or = function or(other) {
        isLong(other) || (other = fromValue(other));
        return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
      };
      LongPrototype.xor = function xor(other) {
        isLong(other) || (other = fromValue(other));
        return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
      };
      LongPrototype.shiftLeft = function shiftLeft(numBits) {
        isLong(numBits) && (numBits = numBits.toInt());
        return 0 === (numBits &= 63) ? this : numBits < 32 ? fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned) : fromBits(0, this.low << numBits - 32, this.unsigned);
      };
      LongPrototype.shl = LongPrototype.shiftLeft;
      LongPrototype.shiftRight = function shiftRight(numBits) {
        isLong(numBits) && (numBits = numBits.toInt());
        return 0 === (numBits &= 63) ? this : numBits < 32 ? fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned) : fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
      };
      LongPrototype.shr = LongPrototype.shiftRight;
      LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
        isLong(numBits) && (numBits = numBits.toInt());
        numBits &= 63;
        if (0 === numBits) return this;
        var high = this.high;
        if (numBits < 32) {
          var low = this.low;
          return fromBits(low >>> numBits | high << 32 - numBits, high >>> numBits, this.unsigned);
        }
        return fromBits(32 === numBits ? high : high >>> numBits - 32, 0, this.unsigned);
      };
      LongPrototype.shru = LongPrototype.shiftRightUnsigned;
      LongPrototype.toSigned = function toSigned() {
        if (!this.unsigned) return this;
        return fromBits(this.low, this.high, false);
      };
      LongPrototype.toUnsigned = function toUnsigned() {
        if (this.unsigned) return this;
        return fromBits(this.low, this.high, true);
      };
      LongPrototype.toBytes = function(le) {
        return le ? this.toBytesLE() : this.toBytesBE();
      };
      LongPrototype.toBytesLE = function() {
        var hi = this.high, lo = this.low;
        return [ 255 & lo, lo >>> 8 & 255, lo >>> 16 & 255, lo >>> 24 & 255, 255 & hi, hi >>> 8 & 255, hi >>> 16 & 255, hi >>> 24 & 255 ];
      };
      LongPrototype.toBytesBE = function() {
        var hi = this.high, lo = this.low;
        return [ hi >>> 24 & 255, hi >>> 16 & 255, hi >>> 8 & 255, 255 & hi, lo >>> 24 & 255, lo >>> 16 & 255, lo >>> 8 & 255, 255 & lo ];
      };
      return Long;
    });
    cc._RF.pop();
  }, {} ],
  onfire: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "90053VUxg5KyryRe1HIfzz+", "onfire");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    !function(root, factory) {
      "object" === ("undefined" === typeof module ? "undefined" : _typeof(module)) && module.exports ? module.exports = factory() : root.onfire = factory();
    }("undefined" !== typeof window ? window : void 0, function() {
      var __onfireEvents = {}, __cnt = 0, string_str = "string", function_str = "function", hasOwnKey = Function.call.bind(Object.hasOwnProperty), slice = Function.call.bind(Array.prototype.slice);
      function _bind(eventName, callback, is_one, context) {
        if (("undefined" === typeof eventName ? "undefined" : _typeof(eventName)) !== string_str || ("undefined" === typeof callback ? "undefined" : _typeof(callback)) !== function_str) throw new Error("args: " + string_str + ", " + function_str);
        hasOwnKey(__onfireEvents, eventName) || (__onfireEvents[eventName] = {});
        __onfireEvents[eventName][++__cnt] = [ callback, is_one, context ];
        return [ eventName, __cnt ];
      }
      function _each(obj, callback) {
        for (var key in obj) hasOwnKey(obj, key) && callback(key, obj[key]);
      }
      function on(eventName, callback, context) {
        return _bind(eventName, callback, 0, context);
      }
      function one(eventName, callback, context) {
        return _bind(eventName, callback, 1, context);
      }
      function _fire_func(eventName, args) {
        hasOwnKey(__onfireEvents, eventName) && _each(__onfireEvents[eventName], function(key, item) {
          item[0].apply(item[2], args);
          item[1] && delete __onfireEvents[eventName][key];
        });
      }
      function fire(eventName) {
        var args = slice(arguments, 1);
        setTimeout(function() {
          _fire_func(eventName, args);
        });
      }
      function fireSync(eventName) {
        _fire_func(eventName, slice(arguments, 1));
      }
      function un(event) {
        var eventName, key, r = false, type = "undefined" === typeof event ? "undefined" : _typeof(event);
        if (type === string_str) {
          if (hasOwnKey(__onfireEvents, event)) {
            delete __onfireEvents[event];
            return true;
          }
          return false;
        }
        if ("object" === type) {
          eventName = event[0];
          key = event[1];
          if (hasOwnKey(__onfireEvents, eventName) && hasOwnKey(__onfireEvents[eventName], key)) {
            delete __onfireEvents[eventName][key];
            return true;
          }
          return false;
        }
        if (type === function_str) {
          _each(__onfireEvents, function(key_1, item_1) {
            _each(item_1, function(key_2, item_2) {
              if (item_2[0] === event) {
                delete __onfireEvents[key_1][key_2];
                r = true;
              }
            });
          });
          return r;
        }
        return true;
      }
      function clear() {
        __onfireEvents = {};
      }
      return {
        on: on,
        one: one,
        un: un,
        fire: fire,
        fireSync: fireSync,
        clear: clear
      };
    });
    cc._RF.pop();
  }, {} ],
  path: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dcc10Y3adJL/IOLJyUYX8kA", "path");
    "use strict";
    module.exports = {
      resolve: function resolve(subPath) {
        return cc.url.raw("resources/" + subPath);
      },
      join: function join() {
        return cc.path.join.apply(null, arguments);
      }
    };
    cc._RF.pop();
  }, {} ],
  pbkiller: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e4099gKXxRE2afyH/PKbklC", "pbkiller");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var ProtoBuf = require("protobufjs");
    ProtoBuf.Util.IS_NODE = cc.sys.isNative;
    var cccVer = cc.ENGINE_VERSION.match(/\d+\.\d+/)[0];
    function compareVer(v1, v2) {
      var array1 = v1.split(".").map(function(i) {
        return parseInt(i);
      });
      var array2 = v2.split(".").map(function(i) {
        return parseInt(i);
      });
      var diff = 0;
      for (var i = 0; i < array1.length; i++) {
        diff = array1[i] - array2[i];
        if (0 !== diff) return diff > 0 ? 1 : -1;
      }
      return 0;
    }
    ProtoBuf.Util.IS_NODE = false;
    var loadProto = ProtoBuf.loadProto.bind(ProtoBuf);
    ProtoBuf.loadProto = function(asset, builder, filename) {
      try {
        "string" === typeof asset ? loadProto(asset, builder, filename) : asset.text && loadProto(asset.text, builder, filename);
      } catch (e) {
        cc.warn(filename + ": protobuf syntax error");
      }
    };
    ProtoBuf.loadJsonFile = function(filename, callback, builder) {
      callback && "object" === ("undefined" === typeof callback ? "undefined" : _typeof(callback)) ? (builder = callback, 
      callback = null) : callback && "function" === typeof callback || (callback = null);
      if (callback) return ProtoBuf.Util.fetch("string" === typeof filename ? filename : filename["root"] + "/" + filename["file"], function(contents) {
        if (null === contents) {
          callback(Error("Failed to fetch file"));
          return;
        }
        try {
          callback(null, ProtoBuf.loadJson(JSON.parse(contents), builder, filename));
        } catch (e) {
          callback(e);
        }
      });
      var url = "object" === ("undefined" === typeof filename ? "undefined" : _typeof(filename)) ? filename["root"] + "/" + filename["file"] : filename;
      var json = void 0;
      if (ProtoBuf.preloaded) {
        var content = cc.loader.getRes(url, cc.JsonAsset);
        content && (json = cc.JsonAsset ? content.json : content);
      } else {
        var _content = ProtoBuf.Util.fetch(url);
        _content && (json = JSON.parse(_content));
      }
      return json ? ProtoBuf.loadJson(json, builder, filename) : null;
    };
    module.exports = {
      root: "pb",
      preload: function preload(cb) {
        ProtoBuf.Util.fetch = cc.loader.getRes.bind(cc.loader);
        cc.loader.loadResDir(this.root, function(error, data) {
          ProtoBuf.preloaded = !error;
          cb();
        });
      },
      loadFromFile: function loadFromFile(fileNames, packageName) {
        if ((cc.sys.isNative || cc.sys.platform === cc.sys.WECHAT_GAME) && !ProtoBuf.preloaded) {
          cc.error("\u539f\u751f\u6216\u5fae\u4fe1\u5c0f\u6e38\u620f\u4e0a\uff0c\u9700\u8981\u5148\u8c03\u7528preload\u51fd\u6570");
          return;
        }
        "string" === typeof fileNames && (fileNames = [ fileNames ]);
        var builder = ProtoBuf.newBuilder();
        compareVer(cccVer, "1.10.0") >= 0 && ProtoBuf.preloaded ? builder.importRoot = this.root : builder.importRoot = cc.url.raw("resources/" + this.root);
        fileNames.forEach(function(fileName) {
          var extname = cc.path.extname(fileName);
          var fullPath = builder.importRoot + "/" + fileName;
          ".proto" === extname ? ProtoBuf.loadProtoFile(fullPath, builder) : ".json" === extname ? ProtoBuf.loadJsonFile(fullPath, builder) : cc.log("nonsupport file extname, only support 'proto' or 'json'");
        });
        return builder.build(packageName);
      },
      loadAll: function loadAll() {
        var _this = this;
        var extname = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "proto";
        var packageName = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        var files = [];
        (this.root.endsWith("/") || this.root.endsWith("\\")) && (this.root = this.root.substr(0, this.root.length - 1));
        cc.loader._resources.getUuidArray(this.root, null, files);
        files = files.map(function(filePath) {
          var str = filePath.substr(_this.root.length + 1);
          return str + "." + extname;
        });
        return this.loadFromFile(files, packageName);
      },
      loadData: function loadData(url, callback) {
        if (cc.sys.isNative) {
          var data = jsb.fileUtils.getDataFromFile(url);
          setTimeout(function() {
            callback(data);
          }, 0);
        } else {
          var xhr = ProtoBuf.Util.XHR();
          xhr.open("GET", url, true);
          xhr.setRequestHeader("Accept", "text/plain");
          xhr.responseType = "arraybuffer";
          "function" === typeof xhr.overrideMimeType && xhr.overrideMimeType("text/plain");
          if (callback) {
            xhr.onreadystatechange = function() {
              if (4 != xhr.readyState) return;
              200 == xhr.status || 0 == xhr.status ? callback(xhr.response) : callback(null);
            };
            if (4 == xhr.readyState) return;
            xhr.send(null);
          }
        }
      }
    };
    cc._RF.pop();
  }, {
    protobufjs: "protobufjs"
  } ],
  protobufjs: [ function(require, module, exports) {
    (function(process) {
      "use strict";
      cc._RF.push(module, "b6570xNGFdCEIIAM3kcu6sG", "protobufjs");
      "use strict";
      var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
      (function(global, factory) {
        "function" === typeof define && define["amd"] ? define([ "bytebuffer" ], factory) : "function" === typeof require && "object" === ("undefined" === typeof module ? "undefined" : _typeof(module)) && module && module["exports"] ? module["exports"] = factory(require("./bytebuffer"), true) : (global["dcodeIO"] = global["dcodeIO"] || {})["ProtoBuf"] = factory(global["dcodeIO"]["ByteBuffer"]);
      })(void 0, function(ByteBuffer, isCommonJS) {
        var ProtoBuf = {};
        ProtoBuf.ByteBuffer = ByteBuffer;
        ProtoBuf.Long = ByteBuffer.Long || null;
        ProtoBuf.VERSION = "5.0.2";
        ProtoBuf.WIRE_TYPES = {};
        ProtoBuf.WIRE_TYPES.VARINT = 0;
        ProtoBuf.WIRE_TYPES.BITS64 = 1;
        ProtoBuf.WIRE_TYPES.LDELIM = 2;
        ProtoBuf.WIRE_TYPES.STARTGROUP = 3;
        ProtoBuf.WIRE_TYPES.ENDGROUP = 4;
        ProtoBuf.WIRE_TYPES.BITS32 = 5;
        ProtoBuf.PACKABLE_WIRE_TYPES = [ ProtoBuf.WIRE_TYPES.VARINT, ProtoBuf.WIRE_TYPES.BITS64, ProtoBuf.WIRE_TYPES.BITS32 ];
        ProtoBuf.TYPES = {
          int32: {
            name: "int32",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: 0
          },
          uint32: {
            name: "uint32",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: 0
          },
          sint32: {
            name: "sint32",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: 0
          },
          int64: {
            name: "int64",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: ProtoBuf.Long ? ProtoBuf.Long.ZERO : void 0
          },
          uint64: {
            name: "uint64",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: ProtoBuf.Long ? ProtoBuf.Long.UZERO : void 0
          },
          sint64: {
            name: "sint64",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: ProtoBuf.Long ? ProtoBuf.Long.ZERO : void 0
          },
          bool: {
            name: "bool",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: false
          },
          double: {
            name: "double",
            wireType: ProtoBuf.WIRE_TYPES.BITS64,
            defaultValue: 0
          },
          string: {
            name: "string",
            wireType: ProtoBuf.WIRE_TYPES.LDELIM,
            defaultValue: ""
          },
          bytes: {
            name: "bytes",
            wireType: ProtoBuf.WIRE_TYPES.LDELIM,
            defaultValue: null
          },
          fixed32: {
            name: "fixed32",
            wireType: ProtoBuf.WIRE_TYPES.BITS32,
            defaultValue: 0
          },
          sfixed32: {
            name: "sfixed32",
            wireType: ProtoBuf.WIRE_TYPES.BITS32,
            defaultValue: 0
          },
          fixed64: {
            name: "fixed64",
            wireType: ProtoBuf.WIRE_TYPES.BITS64,
            defaultValue: ProtoBuf.Long ? ProtoBuf.Long.UZERO : void 0
          },
          sfixed64: {
            name: "sfixed64",
            wireType: ProtoBuf.WIRE_TYPES.BITS64,
            defaultValue: ProtoBuf.Long ? ProtoBuf.Long.ZERO : void 0
          },
          float: {
            name: "float",
            wireType: ProtoBuf.WIRE_TYPES.BITS32,
            defaultValue: 0
          },
          enum: {
            name: "enum",
            wireType: ProtoBuf.WIRE_TYPES.VARINT,
            defaultValue: 0
          },
          message: {
            name: "message",
            wireType: ProtoBuf.WIRE_TYPES.LDELIM,
            defaultValue: null
          },
          group: {
            name: "group",
            wireType: ProtoBuf.WIRE_TYPES.STARTGROUP,
            defaultValue: null
          }
        };
        ProtoBuf.MAP_KEY_TYPES = [ ProtoBuf.TYPES["int32"], ProtoBuf.TYPES["sint32"], ProtoBuf.TYPES["sfixed32"], ProtoBuf.TYPES["uint32"], ProtoBuf.TYPES["fixed32"], ProtoBuf.TYPES["int64"], ProtoBuf.TYPES["sint64"], ProtoBuf.TYPES["sfixed64"], ProtoBuf.TYPES["uint64"], ProtoBuf.TYPES["fixed64"], ProtoBuf.TYPES["bool"], ProtoBuf.TYPES["string"], ProtoBuf.TYPES["bytes"] ];
        ProtoBuf.ID_MIN = 1;
        ProtoBuf.ID_MAX = 536870911;
        ProtoBuf.convertFieldsToCamelCase = false;
        ProtoBuf.populateAccessors = true;
        ProtoBuf.populateDefaults = true;
        ProtoBuf.Util = function() {
          var Util = {};
          Util.IS_NODE = !!("object" === ("undefined" === typeof process ? "undefined" : _typeof(process)) && process + "" === "[object process]" && !process["browser"]);
          Util.XHR = function() {
            var XMLHttpFactories = [ function() {
              return new XMLHttpRequest();
            }, function() {
              return new ActiveXObject("Msxml2.XMLHTTP");
            }, function() {
              return new ActiveXObject("Msxml3.XMLHTTP");
            }, function() {
              return new ActiveXObject("Microsoft.XMLHTTP");
            } ];
            var xhr = null;
            for (var i = 0; i < XMLHttpFactories.length; i++) {
              try {
                xhr = XMLHttpFactories[i]();
              } catch (e) {
                continue;
              }
              break;
            }
            if (!xhr) throw Error("XMLHttpRequest is not supported");
            return xhr;
          };
          Util.fetch = function(path, callback) {
            callback && "function" != typeof callback && (callback = null);
            if (Util.IS_NODE) {
              var fs = require("fs");
              if (callback) fs.readFile(path, function(err, data) {
                callback(err ? null : "" + data);
              }); else try {
                return fs.readFileSync(path);
              } catch (e) {
                return null;
              }
            } else {
              var xhr = Util.XHR();
              xhr.open("GET", path, !!callback);
              xhr.setRequestHeader("Accept", "text/plain");
              "function" === typeof xhr.overrideMimeType && xhr.overrideMimeType("text/plain");
              if (!callback) {
                xhr.send(null);
                if (200 == xhr.status || 0 == xhr.status && "string" === typeof xhr.responseText) return xhr.responseText;
                return null;
              }
              xhr.onreadystatechange = function() {
                if (4 != xhr.readyState) return;
                200 == xhr.status || 0 == xhr.status && "string" === typeof xhr.responseText ? callback(xhr.responseText) : callback(null);
              };
              if (4 == xhr.readyState) return;
              xhr.send(null);
            }
          };
          Util.toCamelCase = function(str) {
            return str.replace(/_([a-zA-Z])/g, function($0, $1) {
              return $1.toUpperCase();
            });
          };
          return Util;
        }();
        ProtoBuf.Lang = {
          DELIM: /[\s\{\}=;:\[\],'"\(\)<>]/g,
          RULE: /^(?:required|optional|repeated|map)$/,
          TYPE: /^(?:double|float|int32|uint32|sint32|int64|uint64|sint64|fixed32|sfixed32|fixed64|sfixed64|bool|string|bytes)$/,
          NAME: /^[a-zA-Z_][a-zA-Z_0-9]*$/,
          TYPEDEF: /^[a-zA-Z][a-zA-Z_0-9]*$/,
          TYPEREF: /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,
          FQTYPEREF: /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/,
          NUMBER: /^-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+|([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?)|inf|nan)$/,
          NUMBER_DEC: /^(?:[1-9][0-9]*|0)$/,
          NUMBER_HEX: /^0[xX][0-9a-fA-F]+$/,
          NUMBER_OCT: /^0[0-7]+$/,
          NUMBER_FLT: /^([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?|inf|nan)$/,
          BOOL: /^(?:true|false)$/i,
          ID: /^(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
          NEGID: /^\-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
          WHITESPACE: /\s/,
          STRING: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")|(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,
          STRING_DQ: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
          STRING_SQ: /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g
        };
        ProtoBuf.DotProto = function(ProtoBuf, Lang) {
          var DotProto = {};
          var Tokenizer = function Tokenizer(proto) {
            this.source = proto + "";
            this.index = 0;
            this.line = 1;
            this.stack = [];
            this._stringOpen = null;
          };
          var TokenizerPrototype = Tokenizer.prototype;
          TokenizerPrototype._readString = function() {
            var re = '"' === this._stringOpen ? Lang.STRING_DQ : Lang.STRING_SQ;
            re.lastIndex = this.index - 1;
            var match = re.exec(this.source);
            if (!match) throw Error("unterminated string");
            this.index = re.lastIndex;
            this.stack.push(this._stringOpen);
            this._stringOpen = null;
            return match[1];
          };
          TokenizerPrototype.next = function() {
            if (this.stack.length > 0) return this.stack.shift();
            if (this.index >= this.source.length) return null;
            if (null !== this._stringOpen) return this._readString();
            var repeat, prev, next;
            do {
              repeat = false;
              while (Lang.WHITESPACE.test(next = this.source.charAt(this.index))) {
                "\n" === next && ++this.line;
                if (++this.index === this.source.length) return null;
              }
              if ("/" === this.source.charAt(this.index)) {
                ++this.index;
                if ("/" === this.source.charAt(this.index)) {
                  while ("\n" !== this.source.charAt(++this.index)) if (this.index == this.source.length) return null;
                  ++this.index;
                  ++this.line;
                  repeat = true;
                } else {
                  if ("*" !== (next = this.source.charAt(this.index))) return "/";
                  do {
                    "\n" === next && ++this.line;
                    if (++this.index === this.source.length) return null;
                    prev = next;
                    next = this.source.charAt(this.index);
                  } while ("*" !== prev || "/" !== next);
                  ++this.index;
                  repeat = true;
                }
              }
            } while (repeat);
            if (this.index === this.source.length) return null;
            var end = this.index;
            Lang.DELIM.lastIndex = 0;
            var delim = Lang.DELIM.test(this.source.charAt(end++));
            if (!delim) while (end < this.source.length && !Lang.DELIM.test(this.source.charAt(end))) ++end;
            var token = this.source.substring(this.index, this.index = end);
            '"' !== token && "'" !== token || (this._stringOpen = token);
            return token;
          };
          TokenizerPrototype.peek = function() {
            if (0 === this.stack.length) {
              var token = this.next();
              if (null === token) return null;
              this.stack.push(token);
            }
            return this.stack[0];
          };
          TokenizerPrototype.skip = function(expected) {
            var actual = this.next();
            if (actual !== expected) throw Error("illegal '" + actual + "', '" + expected + "' expected");
          };
          TokenizerPrototype.omit = function(expected) {
            if (this.peek() === expected) {
              this.next();
              return true;
            }
            return false;
          };
          TokenizerPrototype.toString = function() {
            return "Tokenizer (" + this.index + "/" + this.source.length + " at line " + this.line + ")";
          };
          DotProto.Tokenizer = Tokenizer;
          var Parser = function Parser(source) {
            this.tn = new Tokenizer(source);
            this.proto3 = false;
          };
          var ParserPrototype = Parser.prototype;
          ParserPrototype.parse = function() {
            var topLevel = {
              name: "[ROOT]",
              package: null,
              messages: [],
              enums: [],
              imports: [],
              options: {},
              services: []
            };
            var token, head = true, weak;
            try {
              while (token = this.tn.next()) switch (token) {
               case "package":
                if (!head || null !== topLevel["package"]) throw Error("unexpected 'package'");
                token = this.tn.next();
                if (!Lang.TYPEREF.test(token)) throw Error("illegal package name: " + token);
                this.tn.skip(";");
                topLevel["package"] = token;
                break;

               case "import":
                if (!head) throw Error("unexpected 'import'");
                token = this.tn.peek();
                ("public" === token || (weak = "weak" === token)) && this.tn.next();
                token = this._readString();
                this.tn.skip(";");
                weak || topLevel["imports"].push(token);
                break;

               case "syntax":
                if (!head) throw Error("unexpected 'syntax'");
                this.tn.skip("=");
                "proto3" === (topLevel["syntax"] = this._readString()) && (this.proto3 = true);
                this.tn.skip(";");
                break;

               case "message":
                this._parseMessage(topLevel, null);
                head = false;
                break;

               case "enum":
                this._parseEnum(topLevel);
                head = false;
                break;

               case "option":
                this._parseOption(topLevel);
                break;

               case "service":
                this._parseService(topLevel);
                break;

               case "extend":
                this._parseExtend(topLevel);
                break;

               default:
                throw Error("unexpected '" + token + "'");
              }
            } catch (e) {
              e.message = "Parse error at line " + this.tn.line + ": " + e.message;
              throw e;
            }
            delete topLevel["name"];
            return topLevel;
          };
          Parser.parse = function(source) {
            return new Parser(source).parse();
          };
          function mkId(value, mayBeNegative) {
            var id = -1, sign = 1;
            if ("-" == value.charAt(0)) {
              sign = -1;
              value = value.substring(1);
            }
            if (Lang.NUMBER_DEC.test(value)) id = parseInt(value); else if (Lang.NUMBER_HEX.test(value)) id = parseInt(value.substring(2), 16); else {
              if (!Lang.NUMBER_OCT.test(value)) throw Error("illegal id value: " + (sign < 0 ? "-" : "") + value);
              id = parseInt(value.substring(1), 8);
            }
            id = sign * id | 0;
            if (!mayBeNegative && id < 0) throw Error("illegal id value: " + (sign < 0 ? "-" : "") + value);
            return id;
          }
          function mkNumber(val) {
            var sign = 1;
            if ("-" == val.charAt(0)) {
              sign = -1;
              val = val.substring(1);
            }
            if (Lang.NUMBER_DEC.test(val)) return sign * parseInt(val, 10);
            if (Lang.NUMBER_HEX.test(val)) return sign * parseInt(val.substring(2), 16);
            if (Lang.NUMBER_OCT.test(val)) return sign * parseInt(val.substring(1), 8);
            if ("inf" === val) return Infinity * sign;
            if ("nan" === val) return NaN;
            if (Lang.NUMBER_FLT.test(val)) return sign * parseFloat(val);
            throw Error("illegal number value: " + (sign < 0 ? "-" : "") + val);
          }
          ParserPrototype._readString = function() {
            var value = "", token, delim;
            do {
              delim = this.tn.next();
              if ("'" !== delim && '"' !== delim) throw Error("illegal string delimiter: " + delim);
              value += this.tn.next();
              this.tn.skip(delim);
              token = this.tn.peek();
            } while ('"' === token || '"' === token);
            return value;
          };
          ParserPrototype._readValue = function(mayBeTypeRef) {
            var token = this.tn.peek(), value;
            if ('"' === token || "'" === token) return this._readString();
            this.tn.next();
            if (Lang.NUMBER.test(token)) return mkNumber(token);
            if (Lang.BOOL.test(token)) return "true" === token.toLowerCase();
            if (mayBeTypeRef && Lang.TYPEREF.test(token)) return token;
            throw Error("illegal value: " + token);
          };
          ParserPrototype._parseOption = function(parent, isList) {
            var token = this.tn.next(), custom = false;
            if ("(" === token) {
              custom = true;
              token = this.tn.next();
            }
            if (!Lang.TYPEREF.test(token)) throw Error("illegal option name: " + token);
            var name = token;
            if (custom) {
              this.tn.skip(")");
              name = "(" + name + ")";
              token = this.tn.peek();
              if (Lang.FQTYPEREF.test(token)) {
                name += token;
                this.tn.next();
              }
            }
            this.tn.skip("=");
            this._parseOptionValue(parent, name);
            isList || this.tn.skip(";");
          };
          function setOption(options, name, value) {
            if ("undefined" === typeof options[name]) options[name] = value; else {
              Array.isArray(options[name]) || (options[name] = [ options[name] ]);
              options[name].push(value);
            }
          }
          ParserPrototype._parseOptionValue = function(parent, name) {
            var token = this.tn.peek();
            if ("{" !== token) setOption(parent["options"], name, this._readValue(true)); else {
              this.tn.skip("{");
              while ("}" !== (token = this.tn.next())) {
                if (!Lang.NAME.test(token)) throw Error("illegal option name: " + name + "." + token);
                this.tn.omit(":") ? setOption(parent["options"], name + "." + token, this._readValue(true)) : this._parseOptionValue(parent, name + "." + token);
              }
            }
          };
          ParserPrototype._parseService = function(parent) {
            var token = this.tn.next();
            if (!Lang.NAME.test(token)) throw Error("illegal service name at line " + this.tn.line + ": " + token);
            var name = token;
            var svc = {
              name: name,
              rpc: {},
              options: {}
            };
            this.tn.skip("{");
            while ("}" !== (token = this.tn.next())) if ("option" === token) this._parseOption(svc); else {
              if ("rpc" !== token) throw Error("illegal service token: " + token);
              this._parseServiceRPC(svc);
            }
            this.tn.omit(";");
            parent["services"].push(svc);
          };
          ParserPrototype._parseServiceRPC = function(svc) {
            var type = "rpc", token = this.tn.next();
            if (!Lang.NAME.test(token)) throw Error("illegal rpc service method name: " + token);
            var name = token;
            var method = {
              request: null,
              response: null,
              request_stream: false,
              response_stream: false,
              options: {}
            };
            this.tn.skip("(");
            token = this.tn.next();
            if ("stream" === token.toLowerCase()) {
              method["request_stream"] = true;
              token = this.tn.next();
            }
            if (!Lang.TYPEREF.test(token)) throw Error("illegal rpc service request type: " + token);
            method["request"] = token;
            this.tn.skip(")");
            token = this.tn.next();
            if ("returns" !== token.toLowerCase()) throw Error("illegal rpc service request type delimiter: " + token);
            this.tn.skip("(");
            token = this.tn.next();
            if ("stream" === token.toLowerCase()) {
              method["response_stream"] = true;
              token = this.tn.next();
            }
            method["response"] = token;
            this.tn.skip(")");
            token = this.tn.peek();
            if ("{" === token) {
              this.tn.next();
              while ("}" !== (token = this.tn.next())) {
                if ("option" !== token) throw Error("illegal rpc service token: " + token);
                this._parseOption(method);
              }
              this.tn.omit(";");
            } else this.tn.skip(";");
            "undefined" === typeof svc[type] && (svc[type] = {});
            svc[type][name] = method;
          };
          ParserPrototype._parseMessage = function(parent, fld) {
            var isGroup = !!fld, token = this.tn.next();
            var msg = {
              name: "",
              fields: [],
              enums: [],
              messages: [],
              options: {},
              services: [],
              oneofs: {}
            };
            if (!Lang.NAME.test(token)) throw Error("illegal " + (isGroup ? "group" : "message") + " name: " + token);
            msg["name"] = token;
            if (isGroup) {
              this.tn.skip("=");
              fld["id"] = mkId(this.tn.next());
              msg["isGroup"] = true;
            }
            token = this.tn.peek();
            "[" === token && fld && this._parseFieldOptions(fld);
            this.tn.skip("{");
            while ("}" !== (token = this.tn.next())) if (Lang.RULE.test(token)) this._parseMessageField(msg, token); else if ("oneof" === token) this._parseMessageOneOf(msg); else if ("enum" === token) this._parseEnum(msg); else if ("message" === token) this._parseMessage(msg); else if ("option" === token) this._parseOption(msg); else if ("service" === token) this._parseService(msg); else if ("extensions" === token) msg.hasOwnProperty("extensions") ? msg["extensions"] = msg["extensions"].concat(this._parseExtensionRanges()) : msg["extensions"] = this._parseExtensionRanges(); else if ("reserved" === token) this._parseIgnored(); else if ("extend" === token) this._parseExtend(msg); else {
              if (!Lang.TYPEREF.test(token)) throw Error("illegal message token: " + token);
              if (!this.proto3) throw Error("illegal field rule: " + token);
              this._parseMessageField(msg, "optional", token);
            }
            this.tn.omit(";");
            parent["messages"].push(msg);
            return msg;
          };
          ParserPrototype._parseIgnored = function() {
            while (";" !== this.tn.peek()) this.tn.next();
            this.tn.skip(";");
          };
          ParserPrototype._parseMessageField = function(msg, rule, type) {
            if (!Lang.RULE.test(rule)) throw Error("illegal message field rule: " + rule);
            var fld = {
              rule: rule,
              type: "",
              name: "",
              options: {},
              id: 0
            };
            var token;
            if ("map" === rule) {
              if (type) throw Error("illegal type: " + type);
              this.tn.skip("<");
              token = this.tn.next();
              if (!Lang.TYPE.test(token) && !Lang.TYPEREF.test(token)) throw Error("illegal message field type: " + token);
              fld["keytype"] = token;
              this.tn.skip(",");
              token = this.tn.next();
              if (!Lang.TYPE.test(token) && !Lang.TYPEREF.test(token)) throw Error("illegal message field: " + token);
              fld["type"] = token;
              this.tn.skip(">");
              token = this.tn.next();
              if (!Lang.NAME.test(token)) throw Error("illegal message field name: " + token);
              fld["name"] = token;
              this.tn.skip("=");
              fld["id"] = mkId(this.tn.next());
              token = this.tn.peek();
              "[" === token && this._parseFieldOptions(fld);
              this.tn.skip(";");
            } else {
              type = "undefined" !== typeof type ? type : this.tn.next();
              if ("group" === type) {
                var grp = this._parseMessage(msg, fld);
                if (!/^[A-Z]/.test(grp["name"])) throw Error("illegal group name: " + grp["name"]);
                fld["type"] = grp["name"];
                fld["name"] = grp["name"].toLowerCase();
                this.tn.omit(";");
              } else {
                if (!Lang.TYPE.test(type) && !Lang.TYPEREF.test(type)) throw Error("illegal message field type: " + type);
                fld["type"] = type;
                token = this.tn.next();
                if (!Lang.NAME.test(token)) throw Error("illegal message field name: " + token);
                fld["name"] = token;
                this.tn.skip("=");
                fld["id"] = mkId(this.tn.next());
                token = this.tn.peek();
                "[" === token && this._parseFieldOptions(fld);
                this.tn.skip(";");
              }
            }
            msg["fields"].push(fld);
            return fld;
          };
          ParserPrototype._parseMessageOneOf = function(msg) {
            var token = this.tn.next();
            if (!Lang.NAME.test(token)) throw Error("illegal oneof name: " + token);
            var name = token, fld;
            var fields = [];
            this.tn.skip("{");
            while ("}" !== (token = this.tn.next())) {
              fld = this._parseMessageField(msg, "optional", token);
              fld["oneof"] = name;
              fields.push(fld["id"]);
            }
            this.tn.omit(";");
            msg["oneofs"][name] = fields;
          };
          ParserPrototype._parseFieldOptions = function(fld) {
            this.tn.skip("[");
            var token, first = true;
            while ("]" !== (token = this.tn.peek())) {
              first || this.tn.skip(",");
              this._parseOption(fld, true);
              first = false;
            }
            this.tn.next();
          };
          ParserPrototype._parseEnum = function(msg) {
            var enm = {
              name: "",
              values: [],
              options: {}
            };
            var token = this.tn.next();
            if (!Lang.NAME.test(token)) throw Error("illegal name: " + token);
            enm["name"] = token;
            this.tn.skip("{");
            while ("}" !== (token = this.tn.next())) if ("option" === token) this._parseOption(enm); else {
              if (!Lang.NAME.test(token)) throw Error("illegal name: " + token);
              this.tn.skip("=");
              var val = {
                name: token,
                id: mkId(this.tn.next(), true)
              };
              token = this.tn.peek();
              "[" === token && this._parseFieldOptions({
                options: {}
              });
              this.tn.skip(";");
              enm["values"].push(val);
            }
            this.tn.omit(";");
            msg["enums"].push(enm);
          };
          ParserPrototype._parseExtensionRanges = function() {
            var ranges = [];
            var token, range, value;
            do {
              range = [];
              while (true) {
                token = this.tn.next();
                switch (token) {
                 case "min":
                  value = ProtoBuf.ID_MIN;
                  break;

                 case "max":
                  value = ProtoBuf.ID_MAX;
                  break;

                 default:
                  value = mkNumber(token);
                }
                range.push(value);
                if (2 === range.length) break;
                if ("to" !== this.tn.peek()) {
                  range.push(value);
                  break;
                }
                this.tn.next();
              }
              ranges.push(range);
            } while (this.tn.omit(","));
            this.tn.skip(";");
            return ranges;
          };
          ParserPrototype._parseExtend = function(parent) {
            var token = this.tn.next();
            if (!Lang.TYPEREF.test(token)) throw Error("illegal extend reference: " + token);
            var ext = {
              ref: token,
              fields: []
            };
            this.tn.skip("{");
            while ("}" !== (token = this.tn.next())) if (Lang.RULE.test(token)) this._parseMessageField(ext, token); else {
              if (!Lang.TYPEREF.test(token)) throw Error("illegal extend token: " + token);
              if (!this.proto3) throw Error("illegal field rule: " + token);
              this._parseMessageField(ext, "optional", token);
            }
            this.tn.omit(";");
            parent["messages"].push(ext);
            return ext;
          };
          ParserPrototype.toString = function() {
            return "Parser at line " + this.tn.line;
          };
          DotProto.Parser = Parser;
          return DotProto;
        }(ProtoBuf, ProtoBuf.Lang);
        ProtoBuf.Reflect = function(ProtoBuf) {
          var Reflect = {};
          var T = function T(builder, parent, name) {
            this.builder = builder;
            this.parent = parent;
            this.name = name;
            this.className;
          };
          var TPrototype = T.prototype;
          TPrototype.fqn = function() {
            var name = this.name, ptr = this;
            do {
              ptr = ptr.parent;
              if (null == ptr) break;
              name = ptr.name + "." + name;
            } while (true);
            return name;
          };
          TPrototype.toString = function(includeClass) {
            return (includeClass ? this.className + " " : "") + this.fqn();
          };
          TPrototype.build = function() {
            throw Error(this.toString(true) + " cannot be built directly");
          };
          Reflect.T = T;
          var Namespace = function Namespace(builder, parent, name, options, syntax) {
            T.call(this, builder, parent, name);
            this.className = "Namespace";
            this.children = [];
            this.options = options || {};
            this.syntax = syntax || "proto2";
          };
          var NamespacePrototype = Namespace.prototype = Object.create(T.prototype);
          NamespacePrototype.getChildren = function(type) {
            type = type || null;
            if (null == type) return this.children.slice();
            var children = [];
            for (var i = 0, k = this.children.length; i < k; ++i) this.children[i] instanceof type && children.push(this.children[i]);
            return children;
          };
          NamespacePrototype.addChild = function(child) {
            var other;
            if (other = this.getChild(child.name)) if (other instanceof Message.Field && other.name !== other.originalName && null === this.getChild(other.originalName)) other.name = other.originalName; else {
              if (!(child instanceof Message.Field && child.name !== child.originalName && null === this.getChild(child.originalName))) throw Error("Duplicate name in namespace " + this.toString(true) + ": " + child.name);
              child.name = child.originalName;
            }
            this.children.push(child);
          };
          NamespacePrototype.getChild = function(nameOrId) {
            var key = "number" === typeof nameOrId ? "id" : "name";
            for (var i = 0, k = this.children.length; i < k; ++i) if (this.children[i][key] === nameOrId) return this.children[i];
            return null;
          };
          NamespacePrototype.resolve = function(qn, excludeNonNamespace) {
            var part = "string" === typeof qn ? qn.split(".") : qn, ptr = this, i = 0;
            if ("" === part[i]) {
              while (null !== ptr.parent) ptr = ptr.parent;
              i++;
            }
            var child;
            do {
              do {
                if (!(ptr instanceof Reflect.Namespace)) {
                  ptr = null;
                  break;
                }
                child = ptr.getChild(part[i]);
                if (!child || !(child instanceof Reflect.T) || excludeNonNamespace && !(child instanceof Reflect.Namespace)) {
                  ptr = null;
                  break;
                }
                ptr = child;
                i++;
              } while (i < part.length);
              if (null != ptr) break;
              if (null !== this.parent) return this.parent.resolve(qn, excludeNonNamespace);
            } while (null != ptr);
            return ptr;
          };
          NamespacePrototype.qn = function(t) {
            var part = [], ptr = t;
            do {
              part.unshift(ptr.name);
              ptr = ptr.parent;
            } while (null !== ptr);
            for (var len = 1; len <= part.length; len++) {
              var qn = part.slice(part.length - len);
              if (t === this.resolve(qn, t instanceof Reflect.Namespace)) return qn.join(".");
            }
            return t.fqn();
          };
          NamespacePrototype.build = function() {
            var ns = {};
            var children = this.children;
            for (var i = 0, k = children.length, child; i < k; ++i) {
              child = children[i];
              child instanceof Namespace && (ns[child.name] = child.build());
            }
            Object.defineProperty && Object.defineProperty(ns, "$options", {
              value: this.buildOpt()
            });
            return ns;
          };
          NamespacePrototype.buildOpt = function() {
            var opt = {}, keys = Object.keys(this.options);
            for (var i = 0, k = keys.length; i < k; ++i) {
              var key = keys[i], val = this.options[keys[i]];
              opt[key] = val;
            }
            return opt;
          };
          NamespacePrototype.getOption = function(name) {
            if ("undefined" === typeof name) return this.options;
            return "undefined" !== typeof this.options[name] ? this.options[name] : null;
          };
          Reflect.Namespace = Namespace;
          var Element = function Element(type, resolvedType, isMapKey, syntax, name) {
            this.type = type;
            this.resolvedType = resolvedType;
            this.isMapKey = isMapKey;
            this.syntax = syntax;
            this.name = name;
            if (isMapKey && ProtoBuf.MAP_KEY_TYPES.indexOf(type) < 0) throw Error("Invalid map key type: " + type.name);
          };
          var ElementPrototype = Element.prototype;
          function mkDefault(type) {
            "string" === typeof type && (type = ProtoBuf.TYPES[type]);
            if ("undefined" === typeof type.defaultValue) throw Error("default value for type " + type.name + " is not supported");
            if (type == ProtoBuf.TYPES["bytes"]) return new ByteBuffer(0);
            return type.defaultValue;
          }
          Element.defaultFieldValue = mkDefault;
          function mkLong(value, unsigned) {
            if (value && "number" === typeof value.low && "number" === typeof value.high && "boolean" === typeof value.unsigned && value.low === value.low && value.high === value.high) return new ProtoBuf.Long(value.low, value.high, "undefined" === typeof unsigned ? value.unsigned : unsigned);
            if ("string" === typeof value) return ProtoBuf.Long.fromString(value, unsigned || false, 10);
            if ("number" === typeof value) return ProtoBuf.Long.fromNumber(value, unsigned || false);
            throw Error("not convertible to Long");
          }
          ElementPrototype.toString = function() {
            return (this.name || "") + (this.isMapKey ? "map" : "value") + " element";
          };
          ElementPrototype.verifyValue = function(value) {
            var self = this;
            function fail(val, msg) {
              throw Error("Illegal value for " + self.toString(true) + " of type " + self.type.name + ": " + val + " (" + msg + ")");
            }
            switch (this.type) {
             case ProtoBuf.TYPES["int32"]:
             case ProtoBuf.TYPES["sint32"]:
             case ProtoBuf.TYPES["sfixed32"]:
              ("number" !== typeof value || value === value && value % 1 !== 0) && fail("undefined" === typeof value ? "undefined" : _typeof(value), "not an integer");
              return value > 4294967295 ? 0 | value : value;

             case ProtoBuf.TYPES["uint32"]:
             case ProtoBuf.TYPES["fixed32"]:
              ("number" !== typeof value || value === value && value % 1 !== 0) && fail("undefined" === typeof value ? "undefined" : _typeof(value), "not an integer");
              return value < 0 ? value >>> 0 : value;

             case ProtoBuf.TYPES["int64"]:
             case ProtoBuf.TYPES["sint64"]:
             case ProtoBuf.TYPES["sfixed64"]:
              if (ProtoBuf.Long) try {
                return mkLong(value, false);
              } catch (e) {
                fail("undefined" === typeof value ? "undefined" : _typeof(value), e.message);
              } else fail("undefined" === typeof value ? "undefined" : _typeof(value), "requires Long.js");

             case ProtoBuf.TYPES["uint64"]:
             case ProtoBuf.TYPES["fixed64"]:
              if (ProtoBuf.Long) try {
                return mkLong(value, true);
              } catch (e) {
                fail("undefined" === typeof value ? "undefined" : _typeof(value), e.message);
              } else fail("undefined" === typeof value ? "undefined" : _typeof(value), "requires Long.js");

             case ProtoBuf.TYPES["bool"]:
              "boolean" !== typeof value && fail("undefined" === typeof value ? "undefined" : _typeof(value), "not a boolean");
              return value;

             case ProtoBuf.TYPES["float"]:
             case ProtoBuf.TYPES["double"]:
              "number" !== typeof value && fail("undefined" === typeof value ? "undefined" : _typeof(value), "not a number");
              return value;

             case ProtoBuf.TYPES["string"]:
              "string" === typeof value || value && value instanceof String || fail("undefined" === typeof value ? "undefined" : _typeof(value), "not a string");
              return "" + value;

             case ProtoBuf.TYPES["bytes"]:
              if (ByteBuffer.isByteBuffer(value)) return value;
              return ByteBuffer.wrap(value, "base64");

             case ProtoBuf.TYPES["enum"]:
              var values = this.resolvedType.getChildren(ProtoBuf.Reflect.Enum.Value);
              for (i = 0; i < values.length; i++) {
                if (values[i].name == value) return values[i].id;
                if (values[i].id == value) return values[i].id;
              }
              if ("proto3" === this.syntax) {
                ("number" !== typeof value || value === value && value % 1 !== 0) && fail("undefined" === typeof value ? "undefined" : _typeof(value), "not an integer");
                (value > 4294967295 || value < 0) && fail("undefined" === typeof value ? "undefined" : _typeof(value), "not in range for uint32");
                return value;
              }
              fail(value, "not a valid enum value");

             case ProtoBuf.TYPES["group"]:
             case ProtoBuf.TYPES["message"]:
              value && "object" === ("undefined" === typeof value ? "undefined" : _typeof(value)) || fail("undefined" === typeof value ? "undefined" : _typeof(value), "object expected");
              if (value instanceof this.resolvedType.clazz) return value;
              if (value instanceof ProtoBuf.Builder.Message) {
                var obj = {};
                for (var i in value) value.hasOwnProperty(i) && (obj[i] = value[i]);
                value = obj;
              }
              return new this.resolvedType.clazz(value);
            }
            throw Error("[INTERNAL] Illegal value for " + this.toString(true) + ": " + value + " (undefined type " + this.type + ")");
          };
          ElementPrototype.calculateLength = function(id, value) {
            if (null === value) return 0;
            var n;
            switch (this.type) {
             case ProtoBuf.TYPES["int32"]:
              return value < 0 ? ByteBuffer.calculateVarint64(value) : ByteBuffer.calculateVarint32(value);

             case ProtoBuf.TYPES["uint32"]:
              return ByteBuffer.calculateVarint32(value);

             case ProtoBuf.TYPES["sint32"]:
              return ByteBuffer.calculateVarint32(ByteBuffer.zigZagEncode32(value));

             case ProtoBuf.TYPES["fixed32"]:
             case ProtoBuf.TYPES["sfixed32"]:
             case ProtoBuf.TYPES["float"]:
              return 4;

             case ProtoBuf.TYPES["int64"]:
             case ProtoBuf.TYPES["uint64"]:
              return ByteBuffer.calculateVarint64(value);

             case ProtoBuf.TYPES["sint64"]:
              return ByteBuffer.calculateVarint64(ByteBuffer.zigZagEncode64(value));

             case ProtoBuf.TYPES["fixed64"]:
             case ProtoBuf.TYPES["sfixed64"]:
              return 8;

             case ProtoBuf.TYPES["bool"]:
              return 1;

             case ProtoBuf.TYPES["enum"]:
              return ByteBuffer.calculateVarint32(value);

             case ProtoBuf.TYPES["double"]:
              return 8;

             case ProtoBuf.TYPES["string"]:
              n = ByteBuffer.calculateUTF8Bytes(value);
              return ByteBuffer.calculateVarint32(n) + n;

             case ProtoBuf.TYPES["bytes"]:
              if (value.remaining() < 0) throw Error("Illegal value for " + this.toString(true) + ": " + value.remaining() + " bytes remaining");
              return ByteBuffer.calculateVarint32(value.remaining()) + value.remaining();

             case ProtoBuf.TYPES["message"]:
              n = this.resolvedType.calculate(value);
              return ByteBuffer.calculateVarint32(n) + n;

             case ProtoBuf.TYPES["group"]:
              n = this.resolvedType.calculate(value);
              return n + ByteBuffer.calculateVarint32(id << 3 | ProtoBuf.WIRE_TYPES.ENDGROUP);
            }
            throw Error("[INTERNAL] Illegal value to encode in " + this.toString(true) + ": " + value + " (unknown type)");
          };
          ElementPrototype.encodeValue = function(id, value, buffer) {
            if (null === value) return buffer;
            switch (this.type) {
             case ProtoBuf.TYPES["int32"]:
              value < 0 ? buffer.writeVarint64(value) : buffer.writeVarint32(value);
              break;

             case ProtoBuf.TYPES["uint32"]:
              buffer.writeVarint32(value);
              break;

             case ProtoBuf.TYPES["sint32"]:
              buffer.writeVarint32ZigZag(value);
              break;

             case ProtoBuf.TYPES["fixed32"]:
              buffer.writeUint32(value);
              break;

             case ProtoBuf.TYPES["sfixed32"]:
              buffer.writeInt32(value);
              break;

             case ProtoBuf.TYPES["int64"]:
             case ProtoBuf.TYPES["uint64"]:
              buffer.writeVarint64(value);
              break;

             case ProtoBuf.TYPES["sint64"]:
              buffer.writeVarint64ZigZag(value);
              break;

             case ProtoBuf.TYPES["fixed64"]:
              buffer.writeUint64(value);
              break;

             case ProtoBuf.TYPES["sfixed64"]:
              buffer.writeInt64(value);
              break;

             case ProtoBuf.TYPES["bool"]:
              "string" === typeof value ? buffer.writeVarint32("false" === value.toLowerCase() ? 0 : !!value) : buffer.writeVarint32(value ? 1 : 0);
              break;

             case ProtoBuf.TYPES["enum"]:
              buffer.writeVarint32(value);
              break;

             case ProtoBuf.TYPES["float"]:
              buffer.writeFloat32(value);
              break;

             case ProtoBuf.TYPES["double"]:
              buffer.writeFloat64(value);
              break;

             case ProtoBuf.TYPES["string"]:
              buffer.writeVString(value);
              break;

             case ProtoBuf.TYPES["bytes"]:
              if (value.remaining() < 0) throw Error("Illegal value for " + this.toString(true) + ": " + value.remaining() + " bytes remaining");
              var prevOffset = value.offset;
              buffer.writeVarint32(value.remaining());
              buffer.append(value);
              value.offset = prevOffset;
              break;

             case ProtoBuf.TYPES["message"]:
              var bb = new ByteBuffer().LE();
              this.resolvedType.encode(value, bb);
              buffer.writeVarint32(bb.offset);
              buffer.append(bb.flip());
              break;

             case ProtoBuf.TYPES["group"]:
              this.resolvedType.encode(value, buffer);
              buffer.writeVarint32(id << 3 | ProtoBuf.WIRE_TYPES.ENDGROUP);
              break;

             default:
              throw Error("[INTERNAL] Illegal value to encode in " + this.toString(true) + ": " + value + " (unknown type)");
            }
            return buffer;
          };
          ElementPrototype.decode = function(buffer, wireType, id) {
            if (wireType != this.type.wireType) throw Error("Unexpected wire type for element");
            var value, nBytes;
            switch (this.type) {
             case ProtoBuf.TYPES["int32"]:
              return 0 | buffer.readVarint32();

             case ProtoBuf.TYPES["uint32"]:
              return buffer.readVarint32() >>> 0;

             case ProtoBuf.TYPES["sint32"]:
              return 0 | buffer.readVarint32ZigZag();

             case ProtoBuf.TYPES["fixed32"]:
              return buffer.readUint32() >>> 0;

             case ProtoBuf.TYPES["sfixed32"]:
              return 0 | buffer.readInt32();

             case ProtoBuf.TYPES["int64"]:
              return buffer.readVarint64();

             case ProtoBuf.TYPES["uint64"]:
              return buffer.readVarint64().toUnsigned();

             case ProtoBuf.TYPES["sint64"]:
              return buffer.readVarint64ZigZag();

             case ProtoBuf.TYPES["fixed64"]:
              return buffer.readUint64();

             case ProtoBuf.TYPES["sfixed64"]:
              return buffer.readInt64();

             case ProtoBuf.TYPES["bool"]:
              return !!buffer.readVarint32();

             case ProtoBuf.TYPES["enum"]:
              return buffer.readVarint32();

             case ProtoBuf.TYPES["float"]:
              return buffer.readFloat();

             case ProtoBuf.TYPES["double"]:
              return buffer.readDouble();

             case ProtoBuf.TYPES["string"]:
              return buffer.readVString();

             case ProtoBuf.TYPES["bytes"]:
              nBytes = buffer.readVarint32();
              if (buffer.remaining() < nBytes) throw Error("Illegal number of bytes for " + this.toString(true) + ": " + nBytes + " required but got only " + buffer.remaining());
              value = buffer.clone();
              value.limit = value.offset + nBytes;
              buffer.offset += nBytes;
              return value;

             case ProtoBuf.TYPES["message"]:
              nBytes = buffer.readVarint32();
              return this.resolvedType.decode(buffer, nBytes);

             case ProtoBuf.TYPES["group"]:
              return this.resolvedType.decode(buffer, -1, id);
            }
            throw Error("[INTERNAL] Illegal decode type");
          };
          ElementPrototype.valueFromString = function(str) {
            if (!this.isMapKey) throw Error("valueFromString() called on non-map-key element");
            switch (this.type) {
             case ProtoBuf.TYPES["int32"]:
             case ProtoBuf.TYPES["sint32"]:
             case ProtoBuf.TYPES["sfixed32"]:
             case ProtoBuf.TYPES["uint32"]:
             case ProtoBuf.TYPES["fixed32"]:
              return this.verifyValue(parseInt(str));

             case ProtoBuf.TYPES["int64"]:
             case ProtoBuf.TYPES["sint64"]:
             case ProtoBuf.TYPES["sfixed64"]:
             case ProtoBuf.TYPES["uint64"]:
             case ProtoBuf.TYPES["fixed64"]:
              return this.verifyValue(str);

             case ProtoBuf.TYPES["bool"]:
              return "true" === str;

             case ProtoBuf.TYPES["string"]:
              return this.verifyValue(str);

             case ProtoBuf.TYPES["bytes"]:
              return ByteBuffer.fromBinary(str);
            }
          };
          ElementPrototype.valueToString = function(value) {
            if (!this.isMapKey) throw Error("valueToString() called on non-map-key element");
            return this.type === ProtoBuf.TYPES["bytes"] ? value.toString("binary") : value.toString();
          };
          Reflect.Element = Element;
          var Message = function Message(builder, parent, name, options, isGroup, syntax) {
            Namespace.call(this, builder, parent, name, options, syntax);
            this.className = "Message";
            this.extensions = void 0;
            this.clazz = null;
            this.isGroup = !!isGroup;
            this._fields = null;
            this._fieldsById = null;
            this._fieldsByName = null;
          };
          var MessagePrototype = Message.prototype = Object.create(Namespace.prototype);
          MessagePrototype.build = function(rebuild) {
            if (this.clazz && !rebuild) return this.clazz;
            var clazz = function(ProtoBuf, T) {
              var fields = T.getChildren(ProtoBuf.Reflect.Message.Field), oneofs = T.getChildren(ProtoBuf.Reflect.Message.OneOf);
              var Message = function Message(values, var_args) {
                ProtoBuf.Builder.Message.call(this);
                for (var i = 0, k = oneofs.length; i < k; ++i) this[oneofs[i].name] = null;
                for (i = 0, k = fields.length; i < k; ++i) {
                  var field = fields[i];
                  this[field.name] = field.repeated ? [] : field.map ? new ProtoBuf.Map(field) : null;
                  !field.required && "proto3" !== T.syntax || null === field.defaultValue || (this[field.name] = field.defaultValue);
                }
                if (arguments.length > 0) {
                  var value;
                  if (1 !== arguments.length || null === values || "object" !== ("undefined" === typeof values ? "undefined" : _typeof(values)) || !("function" !== typeof values.encode || values instanceof Message) || Array.isArray(values) || values instanceof ProtoBuf.Map || ByteBuffer.isByteBuffer(values) || values instanceof ArrayBuffer || ProtoBuf.Long && values instanceof ProtoBuf.Long) for (i = 0, 
                  k = arguments.length; i < k; ++i) "undefined" !== typeof (value = arguments[i]) && this.$set(fields[i].name, value); else this.$set(values);
                }
              };
              var MessagePrototype = Message.prototype = Object.create(ProtoBuf.Builder.Message.prototype);
              MessagePrototype.add = function(key, value, noAssert) {
                var field = T._fieldsByName[key];
                if (!noAssert) {
                  if (!field) throw Error(this + "#" + key + " is undefined");
                  if (!(field instanceof ProtoBuf.Reflect.Message.Field)) throw Error(this + "#" + key + " is not a field: " + field.toString(true));
                  if (!field.repeated) throw Error(this + "#" + key + " is not a repeated field");
                  value = field.verifyValue(value, true);
                }
                null === this[key] && (this[key] = []);
                this[key].push(value);
                return this;
              };
              MessagePrototype.$add = MessagePrototype.add;
              MessagePrototype.set = function(keyOrObj, value, noAssert) {
                if (keyOrObj && "object" === ("undefined" === typeof keyOrObj ? "undefined" : _typeof(keyOrObj))) {
                  noAssert = value;
                  for (var ikey in keyOrObj) keyOrObj.hasOwnProperty(ikey) && "undefined" !== typeof (value = keyOrObj[ikey]) && void 0 === T._oneofsByName[ikey] && this.$set(ikey, value, noAssert);
                  return this;
                }
                var field = T._fieldsByName[keyOrObj];
                if (noAssert) this[keyOrObj] = value; else {
                  if (!field) throw Error(this + "#" + keyOrObj + " is not a field: undefined");
                  if (!(field instanceof ProtoBuf.Reflect.Message.Field)) throw Error(this + "#" + keyOrObj + " is not a field: " + field.toString(true));
                  this[field.name] = value = field.verifyValue(value);
                }
                if (field && field.oneof) {
                  var currentField = this[field.oneof.name];
                  if (null !== value) {
                    null !== currentField && currentField !== field.name && (this[currentField] = null);
                    this[field.oneof.name] = field.name;
                  } else currentField === keyOrObj && (this[field.oneof.name] = null);
                }
                return this;
              };
              MessagePrototype.$set = MessagePrototype.set;
              MessagePrototype.get = function(key, noAssert) {
                if (noAssert) return this[key];
                var field = T._fieldsByName[key];
                if (!field || !(field instanceof ProtoBuf.Reflect.Message.Field)) throw Error(this + "#" + key + " is not a field: undefined");
                if (!(field instanceof ProtoBuf.Reflect.Message.Field)) throw Error(this + "#" + key + " is not a field: " + field.toString(true));
                return this[field.name];
              };
              MessagePrototype.$get = MessagePrototype.get;
              for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                if (field instanceof ProtoBuf.Reflect.Message.ExtensionField) continue;
                T.builder.options["populateAccessors"] && function(field) {
                  var Name = field.originalName.replace(/(_[a-zA-Z])/g, function(match) {
                    return match.toUpperCase().replace("_", "");
                  });
                  Name = Name.substring(0, 1).toUpperCase() + Name.substring(1);
                  var name = field.originalName.replace(/([A-Z])/g, function(match) {
                    return "_" + match;
                  });
                  var setter = function setter(value, noAssert) {
                    this[field.name] = noAssert ? value : field.verifyValue(value);
                    return this;
                  };
                  var getter = function getter() {
                    return this[field.name];
                  };
                  null === T.getChild("set" + Name) && (MessagePrototype["set" + Name] = setter);
                  null === T.getChild("set_" + name) && (MessagePrototype["set_" + name] = setter);
                  null === T.getChild("get" + Name) && (MessagePrototype["get" + Name] = getter);
                  null === T.getChild("get_" + name) && (MessagePrototype["get_" + name] = getter);
                }(field);
              }
              MessagePrototype.encode = function(buffer, noVerify) {
                "boolean" === typeof buffer && (noVerify = buffer, buffer = void 0);
                var isNew = false;
                buffer || (buffer = new ByteBuffer(), isNew = true);
                var le = buffer.littleEndian;
                try {
                  T.encode(this, buffer.LE(), noVerify);
                  return (isNew ? buffer.flip() : buffer).LE(le);
                } catch (e) {
                  buffer.LE(le);
                  throw e;
                }
              };
              Message.encode = function(data, buffer, noVerify) {
                return new Message(data).encode(buffer, noVerify);
              };
              MessagePrototype.calculate = function() {
                return T.calculate(this);
              };
              MessagePrototype.encodeDelimited = function(buffer, noVerify) {
                var isNew = false;
                buffer || (buffer = new ByteBuffer(), isNew = true);
                var enc = new ByteBuffer().LE();
                T.encode(this, enc, noVerify).flip();
                buffer.writeVarint32(enc.remaining());
                buffer.append(enc);
                return isNew ? buffer.flip() : buffer;
              };
              MessagePrototype.encodeAB = function() {
                try {
                  return this.encode().toArrayBuffer();
                } catch (e) {
                  e["encoded"] && (e["encoded"] = e["encoded"].toArrayBuffer());
                  throw e;
                }
              };
              MessagePrototype.toArrayBuffer = MessagePrototype.encodeAB;
              MessagePrototype.encodeNB = function() {
                try {
                  return this.encode().toBuffer();
                } catch (e) {
                  e["encoded"] && (e["encoded"] = e["encoded"].toBuffer());
                  throw e;
                }
              };
              MessagePrototype.toBuffer = MessagePrototype.encodeNB;
              MessagePrototype.encode64 = function() {
                try {
                  return this.encode().toBase64();
                } catch (e) {
                  e["encoded"] && (e["encoded"] = e["encoded"].toBase64());
                  throw e;
                }
              };
              MessagePrototype.toBase64 = MessagePrototype.encode64;
              MessagePrototype.encodeHex = function() {
                try {
                  return this.encode().toHex();
                } catch (e) {
                  e["encoded"] && (e["encoded"] = e["encoded"].toHex());
                  throw e;
                }
              };
              MessagePrototype.toHex = MessagePrototype.encodeHex;
              function cloneRaw(obj, binaryAsBase64, longsAsStrings, resolvedType) {
                if (null === obj || "object" !== ("undefined" === typeof obj ? "undefined" : _typeof(obj))) {
                  if (resolvedType && resolvedType instanceof ProtoBuf.Reflect.Enum) {
                    var name = ProtoBuf.Reflect.Enum.getName(resolvedType.object, obj);
                    if (null !== name) return name;
                  }
                  return obj;
                }
                if (ByteBuffer.isByteBuffer(obj)) return binaryAsBase64 ? obj.toBase64() : obj.toBuffer();
                if (ProtoBuf.Long.isLong(obj)) return longsAsStrings ? obj.toString() : ProtoBuf.Long.fromValue(obj);
                var clone;
                if (Array.isArray(obj)) {
                  clone = [];
                  obj.forEach(function(v, k) {
                    clone[k] = cloneRaw(v, binaryAsBase64, longsAsStrings, resolvedType);
                  });
                  return clone;
                }
                clone = {};
                if (obj instanceof ProtoBuf.Map) {
                  var it = obj.entries();
                  for (var e = it.next(); !e.done; e = it.next()) clone[obj.keyElem.valueToString(e.value[0])] = cloneRaw(e.value[1], binaryAsBase64, longsAsStrings, obj.valueElem.resolvedType);
                  return clone;
                }
                var type = obj.$type, field = void 0;
                for (var i in obj) obj.hasOwnProperty(i) && (type && (field = type.getChild(i)) ? clone[i] = cloneRaw(obj[i], binaryAsBase64, longsAsStrings, field.resolvedType) : clone[i] = cloneRaw(obj[i], binaryAsBase64, longsAsStrings));
                return clone;
              }
              MessagePrototype.toRaw = function(binaryAsBase64, longsAsStrings) {
                return cloneRaw(this, !!binaryAsBase64, !!longsAsStrings, this.$type);
              };
              MessagePrototype.encodeJSON = function() {
                return JSON.stringify(cloneRaw(this, true, true, this.$type));
              };
              Message.decode = function(buffer, length, enc) {
                "string" === typeof length && (enc = length, length = -1);
                "string" === typeof buffer ? buffer = ByteBuffer.wrap(buffer, enc || "base64") : ByteBuffer.isByteBuffer(buffer) || (buffer = ByteBuffer.wrap(buffer));
                var le = buffer.littleEndian;
                try {
                  var msg = T.decode(buffer.LE(), length);
                  buffer.LE(le);
                  return msg;
                } catch (e) {
                  buffer.LE(le);
                  throw e;
                }
              };
              Message.decodeDelimited = function(buffer, enc) {
                "string" === typeof buffer ? buffer = ByteBuffer.wrap(buffer, enc || "base64") : ByteBuffer.isByteBuffer(buffer) || (buffer = ByteBuffer.wrap(buffer));
                if (buffer.remaining() < 1) return null;
                var off = buffer.offset, len = buffer.readVarint32();
                if (buffer.remaining() < len) {
                  buffer.offset = off;
                  return null;
                }
                try {
                  var msg = T.decode(buffer.slice(buffer.offset, buffer.offset + len).LE());
                  buffer.offset += len;
                  return msg;
                } catch (err) {
                  buffer.offset += len;
                  throw err;
                }
              };
              Message.decode64 = function(str) {
                return Message.decode(str, "base64");
              };
              Message.decodeHex = function(str) {
                return Message.decode(str, "hex");
              };
              Message.decodeJSON = function(str) {
                return new Message(JSON.parse(str));
              };
              MessagePrototype.toString = function() {
                return T.toString();
              };
              var $optionsS;
              var $options;
              var $typeS;
              var $type;
              Object.defineProperty && (Object.defineProperty(Message, "$options", {
                value: T.buildOpt()
              }), Object.defineProperty(MessagePrototype, "$options", {
                value: Message["$options"]
              }), Object.defineProperty(Message, "$type", {
                value: T
              }), Object.defineProperty(MessagePrototype, "$type", {
                value: T
              }));
              return Message;
            }(ProtoBuf, this);
            this._fields = [];
            this._fieldsById = {};
            this._fieldsByName = {};
            this._oneofsByName = {};
            for (var i = 0, k = this.children.length, child; i < k; i++) {
              child = this.children[i];
              if (child instanceof Enum || child instanceof Message || child instanceof Service) {
                if (clazz.hasOwnProperty(child.name)) throw Error("Illegal reflect child of " + this.toString(true) + ": " + child.toString(true) + " cannot override static property '" + child.name + "'");
                clazz[child.name] = child.build();
              } else if (child instanceof Message.Field) child.build(), this._fields.push(child), 
              this._fieldsById[child.id] = child, this._fieldsByName[child.name] = child; else if (child instanceof Message.OneOf) this._oneofsByName[child.name] = child; else if (!(child instanceof Message.OneOf) && !(child instanceof Extension)) throw Error("Illegal reflect child of " + this.toString(true) + ": " + this.children[i].toString(true));
            }
            return this.clazz = clazz;
          };
          MessagePrototype.encode = function(message, buffer, noVerify) {
            var fieldMissing = null, field;
            for (var i = 0, k = this._fields.length, val; i < k; ++i) {
              field = this._fields[i];
              val = message[field.name];
              field.required && null === val ? null === fieldMissing && (fieldMissing = field) : field.encode(noVerify ? val : field.verifyValue(val), buffer, message);
            }
            if (null !== fieldMissing) {
              var err = Error("Missing at least one required field for " + this.toString(true) + ": " + fieldMissing);
              err["encoded"] = buffer;
              throw err;
            }
            return buffer;
          };
          MessagePrototype.calculate = function(message) {
            for (var n = 0, i = 0, k = this._fields.length, field, val; i < k; ++i) {
              field = this._fields[i];
              val = message[field.name];
              if (field.required && null === val) throw Error("Missing at least one required field for " + this.toString(true) + ": " + field);
              n += field.calculate(val, message);
            }
            return n;
          };
          function skipTillGroupEnd(expectedId, buf) {
            var tag = buf.readVarint32(), wireType = 7 & tag, id = tag >>> 3;
            switch (wireType) {
             case ProtoBuf.WIRE_TYPES.VARINT:
              do {
                tag = buf.readUint8();
              } while (128 === (128 & tag));
              break;

             case ProtoBuf.WIRE_TYPES.BITS64:
              buf.offset += 8;
              break;

             case ProtoBuf.WIRE_TYPES.LDELIM:
              tag = buf.readVarint32();
              buf.offset += tag;
              break;

             case ProtoBuf.WIRE_TYPES.STARTGROUP:
              skipTillGroupEnd(id, buf);
              break;

             case ProtoBuf.WIRE_TYPES.ENDGROUP:
              if (id === expectedId) return false;
              throw Error("Illegal GROUPEND after unknown group: " + id + " (" + expectedId + " expected)");

             case ProtoBuf.WIRE_TYPES.BITS32:
              buf.offset += 4;
              break;

             default:
              throw Error("Illegal wire type in unknown group " + expectedId + ": " + wireType);
            }
            return true;
          }
          MessagePrototype.decode = function(buffer, length, expectedGroupEndId) {
            "number" !== typeof length && (length = -1);
            var start = buffer.offset, msg = new this.clazz(), tag, wireType, id, field;
            while (buffer.offset < start + length || -1 === length && buffer.remaining() > 0) {
              tag = buffer.readVarint32();
              wireType = 7 & tag;
              id = tag >>> 3;
              if (wireType === ProtoBuf.WIRE_TYPES.ENDGROUP) {
                if (id !== expectedGroupEndId) throw Error("Illegal group end indicator for " + this.toString(true) + ": " + id + " (" + (expectedGroupEndId ? expectedGroupEndId + " expected" : "not a group") + ")");
                break;
              }
              if (!(field = this._fieldsById[id])) {
                switch (wireType) {
                 case ProtoBuf.WIRE_TYPES.VARINT:
                  buffer.readVarint32();
                  break;

                 case ProtoBuf.WIRE_TYPES.BITS32:
                  buffer.offset += 4;
                  break;

                 case ProtoBuf.WIRE_TYPES.BITS64:
                  buffer.offset += 8;
                  break;

                 case ProtoBuf.WIRE_TYPES.LDELIM:
                  var len = buffer.readVarint32();
                  buffer.offset += len;
                  break;

                 case ProtoBuf.WIRE_TYPES.STARTGROUP:
                  while (skipTillGroupEnd(id, buffer)) ;
                  break;

                 default:
                  throw Error("Illegal wire type for unknown field " + id + " in " + this.toString(true) + "#decode: " + wireType);
                }
                continue;
              }
              if (field.repeated && !field.options["packed"]) msg[field.name].push(field.decode(wireType, buffer)); else if (field.map) {
                var keyval = field.decode(wireType, buffer);
                msg[field.name].set(keyval[0], keyval[1]);
              } else {
                msg[field.name] = field.decode(wireType, buffer);
                if (field.oneof) {
                  var currentField = msg[field.oneof.name];
                  null !== currentField && currentField !== field.name && (msg[currentField] = null);
                  msg[field.oneof.name] = field.name;
                }
              }
            }
            for (var i = 0, k = this._fields.length; i < k; ++i) {
              field = this._fields[i];
              if (null === msg[field.name]) if ("proto3" === this.syntax) msg[field.name] = field.defaultValue; else {
                if (field.required) {
                  var err = Error("Missing at least one required field for " + this.toString(true) + ": " + field.name);
                  err["decoded"] = msg;
                  throw err;
                }
                ProtoBuf.populateDefaults && null !== field.defaultValue && (msg[field.name] = field.defaultValue);
              }
            }
            return msg;
          };
          Reflect.Message = Message;
          var Field = function Field(builder, message, rule, keytype, type, name, id, options, oneof, syntax) {
            T.call(this, builder, message, name);
            this.className = "Message.Field";
            this.required = "required" === rule;
            this.repeated = "repeated" === rule;
            this.map = "map" === rule;
            this.keyType = keytype || null;
            this.type = type;
            this.resolvedType = null;
            this.id = id;
            this.options = options || {};
            this.defaultValue = null;
            this.oneof = oneof || null;
            this.syntax = syntax || "proto2";
            this.originalName = this.name;
            this.element = null;
            this.keyElement = null;
            !this.builder.options["convertFieldsToCamelCase"] || this instanceof Message.ExtensionField || (this.name = ProtoBuf.Util.toCamelCase(this.name));
          };
          var FieldPrototype = Field.prototype = Object.create(T.prototype);
          FieldPrototype.build = function() {
            this.element = new Element(this.type, this.resolvedType, false, this.syntax, this.name);
            this.map && (this.keyElement = new Element(this.keyType, void 0, true, this.syntax, this.name));
            "proto3" !== this.syntax || this.repeated || this.map ? "undefined" !== typeof this.options["default"] && (this.defaultValue = this.verifyValue(this.options["default"])) : this.defaultValue = Element.defaultFieldValue(this.type);
          };
          FieldPrototype.verifyValue = function(value, skipRepeated) {
            skipRepeated = skipRepeated || false;
            var self = this;
            function fail(val, msg) {
              throw Error("Illegal value for " + self.toString(true) + " of type " + self.type.name + ": " + val + " (" + msg + ")");
            }
            if (null === value) {
              this.required && fail("undefined" === typeof value ? "undefined" : _typeof(value), "required");
              "proto3" === this.syntax && this.type !== ProtoBuf.TYPES["message"] && fail("undefined" === typeof value ? "undefined" : _typeof(value), "proto3 field without field presence cannot be null");
              return null;
            }
            var i;
            if (this.repeated && !skipRepeated) {
              Array.isArray(value) || (value = [ value ]);
              var res = [];
              for (i = 0; i < value.length; i++) res.push(this.element.verifyValue(value[i]));
              return res;
            }
            if (this.map && !skipRepeated) {
              if (value instanceof ProtoBuf.Map) return value;
              value instanceof Object || fail("undefined" === typeof value ? "undefined" : _typeof(value), "expected ProtoBuf.Map or raw object for map field");
              return new ProtoBuf.Map(this, value);
            }
            !this.repeated && Array.isArray(value) && fail("undefined" === typeof value ? "undefined" : _typeof(value), "no array expected");
            return this.element.verifyValue(value);
          };
          FieldPrototype.hasWirePresence = function(value, message) {
            if ("proto3" !== this.syntax) return null !== value;
            if (this.oneof && message[this.oneof.name] === this.name) return true;
            switch (this.type) {
             case ProtoBuf.TYPES["int32"]:
             case ProtoBuf.TYPES["sint32"]:
             case ProtoBuf.TYPES["sfixed32"]:
             case ProtoBuf.TYPES["uint32"]:
             case ProtoBuf.TYPES["fixed32"]:
              return 0 !== value;

             case ProtoBuf.TYPES["int64"]:
             case ProtoBuf.TYPES["sint64"]:
             case ProtoBuf.TYPES["sfixed64"]:
             case ProtoBuf.TYPES["uint64"]:
             case ProtoBuf.TYPES["fixed64"]:
              return 0 !== value.low || 0 !== value.high;

             case ProtoBuf.TYPES["bool"]:
              return value;

             case ProtoBuf.TYPES["float"]:
             case ProtoBuf.TYPES["double"]:
              return 0 !== value;

             case ProtoBuf.TYPES["string"]:
              return value.length > 0;

             case ProtoBuf.TYPES["bytes"]:
              return value.remaining() > 0;

             case ProtoBuf.TYPES["enum"]:
              return 0 !== value;

             case ProtoBuf.TYPES["message"]:
              return null !== value;

             default:
              return true;
            }
          };
          FieldPrototype.encode = function(value, buffer, message) {
            if (null === this.type || "object" !== _typeof(this.type)) throw Error("[INTERNAL] Unresolved type in " + this.toString(true) + ": " + this.type);
            if (null === value || this.repeated && 0 == value.length) return buffer;
            try {
              if (this.repeated) {
                var i;
                if (this.options["packed"] && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                  buffer.writeVarint32(this.id << 3 | ProtoBuf.WIRE_TYPES.LDELIM);
                  buffer.ensureCapacity(buffer.offset += 1);
                  var start = buffer.offset;
                  for (i = 0; i < value.length; i++) this.element.encodeValue(this.id, value[i], buffer);
                  var len = buffer.offset - start, varintLen = ByteBuffer.calculateVarint32(len);
                  if (varintLen > 1) {
                    var contents = buffer.slice(start, buffer.offset);
                    start += varintLen - 1;
                    buffer.offset = start;
                    buffer.append(contents);
                  }
                  buffer.writeVarint32(len, start - varintLen);
                } else for (i = 0; i < value.length; i++) buffer.writeVarint32(this.id << 3 | this.type.wireType), 
                this.element.encodeValue(this.id, value[i], buffer);
              } else if (this.map) value.forEach(function(val, key, m) {
                var length = ByteBuffer.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, key) + ByteBuffer.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, val);
                buffer.writeVarint32(this.id << 3 | ProtoBuf.WIRE_TYPES.LDELIM);
                buffer.writeVarint32(length);
                buffer.writeVarint32(8 | this.keyType.wireType);
                this.keyElement.encodeValue(1, key, buffer);
                buffer.writeVarint32(16 | this.type.wireType);
                this.element.encodeValue(2, val, buffer);
              }, this); else if (this.hasWirePresence(value, message)) {
                buffer.writeVarint32(this.id << 3 | this.type.wireType);
                this.element.encodeValue(this.id, value, buffer);
              }
            } catch (e) {
              throw Error("Illegal value for " + this.toString(true) + ": " + value + " (" + e + ")");
            }
            return buffer;
          };
          FieldPrototype.calculate = function(value, message) {
            value = this.verifyValue(value);
            if (null === this.type || "object" !== _typeof(this.type)) throw Error("[INTERNAL] Unresolved type in " + this.toString(true) + ": " + this.type);
            if (null === value || this.repeated && 0 == value.length) return 0;
            var n = 0;
            try {
              if (this.repeated) {
                var i, ni;
                if (this.options["packed"] && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                  n += ByteBuffer.calculateVarint32(this.id << 3 | ProtoBuf.WIRE_TYPES.LDELIM);
                  ni = 0;
                  for (i = 0; i < value.length; i++) ni += this.element.calculateLength(this.id, value[i]);
                  n += ByteBuffer.calculateVarint32(ni);
                  n += ni;
                } else for (i = 0; i < value.length; i++) n += ByteBuffer.calculateVarint32(this.id << 3 | this.type.wireType), 
                n += this.element.calculateLength(this.id, value[i]);
              } else if (this.map) value.forEach(function(val, key, m) {
                var length = ByteBuffer.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, key) + ByteBuffer.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, val);
                n += ByteBuffer.calculateVarint32(this.id << 3 | ProtoBuf.WIRE_TYPES.LDELIM);
                n += ByteBuffer.calculateVarint32(length);
                n += length;
              }, this); else if (this.hasWirePresence(value, message)) {
                n += ByteBuffer.calculateVarint32(this.id << 3 | this.type.wireType);
                n += this.element.calculateLength(this.id, value);
              }
            } catch (e) {
              throw Error("Illegal value for " + this.toString(true) + ": " + value + " (" + e + ")");
            }
            return n;
          };
          FieldPrototype.decode = function(wireType, buffer, skipRepeated) {
            var value, nBytes;
            var wireTypeOK = !this.map && wireType == this.type.wireType || !skipRepeated && this.repeated && this.options["packed"] && wireType == ProtoBuf.WIRE_TYPES.LDELIM || this.map && wireType == ProtoBuf.WIRE_TYPES.LDELIM;
            if (!wireTypeOK) throw Error("Illegal wire type for field " + this.toString(true) + ": " + wireType + " (" + this.type.wireType + " expected)");
            if (wireType == ProtoBuf.WIRE_TYPES.LDELIM && this.repeated && this.options["packed"] && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0 && !skipRepeated) {
              nBytes = buffer.readVarint32();
              nBytes = buffer.offset + nBytes;
              var values = [];
              while (buffer.offset < nBytes) values.push(this.decode(this.type.wireType, buffer, true));
              return values;
            }
            if (this.map) {
              var key = Element.defaultFieldValue(this.keyType);
              value = Element.defaultFieldValue(this.type);
              nBytes = buffer.readVarint32();
              if (buffer.remaining() < nBytes) throw Error("Illegal number of bytes for " + this.toString(true) + ": " + nBytes + " required but got only " + buffer.remaining());
              var msgbuf = buffer.clone();
              msgbuf.limit = msgbuf.offset + nBytes;
              buffer.offset += nBytes;
              while (msgbuf.remaining() > 0) {
                var tag = msgbuf.readVarint32();
                wireType = 7 & tag;
                var id = tag >>> 3;
                if (1 === id) key = this.keyElement.decode(msgbuf, wireType, id); else {
                  if (2 !== id) throw Error("Unexpected tag in map field key/value submessage");
                  value = this.element.decode(msgbuf, wireType, id);
                }
              }
              return [ key, value ];
            }
            return this.element.decode(buffer, wireType, this.id);
          };
          Reflect.Message.Field = Field;
          var ExtensionField = function ExtensionField(builder, message, rule, type, name, id, options) {
            Field.call(this, builder, message, rule, null, type, name, id, options);
            this.extension;
          };
          ExtensionField.prototype = Object.create(Field.prototype);
          Reflect.Message.ExtensionField = ExtensionField;
          var OneOf = function OneOf(builder, message, name) {
            T.call(this, builder, message, name);
            this.fields = [];
          };
          Reflect.Message.OneOf = OneOf;
          var Enum = function Enum(builder, parent, name, options, syntax) {
            Namespace.call(this, builder, parent, name, options, syntax);
            this.className = "Enum";
            this.object = null;
          };
          Enum.getName = function(enm, value) {
            var keys = Object.keys(enm);
            for (var i = 0, key; i < keys.length; ++i) if (enm[key = keys[i]] === value) return key;
            return null;
          };
          var EnumPrototype = Enum.prototype = Object.create(Namespace.prototype);
          EnumPrototype.build = function(rebuild) {
            if (this.object && !rebuild) return this.object;
            var enm = new ProtoBuf.Builder.Enum(), values = this.getChildren(Enum.Value);
            for (var i = 0, k = values.length; i < k; ++i) enm[values[i]["name"]] = values[i]["id"];
            Object.defineProperty && Object.defineProperty(enm, "$options", {
              value: this.buildOpt(),
              enumerable: false
            });
            return this.object = enm;
          };
          Reflect.Enum = Enum;
          var Value = function Value(builder, enm, name, id) {
            T.call(this, builder, enm, name);
            this.className = "Enum.Value";
            this.id = id;
          };
          Value.prototype = Object.create(T.prototype);
          Reflect.Enum.Value = Value;
          var Extension = function Extension(builder, parent, name, field) {
            T.call(this, builder, parent, name);
            this.field = field;
          };
          Extension.prototype = Object.create(T.prototype);
          Reflect.Extension = Extension;
          var Service = function Service(builder, root, name, options) {
            Namespace.call(this, builder, root, name, options);
            this.className = "Service";
            this.clazz = null;
          };
          var ServicePrototype = Service.prototype = Object.create(Namespace.prototype);
          ServicePrototype.build = function(rebuild) {
            if (this.clazz && !rebuild) return this.clazz;
            return this.clazz = function(ProtoBuf, T) {
              var Service = function Service(rpcImpl) {
                ProtoBuf.Builder.Service.call(this);
                this.rpcImpl = rpcImpl || function(name, msg, callback) {
                  setTimeout(callback.bind(this, Error("Not implemented, see: https://github.com/dcodeIO/ProtoBuf.js/wiki/Services")), 0);
                };
              };
              var ServicePrototype = Service.prototype = Object.create(ProtoBuf.Builder.Service.prototype);
              var rpc = T.getChildren(ProtoBuf.Reflect.Service.RPCMethod);
              for (var i = 0; i < rpc.length; i++) (function(method) {
                ServicePrototype[method.name] = function(req, callback) {
                  try {
                    try {
                      req = method.resolvedRequestType.clazz.decode(ByteBuffer.wrap(req));
                    } catch (err) {
                      if (!(err instanceof TypeError)) throw err;
                    }
                    if (null === req || "object" !== ("undefined" === typeof req ? "undefined" : _typeof(req))) throw Error("Illegal arguments");
                    req instanceof method.resolvedRequestType.clazz || (req = new method.resolvedRequestType.clazz(req));
                    this.rpcImpl(method.fqn(), req, function(err, res) {
                      if (err) {
                        callback(err);
                        return;
                      }
                      null === res && (res = "");
                      try {
                        res = method.resolvedResponseType.clazz.decode(res);
                      } catch (notABuffer) {}
                      if (!res || !(res instanceof method.resolvedResponseType.clazz)) {
                        callback(Error("Illegal response type received in service method " + T.name + "#" + method.name));
                        return;
                      }
                      callback(null, res);
                    });
                  } catch (err) {
                    setTimeout(callback.bind(this, err), 0);
                  }
                };
                Service[method.name] = function(rpcImpl, req, callback) {
                  new Service(rpcImpl)[method.name](req, callback);
                };
                Object.defineProperty && (Object.defineProperty(Service[method.name], "$options", {
                  value: method.buildOpt()
                }), Object.defineProperty(ServicePrototype[method.name], "$options", {
                  value: Service[method.name]["$options"]
                }));
              })(rpc[i]);
              var $optionsS;
              var $options;
              var $typeS;
              var $type;
              Object.defineProperty && (Object.defineProperty(Service, "$options", {
                value: T.buildOpt()
              }), Object.defineProperty(ServicePrototype, "$options", {
                value: Service["$options"]
              }), Object.defineProperty(Service, "$type", {
                value: T
              }), Object.defineProperty(ServicePrototype, "$type", {
                value: T
              }));
              return Service;
            }(ProtoBuf, this);
          };
          Reflect.Service = Service;
          var Method = function Method(builder, svc, name, options) {
            T.call(this, builder, svc, name);
            this.className = "Service.Method";
            this.options = options || {};
          };
          var MethodPrototype = Method.prototype = Object.create(T.prototype);
          MethodPrototype.buildOpt = NamespacePrototype.buildOpt;
          Reflect.Service.Method = Method;
          var RPCMethod = function RPCMethod(builder, svc, name, request, response, request_stream, response_stream, options) {
            Method.call(this, builder, svc, name, options);
            this.className = "Service.RPCMethod";
            this.requestName = request;
            this.responseName = response;
            this.requestStream = request_stream;
            this.responseStream = response_stream;
            this.resolvedRequestType = null;
            this.resolvedResponseType = null;
          };
          RPCMethod.prototype = Object.create(Method.prototype);
          Reflect.Service.RPCMethod = RPCMethod;
          return Reflect;
        }(ProtoBuf);
        ProtoBuf.Builder = function(ProtoBuf, Lang, Reflect) {
          var Builder = function Builder(options) {
            this.ns = new Reflect.Namespace(this, null, "");
            this.ptr = this.ns;
            this.resolved = false;
            this.result = null;
            this.files = {};
            this.importRoot = null;
            this.options = options || {};
          };
          var BuilderPrototype = Builder.prototype;
          Builder.isMessage = function(def) {
            if ("string" !== typeof def["name"]) return false;
            if ("undefined" !== typeof def["values"] || "undefined" !== typeof def["rpc"]) return false;
            return true;
          };
          Builder.isMessageField = function(def) {
            if ("string" !== typeof def["rule"] || "string" !== typeof def["name"] || "string" !== typeof def["type"] || "undefined" === typeof def["id"]) return false;
            return true;
          };
          Builder.isEnum = function(def) {
            if ("string" !== typeof def["name"]) return false;
            if ("undefined" === typeof def["values"] || !Array.isArray(def["values"]) || 0 === def["values"].length) return false;
            return true;
          };
          Builder.isService = function(def) {
            if ("string" !== typeof def["name"] || "object" !== _typeof(def["rpc"]) || !def["rpc"]) return false;
            return true;
          };
          Builder.isExtend = function(def) {
            if ("string" !== typeof def["ref"]) return false;
            return true;
          };
          BuilderPrototype.reset = function() {
            this.ptr = this.ns;
            return this;
          };
          BuilderPrototype.define = function(namespace) {
            if ("string" !== typeof namespace || !Lang.TYPEREF.test(namespace)) throw Error("illegal namespace: " + namespace);
            namespace.split(".").forEach(function(part) {
              var ns = this.ptr.getChild(part);
              null === ns && this.ptr.addChild(ns = new Reflect.Namespace(this, this.ptr, part));
              this.ptr = ns;
            }, this);
            return this;
          };
          BuilderPrototype.create = function(defs) {
            if (!defs) return this;
            if (Array.isArray(defs)) {
              if (0 === defs.length) return this;
              defs = defs.slice();
            } else defs = [ defs ];
            var stack = [ defs ];
            while (stack.length > 0) {
              defs = stack.pop();
              if (!Array.isArray(defs)) throw Error("not a valid namespace: " + JSON.stringify(defs));
              while (defs.length > 0) {
                var def = defs.shift();
                if (Builder.isMessage(def)) {
                  var obj = new Reflect.Message(this, this.ptr, def["name"], def["options"], def["isGroup"], def["syntax"]);
                  var oneofs = {};
                  def["oneofs"] && Object.keys(def["oneofs"]).forEach(function(name) {
                    obj.addChild(oneofs[name] = new Reflect.Message.OneOf(this, obj, name));
                  }, this);
                  def["fields"] && def["fields"].forEach(function(fld) {
                    if (null !== obj.getChild(0 | fld["id"])) throw Error("duplicate or invalid field id in " + obj.name + ": " + fld["id"]);
                    if (fld["options"] && "object" !== _typeof(fld["options"])) throw Error("illegal field options in " + obj.name + "#" + fld["name"]);
                    var oneof = null;
                    if ("string" === typeof fld["oneof"] && !(oneof = oneofs[fld["oneof"]])) throw Error("illegal oneof in " + obj.name + "#" + fld["name"] + ": " + fld["oneof"]);
                    fld = new Reflect.Message.Field(this, obj, fld["rule"], fld["keytype"], fld["type"], fld["name"], fld["id"], fld["options"], oneof, def["syntax"]);
                    oneof && oneof.fields.push(fld);
                    obj.addChild(fld);
                  }, this);
                  var subObj = [];
                  def["enums"] && def["enums"].forEach(function(enm) {
                    subObj.push(enm);
                  });
                  def["messages"] && def["messages"].forEach(function(msg) {
                    subObj.push(msg);
                  });
                  def["services"] && def["services"].forEach(function(svc) {
                    subObj.push(svc);
                  });
                  def["extensions"] && ("number" === typeof def["extensions"][0] ? obj.extensions = [ def["extensions"] ] : obj.extensions = def["extensions"]);
                  this.ptr.addChild(obj);
                  if (subObj.length > 0) {
                    stack.push(defs);
                    defs = subObj;
                    subObj = null;
                    this.ptr = obj;
                    obj = null;
                    continue;
                  }
                  subObj = null;
                } else if (Builder.isEnum(def)) {
                  obj = new Reflect.Enum(this, this.ptr, def["name"], def["options"], def["syntax"]);
                  def["values"].forEach(function(val) {
                    obj.addChild(new Reflect.Enum.Value(this, obj, val["name"], val["id"]));
                  }, this);
                  this.ptr.addChild(obj);
                } else if (Builder.isService(def)) {
                  obj = new Reflect.Service(this, this.ptr, def["name"], def["options"]);
                  Object.keys(def["rpc"]).forEach(function(name) {
                    var mtd = def["rpc"][name];
                    obj.addChild(new Reflect.Service.RPCMethod(this, obj, name, mtd["request"], mtd["response"], !!mtd["request_stream"], !!mtd["response_stream"], mtd["options"]));
                  }, this);
                  this.ptr.addChild(obj);
                } else {
                  if (!Builder.isExtend(def)) throw Error("not a valid definition: " + JSON.stringify(def));
                  obj = this.ptr.resolve(def["ref"], true);
                  if (obj) def["fields"].forEach(function(fld) {
                    if (null !== obj.getChild(0 | fld["id"])) throw Error("duplicate extended field id in " + obj.name + ": " + fld["id"]);
                    if (obj.extensions) {
                      var valid = false;
                      obj.extensions.forEach(function(range) {
                        fld["id"] >= range[0] && fld["id"] <= range[1] && (valid = true);
                      });
                      if (!valid) throw Error("illegal extended field id in " + obj.name + ": " + fld["id"] + " (not within valid ranges)");
                    }
                    var name = fld["name"];
                    this.options["convertFieldsToCamelCase"] && (name = ProtoBuf.Util.toCamelCase(name));
                    var field = new Reflect.Message.ExtensionField(this, obj, fld["rule"], fld["type"], this.ptr.fqn() + "." + name, fld["id"], fld["options"]);
                    var ext = new Reflect.Extension(this, this.ptr, fld["name"], field);
                    field.extension = ext;
                    this.ptr.addChild(ext);
                    obj.addChild(field);
                  }, this); else if (!/\.?google\.protobuf\./.test(def["ref"])) throw Error("extended message " + def["ref"] + " is not defined");
                }
                def = null;
                obj = null;
              }
              defs = null;
              this.ptr = this.ptr.parent;
            }
            this.resolved = false;
            this.result = null;
            return this;
          };
          function propagateSyntax(parent) {
            parent["messages"] && parent["messages"].forEach(function(child) {
              child["syntax"] = parent["syntax"];
              propagateSyntax(child);
            });
            parent["enums"] && parent["enums"].forEach(function(child) {
              child["syntax"] = parent["syntax"];
            });
          }
          BuilderPrototype["import"] = function(json, filename) {
            var delim = "/";
            if ("string" === typeof filename) {
              ProtoBuf.Util.IS_NODE && (filename = require("path")["resolve"](filename));
              if (true === this.files[filename]) return this.reset();
              this.files[filename] = true;
            } else if ("object" === ("undefined" === typeof filename ? "undefined" : _typeof(filename))) {
              var root = filename.root;
              ProtoBuf.Util.IS_NODE && (root = require("path")["resolve"](root));
              (root.indexOf("\\") >= 0 || filename.file.indexOf("\\") >= 0) && (delim = "\\");
              var fname;
              fname = ProtoBuf.Util.IS_NODE ? require("path")["join"](root, filename.file) : root + delim + filename.file;
              if (true === this.files[fname]) return this.reset();
              this.files[fname] = true;
            }
            if (json["imports"] && json["imports"].length > 0) {
              var importRoot, resetRoot = false;
              if ("object" === ("undefined" === typeof filename ? "undefined" : _typeof(filename))) {
                this.importRoot = filename["root"];
                resetRoot = true;
                importRoot = this.importRoot;
                filename = filename["file"];
                (importRoot.indexOf("\\") >= 0 || filename.indexOf("\\") >= 0) && (delim = "\\");
              } else if ("string" === typeof filename) if (this.importRoot) importRoot = this.importRoot; else if (filename.indexOf("/") >= 0) {
                importRoot = filename.replace(/\/[^\/]*$/, "");
                "" === importRoot && (importRoot = "/");
              } else if (filename.indexOf("\\") >= 0) {
                importRoot = filename.replace(/\\[^\\]*$/, "");
                delim = "\\";
              } else importRoot = "."; else importRoot = null;
              for (var i = 0; i < json["imports"].length; i++) if ("string" === typeof json["imports"][i]) {
                if (!importRoot) throw Error("cannot determine import root");
                var importFilename = json["imports"][i];
                if ("google/protobuf/descriptor.proto" === importFilename) continue;
                importFilename = ProtoBuf.Util.IS_NODE ? require("path")["join"](importRoot, importFilename) : importRoot + delim + importFilename;
                if (true === this.files[importFilename]) continue;
                /\.proto$/i.test(importFilename) && !ProtoBuf.DotProto && (importFilename = importFilename.replace(/\.proto$/, ".json"));
                var contents = ProtoBuf.Util.fetch(importFilename);
                if (null === contents) throw Error("failed to import '" + importFilename + "' in '" + filename + "': file not found");
                /\.json$/i.test(importFilename) ? this["import"](JSON.parse(contents + ""), importFilename) : this["import"](ProtoBuf.DotProto.Parser.parse(contents), importFilename);
              } else filename ? /\.(\w+)$/.test(filename) ? this["import"](json["imports"][i], filename.replace(/^(.+)\.(\w+)$/, function($0, $1, $2) {
                return $1 + "_import" + i + "." + $2;
              })) : this["import"](json["imports"][i], filename + "_import" + i) : this["import"](json["imports"][i]);
              resetRoot && (this.importRoot = null);
            }
            json["package"] && this.define(json["package"]);
            json["syntax"] && propagateSyntax(json);
            var base = this.ptr;
            json["options"] && Object.keys(json["options"]).forEach(function(key) {
              base.options[key] = json["options"][key];
            });
            json["messages"] && (this.create(json["messages"]), this.ptr = base);
            json["enums"] && (this.create(json["enums"]), this.ptr = base);
            json["services"] && (this.create(json["services"]), this.ptr = base);
            json["extends"] && this.create(json["extends"]);
            return this.reset();
          };
          BuilderPrototype.resolveAll = function() {
            var res;
            if (null == this.ptr || "object" === _typeof(this.ptr.type)) return this;
            if (this.ptr instanceof Reflect.Namespace) this.ptr.children.forEach(function(child) {
              this.ptr = child;
              this.resolveAll();
            }, this); else if (this.ptr instanceof Reflect.Message.Field) {
              if (Lang.TYPE.test(this.ptr.type)) this.ptr.type = ProtoBuf.TYPES[this.ptr.type]; else {
                if (!Lang.TYPEREF.test(this.ptr.type)) throw Error("illegal type reference in " + this.ptr.toString(true) + ": " + this.ptr.type);
                res = (this.ptr instanceof Reflect.Message.ExtensionField ? this.ptr.extension.parent : this.ptr.parent).resolve(this.ptr.type, true);
                if (!res) throw Error("unresolvable type reference in " + this.ptr.toString(true) + ": " + this.ptr.type);
                this.ptr.resolvedType = res;
                if (res instanceof Reflect.Enum) {
                  this.ptr.type = ProtoBuf.TYPES["enum"];
                  if ("proto3" === this.ptr.syntax && "proto3" !== res.syntax) throw Error("proto3 message cannot reference proto2 enum");
                } else {
                  if (!(res instanceof Reflect.Message)) throw Error("illegal type reference in " + this.ptr.toString(true) + ": " + this.ptr.type);
                  this.ptr.type = res.isGroup ? ProtoBuf.TYPES["group"] : ProtoBuf.TYPES["message"];
                }
              }
              if (this.ptr.map) {
                if (!Lang.TYPE.test(this.ptr.keyType)) throw Error("illegal key type for map field in " + this.ptr.toString(true) + ": " + this.ptr.keyType);
                this.ptr.keyType = ProtoBuf.TYPES[this.ptr.keyType];
              }
              "proto3" === this.ptr.syntax && this.ptr.repeated && void 0 === this.ptr.options.packed && -1 !== ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.ptr.type.wireType) && (this.ptr.options.packed = true);
            } else if (this.ptr instanceof ProtoBuf.Reflect.Service.Method) {
              if (!(this.ptr instanceof ProtoBuf.Reflect.Service.RPCMethod)) throw Error("illegal service type in " + this.ptr.toString(true));
              res = this.ptr.parent.resolve(this.ptr.requestName, true);
              if (!res || !(res instanceof ProtoBuf.Reflect.Message)) throw Error("Illegal type reference in " + this.ptr.toString(true) + ": " + this.ptr.requestName);
              this.ptr.resolvedRequestType = res;
              res = this.ptr.parent.resolve(this.ptr.responseName, true);
              if (!res || !(res instanceof ProtoBuf.Reflect.Message)) throw Error("Illegal type reference in " + this.ptr.toString(true) + ": " + this.ptr.responseName);
              this.ptr.resolvedResponseType = res;
            } else if (!(this.ptr instanceof ProtoBuf.Reflect.Message.OneOf) && !(this.ptr instanceof ProtoBuf.Reflect.Extension) && !(this.ptr instanceof ProtoBuf.Reflect.Enum.Value)) throw Error("illegal object in namespace: " + _typeof(this.ptr) + ": " + this.ptr);
            return this.reset();
          };
          BuilderPrototype.build = function(path) {
            this.reset();
            this.resolved || (this.resolveAll(), this.resolved = true, this.result = null);
            null === this.result && (this.result = this.ns.build());
            if (!path) return this.result;
            var part = "string" === typeof path ? path.split(".") : path, ptr = this.result;
            for (var i = 0; i < part.length; i++) {
              if (!ptr[part[i]]) {
                ptr = null;
                break;
              }
              ptr = ptr[part[i]];
            }
            return ptr;
          };
          BuilderPrototype.lookup = function(path, excludeNonNamespace) {
            return path ? this.ns.resolve(path, excludeNonNamespace) : this.ns;
          };
          BuilderPrototype.toString = function() {
            return "Builder";
          };
          Builder.Message = function() {};
          Builder.Enum = function() {};
          Builder.Service = function() {};
          return Builder;
        }(ProtoBuf, ProtoBuf.Lang, ProtoBuf.Reflect);
        ProtoBuf.Map = function(ProtoBuf, Reflect) {
          var Map = function Map(field, contents) {
            if (!field.map) throw Error("field is not a map");
            this.field = field;
            this.keyElem = new Reflect.Element(field.keyType, null, true, field.syntax);
            this.valueElem = new Reflect.Element(field.type, field.resolvedType, false, field.syntax);
            this.map = {};
            Object.defineProperty(this, "size", {
              get: function get() {
                return Object.keys(this.map).length;
              }
            });
            if (contents) {
              var keys = Object.keys(contents);
              for (var i = 0; i < keys.length; i++) {
                var key = this.keyElem.valueFromString(keys[i]);
                var val = this.valueElem.verifyValue(contents[keys[i]]);
                this.map[this.keyElem.valueToString(key)] = {
                  key: key,
                  value: val
                };
              }
            }
          };
          var MapPrototype = Map.prototype;
          function arrayIterator(arr) {
            var idx = 0;
            return {
              next: function next() {
                if (idx < arr.length) return {
                  done: false,
                  value: arr[idx++]
                };
                return {
                  done: true
                };
              }
            };
          }
          MapPrototype.clear = function() {
            this.map = {};
          };
          MapPrototype["delete"] = function(key) {
            var keyValue = this.keyElem.valueToString(this.keyElem.verifyValue(key));
            var hadKey = keyValue in this.map;
            delete this.map[keyValue];
            return hadKey;
          };
          MapPrototype.entries = function() {
            var entries = [];
            var strKeys = Object.keys(this.map);
            for (var i = 0, entry; i < strKeys.length; i++) entries.push([ (entry = this.map[strKeys[i]]).key, entry.value ]);
            return arrayIterator(entries);
          };
          MapPrototype.keys = function() {
            var keys = [];
            var strKeys = Object.keys(this.map);
            for (var i = 0; i < strKeys.length; i++) keys.push(this.map[strKeys[i]].key);
            return arrayIterator(keys);
          };
          MapPrototype.values = function() {
            var values = [];
            var strKeys = Object.keys(this.map);
            for (var i = 0; i < strKeys.length; i++) values.push(this.map[strKeys[i]].value);
            return arrayIterator(values);
          };
          MapPrototype.forEach = function(cb, thisArg) {
            var strKeys = Object.keys(this.map);
            for (var i = 0, entry; i < strKeys.length; i++) cb.call(thisArg, (entry = this.map[strKeys[i]]).value, entry.key, this);
          };
          MapPrototype.set = function(key, value) {
            var keyValue = this.keyElem.verifyValue(key);
            var valValue = this.valueElem.verifyValue(value);
            this.map[this.keyElem.valueToString(keyValue)] = {
              key: keyValue,
              value: valValue
            };
            return this;
          };
          MapPrototype.get = function(key) {
            var keyValue = this.keyElem.valueToString(this.keyElem.verifyValue(key));
            if (!(keyValue in this.map)) return;
            return this.map[keyValue].value;
          };
          MapPrototype.has = function(key) {
            var keyValue = this.keyElem.valueToString(this.keyElem.verifyValue(key));
            return keyValue in this.map;
          };
          return Map;
        }(ProtoBuf, ProtoBuf.Reflect);
        ProtoBuf.loadProto = function(proto, builder, filename) {
          ("string" === typeof builder || builder && "string" === typeof builder["file"] && "string" === typeof builder["root"]) && (filename = builder, 
          builder = void 0);
          return ProtoBuf.loadJson(ProtoBuf.DotProto.Parser.parse(proto), builder, filename);
        };
        ProtoBuf.protoFromString = ProtoBuf.loadProto;
        ProtoBuf.loadProtoFile = function(filename, callback, builder) {
          callback && "object" === ("undefined" === typeof callback ? "undefined" : _typeof(callback)) ? (builder = callback, 
          callback = null) : callback && "function" === typeof callback || (callback = null);
          if (callback) return ProtoBuf.Util.fetch("string" === typeof filename ? filename : filename["root"] + "/" + filename["file"], function(contents) {
            if (null === contents) {
              callback(Error("Failed to fetch file"));
              return;
            }
            try {
              callback(null, ProtoBuf.loadProto(contents, builder, filename));
            } catch (e) {
              callback(e);
            }
          });
          var contents = ProtoBuf.Util.fetch("object" === ("undefined" === typeof filename ? "undefined" : _typeof(filename)) ? filename["root"] + "/" + filename["file"] : filename);
          return null === contents ? null : ProtoBuf.loadProto(contents, builder, filename);
        };
        ProtoBuf.protoFromFile = ProtoBuf.loadProtoFile;
        ProtoBuf.newBuilder = function(options) {
          options = options || {};
          "undefined" === typeof options["convertFieldsToCamelCase"] && (options["convertFieldsToCamelCase"] = ProtoBuf.convertFieldsToCamelCase);
          "undefined" === typeof options["populateAccessors"] && (options["populateAccessors"] = ProtoBuf.populateAccessors);
          return new ProtoBuf.Builder(options);
        };
        ProtoBuf.loadJson = function(json, builder, filename) {
          ("string" === typeof builder || builder && "string" === typeof builder["file"] && "string" === typeof builder["root"]) && (filename = builder, 
          builder = null);
          builder && "object" === ("undefined" === typeof builder ? "undefined" : _typeof(builder)) || (builder = ProtoBuf.newBuilder());
          "string" === typeof json && (json = JSON.parse(json));
          builder["import"](json, filename);
          builder.resolveAll();
          return builder;
        };
        ProtoBuf.loadJsonFile = function(filename, callback, builder) {
          callback && "object" === ("undefined" === typeof callback ? "undefined" : _typeof(callback)) ? (builder = callback, 
          callback = null) : callback && "function" === typeof callback || (callback = null);
          if (callback) return ProtoBuf.Util.fetch("string" === typeof filename ? filename : filename["root"] + "/" + filename["file"], function(contents) {
            if (null === contents) {
              callback(Error("Failed to fetch file"));
              return;
            }
            try {
              callback(null, ProtoBuf.loadJson(JSON.parse(contents), builder, filename));
            } catch (e) {
              callback(e);
            }
          });
          var contents = ProtoBuf.Util.fetch("object" === ("undefined" === typeof filename ? "undefined" : _typeof(filename)) ? filename["root"] + "/" + filename["file"] : filename);
          return null === contents ? null : ProtoBuf.loadJson(JSON.parse(contents), builder, filename);
        };
        return ProtoBuf;
      });
      cc._RF.pop();
    }).call(this, require("_process"));
  }, {
    "./bytebuffer": "bytebuffer",
    _process: 1,
    fs: "fs",
    path: "path"
  } ]
}, {}, [ "AutoDeleteMgr", "CameraShakeMgr", "ChangeScene", "DartBase", "NormalDart", "ReboundDart", "FlashWhiteMgr", "GameLogic", "GameRoot", "Global", "DropItemTipMgr", "ItemBase", "ItemMgr", "ItemRebound", "ItemScatter", "LayerMgr", "MonstersBallMgr", "MonstersDartMgr", "MonstersDoorMgr", "MonsterBase", "NormalNinja", "Pavilion", "AutoMovingMgr", "LineMovingMgr", "SequenceFramesMgr", "Damager", "DamagerLiuShui", "DamagerLongJuan", "SkillBase", "SkillBeginShowMgr", "SkillLiuShui", "SkillLongJuan", "StartMgr", "StartUI", "StateMgr", "RoleTipsMgr", "boomEffectMgr", "EnemyFactory", "GameEndMgr", "GameMgr", "GameUI", "GameUIBgMoveMgr", "ItemUIMgr", "LandMgr", "WallMgr", "ModulesBase", "MusicController", "MusicMgr", "NetworkMgr", "bytebuffer", "long", "protobufjs", "fs", "path", "pbkiller", "NetControl", "onfire", "PlatformBase", "PlatformMgr", "PlatformWechat", "ResMgr", "ShaderHelper", "CustomMaterial", "ShaderHook", "Dissolve", "DynamicBlurTransfer", "FlashWhite", "FlashWhiteTwo", "Fluxay", "FluxaySuper", "GaussBlurs", "Glowing", "MaskShader", "Mosaic", "Outline", "OverlayShader", "RadialBlur", "RainShader", "ScrollLoop", "Transfer", "UnfoldTransfer", "Water", "WaveShader", "WindowTransfer", "ZoomBlurTransfer", "UserInfo" ]);