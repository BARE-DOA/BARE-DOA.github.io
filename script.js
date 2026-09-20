const demoData = {
  high: {
    index: "01",
    title: "High attack avoidance",
    description: "Upper-body threats elicit lowering, leaning, and backward evasive motions.",
    actions: [
      {
        name: "Lean back",
        note: "The torso moves away while the feet maintain a stable support region.",
        poster: "assets/posters/high-lean.jpg",
        clips: [
          { label: "Front · Poke", meta: "Front / Poke", src: "assets/videos/high-lean-front-poke.mp4" },
          { label: "Side · Punch", meta: "Side / Punch", src: "assets/videos/high-lean-side-punch.mp4" }
        ]
      },
      {
        name: "Crouch",
        note: "A rapid height reduction creates clearance above the head and torso.",
        poster: "assets/posters/high-squat.jpg",
        clips: [
          { label: "Front · Poke", meta: "Front / Poke", src: "assets/videos/high-squat-front-poke.mp4" },
          { label: "Side · Punch", meta: "Side / Punch", src: "assets/videos/high-squat-side-punch.mp4" },
          { label: "Back · Poke", meta: "Back / Poke", src: "assets/videos/high-squat-back-poke.mp4" }
        ]
      },
      {
        name: "Duck",
        note: "Head and upper torso retreat from fast threats while balance is preserved.",
        poster: "assets/posters/high-duck.jpg",
        clips: [
          { label: "Front · Poke", meta: "Front / Poke", src: "assets/videos/high-duck-front-poke.mp4" },
          { label: "Side · Punch", meta: "Side / Punch", src: "assets/videos/high-duck-side-punch.mp4" },
          { label: "Back · Disc", meta: "Back / Disc", src: "assets/videos/high-duck-back-disc.mp4" }
        ]
      }
    ]
  },
  middle: {
    index: "02",
    title: "Middle attack avoidance",
    description: "Torso-level threats are handled through arm elevation and lateral body motion.",
    actions: [
      {
        name: "Raise arm",
        note: "The arm moves clear of the impact path while the base remains balanced.",
        poster: "assets/posters/mid-arm.jpg",
        clips: [
          { label: "Front · Poke", meta: "Front / Poke", src: "assets/videos/mid-arm-front-poke.mp4" },
          { label: "Side · Sweep", meta: "Side / Sweep", src: "assets/videos/mid-arm-side-sweep.mp4" }
        ]
      },
      {
        name: "Rotate torso",
        note: "A coordinated torso rotation moves the body away from the incoming trajectory.",
        poster: "assets/posters/mid-bend.jpg",
        clips: [
          { label: "Front · Poke", meta: "Front / Poke", src: "assets/videos/mid-bend-front-poke.mp4" },
          { label: "Side · Sweep", meta: "Side / Sweep", src: "assets/videos/mid-bend-side-sweep.mp4" }
        ]
      }
    ]
  },
  low: {
    index: "03",
    title: "Low attack avoidance",
    description: "Leg-level threats prompt precise foot lifting and dynamic changes to the support region.",
    actions: [
      {
        name: "Lift leg",
        note: "The threatened leg lifts with enough clearance while the stance leg stabilizes the body.",
        poster: "assets/posters/low-lift.jpg",
        clips: [
          { label: "Front · Poke", meta: "Front / Poke", src: "assets/videos/low-lift-front-poke.mp4" },
          { label: "Front · Disc", meta: "Front / Disc", src: "assets/videos/low-lift-front-disc.mp4" },
          { label: "Side · Sweep", meta: "Side / Sweep", src: "assets/videos/low-lift-side-sweep.mp4" }
        ]
      },
      {
        name: "Sidestep",
        note: "A quick lateral step moves the lower limb out of the incoming path.",
        poster: "assets/posters/low-step.jpg",
        clips: [
          { label: "Front · Poke", meta: "Front / Poke", src: "assets/videos/low-step-front-poke.mp4" }
        ]
      },
      {
        name: "Jump",
        note: "A brief jump clears the incoming disc before the robot lands and regains balance.",
        poster: "assets/posters/low-step.jpg",
        clips: [
          { label: "Front · Disc", meta: "Front / Disc", src: "assets/videos/low-step-front-disc.mp4" }
        ]
      }
    ]
  }
};

const movementData = [
  {
    name: "Backstep",
    note: "The robot steps backward to move its whole body away from the incoming obstacle.",
    poster: "assets/posters/move-backstep.jpg",
    clips: [
      { label: "Chair attack", meta: "Backstep / Chair", src: "assets/videos/move-backstep-chair.mp4" },
      { label: "Leg attack", meta: "Backstep / Leg", src: "assets/videos/move-backstep-leg.mp4" }
    ]
  },
  {
    name: "Sidestep",
    note: "The robot moves laterally to clear the obstacle path while maintaining balance.",
    poster: "assets/posters/move-lateral.jpg",
    clips: [
      { label: "Chair attack", meta: "Sidestep / Chair", src: "assets/videos/move-lateral-chair.mp4" },
      { label: "Leg attack", meta: "Sidestep / Leg", src: "assets/videos/move-lateral-leg.mp4" }
    ]
  }
];

const actionGrid = document.querySelector("#action-grid");
const rangeTitle = document.querySelector("#range-title");
const rangeDescription = document.querySelector("#range-description");
const summaryIndex = document.querySelector(".summary-index");
const supportsCustomFullscreen = Boolean(document.fullscreenEnabled && Element.prototype.requestFullscreen);

if (supportsCustomFullscreen) {
  document.documentElement.classList.add("custom-video-fullscreen");
  document.querySelectorAll(".combined-video-shell video").forEach((video) => {
    video.setAttribute("controlslist", "nofullscreen");
  });
}

document.addEventListener("click", (event) => {
  const button = event.target.closest(".video-fullscreen");
  if (!button) return;
  const shell = button.closest(".action-video, .combined-video-shell");
  if (document.fullscreenElement === shell) {
    document.exitFullscreen().catch(() => {});
  } else {
    shell.requestFullscreen().catch(() => {});
  }
});

document.addEventListener("fullscreenchange", () => {
  document.querySelectorAll(".video-fullscreen").forEach((button) => {
    const isFullscreen = button.closest(".action-video, .combined-video-shell") === document.fullscreenElement;
    const label = isFullscreen ? "Exit fullscreen" : "Enter fullscreen";
    button.setAttribute("aria-label", label);
    button.title = label;
  });
});

function makeActionCard(action, cardIndex) {
  const firstClip = action.clips[0];
  const article = document.createElement("article");
  article.className = "action-card";
  article.style.setProperty("--card-delay", `${cardIndex * 70}ms`);
  article.innerHTML = `
    <div class="action-video">
      <video muted loop playsinline controls preload="metadata" poster="${action.poster}">
        <source src="${firstClip.src}" type="video/mp4">
      </video>
      <span class="speed-badge">Speed: 1x</span>
      <button class="video-fullscreen" type="button" aria-label="Enter fullscreen" title="Enter fullscreen"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9V3h6 M15 3h6v6 M3 15v6h6 M21 15v6h-6"/></svg></button>
      <span class="playing-label">${firstClip.meta}</span>
    </div>
    <div class="action-copy">
      <div><span class="motion-label">Motion</span><h3>${action.name}</h3></div>
      <p>${action.note}</p>
    </div>
    <div class="clip-switcher" role="group" aria-label="${action.name} attack variants">
      ${action.clips.map((clip, index) => `
        <button type="button" class="clip-button ${index === 0 ? "active" : ""}" aria-pressed="${index === 0}"
          data-src="${clip.src}" data-meta="${clip.meta}">
          <span>${String(index + 1).padStart(2, "0")}</span>${clip.label}
        </button>`).join("")}
    </div>`;

  const video = article.querySelector("video");
  if (supportsCustomFullscreen) video.setAttribute("controlslist", "nofullscreen");
  const label = article.querySelector(".playing-label");
  article.querySelectorAll(".clip-button").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("active")) {
        video.paused ? video.play().catch(() => {}) : video.pause();
        return;
      }
      article.querySelectorAll(".clip-button").forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
      label.classList.add("changing");
      video.pause();
      video.src = button.dataset.src;
      video.load();
      video.play().catch(() => {});
      window.setTimeout(() => {
        label.textContent = button.dataset.meta;
        label.classList.remove("changing");
      }, 160);
    });
  });
  return article;
}

function renderRange(rangeKey) {
  const range = demoData[rangeKey];
  actionGrid.classList.add("is-changing");
  window.setTimeout(() => {
    actionGrid.replaceChildren(...range.actions.map(makeActionCard));
    actionGrid.dataset.count = range.actions.length;
    rangeTitle.textContent = range.title;
    rangeDescription.textContent = range.description;
    summaryIndex.textContent = range.index;
    actionGrid.classList.remove("is-changing");
  }, 180);
}

document.querySelectorAll(".range-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    if (tab.classList.contains("active")) return;
    document.querySelectorAll(".range-tab").forEach((item) => {
      item.classList.toggle("active", item === tab);
      item.setAttribute("aria-selected", item === tab ? "true" : "false");
    });
    renderRange(tab.dataset.range);
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  document.querySelector(".scroll-progress").style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
}, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});

renderRange("high");
const movingGrid = document.querySelector("#moving-grid");
movingGrid.replaceChildren(...movementData.map(makeActionCard));
movingGrid.dataset.count = movementData.length;
