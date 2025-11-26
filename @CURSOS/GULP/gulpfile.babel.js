// JAVA SCRIPT ES6 CON BABEL Y GULP
import gulp from 'gulp';
import babel from 'gulp-babel';
import terser from 'gulp-terser';

// HTML MINIFIER
import htmlmin from 'gulp-html-minifier';

// CSS CON POSTCSS
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import clean from 'gulp-purgecss';

// PUG
import pug  from "gulp-pug";

// SASS
const sass = require('gulp-sass')(require('sass'));

// Limpiar CACHE
import cacheBust from "gulp-cache-bust";

// Importar Imagenes 
/*import imagemin from 'gulp-imagemin';*/
const imagemin = require('gulp-imagemin');

// Browser Sync
import {init as server, stream, reload} from 'browser-sync';

// Plumber
import plumber from 'gulp-plumber';

// COMMON
import concat from 'gulp-concat';

// Variables, constantes...
const cssPlugins = [
  autoprefixer(),
  cssnano()
];
const production = true // Cambiar a true para producción con PUG minificado

gulp.task('styles-min', () => {
  return gulp
    .src('./src/css/*.css')
    .pipe(plumber()) /* Evitar caidas abruptas */
    .pipe(concat('style.min.css')) /* Unir todos los archivos JS en uno solo */
    .pipe(postcss(cssPlugins)) /* Procesar los archivos CSS con PostCSS y los plugins */
    .pipe(gulp.dest('./public/css')) /* Guardar el archivo resultante en la carpeta dist/css */
    .pipe(stream()); /* Actualizar el navegador */

  }
 )

gulp.task('views-min', () => {
  return gulp
    .src('./src/views/pages/*.pug')   
    .pipe(plumber()) /* Evitar caidas abruptas */ 
    .pipe(pug({
      pretty: production? false : true
    }))    
    .pipe(cacheBust({
      type: 'timestamp'
    }))
    .pipe(gulp.dest('./public')); /* Guardar el archivo resultante en la carpeta dist/css */    
  }
)

gulp.task('sass-min', () => {
  return gulp
    .src('./src/scss/stylesSASS.scss')
    .pipe(plumber()) /* Evitar caidas abruptas */
    .pipe(sass({
      outputStyle: 'compressed' /* Comprimir el CSS resultante */
    }))    
    .pipe(gulp.dest('./public/css')) /* Guardar el archivo resultante en la carpeta dist/css */
    .pipe(stream()); /* Actualizar el navegador */
  }
)

gulp.task('html-min', () => {
  return gulp
    .src('./src/html/*.html')
    .pipe(plumber()) /* Evitar caidas abruptas */
    .pipe(concat('app.min.html')) /* Unir todos los archivos JS en uno solo */
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    })) 
    .pipe(gulp.dest('./public/html')); /* Guardar el archivo resultante en la carpeta dist/js */    
  }
)

gulp.task('js-min', () => {
  return gulp
    .src('./src/js/*.js')
    .pipe(plumber()) /* Evitar caidas abruptas */
    .pipe(concat('app.min.js')) /* Unir todos los archivos JS en uno solo */
    .pipe(babel({
      presets: ['@babel/preset-env'],
    })) /* Transpilar el código JS con Babel < es opcional > */
    .pipe(terser()) /* Minificar el código JS */

    .pipe(gulp.dest('./public/js')); /* Guardar el archivo resultante en la carpeta dist/js */      
  })

gulp.task('clean', () => {
  return gulp
    .src('./public/css/stylesSASS.css')   
    .pipe(plumber()) /* Evitar caidas abruptas */ 
    .pipe(clean({
      content: ['./public/html/*.html'],
    })) 
    .pipe(gulp.dest('./public/css')); /* Guardar el archivo resultante en la carpeta dist/js */      
  })  

gulp.task('images-min', () => {
  return gulp
    .src('./src/images/*')  
    .pipe(plumber()) /* Evitar caidas abruptas */  
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}), /* Ajustar imagenes GIF */
      imagemin.mozjpeg({quality: 30, progressive: true}), /* Ajustar calidad de imagen JPEG */
      imagemin.optipng({optimizationLevel: 1}), /* Ajustar imagenes PNG */
    ])) 
    .pipe(gulp.dest('./public/images')); /* Guardar el archivo resultante en la carpeta dist/js */      
  });  

gulp.task('default', ()=> { /* Tarea por defecto */
  server({ /* Iniciar el servidor de desarrollo */
    server: {
      server: './public' /* Carpeta raíz del servidor */
    }
  });
  gulp.watch('./src/js/*.js', gulp.series('js-min')).on('change',reload) /* Vigilar cambios en archivos JS */
  // gulp.watch('./src/html/*.html', gulp.series('html-min')) /* Vigilar cambios en archivos HTML */
  //gulp.watch('./src/css/*.css', gulp.series('styles-min')) /* Vigilar cambios en archivos CSS */
  gulp.watch('./src/views/**/*.pug', gulp.series('views-min')).on('change',reload) /* Vigilar cambios en archivos PUG */
  gulp.watch('./src/scss/*.scss', gulp.series('sass-min')) /* Vigilar cambios en archivos PUG */
}); 

