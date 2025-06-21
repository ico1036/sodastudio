# Project: SODA STUDIO Website Clone

## 1. Project Goal
- To create a complete, functional, and easily maintainable clone of the SODA STUDIO website ([https://sodastudio365.modoo.at/](https://sodastudio365.modoo.at/)).
- The primary requirement is that a non-developer must be able to easily update photos and manage list-based content such as notices and rental lists.

## 2. Core Technologies
- **Framework:** Astro.js was chosen for its content-oriented approach and static site generation capabilities, ensuring a fast and secure website.
- **Content Management:** Astro's built-in Content Collections feature is used to manage "Notices" and "Rental Items". This allows for simple maintenance by adding or editing Markdown (`.md`) files in designated folders (`src/content/notices/` and `src/content/rentals/`).

## 3. Key Features Implemented
- **Full Page Replication:** All main pages from the original site were created: Home, Zone 소개, 예약하기, 스케쥴, 안내사항, 오시는길, and 대여목록.
- **Dynamic Content System:** 
    - **Notices:** Managed via Markdown files in `src/content/notices/`. Includes a list page and dynamic detail pages for each notice.
    - **Rental List:** Implemented as a bulletin-board style system, also managed via Markdown files in `src/content/rentals/`, with list and detail pages.
- **Easy Image Management:** The main visual image on the homepage can be replaced by simply overwriting the `public/images/main-visual.jpg` file.
- **Interactive Map:** The "오시는길" (Location) page features a fully interactive Naver Map, directly pointing to the studio's precise location.
- **External Links:** The "예약하기" (Booking) and "스케쥴" (Schedule) buttons are linked to the studio's KakaoTalk channel and Google Calendar, respectively.

## 4. Final State
- The project successfully replicates the original website's design and functionality while fulfilling the core requirement of easy maintenance for non-technical users.
- A detailed, Korean-language `README.md` has been created to serve as a user manual.
