localStorage['currentPage'] = 'about';

let aboutDescriptionElement = document.querySelector('#about-description');

let i = 0;
let txt =
  "Saya Deri Kurniawan, Seorang Full Stack Web Developer yang saat ini masih ber-status sebagai mahasiswa di Universitas Muhammadiyah Sukabumi Dengan Jurusan Teknik Informatika. Saya seorang yang menyukai hal baru, Saya sangat senang jika berurusan dengan teknologi, termasuk dalam merancang, membangun, mengembangkan dan mewujudkan sesuatu yang dapat bermanfaat untuk berbagai sektor. Untuk itulah alasan saya memilih jurusan Teknik Informatika.";
let speed = 10;

const abilitiesElement = document.querySelector('#abilities-list');

const abilitiesData = [
  {
    name: "HTML",
    progress: 85,
  },
  {
    name: "JavaScript",
    progress: 60,
  },
  {
    name: "PHP",
    progress: 80,
  },
  {
    name: "MySQL",
    progress: 75,
  },
  {
    name: "Python",
    progress: 35,
  },
  {
    name: "CodeIgniter",
    progress: 75,
  },
  {
    name: "Laravel",
    progress: 30,
  },
  {
    name: "Express JS",
    progress: 35,
  },
  {
    name: "Hapi JS",
    progress: 35,
  },
  {
    name: "Flutter",
    progress: 35,
  },
];

abilitiesElement.innerHTML = 'I feel, I don't know anything so far';

/*
abilitiesData.forEach((ability) => {
  abilitiesElement.innerHTML += `
  <tr>
    <th class="col-4">${ability.name}</th>
    <td>
      <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger"
          role="progressbar" style="width: ${ability.progress}%;" aria-label="${ability.progress}%." aria-valuenow="${ability.progress}" aria-valuemin="0"
          aria-valuemax="100">
          ${ability.progress}%</div>
      </div>
    </td>
  </tr>
  `;
});
*/

$("#typewriter-name").typer({
  strings: [
    "About Me",
  ],
  typeSpeed: 100,
  backspaceSpeed: 20,
  backspaceDelay: 800,
  repeatDelay: 500,
  repeat: true,
  autoStart: true,
  startDelay: 100,
});
$("#typewriter-bio").typer({

  strings: [
    "My Bio",
  ],
  typeSpeed: 100,
  backspaceSpeed: 20,
  backspaceDelay: 800,
  repeatDelay: 500,
  repeat: true,
  autoStart: true,
  startDelay: 100,
});
$("#typewriter-ability").typer({

  strings: [
    "My Ability",
  ],
  typeSpeed: 100,
  backspaceSpeed: 20,
  backspaceDelay: 800,
  repeatDelay: 500,
  repeat: true,
  autoStart: true,
  startDelay: 100,
});

typeWriter();

function typeWriter() {
  if (i < txt.length) {
    aboutDescriptionElement.innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

let clickCountNextAboutBtn = 1;

if (clickCountNextAboutBtn == 1) {
  $('#slide-about-1').show();
  $('#slide-about-2').hide();
  $('#slide-about-3').hide();
}

$('#about-next-btn').on('click', function () {
  clickCountNextAboutBtn += 1;
  if (clickCountNextAboutBtn > 3) {
    clickCountNextAboutBtn = 1;
  }

  switch (clickCountNextAboutBtn) {
    case 1:
      $('#slide-about-1').show();
      $('#slide-about-2').hide();
      $('#slide-about-3').hide();
      break;
    case 2:
      $('#slide-about-1').hide();
      $('#slide-about-2').show();
      $('#slide-about-3').hide();
      break;
    case 3:
      $('#slide-about-1').hide();
      $('#slide-about-2').hide();
      $('#slide-about-3').show();
      break;

    default:
      break;
  }
});
