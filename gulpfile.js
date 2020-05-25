let gulp = require("gulp"),
	less = require("gulp-less"),
	path = require("path"),
	csso = require("gulp-csso"),
	gcmq = require("gulp-group-css-media-queries"),
	browserSync = require("browser-sync"),
	watch = require("gulp-watch"),
	babel = require("gulp-babel"),
	uglify = require("gulp-uglify"),
	concat = require("gulp-concat"),
	rename = require("gulp-rename"),
	del = require("del"),
	autoprefixer = require("gulp-autoprefixer");

let jsFiles = ["app/js/libs.min.js", "app/js/accordion.js", "app/js/main.js"];

gulp.task("clean", async function () {
	del.sync("dist");
});

gulp.task("less", function () {
	return gulp
		.src("app/less/**/main.less")
		.pipe(
			less({
				paths: [path.join(__dirname, "less", "includes")],
			})
		)
		.pipe(gcmq())
		.pipe(
			rename({
				basename: "all",
				suffix: ".min",
			})
		)
		.pipe(gulp.dest("app/css"))
		.pipe(
			browserSync.reload({
				stream: true,
			})
		);
});

gulp.task("cssLibs", function () {
	return gulp
		.src([
			"node_modules/normalize.css/normalize.css",
			"node_modules/slick-carousel/slick/slick.css",
		])
		.pipe(concat("_libs.less"))
		.pipe(gulp.dest("app/less"))
		.pipe(
			browserSync.reload({
				stream: true,
			})
		);
});

gulp.task("html", function () {
	return gulp.src("app/*.html").pipe(
		browserSync.reload({
			stream: true,
		})
	);
});

gulp.task("scripts", function () {
	return gulp
		.src([
			"app/js/*.js",
			"!app/js/all.min.js",
			"!app/js/main.js",
			"app/js/main.js",
		])
		.pipe(concat("all.min.js"))
		.pipe(gulp.dest("app/js"))
		.pipe(
			browserSync.reload({
				stream: true,
			})
		);
});

gulp.task("jsLibs", function () {
	return gulp
		.src(["node_modules/slick-carousel/slick/slick.js"])
		.pipe(concat("libs.min.js"))
		.pipe(gulp.dest("app/js"));
});

gulp.task("browser-sync", function () {
	browserSync.init({
		server: {
			baseDir: "app/",
		},
	});
});

gulp.task("export", async function () {
	let buildHtml = gulp.src("app/**/*.html").pipe(gulp.dest("dist"));

	let buildCss = gulp
		.src("app/css/**/*.css")
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["<0.1%"],
				cascade: false,
			})
		)
		.pipe(
			csso({
				restructure: true,
				debug: true,
			})
		)
		.pipe(gulp.dest("dist/css"));

	let buildJs = gulp
		.src("app/js/all.min.js")
		.pipe(babel())
		.pipe(concat("all.min.js"))
		.pipe(
			uglify({
				toplevel: true,
			})
		)
		.pipe(gulp.dest("dist/js"));

	let buildFonts = gulp.src("app/fonts/**/*.*").pipe(gulp.dest("dist/fonts"));

	let buildImg = gulp.src("app/img/**/*.*").pipe(gulp.dest("dist/img"));
});

gulp.task("watch", function () {
	gulp.watch("app/less/**/*.less", gulp.series("less"));
	gulp.watch("app/*.html", gulp.series("html"));
	gulp.watch(["app/js/*.js", "!app/js/all.min.js"], gulp.series("scripts"));
});

gulp.task("build", gulp.series("clean", "export"));

gulp.task(
	"default",
	gulp.series(
		"cssLibs",
		"less",
		"jsLibs",
		"scripts",
		gulp.parallel("browser-sync", "watch")
	)
);
