module.exports = {
  PRELOAD_BEFORE: Symbol.for("GULP_CLI_PRELOAD_BEFORE"),
  PRELOAD_SUCCESS: Symbol.for("GULP_CLI_PRELOAD_SUCCESS"),
  PRELOAD_FAILURE: Symbol.for("GULP_CLI_PRELOAD_FAILURE"),
  PRELOAD_ERROR: Symbol.for("GULP_CLI_PRELOAD_ERROR"),
  LOADER_SUCCESS: Symbol.for("GULP_CLI_LOADER_SUCCESS"),
  LOADER_FAILURE: Symbol.for("GULP_CLI_LOADER_FAILURE"),
  LOADER_ERROR: Symbol.for("GULP_CLI_LOADER_ERROR"),
  NODE_FLAGS: Symbol.for("GULP_CLI_NODE_FLAGS"),
  RESPAWNED: Symbol.for("GULP_CLI_RESPAWNED"),
  GULPFILE_NOT_FOUND: Symbol.for("GULP_CLI_GULPFILE_NOT_FOUND"),
  CWD_CHANGED: Symbol.for("GULP_CLI_CWD_CHANGED"),
  UNSUPPORTED_GULP_VERSION: Symbol.for("GULP_CLI_UNSUPPORTED_GULP_VERSION"),
};