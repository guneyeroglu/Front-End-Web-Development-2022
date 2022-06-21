/*
 * Data'y� importluyoruz. assert {type: "json"} sayesinde module'�m�ze json tipinde bir dosya importlad���m�z� bildiriyoruz.
 * JSX ile �al��mad���m�z ve direkt olarak script elementi ile js dosyam�z� import edece�imiz i�in bu i�lemi yapmam�z gerekiyor.
 */
import data from "../data.json" assert { type: "json" };
// id'sini alarak table'�n ba�lang�� noktas�n� bir de�i�kene atad�m.
const tableMembers = document.getElementById("content-table-body");

const makeGroup = (groupName) => {
  tableMembers.innerHTML = "";
  // data'm� �nce gelen parametreye g�re filtreliyorum. groupName k�sm� "all" gelirse de bo� olarak alg�lamas�n� sa�l�yorum ki t�m group verilerini �ekebileyim.
  data
    .filter((member) =>
      String(member.group).includes(groupName !== "All" ? groupName : "")
    )
    .map((eachMember) => {
      // Her bir olu�mas� gereken elementi olu�turuyor ve bir de�i�kene at�yorum.
      const trMember = document.createElement("tr");
      const tdId = document.createElement("td");
      const tdFullName = document.createElement("td");
      const tdAssistant = document.createElement("td");
      const tdGroupName = document.createElement("td");
      // Gerekli e�itlemeleri yap�yorum ve olu�turulan elementlere verileri set'liyorum.
      tdId.innerHTML = eachMember.id;
      /*
       * name k�sm�nda verilerin yaz�m� karma��k. B�y�k harf, k���k harf kar��m��. G�zel g�z�kmesi i�in d�zenlemek istedim.
       * split method'u ile �nce bo�luklara g�re t�m name'i ay�r�yorum.
       * Olu�an array i�in map'leme i�lemi yap�yor ve gelen her "word" i�in ise gerekli i�lemi yap�yorum.
       * charAt method'u ile ilk index'ini al�yorum kelimenin ve b�y�k harf ile ba�lamas� i�in toLocaleUpperCase method'unu kullan�yorum.
       * Locale dememin sebebi e�itimdeki b�y�k �o�unlu�un T�rkiye Cumhuriyeti vatanda�� olmas� ve ad/soyad bilgilerinin bu alfabeyi i�eren harflerden olu�mas�.
       * B�y�k i ve k���k � problemi ya�amamak k�saca.
       * Sonras�nda ise, kelimenin ilk index'ten sonraki geriye kalan harflerine, k���k harf ile devam ettirmek amac�yla, toLocaleLowerCase method'unu uyguluyorum.
       * En sonda da join method'u ile t�m kelimeleri birle�tirip tek bir string ifade olu�turuyorum.
       */
      tdFullName.innerHTML = String(eachMember.name)
        .split(" ")
        .map(
          (word) =>
            word.charAt(0).toLocaleUpperCase() +
            word.slice(1).toLocaleLowerCase()
        )
        .join(" ");
      tdAssistant.innerHTML = eachMember.assistant ? "Yes" : "-";
      tdGroupName.innerHTML = eachMember.group;
      trMember.append(tdId, tdFullName, tdAssistant, tdGroupName);
      tableMembers.appendChild(trMember);
    });
};

const findAssistant = (groupName) => {
  tableMembers.innerHTML = "";

  data
    .filter(
      (member) =>
        member.assistant === true &&
        String(member.group).includes(groupName !== "All" ? groupName : "")
    )
    .map((eachMember) => {
      const trMember = document.createElement("tr");
      const tdId = document.createElement("td");
      const tdFullName = document.createElement("td");
      const tdAssistant = document.createElement("td");
      const tdGroupName = document.createElement("td");

      tdId.innerHTML = eachMember.id;
      tdFullName.innerHTML = eachMember.name;
      tdAssistant.innerHTML = eachMember.assistant ? "Yes" : "-";
      tdGroupName.innerHTML = eachMember.group;
      trMember.append(tdId, tdFullName, tdAssistant, tdGroupName);
      tableMembers.appendChild(trMember);
    });
};
// Search button'�m�n click event'ini dinliyorum.
document.getElementById("btn-search").addEventListener("click", () => {
  // Group Name k�sm� i�in se�ili olan button'�n value'sunu alabilmek i�in tan�mlama yap�yorum.
  const selectedButton = document.querySelectorAll(".btn-group > *");
  // Assistant i�in gerekli parametreyi elde etmek amac� ile select yap�m�n value'sunu al�yorum.
  const selectedFilter = document.getElementById("members-filter").value;
  let groupName = null;

  for (let i = 0; i < selectedButton.length; i++) {
    selectedButton[i].classList.length > 0
      ? (groupName = selectedButton[i].value)
      : null;
  }

  // select elementimdeki value true ve false; fakat string ifade. Boolean de�il. Bu y�zden JSON.parse method'unu kullan�yorum. ��indeki veriyi boolean olarak g�rmemi sa�l�yor.
  if (groupName && !JSON.parse(selectedFilter)) {
    makeGroup(groupName);
  } else if (groupName && JSON.parse(selectedFilter)) {
    findAssistant(groupName);
  } else {
    window.alert("Please select a group name.");
  }
});
