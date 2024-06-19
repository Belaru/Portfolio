import { 
  compareCourseNumber,
  compareCourseCalendar,
  compareCourseName,
  getSemesterCourses} from './sort.js';

import progarmmingCourses from './courses.js';

const courses = progarmmingCourses;

//assign an image to each course
courses.forEach( (course, index) => {
  course.image = `./img/${index}.webp`;
});

// is a course description is showing
let showing = false;

//wait for DOM to load before doing anything
document.addEventListener('DOMContentLoaded', function() {
  document.getElementsByName('sort_order')[0].value = 'semester';
  semesterSelector.value = 'none';
  addToDOM();
});

/**
 * Adds elements to the DOM, including a sorting menu, a hero image, and course cards.
 * @function addToDOM
 * @global
 */
function addToDOM() {
  const sortingMenu = document.querySelector('select');
  sortingMenu.addEventListener('input', chooseSortOrder);
  //add hero image
  const banner = document.getElementById('banner');
  banner.src = 'https://www.dawsoncollege.qc.ca/wp-content/uploads/dawson_banner.jpg';
  lastSortOrder = 'calendar';
  //build each course card and add to DOM
  courses.sort(compareCourseCalendar);
  showCourses(courses);
  //add to courses header
  showCourseHeader(courses.length);
}

// force some space for the sticky card-header
const header = document.getElementById('sticky-container');
document.querySelector('#snap-target').style.height = `${header.offsetHeight}px`;

// display all courses
function showCourses(sortedCourses) {
  const section = document.querySelector('.card-container');
  // clear all nodes in case we just re-sorted
  section.textContent = '';
  sortedCourses.forEach((course, i) => {
    addCard(section, course); 
    setHandlers(i);
  });
  document.querySelectorAll('.card header').forEach((title) => {
    title.style.width = title.parentNode.offsetWidth / 2 + 'px';
    title.style.paddingLeft = title.style.width.slice(0, -2) + 'px';
    title.classList.add('card-title');
  });
}

/**
 * Displays sorted courses on the DOM 
 * by creating and appending course cards to the specified section.
 * @function showCourses
 * @param {Course[]} sortedCourses - The array of courses to display.
 */
function addCard(section, course) {
  // Check if the course object already has the article
  const article = course.article || createCard(course);
  // If the article doesn't exist in the course object, create and cache it
  if (!course.article) {
    course.article = article;
  }
  // Append the article to the section
  section.append(article);
}

/**
 * Creates a course card element based on the provided course information.
 * @function createCard
 * @param {Course} course - The course object containing information to display on the card.
 * @returns {HTMLElement} - The created card element.
 */
function createCard(course) {
  const article = document.createElement('article');
  article.classList.add('card');
  let season = 'winter';
  if (course.calendar.includes('Fall')) {
    season = 'fall';
  }
  article.innerHTML = `<header>
        <h3>${course.number}</h3>
    </header>
    <figure class="card-thumbnail">
        <img src="${course.image}" alt='programming picture from Pexels' loading="lazy"/>
    </figure>
    <main class="card-description">
        ${course.name}, taken in ${course.calendar}
    </main>
    <a href="#" class="button ${season}">More Info</a>`;

  return article;
}

/**
 * Sets event handlers for the specified course card based on its position.
 * @function setHandlers
 * @param {number} position - The position of the course card in the card container.
 */
function setHandlers(position) {
  const button = document.querySelector(`.card-container article:nth-child(${position + 1}`).
    querySelector('.button');
  button.addEventListener('click', (e) => displayDescription(e, position));
}

/**
 * Displays the description for the clicked course card at the specified position.
 * @function displayDescription
 * @param {Event} e - The click event.
 * @param {number} position - The position of the clicked course card in the card container.
 */
function displayDescription(e, position) {
  const description = document.querySelector('.description');
  e.preventDefault();
  setTimeout(() => {
    if (!showing) {
      showing = true;
      if(description === null){
        const desc = document.createElement('section');
        desc.classList.add('description');
        styleDescription(e, desc, position);
        document.body.appendChild(desc);
      }else{
        styleDescription(e, description, position);
        showDescription(e, description);
      }
      e.target.parentNode.classList.add('card-visited');
    }
  }, 50);
}

/**
 * Styles the description section for the clicked course card 
 * and populates it with relevant content.
 * @function styleDescription
 * @param {Event} e - The click event.
 * @param {HTMLElement} description - The description section to be styled.
 * @param {number} position - The position of the clicked course card in the card container.
 */
function styleDescription(e, description, position){
  description.style.width = e.target.parentNode.offsetWidth + 'px';
  description.style.top = Math.max(0, e.target.parentNode.getBoundingClientRect().top) + 'px';
  description.style.left = e.target.parentNode.getBoundingClientRect().left + 'px';      
  description.innerHTML = `<main class="card-description">
            ${getCourse(position).desc}
            <a href="#" class="button close">Close</a>
            </main>`;
  const closeButton = description.querySelector('.close');
  closeButton.addEventListener('click', (e) => {
    hideDescription(e, description);
  });
  const main = document.getElementById('main');
  main.classList.add('mute');
}

/**
 * Highlights cards in the middle of the viewport by adjusting their background color and padding.
 * @function highlightMiddleCards
 */

function highlightMiddleCards() {
  const cards = document.querySelectorAll('.card');

  for (let s = 0; s < cards.length; s++) {
    const card = cards[s];
    const cardLocation = card.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight;

    // Check if the card is in the viewport
    if (cardLocation > 0 && cardLocation < viewportHeight) {
      let saturation = 0;
      const ratio = Math.abs(
        1 - Math.abs(0.5 - cardLocation / document.documentElement.clientHeight)
      );
      saturation = 100 * ratio;
      card.style.paddingTop = 10 * (1 + ratio) + 'px';
      card.style.backgroundColor = `hsl(227, ${saturation}%, 79%)`;
    }
  }
}

document.addEventListener('scroll', () => requestAnimationFrame(highlightMiddleCards));

/**
 * Hides the description section and restores main content interactivity.
 * @function hideDescription
 * @param {Event} e - The click event.
 * @param {HTMLElement} desc - The description section to be hidden.
 */
function hideDescription(e, desc) {
  e.preventDefault();
  showing = false;
  desc.style.display = 'none';
  const main = document.getElementById('main');
  main.classList.remove('mute');
}

/**
 * Displays the description section and updates the showing flag.
 * @function showDescription
 * @param {Event} e - The click event.
 * @param {HTMLElement} desc - The description section to be displayed.
 */
function showDescription(e, desc) {
  e.preventDefault();
  showing = true;
  desc.style.display = 'block';
}

/**
 * Updates the header with information about the total number of courses.
 * @function showCourseHeader
 * @param {Number} numberOfCourses - The number of displayed courses.
 */
function showCourseHeader(numberOfCourses) {
  const h3 = document.getElementById('total-courses-info');
  h3.innerText = `Specific education: ${numberOfCourses} courses`;
}

/**
 * Handles the selection of a sorting order for courses and updates the display accordingly.
 * @function chooseSortOrder
 * @param {Event} e - The input event from the sorting menu.
 */
function chooseSortOrder(e) {
  if (e.target.value === lastSortOrder) {
    return;
  }
  switch (e.target.value) {
  case 'semester':
    courses.sort(compareCourseCalendar);
    break;
  case 'number':
    courses.sort(compareCourseNumber);
    break;
  case 'name':
    courses.sort(compareCourseName);
    break;
  default:
    return;
  }

  filterCoursesBySemester(courses);
}

const semesterSelector = document.getElementsByName('sort_semester')[0];
semesterSelector.addEventListener('input', () => { 
  filterCoursesBySemester(courses); 
});

/**
 * Displays courses for the selected semester and updates the display accordingly.
 * @function displaySemesterCourses
 */
function filterCoursesBySemester(courses){
  const semester = semesterSelector.value;
  const semesterCourses = getSemesterCourses(courses, semester);
  showCourses(semesterCourses);
  showCourseHeader(semesterCourses.length);
}


let lastSortOrder = 'calendar';

/**
 * Retrieves the course at the specified index from the courses array.
 * @function getCourse
 * @param {number} n - The index of the course to retrieve.
 * @returns {Course} - The course at the specified index.
 */
function getCourse(n) {
  return courses[n];
}

let lastScroll = 0;

// Always keep the sorting menu at the top of the screen when the user scrolls
// But snap it back to its original position when the user scrolls above the 
// list of cards
//
// Adapted from Chat-GPT, 2023-11-26
// Note that it would be much more concise and performant to use position:sticky
// and scroll-snap-* CSS properties, but Chat-GPT tends to provide solutions
// based on outdated practices because old code is overrepresented in its training data.
//
// Details in case you're curious: 
// https://firefox-source-docs.mozilla.org/performance/scroll-linked_effects.html
//
// Anyway, tweaking the order of operations here can make it a bit more efficient

/**
 * Sticks the header to the top when scrolling down and positions it 
 * between .info and .card-container when scrolling up.
 * @function stickHeader
 */
function stickHeader() {
  const header = document.getElementById('sticky-container');
  const sticky = header.offsetTop;
  const infoSection = document.querySelector('.info');
  const infoBottom = infoSection.offsetTop + infoSection.offsetHeight;
  header.style.width = document.querySelector('#main').offsetWidth + 'px';

  const currentScroll = window.scrollY;   
  if (currentScroll > sticky && currentScroll > lastScroll) {
    // Scroll down: stick to the top
    header.style.position = 'fixed';
    header.style.top = '0';
  } else if (currentScroll <= infoBottom) { 
    // Scroll up: stick between .info and .card-container
    header.style.position = 'absolute';
    header.style.top = `${infoBottom}px`;
  }

  lastScroll = currentScroll;
}

window.addEventListener('scroll', stickHeader);

/**
 * cwebp
 * https://www.npmjs.com/package/cwebp
 */