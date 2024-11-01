const gulp = require('gulp');
const ts = require('gulp-typescript');

// Rutas de tu proyecto
const paths = {
    scripts: 'src/**/*.ts',              // Archivos TypeScript
    html: 'src/views/**/*.html',         // Archivos HTML
    styles: 'public/styles/**/*.css',    // Archivos CSS
    js: 'public/scripts/**/*.js',        // Archivos JS
    dist: 'dist/'                        // Carpeta de destino
};

// Configuración de TypeScript directamente en Gulp
const tsProject = ts.createProject({
    outDir: paths.dist + 'scripts',
    target: 'ES6',
    module: 'CommonJS',
    noImplicitAny: true,
    esModuleInterop: true,
    moduleResolution: 'NodeNext',
    resolveJsonModule: true,
    strict: true,
});

// Tarea para compilar TypeScript
gulp.task('scripts', () => {
    return gulp.src(paths.scripts)
        .pipe(tsProject())
        .pipe(gulp.dest(paths.dist + 'scripts'));
});

// Tareas de copia para HTML, CSS y JS, retornando los streams
gulp.task('copy-html', () => {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.dist + 'views'));
});

gulp.task('copy-css', () => {
    return gulp.src(paths.styles)
        .pipe(gulp.dest(paths.dist + 'styles'));
});

gulp.task('copy-js', () => {
    return gulp.src(paths.js)
        .pipe(gulp.dest(paths.dist + 'scripts'));
});

// Agrupar tareas de copia
gulp.task('copy', gulp.parallel('copy-html', 'copy-css', 'copy-js'));

// Tarea de build que ejecuta las tareas de scripts y copia
gulp.task('build', gulp.series('scripts', 'copy'));

// Tarea por defecto
gulp.task('default', gulp.series('build'));
