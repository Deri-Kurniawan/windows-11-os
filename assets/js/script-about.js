localStorage['currentPage'] = 'about';

let aboutDescriptionElement = document.querySelector('#about-description');

let i = 0;
let txt =
  "Saya Deri Kurniawan, Seorang Full Stack Web Developer yang saat ini masih ber-status sebagai mahasiswa di Universitas Muhammadiyah Sukabumi Dengan Jurusan Teknik Informatika. Saya seorang yang menyukai hal baru, Saya sangat senang jika berurusan dengan teknologi, termasuk dalam merancang, membangun, mengembangkan dan mewujudkan sesuatu yang dapat bermanfaat untuk berbagai sektor. Untuk itulah alasan saya memilih jurusan Teknik Informatika.";
let speed = 15;

const abilitiesElement = document.querySelector('#abilities-list');

const abilitiesData = [
  {
    name: "HTML, PHP",
    level: "Advanced",
  },
  {
    name: "JavaScript, MySQL, PostgreSQL, CodeIgniter",
    level: "Upper Intermediate",
  },
  {
    name: "CSS, NodeJS, ExpressJS, Bootstrap",
    level: "Intermediate",
  },
  {
    name: "C++, C#, SASS, Python, Laravel, HapiJS, Flutter, Unity3D, Arduino",
    level: "Elementary",
  },
  {
    name: "GoLang, Java, Kotlin, Adonis, ReactJS, VueJS, NestJS",
    level: "Beginner",
  }
];

abilitiesElement.innerHTML += `
<tr class="bg-danger text-light">
  <th>Skill</th>
  <th>Level</th>
</tr>
`;

abilitiesData.forEach((ability) => {
  abilitiesElement.innerHTML += `
  <tr class="bg-light" aria-label="keahlian ${ability.name} memiliki level ${ability.level}" tabindex="0">
    <td>${ability.name}</td>
    <td>
      ${ability.level}
    </td>
  </tr>
  `;
});

const aboutMeTypeWriter = () => {
  if (i < txt.length) {
    aboutDescriptionElement.innerHTML += txt.charAt(i);
    i++;
    setTimeout(aboutMeTypeWriter, speed);
  }
  // aboutDescriptionElement.innerHTML = txt;
}

aboutMeTypeWriter();

const slideRule = (position) => {
  switch (position) {
    case 1:
      $('#slide-about-1').show();
      $('#slide-about-2').hide();
      $('#slide-about-3').hide();
      localStorage.setItem('lastSlide', 1);

      break;
    case 2:
      $('#slide-about-1').hide();
      $('#slide-about-2').show();
      $('#slide-about-3').hide();
      localStorage.setItem('lastSlide', 2);

      break;
    case 3:
      $('#slide-about-1').hide();
      $('#slide-about-2').hide();
      $('#slide-about-3').show();
      localStorage.setItem('lastSlide', 3);

      break;
    default:
      break;
  }
}

let slidePosition = localStorage.getItem('lastSlide') ?? 1;

$('#slide-about-'+slidePosition).show();

$('#about-prev-btn').on('click', () => {
  slidePosition -= 1;
  if (slidePosition < 1) {
    slidePosition = 3;
  }

  slideRule(slidePosition);
});

$('#about-next-btn').on('click', () => {
  slidePosition += 1;
  if (slidePosition > 3) {
    slidePosition = 1;
  }

  slideRule(slidePosition);
});

$(document).on('keyup', (e) => {
  const rightKey = 39;
  const leftKey = 37;
  if(e.keyCode === rightKey) {
    $('#about-next-btn').click();
  }

  if(e.keyCode === leftKey) {
    $('#about-prev-btn').click();
  }
})