# Meetup photos

One folder per meetup, named `meetup-<number>` (the number is the meetup's position in the Luma past-events list, oldest = 1).
Every image in a folder is shown on that event's page and in /gallery, optimised automatically at build time.

- Name the group photo `group.jpg` (or set `banner:` in the event's front matter to another file name) and it becomes the event's banner.
- Link an event to its folder with `meetupNumber: <number>` in `src/content/events/*.md`.
