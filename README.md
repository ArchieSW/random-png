# random-png
This program can choose random png file from folder and copy it to random.png file.

## How to use:
```
random_png <<path-to-folder>>
```

## For what reason?
You can use it for example to generate random wallpaper for [hyprpaper](https://github.com/hyprwm/hyprpaper), [feh](https://github.com/derf/feh) or other programs that can render png file. So in config files you can easily do 
```
exec-once random_png ~/Pictures/Wallpapers/ && hyprpaper
```
and enjoy new wallpaper every session!
