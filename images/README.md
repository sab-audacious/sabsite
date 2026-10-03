Drop photos in this folder using these exact filenames. Each spot will pick the
photo up automatically on refresh — no code changes needed. If a file is
missing, the site just shows the placeholder frame instead.

| Filename            | Where it appears           | Shape           |
|----------------------|-----------------------------|-----------------|
| `hero.jpg`           | Homepage hero (top right)  | Portrait, 4:5   |
| `background.jpg`     | Homepage "Background" section | Portrait, 4:5 |
| `about-hero.jpg`     | About page header          | Tall, fills panel |
| `about-wide.jpg`     | About page, mid-story break | Wide, ~16:8    |

Tips:
- `.jpg`, `.jpeg`, `.png`, or `.webp` all work — just keep the filename before the dot exact, or update the `src=` in the HTML to match your extension.
- Images are cropped to fill their frame (`object-fit: cover`), so center the subject — edges may get trimmed on some screen sizes.
- Aim for at least 1200px on the longest side so they stay sharp on large screens.
