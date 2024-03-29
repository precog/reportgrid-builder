clear

# COPY FILES
cp -r -f src/css/jquery-ui/gray/images/*.* build/css/jquery-ui/gray/images
cp -r -f src/css/jquery-ui/blue/images/*.* build/css/jquery-ui/blue/images
cp -r -f src/css/jquery-ui/dark/images/*.* build/css/jquery-ui/dark/images
cp -r -f src/css/jquery-ui/black/images/*.* build/css/jquery-ui/black/images
cp -r -f src/images/*.* build/images
cp -r -f src/js/ext/jstree/themes/default/*.* build/themes/default
cp -r -f src/data/*.* build/data
cp -r -f src/css/jquery-minicolors/images/*.* build/css/css/jquery-minicolors/images
cp -r -f src/css/jquery-minicolors/images/*.* build/css/jquery-minicolors/images

# MINIFY CSS
node tools/r.js -o cssIn=src/css/jquery-ui/black/jquery-ui.css out=build/css/jquery-ui/black/jquery-ui.css
node tools/r.js -o cssIn=src/css/jquery-ui/blue/jquery-ui.css out=build/css/jquery-ui/blue/jquery-ui.css
node tools/r.js -o cssIn=src/css/jquery-ui/dark/jquery-ui.css out=build/css/jquery-ui/dark/jquery-ui.css
node tools/r.js -o cssIn=src/css/jquery-ui/gray/jquery-ui.css out=build/css/jquery-ui/gray/jquery-ui.css

node tools/r.js -o cssIn=src/css/jquery-pnotify/jquery.pnotify.default.css out=build/css/css/jquery-pnotify/jquery.pnotify.default.css
node tools/r.js -o cssIn=src/css/jquery-slickgrid/slick.grid.css out=build/css/css/jquery-slickgrid/slick.grid.css
node tools/r.js -o cssIn=src/css/jquery-minicolors/jquery.miniColors.css out=build/css/css/jquery-minicolors/jquery.miniColors.css

node tools/r.js -o cssIn=src/js/ext/jstree/themes/default/style.css out=build/themes/default/style.css

# MINIFY LESS
lessc src/css/main.less build/css/reportgrid-builder.css
node tools/r.js -o cssIn=build/css/reportgrid-builder.css out=build/css/reportgrid-builder.css

# MINIFY JS
~/bin/uglifyjs -o build/js/require-jquery.js src/js/require-jquery.js
node tools/r.js -o scripts/app.build.js

#TODO
#cp -f src/favicon.ico build/favicon.ico
#cp -f src/css/images/logo-builder-white.svg build/css/images/logo-builder-white.svg
#cp -f src/css/images/logo-builder-black.svg build/css/images/logo-builder-black.svg
#cp -f src/css/images/progress-background.png build/css/images/progress-background.png
#cp -f src/css/images/file.png build/css/images/file.png
#cp -r -f libs/jquery/jstree/themes/default build/themes
#cp -f libs/jquery/zclip/ZeroClipboard.swf build/js/libs/jquery/zclip/ZeroClipboard.swf