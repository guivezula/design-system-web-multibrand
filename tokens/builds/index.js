import * as aliasBuild from "./alias.js";
import globalBuild from "./global.js";
import mixinsBuild from "./mixins.js";

globalBuild.buildAllPlatforms();
mixinsBuild.buildAllPlatforms();
aliasBuild.buildAllPlatforms();
