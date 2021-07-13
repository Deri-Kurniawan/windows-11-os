// set current page
localStorage['currentPage'] = 'about';

var aboutDescription = document.querySelector('#about-description');

var i = 0;
var txt =
    "Saya Deri Kurniawan, Seorang Web Developer & Multiplatform Developer yang saat ini masih ber-status sebagai mahasiswa di Universitas Muhammadiyah Sukabumi Dengan Jurusan Teknik Informatika. Saya seorang yang menyukai hal baru, Saya sangat senang jika berurusan dengan teknologi, termasuk dalam merancang, membangun, mengembangkan dan mewujudkan sesuatu yang dapat bermanfaat dalam dunia teknologi. Untuk itulah alasan saya memilih jurusan Teknik Informatika.";
var speed = 10;

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
        aboutDescription.innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

var clickCountNextAboutBtn = 1;

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

    // console.log(clickCountNextAboutBtn);
});