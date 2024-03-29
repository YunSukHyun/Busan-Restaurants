const all = new Array();
let clickCount = 0;

function filterRegion(region) {
  const regionList = document.getElementById("restaurants");
  regionList.innerHTML = "";
  if (region === "all") {
    for (let i = 0; i < all.length; i++) {
      if (i == 0) {
        regionList.innerHTML +=
          "<a class='restaurant firstA' onclick='showRestaurantInfo(this)'>" +
          all[i].MAIN_TITLE +
          "</a>";
      } else
        regionList.innerHTML +=
          "<a class='restaurant' onclick='showRestaurantInfo(this)'>" +
          all[i].MAIN_TITLE +
          "</a>";
    }
    return;
  }

  const selectedRegion = all.filter((r) => r.GUGUN_NM === region);

  for (let i = 0; i < selectedRegion.length; i++) {
    const restName = selectedRegion[i].MAIN_TITLE;
    if (i == 0) {
      regionList.innerHTML +=
        "<a class='restaurant firstA' onclick='showRestaurantInfo(this)'>" +
        restName +
        "</a>";
    } else
      regionList.innerHTML +=
        "<a class='restaurant' onclick='showRestaurantInfo(this)'>" +
        restName +
        "</a>";
  }

  if (regionList.innerHTML === "") {
    regionList.innerHTML += "<a class='firstA'>이 동네에는 맛집이 없네요</a>";
  }
}

function showRestaurantInfo(rest) {
  const restInfo = document.getElementById("restInfo");
  let idx;
  for (let i = 0; i < all.length; i++) {
    if (rest.innerHTML === all[i].MAIN_TITLE) {
      idx = i;
      break;
    }
  }

  restInfo.innerHTML = "";
  restInfo.innerHTML +=
    "<a class='firstA'>상호명: " + all[idx].MAIN_TITLE + "</a>";
  restInfo.innerHTML += "<a>가는길: " + all[idx].ADDR1 + "</a>";
  restInfo.innerHTML += "<a>연락처: " + all[idx].CNTCT_TEL + "</a>";
  restInfo.innerHTML +=
    "<a class='screenshot'>대표메뉴: " + all[idx].RPRSNTV_MENU + "</a>";
  restInfo.innerHTML += "<a>소개: " + all[idx].ITEMCNTNTS + "</a>";
  if (all[idx].USAGE_DAY_WEEK_AND_TIME !== "")
    restInfo.innerHTML +=
      "<a>운영시간: " + all[idx].USAGE_DAY_WEEK_AND_TIME + "</a>";
  if (all[idx].HOMEPAGE_URL !== "")
    restInfo.innerHTML +=
      "<a href='" +
      all[idx].HOMEPAGE_URL +
      "' target='homepage'>홈페이지: " +
      all[idx].HOMEPAGE_URL +
      "</a>";
  kakaoMap(all[idx].LAT, all[idx].LNG);
  screenshotPreview(idx);
}

function displayResponse() {
  if (clickCount > 0) {
    alert("중복 입력 방지");
    return;
  }
  const word = prompt("찾을 맛집의 개수를 입력해주세요(최대 150)");

  if (
    !Number.isInteger(parseFloat(word)) ||
    parseInt(word) < 1 ||
    parseInt(word) > 150
  ) {
    alert("1-150 사이의 정수를 입력해주세요");
    return;
  }
  clickCount++;
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch(
    "http://localhost:3000/webapi?restNum=" + encodeURI(word),
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      const items = JSON.parse(result).getFoodKr.item;
      for (let i = 0; i < items.length; i++) {
        all.push(items[i]);
      }
    })
    .catch((error) => console.log("error", error));
}

this.screenshotPreview = function (idx) {
  /* CONFIG */
  xOffset = 5;
  yOffset = 0;
  // these 2 variable determine popup's distance from the cursor
  // you might want to adjust to get the right result
  /* END CONFIG */
  $("a.screenshot").hover(
    function (e) {
      this.t = this.title;
      this.title = "";
      var c = this.t != "" ? "<br/>" + this.t : "";
      $("body").append(
        "<p id='screenshot'><img src='" +
          all[idx].MAIN_IMG_NORMAL +
          "' alt='url preview' />" +
          c +
          "</p>"
      );
      $("#screenshot")
        .css("top", e.pageY - xOffset + "px")
        .css("left", e.pageX + yOffset + "px")
        .fadeIn("fast");
    },
    function () {
      this.title = this.t;
      $("#screenshot").remove();
    }
  );
  $("a.screenshot").mousemove(function (e) {
    $("#screenshot")
      .css("top", e.pageY - xOffset + "px")
      .css("left", e.pageX + yOffset + "px");
  });
};

// starting the script on page load
$(document).ready(function () {
  $("h2").on({
    mouseenter: function () {
      $(this).css("color", "green");
    },
    mouseleave: function () {
      $(this).css("color", "white");
    },
  });
});
