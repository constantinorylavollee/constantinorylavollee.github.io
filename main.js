(function () {
  "use strict";

  /* ---------------- i18n ---------------- */
  var translations = {
    fr: {
      subtitle: "Compositeur · Producteur",
      nav_info: "Infos",
      bio: "Bienvenue dans mon portfolio ! Je m’appelle Constantin et je vis à Paris. En tant que compositeur et producteur, je travaille sur divers projets originaux : supervision musicale, compositions et arrangements pour d’autres musiciens. Je travaille essentiellement avec des synthétiseurs, mon violon et le logiciel Ableton, avec une prédilection pour la manipulation des samples. Ma double formation en management et en musicologie me permet de penser les projets musicaux sur leurs deux fronts : l’exigence artistique et les enjeux stratégiques d’une commande. N’hésitez pas à me contacter pour toute question ou envie de collaboration.",
      education_label: "Formation",
      contact_label: "Contact",
      spotify_cta: "Écouter sur Spotify",
      skip_link: "Aller au contenu",
      education_ens: "ENS Ulm — Musicologie",
      desc_inani: "Inani est une marque fictive d’outillage créée par la directrice artistique Camille Vercken de Vreuschmen. J’ai composé la musique et réalisé le sound design de son film publicitaire, en travaillant avec des synthétiseurs, des samples et des effets numériques.",
      desc_ormeau: "Ormeau est un court-métrage réalisé par Juliette Roux, pour lequel j’ai composé la musique, fait le sound design et les effets d’ambiance. Le film raconte les mémoires d’une société oubliée. J’ai donc construit un paysage sonore atmosphérique et éthéré, à partir de multiples nappes, de bruit blanc et de field recordings, pour faire naître une ambiance onirique.",
      desc_175: "-1.75 est un projet photographique en sept éditions de Jeanne Seurot. J’ai composé à sa demande trois pièces musicales pensées comme des immersions dans les images. Chaque édition a sa propre atmosphère visuelle que les morceaux viennent soutenir mais parfois contrebalancer, le but étant de donner un cadre narratif sonore au parcours à travers les photographies.",
      desc_karma8a: "KARMA8A est une marque française de vêtements, centrée autour de l’escalade. Pour sa collection FW24, construite autour d’une esthétique plus brute, son fondateur René Grincourt nous a filmés, mon ami artiste Eutrop et moi, pendant que nous composions un morceau. Le résultat est un court film publicitaire porté par des sonorités house et un vocoder décalé. Film qui est devenu partie intégrante de la campagne sur Instagram.",
      desc_ananas: "Voici mon premier album, avec mon ami artiste Eutrop. C’est un voyage électronique expérimental à travers plusieurs genres, dont la French touch, la techno et le hip hop.",
      play: "Lecture",
      pause: "Pause",
      coming_soon: "Vidéo à venir",
      back_to_top: "Haut de page",
      carousel_prev: "Précédent",
      carousel_next: "Suivant"
    },
    en: {
      subtitle: "Composer · Producer",
      nav_info: "Info",
      bio: "Welcome to my portfolio! My name is Constantin, I’m a French composer and producer based in Paris. I take on a range of original projects, from sound supervision to composition and arranging for other musicians. I work primarily with synthesizers, violin, and computer music, with a particular love for sample manipulation. With a background in both management and musicology, I understand music projects from both angles: the art itself and the strategy behind the brief. Feel free to reach out if you have any questions or would like to collaborate!",
      education_label: "Education",
      contact_label: "Contact",
      spotify_cta: "Listen on Spotify",
      skip_link: "Skip to content",
      education_ens: "ENS Ulm — Musicology",
      desc_inani: "Inani is a concept hardware brand created by art director Camille Vercken de Vreuschmen. I composed the music and designed the sound for its ad spot, working with hardware synthesizers, samples and effects.",
      desc_ormeau: "Ormeau is a short film directed by Juliette Roux, for which I did the music, sound design, and ambient effects. The film evokes the memory of a forgotten society, so I built an ethereal, atmospheric soundscape from layered pads, white noise, and richly textured field recordings to conjure a hazy, dreamlike mood.",
      desc_175: "Original music and sound design for -1.75, a seven-part photography project by Jeanne Seurot. I composed three pieces designed as immersions into the images. The project unfolds across seven editions, each with its own visual atmosphere, so I responded with three hybrid tracks, woven from natural sounds and field ambiences, that give a narrative frame to the journey through the photographs.",
      desc_karma8a: "KARMA8A is a French bouldering brand. For its FW24 collection, built around a rawer aesthetic, founder René Grincourt filmed my friend and fellow artist Eutrop and me as we composed the track, and that session became part of the campaign itself. The result is a short ad driven by house textures and a quirky vocoder.",
      desc_ananas: "Here is my first album with my fellow artist Eutrop. It’s an experimental electronic journey across several genres, including French touch, techno and hip hop.",
      play: "Play",
      pause: "Pause",
      coming_soon: "Video coming soon",
      back_to_top: "Back to top",
      carousel_prev: "Previous",
      carousel_next: "Next"
    }
  };

  var STORAGE_KEY = "clov-lang";

  function detectDefaultLang() {
    var saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "fr") return saved;
    return "fr";
  }

  function currentDict() {
    var lang = document.documentElement.getAttribute("lang") || "fr";
    return translations[lang] || translations.fr;
  }

  function applyLang(lang) {
    var dict = translations[lang] || translations.fr;
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (dict[key] !== undefined) el.setAttribute("aria-label", dict[key]);
    });

    document.querySelectorAll(".lang-toggle").forEach(function (toggle) {
      toggle.classList.toggle("is-en", lang === "en");
    });

    var backToTop = document.getElementById("backToTop");
    if (backToTop) backToTop.setAttribute("aria-label", dict.back_to_top);

    document.querySelectorAll(".player").forEach(function (player) {
      var btn = player.querySelector(".play-overlay");
      if (!btn || btn.disabled) return;
      var isPlaying = player.classList.contains("is-playing");
      btn.setAttribute("aria-label", isPlaying ? dict.pause : dict.play);
    });

    window.localStorage.setItem(STORAGE_KEY, lang);
  }

  function initLangToggle() {
    // one in the hero, one in the footer — they share the same state
    var toggles = document.querySelectorAll(".lang-toggle");
    if (!toggles.length) return;
    var current = detectDefaultLang();
    applyLang(current);
    toggles.forEach(function (toggle) {
      toggle.addEventListener("click", function () {
        current = current === "fr" ? "en" : "fr";
        applyLang(current);
      });
    });
  }

  /* ---------------- Video + waveform players ---------------- */
  function initPlayer(player) {
    var video = player.querySelector(".player__video");
    var waveformEl = player.querySelector(".waveform");
    var btn = player.querySelector(".play-overlay");
    var playIcon = player.querySelector(".icon--play");
    var pauseIcon = player.querySelector(".icon--pause");
    var peaksUrl = player.getAttribute("data-peaks");
    var audioUrl = player.getAttribute("data-audio");
    var duration = parseFloat(player.getAttribute("data-duration")) || undefined;

    if (!waveformEl || !btn || typeof window.WaveSurfer === "undefined") return;
    if (!video && !audioUrl) return;

    function build(peaks) {
      var options = {
        container: waveformEl,
        waveColor: "#c4c4c4",
        progressColor: "#1e1e1e",
        cursorColor: "transparent",
        barWidth: 2,
        barGap: 1,
        barRadius: 1,
        height: 56,
        normalize: true
      };
      if (video) { options.media = video; } else { options.url = audioUrl; }
      if (peaks) { options.peaks = [peaks]; options.duration = duration; }

      var ws = window.WaveSurfer.create(options);

      function setPlaying(isPlaying) {
        player.classList.toggle("is-playing", isPlaying);
        if (playIcon) playIcon.hidden = isPlaying;
        if (pauseIcon) pauseIcon.hidden = !isPlaying;
        btn.setAttribute("aria-label", isPlaying ? currentDict().pause : currentDict().play);
      }

      btn.addEventListener("click", function () { ws.playPause(); });
      ws.on("play", function () { setPlaying(true); });
      ws.on("pause", function () { setPlaying(false); });
      ws.on("finish", function () { setPlaying(false); });
    }

    if (peaksUrl) {
      fetch(peaksUrl)
        .then(function (r) { return r.json(); })
        .then(function (json) { build(json.data || json); })
        .catch(function () { build(null); });
    } else {
      build(null);
    }
  }

  function initPlayers() {
    document.querySelectorAll(".player[data-peaks]").forEach(initPlayer);
  }

  /* ---------------- Photo/video carousel ---------------- */
  function initCarousel(carousel) {
    var slides = carousel.querySelectorAll(".carousel__slide");
    var prevBtn = carousel.querySelector(".carousel__arrow--prev");
    var nextBtn = carousel.querySelector(".carousel__arrow--next");
    if (!slides.length) return;
    var index = 0;

    function load(i) {
      var img = slides[(i + slides.length) % slides.length].querySelector("img[data-src]");
      if (img) { img.src = img.getAttribute("data-src"); img.removeAttribute("data-src"); }
    }

    function show(next) {
      index = (next + slides.length) % slides.length;
      // the one on screen, plus its neighbours so stepping through is instant
      load(index); load(index - 1); load(index + 1);
      slides.forEach(function (slide, i) {
        var active = i === index;
        slide.classList.toggle("is-active", active);
        var vid = slide.querySelector("video");
        if (!vid) return;
        if (active) { vid.currentTime = 0; vid.play().catch(function () {}); }
        else { vid.pause(); }
      });
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { show(index - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { show(index + 1); });

    // Warm the second slide once the gallery nears the viewport, so the first
    // click doesn't sit on a download, and keep the video running only while
    // the gallery is actually on screen.
    function onScreen(yes) {
      var vid = slides[index].querySelector("video");
      if (!vid) return;
      if (yes) vid.play().catch(function () {});
      else vid.pause();
    }

    if (typeof IntersectionObserver === "undefined") {
      load(1);
    } else {
      var warmed = false;
      var io = new IntersectionObserver(function (entries) {
        var visible = entries[0].isIntersecting;
        if (visible && !warmed) { load(1); warmed = true; }
        onScreen(visible);
      }, { rootMargin: "300px" });
      io.observe(carousel);
    }
  }

  function initCarousels() {
    document.querySelectorAll(".carousel").forEach(initCarousel);
  }

  /* ---------------- Pinned header ---------------- */
  function initPinBar() {
    var bar = document.getElementById("pinbar");
    var sign = document.querySelector(".hero__sign");
    var about = document.getElementById("about");
    if (!bar || !sign || !about) return;

    function onScroll() {
      // Pin at the exact moment the hero signature leaves the top of the
      // viewport, so it reads as the same block carrying on up there.
      var started = sign.getBoundingClientRect().top <= 0;
      // Retire once Infos takes over the lower half of the screen. That
      // section plus the footer are shorter than one viewport, so its top
      // never reaches y=0 and can't be used as the cutoff.
      var arrived = about.getBoundingClientRect().top <= window.innerHeight * 0.5;
      bar.classList.toggle("is-pinned", started && !arrived);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  /* ---------------- Back to top ---------------- */
  function initBackToTop() {
    var btn = document.getElementById("backToTop");
    if (!btn) return;
    function onScroll() {
      btn.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.6);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLangToggle();
    initPlayers();
    initCarousels();
    initPinBar();
    initBackToTop();
  });
})();
