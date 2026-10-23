// 프로젝트별 상세 내용은 이 목록에서 편하게 바꿀 수 있습니다.
const projects = [
  {
    category: "01 / GRAPHIC DESIGN",
    title: "좋은 아이디어는 자라난다",
    description: "대비되는 색과 크기 차이로 아이디어가 성장하는 순간을 표현한 포스터 콘셉트입니다. 실제 작업에서는 기획 의도와 제작 과정을 본인의 말로 적어 주세요.",
    role: "기획 · 그래픽 디자인 (임시)", tools: "Illustrator · Photoshop", process: "키워드 정리 → 레이아웃 스케치 → 색상 및 타이포그래피 조정"
  },
  {
    category: "02 / WEB DESIGN",
    title: "A Little Good Day",
    description: "작은 일상의 기분 좋은 순간을 전하는 가상의 브랜드 랜딩 페이지 콘셉트입니다. 실제 화면과 반응형 작업물을 여기에 연결해 주세요.",
    role: "웹 디자인 · 퍼블리싱 (임시)", tools: "HTML5 · CSS3 · Photoshop", process: "브랜드 키워드 → 와이어프레임 → 화면 디자인 → 반응형 구현"
  },
  {
    category: "03 / MOTION GRAPHICS",
    title: "Move With Me",
    description: "리듬과 움직임을 타이포그래피로 풀어낸 모션 그래픽 콘셉트입니다. 실제 영상 파일이나 재생 가능한 링크로 교체해 주세요.",
    role: "모션 디자인 · 편집 (임시)", tools: "After Effects · Premiere Pro", process: "스토리보드 → 타이밍 테스트 → 애니메이션 → 사운드 편집"
  },
  {
    category: "04 / BRAND IDENTITY",
    title: "Fresh Form",
    description: "신선한 로컬 식재료를 주제로 만든 가상의 브랜드 아이덴티티 콘셉트입니다. 본인의 실제 브랜드 작업으로 바꾸고 적용 매체를 소개해 주세요.",
    role: "브랜드 기획 · 시각 디자인 (임시)", tools: "Illustrator · Photoshop", process: "브랜드 리서치 → 로고 스케치 → 컬러 시스템 → 응용 디자인"
  }
];

const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".site-menu");
const gallery = document.querySelector("#gallery");
const galleryMore = document.querySelector(".gallery-more");
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "메뉴 열기" : "메뉴 닫기");
  menu.classList.toggle("is-open", !isOpen);
});
menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "메뉴 열기");
  menu.classList.remove("is-open");
}));

galleryMore.addEventListener("click", () => {
  const isExpanded = galleryMore.getAttribute("aria-expanded") === "true";
  galleryMore.setAttribute("aria-expanded", String(!isExpanded));
  gallery.classList.toggle("is-expanded", !isExpanded);
  galleryMore.querySelector("span").textContent = isExpanded ? "작품 더보기" : "접기";
});

const dialog = document.querySelector("#project-dialog");
const dialogArt = document.querySelector("#dialog-art");
const artClasses = ["poster-art", "web-art", "motion-art", "identity-art"];
let pageScrollY = 0;
const artMarkup = [
  '<span class="poster-small">A STUDY IN<br>CONTRAST</span><span class="poster-big">GOOD<br>IDEAS<br><i>GROW</i></span><span class="poster-circle">01</span><span class="poster-lines"></span>',
  '<span class="browser-bar"><i></i><i></i><i></i><b>goodday.studio</b></span><span class="web-stamp">TAKE<br>A BREATH</span><span class="web-head">A LITTLE<br>GOOD DAY<span>✳</span></span><span class="web-cta">EXPLORE THE BRAND ↗</span><span class="web-orb"></span>',
  '<span class="motion-label">FRAME 024 / 120</span><span class="motion-word">MOVE<br><i>WITH</i><br>ME<span>↗</span></span><span class="motion-disc"></span><span class="motion-bars"></span>',
  '<span class="identity-top">FRESH / LOCAL / DAILY</span><span class="identity-mark">f<span>!</span></span><span class="identity-name">FRESH<br>FORM</span><span class="identity-sticker">GROWN<br>WITH CARE</span><span class="identity-bottom">A BRAND IDENTITY STUDY — 2026</span>'
];

document.querySelectorAll(".work-card").forEach((card) => {
  card.addEventListener("click", () => {
    const index = Number(card.dataset.project);
    const project = projects[index];
    document.querySelector("#dialog-category").textContent = project.category;
    document.querySelector("#dialog-title").textContent = project.title;
    document.querySelector("#dialog-description").textContent = project.description;
    document.querySelector("#dialog-role").textContent = project.role;
    document.querySelector("#dialog-tools").textContent = project.tools;
    document.querySelector("#dialog-process").textContent = project.process;
    dialogArt.className = `dialog-art ${artClasses[index]}`;
    dialogArt.innerHTML = `<span class="work-image ${artClasses[index]}">${artMarkup[index]}</span>`;
    // 상세 모달을 보는 동안 배경 페이지를 고정해 스크롤 입력이 뒤로 전달되지 않게 합니다.
    pageScrollY = window.scrollY;
    document.documentElement.classList.add("modal-open");
    document.body.classList.add("modal-open");
    dialog.showModal();
  });
});

function restorePageScroll() {
  document.documentElement.classList.remove("modal-open");
  document.body.classList.remove("modal-open");
  window.scrollTo(0, pageScrollY);
}

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("close", restorePageScroll);
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
