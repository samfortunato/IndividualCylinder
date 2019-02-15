# IndividualCylinder

![Demo gif of IndividualCylinder app](https://s3.amazonaws.com/individualcylinder-video-upload-dev/demo.gif)

_(Individual === You; Cylinder === Tube)_

## Info

IndividualCylinder is a clone of YouTube. This was created as Sam Fortunato's fullstack final project for App Academy.

[Live Demo](https://individualcylinder.herokuapp.com/)

The site uses Ruby on Rails for the backend, and React/Redux for frontend display and state management. Amazon Web Services (AWS) is integrated for video, video thumbnail, and user avatar upload.

## Overview

* User sign up and sign in
* Custom video player with keyboard shortcuts
* Video view and upload (with custom thumbnails)
* Commenting
* Likes
* Channels

## Key Features

### Custom Video Player

IndividualCylinder utilizes a custom made video player that emulates the look of YouTube.

The player makes use of the `<video>` element, with controls and right-click disabled. The video controls are accomplished with `<button>`s, a range input, and a `<progress>` element. The video player interface will update based on user interaction and video playback events (including video duration/current time display).

The video progress bar will update based on video time, and seeking through the video by clicking on the progress bar is possible. This is possible by using the position of the user's mouse click calculated against the progress bar's viewport position, and its width; the video's current time is then set to the calculated result.

The video's buttons are all functional. The player's functionality includes:

* Play/Pause
* Mute/Unmute
* Volume (sliding control)
* Seek (click on progress bar)
* Fullscreen Toggle

The video player can also be controlled by keyboard shortcuts -- just like real YouTube.

**Keyboard Shortcuts**

* `k` - play/pause
* `m` - mute/unmute
* `j` - go back 10 seconds
* `l` - go forward 10 seconds
* `f` - fullscreen toggle

## Possible Future Features

* Comment edit/delete &#10004;
* Likes/dislikes on videos/comments &#10004;
* Channels &#10004;
* Subscriptions
* Search & collapsible nav sidebar
* Playlists
* Annotations/video cards
* Video playback speed, captions, video quality
* Automatic video thumbnail generation

## Everything Else

YouTube is &copy; Google. I claim no rights to their product &mdash; this is just a fun clone!

DataURI to blob conversion code (for user avatar generation) is thanks to [David Gomez-Urquiza](https://gist.github.com/davoclavo/4424731).
