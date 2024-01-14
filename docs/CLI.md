### Usage

`gulp [flags] <task> <task>...`

### Tasks

The task(s) listed will be executed.
If more than one task is listed, Gulp will execute all of them
concurrently, that is, as if they had all been listed as dependencies of
a single task.

By default, Gulp does not serialize tasks listed on the command line. If you would like to execute tasks serially, you must specify the `--series` flag. e.g. `gulp clean build --series`

Just running `gulp` will execute the task `default`. If there is no
`default` task, gulp will error.

### Compilers

You can find a list of supported languages at [https://github.com/gulpjs/interpret](https://github.com/gulpjs/interpret). If you would like to add support for a new language, send pull requests/open issues on that project.

### Environment

The CLI adds process.env.INIT_CWD which is the original cwd it was launched from.

### Flags

gulp has very few flags to know about. All other flags are for tasks to use if needed.

**Some flags only work with gulp 4 and will be ignored when invoked against gulp 3.**

**--help**, **-h**
    Show the help.

**--version**, **-v**
    Print the global and local gulp versions.

**--require** [path]
    Will require a module before running the gulpfile. This is useful for transpilers but also has other applications.

**--gulpfile** [path], **-f** [path]
    Manually set path of gulpfile. Useful if you have multiple gulpfiles. This will set the CWD to the gulpfile directory as well.

**--cwd** [path]
    Manually set the CWD. The search for the gulpfile, as well as the relativity of all requires will be from here.

**--tasks**, **-T**
    Print the task dependency tree for the loaded gulpfile.

**--tasks-simple**
    Print a plaintext list of tasks for the loaded gulpfile.

**--tasks-json** [path]
    Print the task dependency tree, in JSON format, for the loaded gulpfile. The [path] argument is optional, and if given writes the JSON to the path.

**--tasks-depth** [number]
    Specify the depth of the task dependency tree to print. This flag can be used with --tasks or --tasks-json. (This flag was named --depth before but is deprecated.)

**--compact-tasks**
    Reduce the output of task dependency tree by printing only top tasks and their child tasks. This flag can be used with --tasks or --tasks-json.

**--sort-tasks**
    Will sort top tasks of task dependency tree. This flag can be used with --tasks.

**--color**
    Will force gulp and gulp plugins to display colors, even when no color support is detected.

**--no-color**
    Will force gulp and gulp plugins to not display colors, even when color support is detected.

**--silent**, **-S**
    Suppress all gulp logging.

**--continue**
    Continue execution of tasks upon failure.

**--series**
    Run tasks given on the CLI in series (the default is parallel).

**--log-level**, **-L**
    Set the loglevel. -L for least verbose and -LLLL for most verbose. -LLL is default.
